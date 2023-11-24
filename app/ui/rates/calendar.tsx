import React from "react";
import { getMonth } from "@/app/lib/utils"
import { fetchFilteredRates } from '@/app/lib/data';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default async function Calendar({
    hotel_id,
    cim,
  }: {
    hotel_id: string;
    cim: string;
  }) {
    const currentMonth = getMonth(Number(cim.split("-")[0]),Number(cim.split("-")[1])-1);
    const rates = await fetchFilteredRates(hotel_id,cim);
    currentMonth.map((row)=>{
        return row.map((day:any) => {
            const rateByDate = rates.find(rate => Number(rate.cid.split("-")[0]) === day.$y && Number(rate.cid.split("-")[1]) === (day.$M + 1) && Number(rate.cid.split("-")[2]) === day.$D)
            if (rateByDate) {
                if (rateByDate.rate) {
                    day['$R']= rateByDate.rate
                } else {
                    day['$R']= rateByDate.exception
                }
            } else {
                day['$R']= "--"
            }
        })
    })
    return (
        <div className="h-screen flex flex-col">
            {/* <CalendarHeader /> */}
            <div className="flex flex-1">
                {/* <Sidebar /> */}
                <Month month={currentMonth} />
            </div>
        </div>
    )
}

export const Month = (props: any) => {
    const { month } = props;
    return (
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row:any, i:number) => (
          <React.Fragment key={i}>
            {row.map((day:any, idx:number) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
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
        </header>
        <p className={"text-xs md:text-sm p-1 my-3 align-middle text-center"}>{day.$R}</p>
        
      </div>
    );
};