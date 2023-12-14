'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default function Transition({
    oldRates,hotel_name_jp,cid
}: {
    oldRates: {capture_date: string, rate: number | null, exception: string | null}[];
    hotel_name_jp: string;
    cid: string;
}) {
    
    return (
        <div id="transition" className="mt-16 mb-32 text-lg md:mb-36" style={{ width: '100%', height: 300 }}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                🏨&nbsp;{hotel_name_jp}
                <br/>
                🗓&nbsp;{formatDateToLocal(cid)}泊
            </div>
            <h2 className="mt-4">💹&nbsp;過去の価格推移</h2>
            <ResponsiveContainer>
                <LineChart
                    width={600}
                    height={300}
                    data={oldRates}
                    margin={{
                        top: 30,
                        right: 10,
                        left: 10,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="capture_date" fontSize={14}/>
                    <YAxis unit="円" fontSize={14}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line connectNulls dataKey="rate" stroke="#2E6FEB" fill="#2E6FEB" activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}