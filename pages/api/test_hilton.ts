import type { NextApiRequest, NextApiResponse } from 'next'

let chrome = {};
let puppeteer = {};
let options = {};
const searchUrl = "https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=TOYSHDI&arrivalDate=2023-11-01&departureDate=2023-11-02";

const run = async (puppeteer: any, chrome:any={}, URL: string) => {

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
    //   headless: chrome.headless,
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
    //   headless: chrome.headless,
      headless: false,
      slowMo: 100,
    }
    // Local --------------------------------------------- //
  }

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage();
  await page.goto(URL);
//   await new Promise(resolve => setTimeout(resolve, 1000))
  await page.waitForSelector("#flexibleDatesCalendar > div:nth-child(3) > div > div div[data-testid='flexDatesRoomRate'] > span", { hidden: true, timeout: 0 });

//   const dimensions = await page.evaluate(() => {
//     return {
//       title: document.title,
//       deviceScaleFactor: window.devicePixelRatio
//     };
//   });

  const text = await page.evaluate(() => {
    const month = document.querySelector("#flexibleDatesCalendar > div:nth-child(3) > div > div.lg\\:border-border.mb-4.lg\\:border-l.lg\\:border-t > div:nth-child(3) > div:nth-child(5) > div > button > div.overflow-hidden.lg\\:flex.lg\\:flex-1.lg\\:flex-col.lg\\:items-center.lg\\:justify-center > div.font-body.group-hover\\:text-text-inverse.text-center.text-xs.lg\\:text-2xl.lg\\:font-bold.\\[word-break\\:break-word\\].text-primary");
    return month?.textContent;
  });

  await browser.close();
  
  console.log(text)
  return text;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const text = await run(puppeteer, chrome, searchUrl);
  res.send(`Month's title is ${text}!`);
}