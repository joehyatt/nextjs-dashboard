'use client';

import { useFormState } from 'react-dom';
import {
  CurrencyYenIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createWatchitem } from '@/app/lib/actions';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';

export default function WatchlistForm( {hotel_id, cid}: { 
  hotel_id?: string, 
  cid?: string
} ) {

//   const today = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createWatchitem, initialState);

//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const handleBasisRate = useDebouncedCallback((term) => {
//     const params = new URLSearchParams(searchParams!);
//     if (term) {
//       params.set('basis', term);
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }, 100);

  return (
    <form action={dispatch} className='mt-16'>
        <input type='hidden' id="hotel" name='hotel' value={hotel_id} />
        <input type='hidden' id="cid" name='cid' value={cid} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Basis Rate */}
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
                defaultValue=""
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
        
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">ウォッチリストに登録する</Button>
      </div>
    </form>
  );
}
