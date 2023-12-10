import type { NextApiRequest, NextApiResponse } from 'next'
import { withTimeout } from '@/app/lib/utils'
import { fetchGroupHotels } from '@/app/lib/data'
import * as fs from "node:fs";
import path from 'path';
import { parse } from 'node-html-parser';

const { db } = require('@vercel/postgres');

type Rate = {
    hotel_id: string,
    cid: string,
    rate: number | null,
    exception: string | null,
    capture_date: string
}
type Log = {
    hotel_id: string | null,
    group_code: 'ihg' | 'accor' | 'hilton' | 'marriott' | 'hyatt',
    country_code: 'JP' | 'TW' | 'MY'
    cid: string | null,
    capture_month: string | null,
    captured_hotels: number | null,
    result: 'success' | 'capturing_failure' | 'saving_failure',
    capture_timestamp: string,
    save_timestamp: string | null,
}

const group_code = "hyatt";
const country_code = "JP";

let captureLog: Log = {
    hotel_id: null,
    group_code,
    country_code,
    cid: null,
    capture_month: null,
    captured_hotels: null,
    result: 'success',
    capture_timestamp: "",
    save_timestamp: null,
};
const capturedRates:Rate[] = [];

const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
const capture_date_count = 82;
const dateOffset = 0;

const captureRates = async (client:any) => {

    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels(group_code);
    
    
    // 検索日の設定
    for (let dateNum = 0; dateNum < capture_date_count; dateNum++) {
        let capturedRatesByDate: Rate[] = [];
        const cid = new Date(new Date().setDate(new Date().getDate() + dateOffset + dateNum)).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

        // 検索URL決定
        const searchFilename = `hyatt_${cid}.html`;
        console.log(`Start capturing ${cid} rates...`);

        try{
            const rateByHotels: Rate[] = [];
            
            const file = path.join(process.cwd(), 'html', searchFilename);
            const data = fs.readFileSync(file, 'utf8');
            const root = parse(data)

            const hotel_node_list = Array.from(root.querySelectorAll("*[data-js='hotel-card']"));
            
            for (let h = 0; h < hotel_node_list.length; h++) {
                let rate = null;
                let exception = null;
                const hotel_code = hotel_node_list[h].getAttribute("data-spirit-code")!;
                if (hotel_node_list[h].getAttribute("data-booking-status") === "BOOKABLE") {
                    rate = Number(hotel_node_list[h].getAttribute("data-rate"));
                } else if (hotel_node_list[h].getAttribute("data-booking-status") === "SOLD_OUT") {
                    exception = "Sold Out"
                } else if (hotel_node_list[h].getAttribute("data-booking-status") === "NOT_BOOKABLE") {
                    exception = "--"
                } else {
                    // throw new Error("Invalid Rate");
                    exception = "other"
                }
                if (hotels!.find(hotel => hotel.hotel_code === hotel_code)) {
                    const hotel_id = hotels!.find(hotel => hotel.hotel_code === hotel_code)!.id
                    rateByHotels.push({hotel_id,cid,rate,exception,capture_date});
                }
            }

            // capturedRatesに日毎のRatesを格納
            capturedRatesByDate.push(...rateByHotels);
            capturedRates.push(...rateByHotels);
                
            // log
            const soldOutCount = capturedRatesByDate.filter(rate=>rate.exception === "Sold Out").length
            console.log("Capture Success!")
            console.log(`Captured ${capturedRatesByDate.length} Hotels (SoldOut: ${soldOutCount})`);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLog = {group_code, country_code, hotel_id: null, capture_month: null, cid, result: 'success', captured_hotels: capturedRatesByDate.length, capture_timestamp, save_timestamp: null };
            
            // save
            await saveRates(client,capturedRatesByDate);
            await saveLog(client,captureLog);

            // fila削除
            fs.unlink(file, (err) => {
                if (err) throw err;
                console.log(`${searchFilename} was deleted`);
            });

        } catch (e) {
            // log
            console.log("Capture Failed: " + e);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLog = {group_code, country_code, hotel_id: null, capture_month: null, cid, result: 'capturing_failure', captured_hotels: null, capture_timestamp, save_timestamp: null };
            // save
            await saveLog(client,captureLog);
        }
    }
    
}

const saveRates = async (client:any, rates: Rate[]) => {
    const save_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
    console.log(`Saving ${rates.length} rates...`);
    try {
        const insertedRates = await withTimeout(Promise.all(
            rates.map(
                (rate) => client.sql`
                INSERT INTO rates (hotel_id, cid, rate, exception, capture_date)
                VALUES (${rate.hotel_id}, ${rate.cid}, ${rate.rate}, ${rate.exception}, ${rate.capture_date})
                ON CONFLICT ON CONSTRAINT capture_unit DO UPDATE SET
                    hotel_id = EXCLUDED.hotel_id,
                    cid = EXCLUDED.cid,
                    rate = EXCLUDED.rate,
                    exception = EXCLUDED.exception,
                    capture_date = EXCLUDED.capture_date;
                `
            ),
        ), 60000);
        // log
        console.log(`Saved ${insertedRates.length} rates successfully!`);
        captureLog.save_timestamp = save_timestamp;
    } catch (error) {
        // log
        console.error('Error during saving rates:', error);
        captureLog.result = 'saving_failure';
    }
}

const saveLog = async (client: any, log: Log) => {
    console.log(`Saving log...`);
    try {
        await withTimeout(Promise.resolve(
            client.sql`
                INSERT INTO logs (group_code, country_code, cid, captured_hotels, hotel_id, capture_month, result, capture_timestamp, save_timestamp)
                VALUES (${log.group_code}, ${log.country_code}, ${log.cid}, ${log.captured_hotels}, ${log.hotel_id}, ${log.capture_month}, ${log.result}, ${log.capture_timestamp}, ${log.save_timestamp})
                ON CONFLICT DO NOTHING;
                `,
        ), 30000);
        // log
        console.log(`Saved log successfully!`);
    } catch (error) {
        // log
        console.error('Error during saving log:', error);
    }
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<string>
) { 
    try {
        const client = await Promise.race([
            db.connect(),
            new Promise((_, reject) => setTimeout(() => reject("DB connect timeout!"), 10000))
        ])
        await captureRates(client);
        await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error:', error);
        res.send("Error");
    }
}
