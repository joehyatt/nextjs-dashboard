import type { NextApiRequest, NextApiResponse } from 'next'

const { db } = require('@vercel/postgres');
const line = require('@line/bot-sdk');
const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}
const client = new line.Client(config);
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    console.log(JSON.stringify(req.body));
    console.log('======================');

    // アカウント連携開始処理
    if (req.body.events && req.body.events[0].type === "message" && req.body.events[0].message.text === "アカウント連携") {
        const userId = req.body.events[0].source.userId;

        const getLinkToken = await fetch(`https://api.line.me/v2/bot/user/${userId}/linkToken`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
            }
        });
        
        const {linkToken} = await getLinkToken.json();

        const sendLink = await client.replyMessage(req.body.events[0].replyToken,{
            "type":"flex",
            "altText":"link",
            "contents":
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "uri",
                      "label": "Puffinログイン画面へ",
                      "uri": `https://nextjs-dashboard-202311.vercel.app/login?linkToken=${linkToken}`
                    }
                  }
                ]
              }
            }
        });

    }

    // アカウント連携完了処理
    if (req.body.events && req.body.events[0].type === "accountLink") {
        console.log("accountLink webhook");
        const {result, nonce} = req.body.events[0].link;
        
        const dbClient = await db.connect();

        if (result === "ok") {
            const userId = req.body.events[0].source.userId;
            await dbClient.sql`UPDATE users SET line_id = ${userId} ,link_token = null , nonce = null WHERE nonce = ${nonce}`
            console.log("LINEとPuffinの連携が完了しました！");
        } else {
            await dbClient.sql`UPDATE users SET link_token = null , nonce = null WHERE nonce = ${nonce}`
            console.log("LINEとPuffinの連携に失敗しました");
        }

        await dbClient.end();
    }

    // アカウント連携解除処理
    if (req.body.events && req.body.events[0].type === "message" && req.body.events[0].message.text === "連携解除") {
      console.log("cancel line connect");
    }
    
    res.status(200).json('receive line message!');
}