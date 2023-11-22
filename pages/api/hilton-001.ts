import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchCaptureHotels } from '@/app/lib/data'
import { withTimeout } from '@/app/lib/utils'

const { db } = require('@vercel/postgres');

type Rate = {
    hotel_id: string,
    cid: string,
    rate: number | null,
    exception: string | null,
    capture_date: string
}
type Log = {
    hotel_id: string,
    capture_month: string,
    result: 'success' | 'capturing_failure' | 'saving_failure'
    capture_timestamp: string,
    save_timestamp: string | null,
}

let chrome = {};
let puppeteer = {};
let options = {};
const capturedRates:Rate[] = [];
const captureLogs:Log[] = [];
const captureScriptId = "hilton001";

const captureRates = async (puppeteer: any, chrome:any={}) => {

    // throw new Error("evaluating error");

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION){
        // Production --------------------------------------------- //
        console.log("production start")
        chrome = require('@sparticuz/chromium-min');
        puppeteer = require('puppeteer-core');
        options = {
        args: [...chrome?.args, '--hide-scrollbars', '--disable-web-security'],
        executablePath: await chrome.executablePath(
            `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
        ),
        headless: false,
        ignoreHTTPSErrors: true,
        }
        // Production --------------------------------------------- //
    } else {
        // Local --------------------------------------------- //
        console.log("local start")
        puppeteer = require('puppeteer');
        options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: false,
        slowMo: 100,
        }
        // Local --------------------------------------------- //
    }

    // 取得対象ホテル設定
    const hotels = await fetchCaptureHotels(captureScriptId)
    
    // 仮想ブラウザの立ち上げ
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // 検索ホテルの設定
    for (let hotelNum = 0; hotelNum < hotels.length; hotelNum++) {
        const { hotel_id, hotel_code, capture_month_count } = hotels[hotelNum];

        // 検索月の設定
        for (let monthNum = 0; monthNum < capture_month_count; monthNum++) {
            const now = new Date();
            const today = now.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
            const capture_timestamp = now.toISOString().replace("T"," ").slice(0,-5);
            const capture_month = new Date(now.setMonth(now.getMonth() + monthNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit"}).replace('/', '-');
            const lastDay = new Date(Number(capture_month.slice(0,4)), Number(capture_month.slice(-2)),0).getDate();
            
            // 検索URL決定
            const searchUrl = `https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=${hotel_code}&arrivalDate=${capture_month}-01&departureDate=${capture_month}-02`;
            console.log(`Start capturing ${hotel_id} : ${capture_month} rates...`);

            try{
                // ページを開く-価格表示まで待機-価格取得
                
                await page.goto(searchUrl);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.waitForSelector("#flexibleDatesCalendar > div:nth-child(3) > div > div div[data-testid='flexDatesRoomRate'] > span", { hidden: true, timeout: 30000 });
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const monthlyRates = await page.evaluate((hotel_id: string, lastDay: number, capture_month: string, today: string) => {
                    const monthlyRates:Rate[] = []
                    const startDate = today.slice(0,7) === capture_month ? Number(today.slice(-2)) : 1;
                    for (let dayNum = startDate; dayNum < lastDay + 1; dayNum++) {
                        const searchDate = ( '00' + dayNum ).slice(-2);
                        let rate = null;
                        let exception = null;
                        if (document.querySelector(`button[data-testid='arrival-${capture_month}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)) {
                            const rateElement = document.querySelector(`button[data-testid='arrival-${capture_month}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)
                            if (rateElement && !rateElement.innerHTML.includes("<span>")) {
                                rate = Number(rateElement.textContent!.trim().replace("¥","").replaceAll(",",""));
                            } else {
                                throw new Error("Still Blurring ...");
                            }
                        } else if (document.querySelector(`button[data-testid='arrival-${capture_month}-${searchDate}'] > div:nth-child(3) > div > span[data-testid='rateNotAvailable']`)) {
                            exception = "Sold Out";
                        } else {
                            exception = "Invalid Date";
                        }
                        monthlyRates.push({hotel_id, cid:`${capture_month}-${searchDate}`, rate, exception, capture_date: today})
                    }
                    return monthlyRates
                },hotel_id,lastDay,capture_month,today);

                // capturedRatesに各月のRatesを格納
                capturedRates.push(...monthlyRates)

                // log
                console.log(`Captured ${monthlyRates.length}-Day-Rate`)
                captureLogs.push({hotel_id, capture_month, result: 'success', capture_timestamp, save_timestamp: null })
            } catch (e) {
                // log
                console.log("Capture Failed: " + e)
                captureLogs.push({hotel_id, capture_month, result: 'capturing_failure', capture_timestamp, save_timestamp: null })
            }
        }
    }
    // 仮想ブラウザの終了
    await browser.close();
}

const saveRates = async (client:any, rates: Rate[]) => {
    const save_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
    console.log(`Saving ${rates.length} rates...`);
    try {
        const insertedRates = await withTimeout(Promise.all(
            rates.map(
                (rate) => client.sql`
                INSERT INTO rates (hotel_id, cid, rate, exception, capture_date)
                VALUES (${rate.hotel_id}, ${rate.cid}, ${rate.rate}, ${rate.exception}, ${rate.capture_date})
                ON CONFLICT ON CONSTRAINT capture_unit DO UPDATE SET
                    hotel_id = EXCLUDED.hotel_id,
                    cid = EXCLUDED.cid,
                    rate = EXCLUDED.rate,
                    exception = EXCLUDED.exception,
                    capture_date = EXCLUDED.capture_date;
                `
            ),
        ), 60000);
        // log
        console.log(`Saved ${insertedRates.length} rates successfully!`);
        captureLogs.map(log=> log.save_timestamp = save_timestamp);
    } catch (error) {
        // log
        console.error('Error during saving rates:', error);
        captureLogs.map(log=>log.result = 'saving_failure');
    }
}

const saveLogs = async (client: any, logs: Log[]) => {
    console.log(`Saving ${logs.length} logs...`);
    try {
        const insertedLogs = await withTimeout(Promise.all(
            logs.map(
                (log) => client.sql`
                INSERT INTO logs (hotel_id, capture_month, result, capture_timestamp, save_timestamp)
                VALUES (${log.hotel_id}, ${log.capture_month}, ${log.result}, ${log.capture_timestamp}, ${log.save_timestamp})
                ON CONFLICT DO NOTHING;
                `
            ),
        ), 30000);
        // log
        console.log(`Saved ${insertedLogs.length} logs successfully!`);
    } catch (error) {
        // log
        console.error('Error during saving logs:', error);
    }
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<string>
) { 
    try {
        const client = await Promise.race([
            db.connect(),
            new Promise((_, reject) => setTimeout(() => reject("DB connect timeout!"), 10000))
        ])
        await captureRates(puppeteer, chrome);
        await saveRates(client,capturedRates);
        await saveLogs(client,captureLogs);
        await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error during connecting db:', error);
        res.send("DB Connection Error!");
    }
}
