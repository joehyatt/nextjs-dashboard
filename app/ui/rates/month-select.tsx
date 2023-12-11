'use client';
import { BackwardIcon,ForwardIcon,ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ months, cim }: { months: {cim:string}[], cim: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('cim', term);
    } else {
      params.delete('cim');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);


  const monthText = cim && cim.split("-")[0]+"年"+cim.split("-")[1]+"月";
  const monthIndex = months.map(m=>m.cim).indexOf(cim);
  const prevMonth = months[monthIndex - 1] ? months[monthIndex - 1].cim : "";
  const nextMonth = months[monthIndex + 1] ? months[monthIndex + 1].cim : "";

  return (
    <div className="relative flex flex-col flex-1 flex-shrink-0 mt-10 mb-2">
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label> */}
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value);}}
        defaultValue={searchParams!.get('query')?.toString()}
      /> */}
      {/* {months.map((month) => (
          // <option key={month.cim} value={month.cim}>
          //   {month.cim}
          // </option>
          <button 
            key={month.cim}
            className='block px-3 py-2 mr-3 rounded-md border border-blue-800' 
            onClick={() => handleSearch(month.cim)}
          >{month.cim}</button>
      ))} */}
      {/* <select
        id="hotel_id"
        name="hotel_id"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
        aria-describedby="hotel_id-error"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      >
        <option value="" disabled>
          Select a month
        </option>
        {months.map((month) => (
          <option key={month.cim} value={month.cim}>
            {month.cim}
          </option>
        ))}
      </select>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
      <div className="flex flex-row justify-between items-center mb-4 font-bold">
        <div className="flex flex-row items-center w-10 cursor-pointer">
          {prevMonth &&
            <ChevronLeftIcon className="w-10" onClick={() => handleSearch(prevMonth)} />
          }
          {/* <span className="w-1/2 text-center">前月</span> */}
        </div>
        <div className="text-xl md:text-2xl">{monthText}</div>
        <div className="flex flex-row items-center w-10 cursor-pointer">
          {/* <span className="w-1/2 text-center">次月</span> */}
          {nextMonth &&
            <ChevronRightIcon className="w-10" onClick={() => handleSearch(nextMonth)} />
          }
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-2 font-bold">
        <p className="w-1/6 text-center text-red-500">日</p>
        <p className="w-1/6 text-center">月</p>
        <p className="w-1/6 text-center">火</p>
        <p className="w-1/6 text-center">水</p>
        <p className="w-1/6 text-center">木</p>
        <p className="w-1/6 text-center">金</p>
        <p className="w-1/6 text-center text-red-500">土</p>
      </div>
    </div>
  );
}
