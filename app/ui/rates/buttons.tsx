'use client'

import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export default function CreateWatchitem({ group_code, hotel_id, cid, basis }: { group_code:string, hotel_id: string, cid: string, basis: number }) {
  return (
    <Link
      href={`/dashboard/watchlist/create?group_code=${group_code}&hotel_id=${hotel_id}&cid=${cid}&basis=${basis}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}