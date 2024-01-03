'use client'

import React from "react";
import { useState, useEffect } from 'react'
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
      <>
        <div className="h-[50vh] md:h-[75vh] flex flex-col">
            {/* <CalendarHeader /> */}
            <div className="flex flex-col flex-1">
                {/* <Sidebar /> */}
                <Month month={currentMonth} month1Digit={month1Digit}/>
            </div>
        </div>
        <div className="h-[40vh] md:h-[15vh]" />
      </>
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
    const [ isLoading, setIsLoading ] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams!);

    const handleOldRatesSearch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
      setIsLoading(true);

      const today = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

      if (term < today) return;
      if (Number(term.split("-")[1]) !== month1Digit) return;

      if (term) {
        params.set('cid', term);
      } else {
        params.delete('cid');
      }
      replace(`${pathname}?${params.toString()}#transition`);
    }, 100);

    useEffect(() => {
      setIsLoading(false);
    }, [pathname, searchParams])

    return (
      <>
      {isLoading && 
        <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-50" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-[#F66C16] rounded-full border-t-transparent"></div>
        </div>
      }
      <div 
        onClick={() => handleOldRatesSearch(day.format("YYYY-MM-DD"))}
        className={clsx("border border-gray-200 flex flex-col",{
        'bg-gray-100 text-gray-400': day.$M+1 !== month1Digit,
        'hover:bg-blue-100 cursor-pointer': day.$M+1 === month1Digit,
        'bg-[#F66C16] text-[#fff]': day.$M+1 === month1Digit && day.$D === Number(params.get('cid')?.split("-")[2]),
        })}
      >
        <header className="flex flex-col items-center">
          <p className={"text-sm p-0 my-[2px] text-center"}>{day.format("D")}</p>
        </header>
        <p className={"text-[10px] md:text-sm mt-2 align-middle text-center"} >{day.$R}</p>
        
      </div>
      </>
    );
};