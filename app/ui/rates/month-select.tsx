'use client';
import { ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ months, cim }: { months: {cim:string}[], cim: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term:string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('cim', term);
      params.delete('cid');
    } else {
      params.delete('cim');
    }
    replace(`${pathname}?${params.toString()}#calendar`);
  };


  const monthText = cim && cim.split("-")[0]+"年"+cim.split("-")[1]+"月";
  const monthIndex = months.map(m=>m.cim).indexOf(cim);
  const prevMonth = months[monthIndex - 1] ? months[monthIndex - 1].cim : "";
  const nextMonth = months[monthIndex + 1] ? months[monthIndex + 1].cim : "";

  return (
    <div id="calendar" className="relative flex flex-col flex-1 flex-shrink-0 mt-10 mb-2">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row items-center w-10 cursor-pointer">
          {prevMonth &&
            <ChevronLeftIcon className="w-6" onClick={() => handleSearch(prevMonth)} />
          }
        </div>
        <div className="text-xl md:text-2xl">{monthText}</div>
        <div className="flex flex-row items-center w-10 cursor-pointer">
          {nextMonth &&
            <ChevronRightIcon className="w-6" onClick={() => handleSearch(nextMonth)} />
          }
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-2">
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
