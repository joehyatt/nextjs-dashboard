'use client';

import { GroupField } from '@/app/lib/definitions';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ groups, group_code }: { groups: GroupField[], group_code?: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('group_code', term);
      params.delete('hotel_id');
      params.delete('cim');
    } else {
      params.delete('group_code');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

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
        id="group_code"
        name="group_code"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={group_code}
        aria-describedby="group_code-error"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      >
        <option value="" hidden>
          ホテルグループを選択してください
        </option>
        {groups.map((group) => (
          <option key={group.group_code} value={group.group_code}>
            {group.group_name_jp}
          </option>
        ))}
      </select>
      <RectangleGroupIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
