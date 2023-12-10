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

const data = [
    { name: "2023/11/30", uv: 40000, pv: 20000, amt: 2400 },
    { name: "2023/12/02", uv: 30000, amt: 2210 },
    { name: "2023/12/04", uv: 20000, amt: 2290 },
    { name: "2023/12/06", uv: null,  amt: 2000 },
    { name: "2023/12/08", uv: "18900", amt: 2181 },
    { name: "2023/12/10", uv: 23900, amt: 2500 },
    { name: "2023/12/12", uv: 34900, pv: 20000, amt: 2100 },
];

export default function RateTransition({
    oldRates
}: {
    // watchitem: WatchitemForm;
    // hotels: HotelField[];
    oldRates: {capture_date: string, rate: number | null, exception: string | null}[];
}) {
    
    return (
        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
        <LineChart
            width={600}
            height={300}
            data={oldRates}
            margin={{
                top: 50,
                right: 30,
                left: 30,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="capture_date" />
            <YAxis unit="円"/>
            <Tooltip />
            {/* <Legend /> */}
            {/* <Line connectNulls type="monotone" dataKey="pv"/> */}
            <Line connectNulls dataKey="rate" stroke="#82ca9d" fill="#82ca9d" activeDot={{ r: 8 }}/>
        </LineChart>
        </ResponsiveContainer>
        </div>
    )
}