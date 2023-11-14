import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

const line = require('@line/bot-sdk');
const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}
const client = new line.Client(config);

const main = async () => {
    const messages = [{
        type: 'text',
        text: `
            【価格下落アラート】
            🏨ヒルトン東京
            📆2023-12-24(金)泊
            目標価格: ¥56,000
            最新価格: ¥49,800
            ⏬¥6,200🉐
        `
    }];

    try {
        const res = await client.pushMessage("U462d229787389a59c2e7bebc1f7cd6e6",messages);
        console.log(res);
    } catch (error: any) {
        console.log(`Error: ${error.statusMessage}`);
        console.log(error.originalError.response.data)
    }
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  main().catch((err) => console.error('An error occurred while sending LINE messages:',err,));
  res.status(200).json({ message: 'Hello from Next.js!' })
}
