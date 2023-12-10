'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ months }: { months: {cim:string}[] }) {

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

  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-4">
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label> */}
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value);}}
        defaultValue={searchParams!.get('query')?.toString()}
      /> */}
      {months.map((month) => (
          // <option key={month.cim} value={month.cim}>
          //   {month.cim}
          // </option>
          <button 
            key={month.cim}
            className='block px-3 py-2 mr-3 rounded-md border border-blue-800' 
            onClick={() => handleSearch(month.cim)}
          >{month.cim}</button>
      ))}
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
    </div>
  );
}
