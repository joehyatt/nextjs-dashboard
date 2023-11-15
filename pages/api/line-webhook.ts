import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    console.log(JSON.stringify(req.body));
    console.log('======================');
    res.send('res');
    res.status(200).json('receive line message!')
}
