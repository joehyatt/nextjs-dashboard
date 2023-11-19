'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('status', term);
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label> */}
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value);}}
        defaultValue={searchParams!.get('query')?.toString()}
      /> */}

      <button className='block px-3 py-2 mr-3 rounded-md border border-blue-800' onClick={() => handleSearch("watching")}>Watching</button>
      <button className='block px-3 py-2 mr-3 rounded-md border border-blue-800' onClick={() => handleSearch("breakthrough")}>BreakThrough</button>
      <button className='block px-3 py-2 mr-3 rounded-md border border-blue-800' onClick={() => handleSearch("canceled")}>Canceled</button>
    </div>
  );
}
