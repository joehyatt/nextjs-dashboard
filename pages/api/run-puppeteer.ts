import type { NextApiRequest, NextApiResponse } from 'next'

const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
  ) {
  const { URL = 'https://twitter.com/n0bisuke' } = req.query;
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto(URL); //URLにアクセス
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      title: document.title,
    };
  });

  console.log('Dimensions:', dimensions); 

  await browser.close();

  //アクセスしたページのタイトルを取得
  res.send(`${URL}のページタイトルは「${dimensions.title}」だよー!`);
}