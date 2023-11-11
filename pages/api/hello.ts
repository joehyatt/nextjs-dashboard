import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-core'
 
type ResponseData = {
  message: string
}
type Json = {
    message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}