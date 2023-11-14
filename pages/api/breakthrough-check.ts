const { db } = require('@vercel/postgres');
const line = require('@line/bot-sdk');
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

type Breakthrough = {
    line_id: string
    hotel_name_jp: string
    cid: string
    threshold: number
    price: number
}

const now = new Date();
const today = now.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

async function getBreakthrough(client:any) {
    try {
        const breakthroughList = await Promise.resolve(
            client.sql`
                SELECT line_id, hotel_name_jp, cid, threshold, price
                FROM 
                    (SELECT user_id, watchinglist.hotel_id, watchinglist.cid, threshold, price
                    FROM
                        (SELECT user_id, hotel_id, cid, threshold FROM watchlist WHERE status = 'watching' ) AS watchinglist
                    INNER JOIN
                        (SELECT hotel_id, cid, price FROM prices WHERE capture_date = '2023-11-14' ) AS latestprices
                    ON watchinglist.hotel_id = latestprices.hotel_id AND watchinglist.cid = latestprices.cid
                    WHERE threshold > price + 500) AS breakthroughlist 
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

    const sendMessage = await Promise.resolve(breakthroughList.map( async (bt) => {

        const messageText = `【価格下落アラート】
🏨${bt.hotel_name_jp}
🗓${bt.cid}泊
目標価格: ¥${bt.threshold.toLocaleString()}
最新価格: ¥${bt.price.toLocaleString()}
⏬¥${(bt.threshold - bt.price).toLocaleString()}🉐`
        const messages = [{
            type: 'text',
            text: messageText
        }];
    
        try {
            await client.pushMessage(bt.line_id,messages,true);
            messageCount++;
        } catch (error: any) {
            console.log(`LINE-MessagingError: ${error.statusMessage}`);
            console.log(error.originalError.response.data)
        }

    }))
    console.log(`Sent ${sendMessage.length} messages`);
}

async function main() {
    const client = await db.connect();
    const breakthroughList = await getBreakthrough(client);
    await lineMessaging(breakthroughList);
    await client.end();
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    main().catch((err) => console.error('An error occurred while attempting to seed the database:',err,));
    res.status(200).json({ message: 'get breakthrough watchlist' })
}