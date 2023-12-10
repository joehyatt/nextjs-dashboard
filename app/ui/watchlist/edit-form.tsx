'use client';

import { useFormState } from 'react-dom';
import { WatchitemForm, HotelField } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateWatchitem } from '@/app/lib/actions';

export default function EditWatchitemForm({
  watchitem,
  // hotels,
  // oldRates,
}: {
  watchitem: WatchitemForm;
  // hotels: HotelField[];
  // latestRate: number;
  // oldRates: {capture_date: string, rate: number | null, exception: string | null}[];
}) {
  const initialState = { message: null, errors: {} };
  const updateWatchitemWithId = updateWatchitem.bind(null, watchitem.id);
  const [state, dispatch] = useFormState(updateWatchitemWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        

        {/* Hotel Name
        <div className="mb-4">
          <label htmlFor="hotel" className="mb-2 block text-sm font-medium">
            Choose hotel
          </label>
          <div className="relative">
            <select
              id="hotel"
              name="hotel"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={watchitem.hotel_id}
            >
              <option value="" disabled>
                Select a hotel
              </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotel_name_jp}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}

        {/* Watchitem Amount
        <div className="mb-4">
          <label htmlFor="cid" className="mb-2 block text-sm font-medium">
            Choose a Check-in Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cid"
                name="cid"
                type="date"
                defaultValue={watchitem.cid}
                placeholder="Enter Check-in Date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cid-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        </div> */}

        {/* Watchitem basis */}
        <div className="mb-4">
          <label htmlFor="basis" className="mb-2 block text-sm font-medium">
            新しい基準価格
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="basis"
                name="basis"
                type="number"
                defaultValue={watchitem.basis}
                placeholder="新しい基準価格を入力"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="basis-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
      </div>
      {/* <div>
        <p>過去14日間の価格推移</p>
        <div>
          {oldRates.map((rate) => (
            <div key={rate.capture_date}>
              <span className='mr-4'>{rate.capture_date}</span>
              <span>{rate.rate ? rate.rate : rate.exception}</span>
            </div>
          ))}
        </div>
      </div> */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/watchlist"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          キャンセル
        </Link>
        <Button type="submit">基準価格を変更する</Button>
      </div>
    </form>
  );
}
