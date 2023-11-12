import type { NextApiRequest, NextApiResponse } from 'next'

type Prices = {
    hotelId: string,
    date: string,
    price: string
}

let chrome = {};
let puppeteer = {};
let options = {};
// const searchUrl = "https://www.marriott.com/reservation/availabilitySearch.mi?isRateCalendar=true&propertyCode=OSAAL&isSearch=true&currency=&fromToDate_submit=12/07/2023&fromDate=12/06/2023&toDate=12/07/2023&toDateDefaultFormat=12/07/2023";
// const searchUrl = "https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=TOYSHDI&arrivalDate=2023-11-01&departureDate=2023-11-02";

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

    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();

    const hotels = ["TYOHITW","HIJSHHI"];
    const monthCount = 2;
    // const baseUrl = "https://www.hilton.com/en/book/reservation/flexibledates/?";

    for (let hotelNum = 0; hotelNum < hotels.length; hotelNum++) {
        const hotelId = hotels[hotelNum];
        for (let monthNum = 0; monthNum < monthCount; monthNum++) {
            let currentMonth = new Date();
            const searchMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + monthNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit"}).replace('/', '-');
            const searchUrl = `https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=${hotelId}&arrivalDate=${searchMonth}-01&departureDate=${searchMonth}-02`;
            
            console.log(`collecting ${hotelId} : ${searchMonth} prices...`);

            await page.goto(searchUrl);
            const getNumOfDaysInMonth = function(year: number, month:number) {  
                return new Date(year, month, 0).getDate();
            };
            const lastDay = getNumOfDaysInMonth(Number(searchMonth.slice(0,4)), Number(searchMonth.slice(-2)))
            await page.waitForSelector("#flexibleDatesCalendar > div:nth-child(3) > div > div div[data-testid='flexDatesRoomRate'] > span", { hidden: true, timeout: 0 });
            const priceList = await page.evaluate((hotelId: string, lastDay: number, searchMonth: string) => {
                const priceList:Prices[] = []
                for (let dayNum = 0; dayNum < lastDay; dayNum++) {
                    const searchDate = ( '00' + (dayNum + 1) ).slice(-2);
                    let price;
                    if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)) {
                        price = document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div[data-testid='flexDatesRoomRate`)?.innerText;
                    } else if (document.querySelector(`button[data-testid='arrival-${searchMonth}-${searchDate}'] > div:nth-child(3) > div > span[data-testid='rateNotAvailable']`)) {
                        price = "sold out"
                    } else {
                        price = "unavailable date"
                    }
                    priceList.push({hotelId, date:`${searchMonth}-${searchDate}`, price})
                }
                return priceList
            },hotelId,lastDay,searchMonth);
            console.log(priceList)
        }
    }

    await browser.close();
  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await run(puppeteer, chrome);
  res.send(`DONE!`);
}