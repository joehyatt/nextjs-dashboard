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

export default function RateTransition({
    oldRates
}: {
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