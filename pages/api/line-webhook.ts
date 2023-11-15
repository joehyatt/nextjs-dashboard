import type { NextApiRequest, NextApiResponse } from 'next'
 
type Event = {
    linkToken: string
}
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

    if (req.body.events && req.body.events[0].message.text === "アカウント連携") {
        const userId = req.body.events[0].source.userId

        await fetch(`https://api.line.me/v2/bot/user/${userId}/linkToken`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
            }
        }).then((event:any) => {
            const linkToken = event.linkToken;
            console.log(linkToken);
            console.log(req.body.events[0].replyToken);
            return client.replyMessage(req.body.events[0].replyToken,{
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
                          "label": "自社HPログイン画面へ",
                          "uri": `https://nextjs-dashboard-202311.vercel.app/login?linkToken=${linkToken}`
                        }
                      }
                    ]
                  }
                }
            });
        }).catch(e=>console.log(e))
    }
    
    res.status(200).json('receive line message!');
}

// // response sample
// {
//     "destination":"U9b278bf58a16d087e773eddd723e798e",
//     "events":[
//         {
//             "type":"message",
//             "message":{
//                 "type":"text",
//                 "id":"481864921253412952",
//                 "quoteToken":"npF3l6VtAFkfyH6dYNWDttMtwhzjT6AjAHbyHMeNApdol720UoW_ODOT-Klrr_-tliKIBHdlhn_l-WI1CNT95ssbzjmR7ap9lp-NktBfpoJcPaYYPZ_yA9Dz63luRJm8Z7muVA9CqgC0BxwhdfttDw",
//                 "text":"テスト"
//             },
//             "webhookEventId":"01HF99DHXYJTG8ZGQJQBMYB3WD",
//             "deliveryContext":{
//                 "isRedelivery":false
//             },
//             "timestamp":1700045178803,
//             "source":{
//                 "type":"user",
//                 "userId":"U462d229787389a59c2e7bebc1f7cd6e6"
//             },
//             "replyToken":"79cb7c90c8d14b048110d8ef75e25a8e",
//             "mode":"active"
//         }
//     ]
// }