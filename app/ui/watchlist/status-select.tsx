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
        id="status"
        name="status"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
        aria-describedby="status-error"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      >
        <option value="" disabled>Select a Status</option>
        <option key="watching" value="watching">Whatching</option>
        <option key="breakthrough" value="breakthrough">Breakthrough</option>
        <option key="canceled" value="canceled">Canceled</option>
      </select>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
