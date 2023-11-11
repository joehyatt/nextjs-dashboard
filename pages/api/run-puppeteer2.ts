import type { NextApiRequest, NextApiResponse } from 'next'


let chrome = {};
let puppeteer = {};

//puppeteer main process
const run = async (puppeteer: any, chrome:any={}, URL: string) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto(URL);
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      title: document.title,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  await browser.close();

  return dimensions;
}

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
  //Vercel
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
}else{
  //Local Test
  puppeteer = require('puppeteer');

  const URL = `https://www.yahoo.com/`;
  run(puppeteer,{},URL).then(res => console.log(res));
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
  ) {
  const { URL='https://www.yahoo.com/' } = req.query;
  const dimensions = await run(puppeteer, chrome, URL as string);
  res.send(`${URL}'s title is'${dimensions.title}!`);
}