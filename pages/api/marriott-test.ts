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
        options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: false,
        slowMo: 100,
        }
        // Local --------------------------------------------- //
    }

    // 取得対象日数設定
    const captureScriptNumber = 5;
    const capture_date_count = 1;
    const dateOffset = capture_date_count * (captureScriptNumber-1);
    
    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels('marriott');

    // baseUrl = https://www.marriott.com/reservation/availabilitySearch.mi?isRateCalendar=true&propertyCode=OSAAL&fromDate=01/01/2024&toDate=01/02/2024

    // 仮想ブラウザの立ち上げ
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

    // 検索日の設定
    for (let dateNum = 0; dateNum < capture_date_count; dateNum++) {
        let capturedRatesByDate: Rate[] = [];
        const capture_cid = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"});
        const capture_cod = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum + 1)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"});
        const cid = capture_cid.replaceAll('/', '-');
        

        // 検索URL決定
        const searchUrl = `https://www.marriott.com/search/findHotels.mi?fromDate=${capture_cid.slice(-5)}/${capture_cid.slice(0,4)}&toDate=${capture_cod.slice(-5)}/${capture_cod.slice(0,4)}&destinationAddress.destination=Japan`
        console.log(`Start capturing ${cid} rates...`);
        console.log(searchUrl);
        // cal: https://www.marriott.com/reservation/availabilitySearch.mi?isRateCalendar=true&propertyCode=UKBFI&isSearch=true&currency=
        
        try{
            // await Promise.all([
            //     // page.click("li.shop-pagination-next:not([class*='disabled'])"),
            //     page.goto("https://www.marriott.com/search/findHotels.mi?fromDate=12/19/2023&toDate=12/20/2023&destinationAddress.destination=Japan&view=list",{ waitUntil: 'networkidle0' }),
            //     page.waitForNavigation({ waitUntil: 'networkidle2' }),
            // ]);
            await page.goto("https://www.marriott.com/search/findHotels.mi?fromDate=12/19/2023&toDate=12/20/2023&destinationAddress.destination=Japan&view=list",{ "waitUntil":"domcontentloaded" });
            await new Promise(resolve => setTimeout(resolve, 3000));
            const title = await page.title();
            console.log("page title: ",title);
            await page.waitForSelector("#main-content span.m-price", { timeout: 30000 });
            const pages: number = await page.evaluate(()=>{
                const pagenationNodes = Array.from(document.querySelectorAll("li.shop-pagination-item"));
                return pagenationNodes.length;
            })
            console.log(`will capture ${pages} page(s)`);
            
            for (let p = 0; p < pages; p++) {
                if (p !== 0) {
                    await Promise.all([
                        page.waitForNavigation(),
                        page.click("li.shop-pagination-next:not([class*='disabled'])"),
                    ]);
                    console.log(`transferred to ${p+1}-page`);
                }
                await page.waitForSelector("#main-content span.m-price", { timeout: 30000 });
                await page.mouse.wheel({deltaY: 500});

                const rate_list: Rate[]  = await page.evaluate((cid: string, capture_date: string, hotels:{id:string,hotel_code:string}[])=>{
                    const rateByHotels:Rate[] = [];
                    const hotel_node_list = Array.from(document.querySelectorAll("#main-content div.property-card"));
                    
                    for (let h = 0; h < hotel_node_list.length; h++) {
                        let rate = null;
                        let exception = null;
                        const hotel_code = hotel_node_list[h].getAttribute("data-marsha")!;
                        if (hotel_node_list[h].querySelector("span.m-price")) {
                            rate = Number(hotel_node_list[h].querySelector("span.m-price")!.textContent!.replace(",",""));
                        } else if (hotel_node_list[h].querySelector("div.unavailable-text")) {
                            exception = "Sold Out"
                        } else if (hotel_node_list[h].querySelector("span.opening-soon-font")) {
                            exception = "Opening Soon"
                        } else {
                            throw new Error("Invalid Rate");
                        }
                        if (hotels!.find(hotel => hotel.hotel_code === hotel_code)) {
                            const hotel_id = hotels!.find(hotel => hotel.hotel_code === hotel_code)!.id
                            rateByHotels.push({hotel_id,cid,rate,exception,capture_date});
                        }
                    }
                    return rateByHotels
                },cid,capture_date,hotels)
    
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
        ), 100000);
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
        // await saveRates(client,capturedRates);
        // await saveLogs(client,captureLogs);
        await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error during connecting db:', error);
        res.send("DB Connection Error!");
    }
}
