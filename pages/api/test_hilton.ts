import type { NextApiRequest, NextApiResponse } from 'next'
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
    group_code: 'ihg' | 'accor' | 'hilton' | 'marriott' | 'hyatt',
    country_code: 'JP' | 'TW' | 'MY'
    cid: string | null,
    capture_month: string | null,
    captured_hotels: number | null,
    result: 'success' | 'capturing_failure' | 'saving_failure',
    capture_timestamp: string,
    save_timestamp: string | null,
}

const dateOffset = 0;
const capture_date_count = 81;

const group_code = "hilton";
const country_code = "JP";
const areas = ["Niseko","Tokyo","Toyama","Nagoya","Osaka","Kyushu","Okinawa","Miyakojima"];
const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
const capturedRates:Rate[] = [];
let chrome = {};
let puppeteer = {};
let options = {};
let captureLog: Log = {
    hotel_id: null,
    group_code: group_code,
    country_code: country_code,
    cid: null,
    capture_month: null,
    captured_hotels: null,
    result: 'success',
    capture_timestamp: "",
    save_timestamp: null,
};


const captureRates = async (puppeteer: any, chrome:any={}, client:any) => {

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
            // headless: false,
            slowMo: 100,
        }
        // Local --------------------------------------------- //
    }

    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels(group_code);
    
    // 検索日の設定
    for (let dateNum = 0; dateNum < capture_date_count; dateNum++) {
        // 仮想ブラウザの立ち上げ
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        let capturedRatesByDate: Rate[] = [];
        
        const cid = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
        const cod = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum + 1)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

        try{

            for (let areaNum = 0; areaNum < areas.length; areaNum++) {
                const area = areas[areaNum];

                // 検索URL決定  
                const searchUrl = `https://www.hilton.com/en/search/?query=${area},%20JP&arrivalDate=${cid}&departureDate=${cod}`
                
                console.log(`Start capturing ${group_code} : ${area} : ${cid} rates...`);
                
                await page.goto(searchUrl,{ timeout:0 });
                await page.waitForSelector("h2[data-testid='numberOfHotelsShowing'] > span", { timeout: 30000 });
                // const pages: number = await page.evaluate(()=>{
                //     const numberOfHotelsShowing = document.querySelector("h2[data-testid='numberOfHotelsShowing'] > span")!.innerHTML;
                //     let numberOfPages = 1;
                //     if (numberOfHotelsShowing.includes("Showing 1 - 20 of ")) {
                //         const numberOfHotels = Number(numberOfHotelsShowing.replace("Showing 1 - 20 of ","").replace(" hotels ",""));
                //         numberOfPages = Math.ceil(numberOfHotels/20);
                //     }
                //     return numberOfPages;
                // })
                // console.log(`will capture ${pages} page(s)`);

                // for (let p = 0; p < pages; p--) {
                //     if (p !== 0) {
                //         console.log(`transferring to ${p+1}-page...`);
                //         await page.evaluate(()=>{
                //             document.querySelector("ul[aria-label='Hotel search results']")!.nextElementSibling!.querySelector("button:nth-child(4)")!.click();
                //         })
                //     }
            
                await page.mouse.wheel({deltaY: 4000});
                await page.waitForSelector("p[data-testid='priceInfo']", { timeout: 30000 });

                const rate_list: Rate[]  = await page.evaluate((cid: string, capture_date: string, hotels:{id:string,hotel_code:string}[])=>{
                    const rateByHotels:Rate[] = [];
                    const hotel_node_list = Array.from(document.querySelectorAll("li[data-testid*='hotel-card-']"));
                    
                    for (let h = 0; h < hotel_node_list.length; h++) {
                        let rate = null;
                        let exception = null;
                        const hotel_code = hotel_node_list[h].getAttribute("data-testid")!.replace("hotel-card-","");
                        if (hotel_node_list[h].querySelector("p[data-testid='priceInfo']")) {
                            if (hotel_node_list[h].querySelector("p[data-testid='priceInfo']")?.textContent === "Coming Soon") {
                                exception = "Opening Soon";
                            } else if (hotel_node_list[h].querySelector("p[data-testid='priceInfo']")?.textContent === "Sold Out") {
                                exception = "Sold Out";
                            } else {
                                rate = Number(hotel_node_list[h].querySelector("p[data-testid='priceInfo']")!.textContent!.replace("¥","").replace(",",""));
                            }    
                        } 
                        
                        if (hotels!.find(hotel => hotel.hotel_code === hotel_code)) {
                            const hotel_id = hotels!.find(hotel => hotel.hotel_code === hotel_code)!.id
                            rateByHotels.push({hotel_id,cid,rate,exception,capture_date});
                        }
                    }
                    return rateByHotels
                },cid,capture_date,hotels);
                // console.log(rate_list);
                console.log(`${rate_list.length} captured`);
    
                // capturedRatesに日毎のRatesを格納
                capturedRatesByDate.push(...rate_list);
                capturedRates.push(...rate_list);
            }

            // log
            const soldOutCount = capturedRatesByDate.filter(rate=>rate.exception === "Sold Out").length
            const openingSoonCount = capturedRatesByDate.filter(rate=>rate.exception === "Opening Soon").length
            console.log("Capture Success!")
            console.log(`Captured ${capturedRatesByDate.length} Hotels (SoldOut: ${soldOutCount}, OpeningSoon: ${openingSoonCount})`);

            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLog = {group_code, country_code, hotel_id: null, capture_month: null, cid, result: 'success', captured_hotels: capturedRatesByDate.length, capture_timestamp, save_timestamp: null };
            // save
            await saveRates(client,capturedRatesByDate);
            await saveLog(client,captureLog);

        } catch (e) {
            // log
            console.log("Capture Failed: " + e);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLog = {group_code, country_code, hotel_id: null, capture_month: null, cid, result: 'capturing_failure', captured_hotels: null, capture_timestamp, save_timestamp: null };
            // save
            await saveLog(client,captureLog);
        }
        
        // 仮想ブラウザの終了
        await browser.close();
    }
    
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
        captureLog.save_timestamp = save_timestamp;
    } catch (error) {
        // log
        console.error('Error during saving rates:', error);
        captureLog.result = 'saving_failure';
    }
}

const saveLog = async (client: any, log: Log) => {
    console.log(`Saving log...`);
    try {
        await withTimeout(Promise.resolve(
            client.sql`
                INSERT INTO logs (group_code, country_code, cid, captured_hotels, hotel_id, capture_month, result, capture_timestamp, save_timestamp)
                VALUES (${log.group_code}, ${log.country_code}, ${log.cid}, ${log.captured_hotels}, ${log.hotel_id}, ${log.capture_month}, ${log.result}, ${log.capture_timestamp}, ${log.save_timestamp})
                ON CONFLICT DO NOTHING;
                `,
        ), 30000);
        // log
        console.log(`Saved log successfully!`);
    } catch (error) {
        // log
        console.error('Error during saving log:', error);
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
        await captureRates(puppeteer, chrome, client);
        await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error:', error);
        res.send("Error");
    }
}
