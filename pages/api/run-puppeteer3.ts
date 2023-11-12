import type { NextApiRequest, NextApiResponse } from 'next'

let chrome = {};
let puppeteer = {};
let options = {};
// const searchUrl = "https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=TOYSHDI&arrivalDate=2023-11-01&departureDate=2023-11-02";

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
    }
    // Local --------------------------------------------- //
  }

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage();
  await page.goto(URL);

  const title = await page.evaluate(() => {
    return  document.title;
  });

  await browser.close();

  console.log(title)
  return title;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { URL='https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=TOYSHDI&arrivalDate=2023-11-01&departureDate=2023-11-02' } = req.query;
  // const { URL='http://abehiroshi.la.coocan.jp/' } = req.query;
  const title = await run(puppeteer, chrome, URL as string);
  res.send(`${URL}'s title is ${title}`);
}