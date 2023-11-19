import type { NextApiRequest, NextApiResponse } from 'next'
import { withTimeout } from '@/app/lib/utils'

const { db } = require('@vercel/postgres');
const line = require('@line/bot-sdk');

type Breakthrough = {
    line_id: string
    hotel_name_jp: string
    cid: string
    basis: number
    rate: number
}

async function getBreakthrough(client:any) {
    try {
        const breakthroughList = await Promise.resolve(
            client.sql`
                SELECT line_id, hotel_name_jp, cid, basis, rate
                FROM 
                    (SELECT user_id, watchinglist.hotel_id, watchinglist.cid, basis, rate
                    FROM
                        (SELECT user_id, hotel_id, cid, basis FROM watchlist WHERE status = 'watching' ) AS watchinglist
                    INNER JOIN
                        (SELECT hotel_id, cid, rate FROM rates WHERE capture_date = (SELECT MAX(capture_date) FROM rates) ) AS latestrates
                    ON watchinglist.hotel_id = latestrates.hotel_id AND watchinglist.cid = latestrates.cid
                    WHERE basis > rate + 500) AS breakthroughlist 
                INNER JOIN users
                    ON breakthroughlist.user_id = users.id
                INNER JOIN hotels
                    ON breakthroughlist.hotel_id = hotels.id;
            `
        )
        console.log(`Found ${breakthroughList.rows.length} breakthroughs`);
  
      return breakthroughList.rows;
    } catch (error) {
      console.error('Error checking breakthroughs:', error);
      throw error;
    }
}

// LINEメッセージ送信
const lineMessaging = async (breakthroughList: Breakthrough[]) => {

    const config = {
        channelSecret: process.env.CHANNEL_SECRET,
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    }
    const client = new line.Client(config);

    let messageCount = 0;

    const sendMessage = await Promise.resolve(
        breakthroughList.map( async (bt) => {

        const messageText = `【価格下落アラート】
🏨${bt.hotel_name_jp}
🗓${bt.cid}泊
基準価格: ¥${bt.basis.toLocaleString()}
最新価格: ¥${bt.rate.toLocaleString()}
⏬¥${(bt.basis - bt.rate).toLocaleString()}🉐`

        const messages = [{type: 'text', text: messageText}];

        console.log(bt.line_id)
        console.log(messages)
        
        try {
            const test = await client.pushMessage(bt.line_id,messages,true);
            console.log(test)
            messageCount++;
        } catch (error: any) {
            console.log(`LINE-MessagingError: ${error.statusMessage}`);
            console.log(error.originalError.response.data)
        }

    }))
    console.log(`Sent ${sendMessage.length} messages`);
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const client = await db.connect();
    const breakthroughList = await getBreakthrough(client);
    await client.end();
    await lineMessaging(breakthroughList);
    console.log('DONE');
    res.send(`DONE!`);
}