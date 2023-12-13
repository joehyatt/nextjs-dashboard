'use client';

import { HotelField } from '@/app/lib/definitions';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ hotels, hotel_id }: { hotels?: HotelField[], hotel_id?: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('hotel_id', term);
      params.delete('cim');
      params.delete('cid');
    } else {
      params.delete('hotel_id');
    }
    replace(`${pathname}?${params.toString()}`);
    
  }, 100);

  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value);}}
        defaultValue={searchParams!.get('query')?.toString()}
      /> */}
      <select
        id="hotel_id"
        name="hotel_id"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={hotel_id}
        aria-describedby="hotel_id-error"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      >
        <option value="" hidden>
          ホテルを選択してください
        </option>
        {hotels?.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.hotel_name_jp}
          </option>
        ))}
      </select>
      <BuildingOfficeIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
