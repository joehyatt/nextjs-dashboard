'use client';

import { useFormState } from 'react-dom';
import { HotelForm } from '@/app/lib/definitions';
import { captureScripts } from '@/app/lib/capture-scripts'
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateHotel } from '@/app/lib/actions';


export default function EditHotelForm({
  hotel,
}: {
  hotel: HotelForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateHotelWithId = updateHotel.bind(null, hotel.id);
  const [state, dispatch] = useFormState(updateHotelWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="capture_script" className="mb-2 block text-sm font-medium">
            Choose capture_script
          </label>
          <div className="relative">
            <select
              id="capture_script"
              name="capture_script"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={hotel.capture_script}
            >
              <option value="" disabled>
                Select a Capture Script
              </option>
              {captureScripts.map((captureScript) => (
                <option key={captureScript.id} value={captureScript.id}>
                  {captureScript.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Capture Month Count */}
        <div className="mb-4">
          <label htmlFor="capture_month_count" className="mb-2 block text-sm font-medium">
            Choose a Capture Month Count
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="capture_month_count"
                name="capture_month_count"
                type="number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="capture_month_count-error"
                defaultValue={hotel.capture_month_count}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.capture_month_count ? (
            <div
              id="capture_month_count-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.capture_month_count.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Hotel</Button>
      </div>
    </form>
  );
}
