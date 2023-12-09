import type { NextApiRequest, NextApiResponse } from 'next'
// import { fetchCaptureHotels } from '@/app/lib/data'
import { withTimeout } from '@/app/lib/utils'
import { fetchGroupHotels } from '@/app/lib/data'

const { db } = require('@vercel/postgres');

type Rate = {
    hotel_id: string,
    cid: string,
    rate: number | null,
    exception: string | null,
    capture_date: string
}
type Log = {
    hotel_id: string | null,
    cid: string | null,
    capture_month: string | null,
    captured_hotels: number | null,
    result: 'success' | 'capturing_failure' | 'saving_failure',
    capture_timestamp: string,
    save_timestamp: string | null,
}

let chrome = {};
let puppeteer = {};
let options = {};
const capturedRates:Rate[] = [];
const captureLogs:Log[] = [];
// const captureScriptId = "marriott001";

const captureRates = async (puppeteer: any, chrome:any={}) => {

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
        // puppeteer = require('puppeteer-extra');
        // const pluginStealth = require(`puppeteer-extra-plugin-stealth`)();
        // pluginStealth.enabledEvasions.delete(`chrome.runtime`);
        // pluginStealth.enabledEvasions.delete(`iframe.contentWindow`);
        // puppeteer.use(pluginStealth);
        options = {
            args: chrome.args,
            // args: ['--disable-webgl'],
            executablePath: await chrome.executablePath,
            // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            // args: [
            //     // ゲストセッションで操作する。
            //     "--guest",
            //     '--lang=bn-BD,bn',
            //     // ウインドウサイズをデフォルトより大きめに。
            //     '--window-size=1280,800',
            // ],
            headless: false,
            slowMo: 500,
        }
        // Local --------------------------------------------- //
    }

    // 取得対象日数設定
    const captureScriptNumber = 1;
    const capture_date_count = 1;
    const dateOffset = 0;
    // const dateOffset = capture_date_count * (captureScriptNumber-1);
    
    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels('hyatt');

    // baseUrl = https://www.hyatt.com/ja-JP/search/Japan?checkinDate=2023-12-03&checkoutDate=2023-12-04

    // 仮想ブラウザの立ち上げ
    const browser = await puppeteer.launch(options)
    
    const page = await browser.newPage();
    // const page = (await browser.pages())[0] || (await browser.newPage());
    // await page.setViewport({
    //     width: 1920 - 0,
    //     height: 1080 - 74
    // });
    // await page.setExtraHTTPHeaders({
    //     'Accept-Language': 'en-US,en;q=0.9'
    // });

    // await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36");
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");
    // await page.setUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
    
    const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

    // 検索日の設定
    for (let dateNum = 0; dateNum < capture_date_count; dateNum++) {
        let capturedRatesByDate: Rate[] = [];
        const capture_cid = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');;
        const capture_cod = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum + 1)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');;
        const cid = capture_cid.replaceAll('/', '-');

        // 検索URL決定
        const searchUrl = `https://www.hyatt.com/ja-JP/search/Japan?checkinDate=${capture_cid}&checkoutDate=${capture_cod}`;
        // const searchUrl = `https://www.marriott.com/search/findHotels.mi?fromDate=${capture_cid.slice(-5)}/${capture_cid.slice(0,4)}&toDate=${capture_cod.slice(-5)}/${capture_cod.slice(0,4)}&destinationAddress.destination=Japan`
        console.log(`Start capturing ${cid} rates...`);
        console.log(searchUrl);

        try{
            await page.goto(searchUrl);
            await page.waitForSelector("*[data-js='hotel-card']", { timeout: 30000 });
            const title = await page.title();
            console.log("page title: ",title);

            const rate_list: Rate[]  = await page.evaluate((cid: string, capture_date: string, hotels:{id:string,hotel_code:string}[])=>{
                const rateByHotels:Rate[] = [];
                const hotel_node_list = Array.from(document.querySelectorAll("*[data-js='hotel-card']"));
                
                for (let h = 0; h < hotel_node_list.length; h++) {
                    let rate = null;
                    let exception = null;
                    const hotel_code = hotel_node_list[h].getAttribute("data-spirit-code")!;
                    if (hotel_node_list[h].getAttribute("data-booking-status") === "BOOKABLE") {
                        rate = Number(hotel_node_list[h].getAttribute("data-rate"));
                    } else if (hotel_node_list[h].getAttribute("data-booking-status") === "SOLD_OUT") {
                        exception = "Sold Out"
                    } else if (hotel_node_list[h].getAttribute("data-booking-status") === "NOT_BOOKABLE") {
                        exception = "--"
                    } else {
                        // throw new Error("Invalid Rate");
                        exception = "other"
                    }
                    if (hotels!.find(hotel => hotel.hotel_code === hotel_code)) {
                        const hotel_id = hotels!.find(hotel => hotel.hotel_code === hotel_code)!.id
                        rateByHotels.push({hotel_id,cid,rate,exception,capture_date});
                    }
                }
                return rateByHotels
            },cid,capture_date,hotels)
            // console.log(`${rate_list.length} captured on page ${p+1}`);

            // capturedRatesに日毎のRatesを格納
            capturedRatesByDate.push(...rate_list);
            capturedRates.push(...rate_list);
                
            // log
            const soldOutCount = capturedRatesByDate.filter(rate=>rate.exception === "Sold Out").length
            const openingSoonCount = capturedRatesByDate.filter(rate=>rate.exception === "Opening Soon").length
            console.log("Capture Success!")
            console.log(`Captured ${capturedRatesByDate.length} Hotels (SoldOut: ${soldOutCount}, OpeningSoon: ${openingSoonCount})`);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLogs.push({hotel_id: null, capture_month: null, cid, result: 'success', captured_hotels: capturedRatesByDate.length, capture_timestamp, save_timestamp: null })

        } catch (e) {
            // log
            console.log("Capture Failed: " + e);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLogs.push({hotel_id: null, capture_month: null, cid, result: 'capturing_failure', captured_hotels: 0, capture_timestamp, save_timestamp: null })
        }
    }

    console.log(capturedRates.length)
    console.log(captureLogs)
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
        ), 300000);
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
        // const client = await Promise.race([
        //     db.connect(),
        //     new Promise((_, reject) => setTimeout(() => reject("DB connect timeout!"), 10000))
        // ])
        await captureRates(puppeteer, chrome);
        // await saveRates(client,capturedRates);
        // await saveLogs(client,captureLogs);
        // await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error during connecting db:', error);
        res.send("DB Connection Error!");
    }
}