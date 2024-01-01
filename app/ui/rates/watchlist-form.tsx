'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { createWatchitem } from '@/app/lib/actions';
import { formatCurrency } from '@/app/lib/utils';

export default function WatchlistForm( {hotel_id, cid, latestRate}: { 
  hotel_id?: string, 
  cid?: string,
  latestRate?: number
} ) {

  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createWatchitem, initialState);
  const [basis, setBasis] = useState(Math.round(latestRate!/100)*100)

  const updateBasis = (e:any) => {
    setBasis(e.target.value as number)
  }

  return (
    <form action={dispatch} className='mt-44'>
        <input type='hidden' id="hotel" name='hotel' value={hotel_id} />
        <input type='hidden' id="cid" name='cid' value={cid} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Basis Rate */}
        <div className="mb-4">
          <label htmlFor="basis" className="mb-2 block text-sm font-medium">
            🔔&nbsp;アラート基準価格の設定
          </label>

          <div className='flex justify-center py-3'>
            <p className='font-bold text-2xl'>{basis > latestRate! ? formatCurrency(Math.round(latestRate!/100)*100) : formatCurrency(Math.round(basis!/100)*100)}</p>
          </div>

          <div className='flex w-full h-14 items-center'>
            <span className='w-1/5 pr-5'>{formatCurrency(Math.round((latestRate!/3)/100)*100)}</span>
            <input 
              id="basis"
              name="basis"
              type="range" 
              min={Math.round((latestRate!/3)/100)*100} max={Math.round(latestRate!/100)*100} step={100} 
              defaultValue={latestRate} 
              className='w-full' 
              onChange={updateBasis} 
            />
            <span className='w-1/5 pl-3'>{formatCurrency(Math.round(latestRate!/100)*100)}</span>
          </div>

          <div className='flex justify-center'>
            <p className='text-sm'>最新価格：{formatCurrency(latestRate!)}</p>
          </div>
        </div>
        
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">ウォッチリストに登録する</Button>
      </div>
    </form>
  );
}
