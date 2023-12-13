'use client'

import React from "react";
import { getMonth } from "@/app/lib/utils"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import clsx from 'clsx';
import { RatesTable } from "@/app/lib/definitions";

export default function Calendar({
    hotel_id,
    cim,
    rates,
  }: {
    hotel_id: string;
    cim: string;
    rates: RatesTable[]
  }) {
    
    const month1Digit = Number(cim.split("-")[1]);
    const currentMonth = getMonth(Number(cim.split("-")[0]),Number(cim.split("-")[1])-1);
    // const rates = await fetchFilteredRates(hotel_id,cim);
    
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

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleOldRatesSearch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
      const params = new URLSearchParams(searchParams!);
      if (term) {
        params.set('cid', term);
      } else {
        params.delete('cid');
      }
      replace(`${pathname}?${params.toString()}#transition`);
    }, 100);

    return (
      <div 
        onClick={() => handleOldRatesSearch(day.format("YYYY-MM-DD"))}
        className={clsx("border border-gray-200 flex flex-col",{
        'bg-gray-100 text-gray-400': day.$M+1 !== month1Digit,
        'hover:bg-blue-100 cursor-pointer': day.$M+1 === month1Digit,
        })}
      >
        <header className="flex flex-col items-center">
          <p className={"text-sm p-1 my-1 text-center"}>{day.format("DD")}</p>
        </header>
        <p className={"text-xs md:text-sm p-1 my-3 align-middle text-center"} >{day.$R}</p>
        
      </div>
    );
};