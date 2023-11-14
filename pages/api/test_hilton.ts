import type { NextApiRequest, NextApiResponse } from 'next'
const { db } = require('@vercel/postgres');

type Prices = {
    hotel_id: string,
    cid: string,
    price: number,
    is_soldout: boolean,
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
    const hotel_id = "3041f199-0049-406b-b862-8422c48f7708";
    const hotels = ["TYOHITW"];
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
            console.log(`collecting ${hotel_code} : ${searchMonth} prices...`);

            // ページを開く-価格表示まで待機-価格取得
            await page.goto(searchUrl);
            await page.waitForSelector("#flexibleDatesCalendar > div:nth-child(3) > div > div div[data-testid='flexDatesRoomRate'] > span", { hidden: true, timeout: 0 });
            const prices = await page.evaluate((hotel_id: string, lastDay: number, searchMonth: string, today: string) => {
                const prices:Prices[] = []
                const startDate = today.slice(0,7) === searchMonth ? Number(today.slice(-2)) : 1;
                for (let dayNum = startDate; dayNum < lastDay + 1; dayNum++) {
                    const searchDate = ( '00' + dayNum ).slice(-2);
                    let price;
                    let is_soldout;
                    if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)) {
                        const priceElement = document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)
                        price = Number(priceElement!.innerHTML.replace("¥","").replace(",",""));
                        is_soldout = false;
                    } else if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div > span[data-testid='rateNotAvailable']`)) {
                        price = 0;
                        is_soldout = true;
                    } else {
                        price = 0
                        is_soldout = true;
                    }
                    prices.push({hotel_id, cid:`${searchMonth}-${searchDate}`, price, is_soldout, capture_date: today})
                }
                return prices
            },hotel_id,lastDay,searchMonth,today);

            // DBに格納
            console.log(prices)
            await main(prices).catch(err => console.error('An error occurred while attempting to seed the database:', err));
        }
    }
    // 仮想ブラウザの終了
    await browser.close();
}

const addPrices = async (client:any, prices: Prices[]) => {
    try {
      const insertedPrices = await Promise.all(
        prices.map(
          (price) => client.sql`
            INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
            VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
            ON CONFLICT ON CONSTRAINT unique_night DO UPDATE SET
                hotel_id = EXCLUDED.hotel_id,
                cid = EXCLUDED.cid,
                price = EXCLUDED.price,
                is_soldout = EXCLUDED.is_soldout,
                capture_date = EXCLUDED.capture_date;
        `,
        ),
      );
  
      console.log(`Captured ${insertedPrices.length} prices`);
  
      return {
        prices: insertedPrices,
      };
    } catch (error) {
      console.error('Error capturing prices:', error);
      throw error;
    }
}

const main = async (prices: Prices[]) => {
    const client = await db.connect();
    await addPrices(client, prices);
    await client.end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    await run(puppeteer, chrome);
    res.send(`DONE!`);
}