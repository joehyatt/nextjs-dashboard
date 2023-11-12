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
    }
    // Local --------------------------------------------- //
  }

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitForSelector("#__next > div > main > div > div > div.notification_notificationWrapper__Kdf8t.mb-4.px-4.py-3.text-left.text-base.font-semibold.sm\\:text-lg.enableMargin.notification_tags__cFBxY > div > div");

//   const dimensions = await page.evaluate(() => {
//     return {
//       title: document.title,
//       deviceScaleFactor: window.devicePixelRatio
//     };
//   });
  const text = await page.evaluate(() => {
    const month = document.querySelector("#__next > div > main > div > div > div.notification_notificationWrapper__Kdf8t.mb-4.px-4.py-3.text-left.text-base.font-semibold.sm\\:text-lg.enableMargin.notification_tags__cFBxY > div > div");
    return month?.textContent;
    // return document.title;
  });

  await browser.close();
  
  console.log(text)
  return text;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  // const { URL='https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=TOYSHDI&arrivalDate=2023-11-01&departureDate=2023-11-02' } = req.query;
//   const { URL=searchUrl } = req.query;
  const text = await run(puppeteer, chrome, searchUrl);
  res.send(`Month's title is ${text}!`);
}