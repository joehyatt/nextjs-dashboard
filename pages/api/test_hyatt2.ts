import type { NextApiRequest, NextApiResponse } from 'next'
// import { fetchCaptureHotels } from '@/app/lib/data'
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
    cid: string | null,
    capture_month: string | null,
    captured_hotels: number | null,
    result: 'success' | 'capturing_failure' | 'saving_failure',
    capture_timestamp: string,
    save_timestamp: string | null,
}

const capturedRates:Rate[] = [];
const captureLogs:Log[] = [];
// const captureScriptId = "marriott001";

const captureRates = async () => {

    // 取得対象日数設定
    const captureScriptNumber = 1;
    const capture_date_count = 10;
    const dateOffset = 2;
    // const dateOffset = capture_date_count * (captureScriptNumber-1);
    
    // hotel_id, hotel_codeの対応表をDBからfetch
    const hotels = await fetchGroupHotels('hyatt');
    
    const capture_date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

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
            const openingSoonCount = capturedRatesByDate.filter(rate=>rate.exception === "Opening Soon").length
            console.log("Capture Success!")
            console.log(`Captured ${capturedRatesByDate.length} Hotels (SoldOut: ${soldOutCount}, OpeningSoon: ${openingSoonCount})`);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLogs.push({hotel_id: null, capture_month: null, cid, result: 'success', captured_hotels: capturedRatesByDate.length, capture_timestamp, save_timestamp: null })

        } catch (e) {
            // log
            console.log("Capture Failed: " + e);
            const capture_timestamp = new Date().toISOString().replace("T"," ").slice(0,-5);
            captureLogs.push({hotel_id: null, capture_month: null, cid, result: 'capturing_failure', captured_hotels: 0, capture_timestamp, save_timestamp: null })
        }
    }

    console.log(capturedRates.length)
    console.log(captureLogs)
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
        ), 300000);
        // log
        console.log(`Saved ${insertedRates.length} rates successfully!`);
        captureLogs.map(log=> log.save_timestamp = save_timestamp);
    } catch (error) {
        // log
        console.error('Error during saving rates:', error);
        captureLogs.map(log=>log.result = 'saving_failure');
    }
}

const saveLogs = async (client: any, logs: Log[]) => {
    console.log(`Saving ${logs.length} logs...`);
    try {
        const insertedLogs = await withTimeout(Promise.all(
            logs.map(
                (log) => client.sql`
                INSERT INTO logs (hotel_id, capture_month, result, capture_timestamp, save_timestamp)
                VALUES (${log.hotel_id}, ${log.capture_month}, ${log.result}, ${log.capture_timestamp}, ${log.save_timestamp})
                ON CONFLICT DO NOTHING;
                `
            ),
        ), 30000);
        // log
        console.log(`Saved ${insertedLogs.length} logs successfully!`);
    } catch (error) {
        // log
        console.error('Error during saving logs:', error);
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
        await captureRates();
        await saveRates(client,capturedRates);
        await saveLogs(client,captureLogs);
        await client.end();
        console.log("DONE successfully!");
        res.send("DONE successfully!");
    } catch (error) {
        console.error('Error during connecting db:', error);
        res.send("DB Connection Error!");
    }
}
