'use client'

import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export default function CreateWatchitem({ hotel_id, cid, rate }: { hotel_id: string, cid: string, rate: number }) {
  return (
    <Link
      href={`/dashboard/watchlist/create?hotel_id=${hotel_id}&cid=${cid}&rate=${rate}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}