'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { WatchitemForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateWatchitem } from '@/app/lib/actions';
import { formatCurrency } from '@/app/lib/utils';

export default function EditWatchitemForm({
  watchitem,
  latestRate
}: {
  watchitem: WatchitemForm;
  latestRate? : number
}) {
  const initialState = { message: null, errors: {} };
  const updateWatchitemWithId = updateWatchitem.bind(null, watchitem.id);
  const [state, dispatch] = useFormState(updateWatchitemWithId, initialState);
  const [basis, setBasis] = useState(watchitem.basis)

  const updateBasis = (e:any) => {
    setBasis(e.target.value as number)
  }

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Watchitem basis */}
        <div className="mb-4">
          {/* <label htmlFor="basis" className="mb-2 block text-sm font-medium">
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
          ) : null} */}
          <div className='flex justify-center py-4'>
            <p className='font-bold text-2xl'>{formatCurrency(basis!)}</p>
          </div>

          <div className='flex w-full h-14 items-center'>
            <span className='w-1/4 pr-2'>{formatCurrency(Math.round((latestRate!/3)/100)*100)}</span>
            <input 
              id="basis"
              name="basis"
              type="range" 
              min={Math.round((latestRate!/3)/100)*100} max={latestRate} step={100} 
              defaultValue={watchitem.basis} 
              className='w-full' 
              onChange={updateBasis} 
            />
            <span className='w-1/5 pl-2'>{formatCurrency(latestRate!)}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="flex w-full h-10 justify-center items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          キャンセル
        </Link>
        <Button type="submit">基準価格を変更する</Button>
      </div>
    </form>
  );
}
