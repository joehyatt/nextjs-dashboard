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
                defaultValue={hotel.capture_month_count}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="capture_month_count-error"
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

        {/* Invoice Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  aria-describedby="status-error"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  aria-describedby="status-error"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state.errors?.status ? (
            <div
              id="status-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </fieldset> */}
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