import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteWatchitem } from '@/app/lib/actions';
import clsx from 'clsx';

export function CreateWatchitem() {
  return (
    <Link
      href="/dashboard/watchlist/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">ウォッチリストに追加</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateWatchitem({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/watchlist/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 w-10"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteWatchitem({ id }: { id: string }) {
  const deleteWatchitemWithId = deleteWatchitem.bind(null, id);
  return (
    <form action={deleteWatchitemWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100 ml-2">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteWatchitem2({ id }: { id: string }) {
  console.log(id)
  const deleteWatchitemWithId = deleteWatchitem.bind(null, id);
  return (
    <form action={deleteWatchitemWithId}>
      <button className={clsx(
        'flex mt-10 w-full h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      )}>ウォッチリストから削除する</button>
    </form>
  );
}
