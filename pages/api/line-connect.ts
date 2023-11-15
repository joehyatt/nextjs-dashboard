import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

export default async function handlerhandler(
      req: NextApiRequest,
      res: NextApiResponse<ResponseData>
    ) {
    
    const getLinkToken = await fetch(`https://api.line.me/v2/bot/user/U462d229787389a59c2e7bebc1f7cd6e6/linkToken`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
        }
    });

    const redirectToConnectUrl = async (linkToken: string) => {
        const test = await fetch(`https://api.line.me/v2/bot/user/U462d229787389a59c2e7bebc1f7cd6e6/linkToken`, {
            method: 'POST',
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
            },
            body: `{
                "to": "U462d229787389a59c2e7bebc1f7cd6e6",
                "messages": [{
                    "type": "template",
                    "altText": "Account Link",
                    "template": {
                        "type": "buttons",
                        "text": "Account Link",
                        "actions": [{
                            "type": "uri",
                            "label": "Account Link",
                            "uri": "https://nextjs-dashboard-202311.vercel.app/dashboard?linkToken=${linkToken}"
                        }]
                    }
                }]
            }`
        });
        return test
    }

    const linkToken = await getLinkToken.json();
    console.log(linkToken.linkToken)
    const redirect = await redirectToConnectUrl(linkToken.linkToken);
    res.status(200).json({message: "sent login link"});
}