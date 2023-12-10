'use client';

import { useFormState } from 'react-dom';
import { GroupField, HotelField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingOffice2Icon,
  CalendarIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createWatchitem } from '@/app/lib/actions';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Form( {groups, hotels, group_code, hotel_id, cid, basis}: { 
  groups: GroupField[], hotels: HotelField[], 
  group_code?: string, hotel_id?: string, 
  cid?: string, basis?:number,
} ) {

  const today = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createWatchitem, initialState);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGroupSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('group_code', term);
      params.delete('hotel_id');
      params.delete('cid');
      params.delete('basis');
    } else {
      params.delete('group_code');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  const handleHotelSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('hotel_id', term);
      params.delete('cid');
      params.delete('basis');
    } else {
      params.delete('hotel_id');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  const handleCidSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('cid', term);
      params.delete('basis');
    } else {
      params.delete('cid');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  const handleBasisRate = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set('basis', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Group Select */}
        <div className="mb-4">
          <label htmlFor="hotel" className="mb-2 block text-sm font-medium">
            ホテルグループを選択
          </label>
          <div className="relative">
            <select
              id="group"
              name="group"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={group_code}
              aria-describedby="group-error"
              onChange={(e) => {
                handleGroupSearch(e.target.value);
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
            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.group_code ? (
            <div
              id="group-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.group_code.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Hotel Name */}
        {group_code &&
        <>
        <div className="mb-4">
          <label htmlFor="hotel" className="mb-2 block text-sm font-medium">
            ホテルを選択
          </label>
          <div className="relative">
            <select
              id="hotel"
              name="hotel"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={hotel_id}
              aria-describedby="hotel-error"
              onChange={(e) => {
                handleHotelSearch(e.target.value);
              }}
            >
              <option value="" hidden>
                ホテルを選択してください
              </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotel_name_jp}
                </option>
              ))}
            </select>
            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.hotel_id ? (
            <div
              id="hotel-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.hotel_id.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        </>}


        {/* Check in Date  */}
        {group_code && hotel_id &&
        <>
        <div className="mb-4">
          <label htmlFor="cid" className="mb-2 block text-sm font-medium">
            チェックイン日を選択
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cid"
                name="cid"
                type="date"
                min={today}
                max="2024-02-29"
                defaultValue={cid !== undefined ? cid : ""}
                // step="0.01"
                placeholder="Choose Check-in Date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cid-error"
                onChange={(e) => {
                  handleCidSearch(e.target.value);
                }}
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.cid ? (
            <div
              id="cid-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.cid.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        </>}

        {/* Basis Rate */}
        {group_code && hotel_id && cid &&
        <>
        <div className="mb-4">
          <label htmlFor="basis" className="mb-2 block text-sm font-medium">
            アラート基準価格の設定
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="basis"
                name="basis"
                type="number"
                defaultValue={basis}
                step="1"
                placeholder="基準価格を入力してください"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="basis-error"
              />
              <CurrencyYenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.basis ? (
            <div
              id="basis-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.basis.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        </>}

        {/* <div>
          {latestRate ?
          <button onClick={() => handleBasisRate(latestRate)}>
            最新価格（{latestRate}）を基準価格に設定する
          </button>
          : <></>}
        </div> */}
        
      </div>

      {/* <p>過去14日間の価格推移</p>
        <div>
          {oldRates.map((rate) => (
            <div key={rate.capture_date}>
              <span className='mr-4'>{rate.capture_date}</span>
              <span>{rate.rate ? rate.rate : rate.exception}</span>
            </div>
          ))}
      </div> */}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/watchlist"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          キャンセル
        </Link>
        <Button type="submit">登録する</Button>
      </div>
    </form>
  );
}
