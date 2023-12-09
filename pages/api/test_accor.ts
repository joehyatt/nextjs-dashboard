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
    const capture_date_count = 1;
    const dateOffset = 0;
    
    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels('accor');

    // baseUrl = https://all.accor.com/ssr/app/accor/hotels/japan/index.ja.shtml?token=jdTjsCwowv44dCvh4C72pfborPfj4rXhLmTvzecjo-nBdV0dPkn0gtnlAgNQtBk-caGogSAveHDH7N3H2CxUzXnZDVvpY8JN3_O0lpWEJPd0EtK-SQErAe6frrG2Vd4_njnHjy5ycqq2kclXQNKuLFi1tDZJYIbVAPUKlIvyIXBGHqDj4LVVSAbiXi1-i7T0VLHFkhvdA9v9d9k1T0Skt7WdowX6f1Fdg88EjKs9TAj40YjL8L4oFc_d30Y8Nn5tRig7WZgIKzMhlWjoQFhNNDouj1dp_DNbtT6OMICTiGg4CUeFN4ZT_sSaLATRPvvHYvw_3Q8VgKHY53bhp3T7ZXMFGrEUg7r6nM4c9khF4noKbetbWWBLqyEWRui7uUWhmhNCSusO6dam3rqfAH9syC6fnUtisiRQc1d6xBilPlm0EiUddXdqOGl_O1gmYAjBzbCJahdiJ4ZVcYRgpxWc6E8PYpBgIUBxuRzRb2orRggLwOpEGve4EtiP38yBFG2-G3tPqBcQEMxyHrthfQo8_9-cvkVC3YbaYe3Wv-KN21ghwkeavJiyq-4rCuMGqd6dPFhPyFaC_XwfLfFlQqPxbJX8JoL0SzptzlrPidwF8o905VJT9yU6GxDYnhWReD6a7-_o7IAWSQ4QDPj42MoSE6_EZ7a6KP74cvKpLD5YauwtKKqoYBc-xujhgW0Mgf7hbkLion08UEd1mAJpPdU0jY_EUDUZjAO_DW-TcdqPLc21hnCLNDt2le2jI1kwHa-Q-uEefZiqkZckDISo_nSwrZ8DlcHDb-z-zmRs2fzVwFaCnR5Iv-6kn7sYJiDlzM5TTQDfIJllU2MM1GVrs-TvtAx3lm5vl34bCwNAT8hdOYvbzbCd0XghOD99S0BOMZtMa_FP1KjM2TqmzuQKsIH_FXuf-KZbVD2RZ_09R4WPtc7rm6sreLB8uo16kBUUORG_XHd8Mespf7unVDLnr68UL_lg_R3Zdn7akwLirJmO1UP6kww2Gm0crY7mGZdZABmGgbUEjCO-5cg2BtOiQDff6_k4Q4ZNYEaF6isXQvqc1a5HK3KPjQK_YFNqVcqBhImZ49OXiRbJfV0PzJ9Y-gCblY0QdUugByfWdYv9PbSk_uVK24zsnto_uXIU-ug6MSJFPCUtYsD9xqznbItq5FU42kL1GwSAPjIREwkVQrXq57YHkTK0IaTdUqKumAIf3VnU0_a3KQXvGAcVEfAhGgca4UUZ0QTuvsZtvcuivyNyE8pKqoys3wsBWfTpEv7uWBAT5VKsFjybBdggcNtvhqg0H2PcgqfRdroMFo5LqI2TzPvtoSeF&dateIn=2023-12-20&nights=1&compositions=1&stayplus=false&snu=false&hideWDR=false&accessibleRooms=false&hideHotelDetails=false
    // baseUrl = https://all.accor.com/ssr/app/accor/hotels/japan/index.ja.shtml?dateIn=2023-12-20

    // 仮想ブラウザの立ち上げ
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

    // 検索日の設定
    for (let dateNum = 0; dateNum < capture_date_count; dateNum++) {
        let capturedRatesByDate: Rate[] = [];
        const cid = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
       
        try{
            // 検索URL決定
            const searchUrl = `https://all.accor.com/ssr/app/accor/hotels/japan/index.ja.shtml?dateIn=${cid}`;
            
            console.log(`Start capturing ${cid} rates...`);
            
            await page.goto(searchUrl);
            await page.waitForSelector("div.skeleton.gallery-block__skeleton", { hidden: true, timeout: 30000 });

            await page.waitForSelector("div.hotelsList__wrapper > div >p", { timeout: 10000 });
            const hotelCount = await page.evaluate(() => {
                return Number(document.querySelector("div.hotelsList__wrapper > div >p")!.innerHTML.replace(/[^0-9]/g, ''));
            })
            
            for (let i=0; i<hotelCount; i++) {
                const lastHotelElemHeight = await page.evaluate((i:number) => {
                    const hotel_node_list:any[] = Array.from(document.querySelectorAll("li.hotelsList__actual-item > div.hotelsList__hotel > div.hotelblock"));
                    const lastHotelElemHeight = hotel_node_list[i].offsetTop + 200;
                    scrollTo(0,lastHotelElemHeight);
                    return {displayedHotels: hotel_node_list.length, lastHotelElemHeight}
                },i)
                // console.log(lastHotelElemHeight);
                await page.waitForSelector("div.skeleton.gallery-block__skeleton", { hidden: true, timeout: 5000 });
            }
            
            // 通貨の変更
            await page.waitForSelector("select#-currency-selector", { timeout: 3000 });
            await page.evaluate(()=>{
                var select:any = document.getElementById("-currency-selector");
                select.value = "JPY";
                select.dispatchEvent(new Event('change'));
            })
            await page.waitForSelector("div.hotelblock__content > div.hotelblock__content-body > div.hotelblock__content-priceblock > div > div > div.rate-details > div.rate-details__price-wrapper > div:nth-child(1) > span.rate-details__price1__first-price > span > span.booking-price__number", { timeout: 30000 });
            
            const rate_list: Rate[]  = await page.evaluate((cid: string, capture_date: string, hotels:{id:string,hotel_code:string}[])=>{
                const rateByHotels:Rate[] = [];
                const hotel_node_list = Array.from(document.querySelectorAll("li.hotelsList__actual-item > div.hotelsList__hotel > div.hotelblock"));
                
                for (let h = 0; h < hotel_node_list.length; h++) {
                    let rate = null;
                    let exception = null;
                    const hotel_code = hotel_node_list[h].querySelector("*[role='button']")!.getAttribute("described-by")!.replace("hotel-id-","");
                    if (hotel_node_list[h].querySelector("div.hotelblock__content > div.hotelblock__content-body > div.hotelblock__content-priceblock > div > div > div.rate-details > div.rate-details__price-wrapper > div:nth-child(1) > span.rate-details__price1__first-price > span > span.booking-price__number")) {
                        rate = Number(hotel_node_list[h].querySelector("div.hotelblock__content > div.hotelblock__content-body > div.hotelblock__content-priceblock > div > div > div.rate-details > div.rate-details__price-wrapper > div:nth-child(1) > span.rate-details__price1__first-price > span > span.booking-price__number")!.textContent);
                    } else if (hotel_node_list[h].querySelector("span.price-block__unavailable--error")) {
                        exception = "Sold Out"
                    } else {
                        throw new Error("Invalid Rate");
                        // exception = "other"
                    }
                    if (hotels!.find(hotel => hotel.hotel_code === hotel_code)) {
                        const hotel_id = hotels!.find(hotel => hotel.hotel_code === hotel_code)!.id
                        rateByHotels.push({hotel_id,cid,rate,exception,capture_date});
                    }
                }
                return rateByHotels

            },cid,capture_date,hotels)
            
            console.log(`${rate_list.length} captured!`);

            await new Promise(resolve => setTimeout(resolve, 20000));

            // capturedRatesに日毎のRatesを格納
            capturedRatesByDate.push(...rate_list);
            capturedRates.push(...rate_list);

            // log
            const soldOutCount = capturedRatesByDate.filter(rate=>rate.exception === "Sold Out").length
            console.log("Capture Success!")
            console.log(`Captured ${capturedRatesByDate.length} Hotels (SoldOut: ${soldOutCount})`);
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
