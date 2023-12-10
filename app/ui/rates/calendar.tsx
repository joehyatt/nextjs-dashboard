import React from "react";
import { getMonth } from "@/app/lib/utils"
import { BackwardIcon,ForwardIcon } from "@heroicons/react/24/outline";
import { fetchFilteredRates } from '@/app/lib/data';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { showAlertModal, AlertModalManager } from "../alert-modal-manager";
import clsx from 'clsx';

export default async function Calendar({
    hotel_id,
    cim,
  }: {
    hotel_id: string;
    cim: string;
  }) {

    const monthText = cim.split("-")[0]+"年"+cim.split("-")[1]+"月";
    const month1Digit = Number(cim.split("-")[1]);
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
            <div className="flex flex-col flex-1">
                {/* <Sidebar /> */}
                <div className="flex flex-row justify-between items-center mb-4 font-bold">
                  <div className="flex flex-row items-center w-20">
                    <BackwardIcon className="w-1/2"/>
                    <span className="w-1/2 text-center">前月</span>
                  </div>
                  <div className="text-xl md:text-2xl">{monthText}</div>
                  <div className="flex flex-row items-center w-20">
                    <span className="w-1/2 text-center">次月</span>
                    <ForwardIcon className="w-1/2"/>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mb-2 font-bold">
                  <p>日</p>
                  <p>月</p>
                  <p>火</p>
                  <p>水</p>
                  <p>木</p>
                  <p>金</p>
                  <p>土</p>
                </div>
                <Month month={currentMonth} month1Digit={month1Digit}/>
            </div>
        </div>
    )
}

export const Month = (props: any) => {
    const { month, month1Digit } = props;
    return (
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {month.map((row:any, i:number) => (
          <React.Fragment key={i}>
            {row.map((day:any, idx:number) => (
              <Day day={day} key={idx} rowIdx={i} month1Digit={month1Digit} />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
};

export const Day = (props:any) => {
    const { day, rowIdx, month1Digit } = props;

    return (
      <div className={clsx("border border-gray-200 flex flex-col",{
        'bg-gray-100 text-gray-400': day.$M+1 !== month1Digit,
      })}>
        <header className="flex flex-col items-center">
          {/* 1行目に曜日を表示 */}
          {/* {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>} */}
          <p className={"text-sm p-1 my-1 text-center"}>{day.format("DD")}</p>
        </header>
        <p className={"text-xs md:text-sm p-1 my-3 align-middle text-center"} >{day.$R}</p>
        
      </div>
    );
};