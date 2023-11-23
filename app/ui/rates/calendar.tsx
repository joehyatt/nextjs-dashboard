import React from "react";
import { getMonth } from "@/app/lib/utils"
import { fetchFilteredRates } from '@/app/lib/data';

export default async function Calendar({
    hotel_id,
    cim,
  }: {
    hotel_id: string;
    cim: string;
  }) {
    const currentMonth = getMonth();
    const rates = await fetchFilteredRates(hotel_id,cim);
    // currentMonth.map((row, i)=>{
    //     return row.map((day,idx) => {
    //         day['$R']= rates.find(rate => Number(rate.cid.substr(0,4)) === day.$y && Number(rate.cid.substr(8,2)) === day.$D)?.rate;
    //     })
    // })
    return (
        <div className="h-screen flex flex-col">
            {/* <CalendarHeader /> */}
            <div className="flex flex-1">
                {/* <Sidebar /> */}
                {/* <Month month={currentMonth} /> */}
            </div>
        </div>
    )
}

export const Month = (props: any) => {
    const { month } = props;
    return (
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {/* {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))} */}
      </div>
    );
};

export const Day = (props:any) => {
    const { day, rowIdx } = props;
    return (
      <div className="border border-gray-200 flex flex-col">
        <header className="flex flex-col items-center">
          {/* 1行目に曜日を表示 */}
          {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>}
          <p className={"text-sm p-1 my-1 text-center"}>{day.format("DD")}</p>
          <p className={"text-sm p-1 my-1 text-center"}>{day.$R}</p>
        </header>
      </div>
    );
};