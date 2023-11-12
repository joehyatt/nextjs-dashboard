import type { NextApiRequest, NextApiResponse } from 'next'

let chrome = {};
let puppeteer = {};

//puppeteer main process
const run = async (puppeteer: any, chrome:any={}, URL: string) => {

  console.log("run start")
  const browser = await puppeteer.launch({
    args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
    executablePath: await chrome.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
    ),
    headless: chrome.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  console.log("after newPage set")
  await page.goto(URL);
  console.log("after goto url")
  
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      title: document.title,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  await browser.close();
  console.log(dimensions.title)

  return dimensions;
}

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
  //Vercel
  console.log("production start")
  chrome = require('@sparticuz/chromium-min');
  puppeteer = require('puppeteer-core');
}else{
  //Local Test
  console.log("local start")
  puppeteer = require('puppeteer');
  const URL = `http://abehiroshi.la.coocan.jp/`;
  run(puppeteer,{},URL).then(res => console.log(res));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { URL='http://abehiroshi.la.coocan.jp/' } = req.query;
  const dimensions = await run(puppeteer, chrome, URL as string);
  res.send(`${URL}'s title is'${dimensions.title.toString('UTF-8')}!`);
}