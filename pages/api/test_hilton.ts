import type { NextApiRequest, NextApiResponse } from 'next'
const { db } = require('@vercel/postgres');

type Rates = {
    hotel_id: string,
    cid: string,
    rate: number | null,
    exception: string | null,
    capture_date: string
}

let chrome = {};
let puppeteer = {};
let options = {};

const run = async (puppeteer: any, chrome:any={}) => {

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

    // 変数設定
    const hotel_id = "5d8ff021-f0dd-4296-9269-b30aff8da3aa";
    const hotels = ["CTSNVHI"];
    const monthCount = 2;

    // 仮想ブラウザの立ち上げ
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // 検索ホテルの設定
    for (let hotelNum = 0; hotelNum < hotels.length; hotelNum++) {

        const hotel_code = hotels[hotelNum];

        // 検索月の設定
        for (let monthNum = 0; monthNum < monthCount; monthNum++) {
            const now = new Date();
            const today = now.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
            const searchMonth = new Date(now.setMonth(now.getMonth() + monthNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit"}).replace('/', '-');
            const lastDay = new Date(Number(searchMonth.slice(0,4)), Number(searchMonth.slice(-2)),0).getDate();
            
            // 検索URL決定
            const searchUrl = `https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=${hotel_code}&arrivalDate=${searchMonth}-01&departureDate=${searchMonth}-02`;
            console.log(`collecting ${hotel_code} : ${searchMonth} rates...`);

            // ページを開く-価格表示まで待機-価格取得
            await page.goto(searchUrl);
            await page.waitForSelector("#flexibleDatesCalendar > div:nth-child(3) > div > div div[data-testid='flexDatesRoomRate'] > span", { hidden: true, timeout: 0 });
            const rates = await page.evaluate((hotel_id: string, lastDay: number, searchMonth: string, today: string) => {
                const rates:Rates[] = []
                const startDate = today.slice(0,7) === searchMonth ? Number(today.slice(-2)) : 1;
                for (let dayNum = startDate; dayNum < lastDay + 1; dayNum++) {
                    const searchDate = ( '00' + dayNum ).slice(-2);
                    let rate = null;
                    let exception = null;
                    if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)) {
                        const rateElement = document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)
                        rate = Number(rateElement!.innerHTML.replace("¥","").replace(",",""));
                    } else if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div > span[data-testid='rateNotAvailable']`)) {
                        exception = "Sold Out";
                    } else {
                        rate = 0
                        exception = "Invalid Date";
                    }
                    rates.push({hotel_id, cid:`${searchMonth}-${searchDate}`, rate, exception, capture_date: today})
                }
                return rates
            },hotel_id,lastDay,searchMonth,today);

            // DBに格納
            console.log(rates)
            await main(rates).catch(err => console.error('An error occurred while attempting to seed the database:', err));
        }
    }
    // 仮想ブラウザの終了
    await browser.close();
}

const addRates = async (client:any, rates: Rates[]) => {
    try {
      const insertedRates = await Promise.all(
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
        `,
        ),
      );
  
      console.log(`Captured ${insertedRates.length} rates`);
  
      return {
        rates: insertedRates,
      };
    } catch (error) {
      console.error('Error capturing rates:', error);
      throw error;
    }
}

const main = async (rates: Rates[]) => {
    const client = await db.connect();
    await addRates(client, rates);
    await client.end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    await run(puppeteer, chrome);
    res.send(`DONE!`);
}