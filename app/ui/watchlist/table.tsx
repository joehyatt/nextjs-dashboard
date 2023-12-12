import { UpdateWatchitem, DeleteWatchitem } from '@/app/ui/watchlist/buttons';
import WatchlistStatus from '@/app/ui/watchlist/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredWatchlist } from '@/app/lib/data';
import clsx from 'clsx';

export default async function WatchlistTable(
  {
  status, user_id
}: {
  status: string;
  user_id: string;
}
) {

  // const watchlist = await fetchAllWhatchlist();
  const watchlist = await fetchFilteredWatchlist(status, user_id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {watchlist?.map((watchitem) => (
              <div key={watchitem.id} className={clsx(
                'mb-3 w-full rounded-md bg-white p-1 flex flex-row',
                {
                  'bg-red-100': watchitem.rate !== null && watchitem.basis > watchitem.rate
                }
                )} >
                <div className="flex flex-col w-2/3 items-left justify-between">
                  <p className="text-lg">
                    {formatDateToLocal(watchitem.cid)}泊
                  </p>
                  <div className="mb-2 flex items-center">
                    <p>{watchitem.hotel_name_jp}</p>
                  </div>
                  <div className="mb-2 flex items-center">
                    <p>{formatCurrency(watchitem.basis)}</p>
                  </div>
                </div>
                <div className="flex w-1/3 flex-col items-center justify-between align-middle">
                  <p className="text-xl font-medium align-middle">
                    {watchitem.rate !== null ? formatCurrency(watchitem.rate) : watchitem.exception}
                  </p>
                  <div className='flex flex-row justify-between'>
                    <UpdateWatchitem id={watchitem.id} />
                    <DeleteWatchitem id={watchitem.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* PC用表示 */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  チェックイン日
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ホテル名
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  基準価格
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  最新価格
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  ステータス
                </th> */}
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  価格取得日
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {watchlist?.map((watchitem) => (
                <tr
                  key={watchitem.id}
                  className={clsx(
                    'w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
                    {
                      'bg-red-100': watchitem.rate !== null && watchitem.basis > watchitem.rate
                    }
                  )}
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(watchitem.cid)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{watchitem.hotel_name_jp}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(watchitem.basis)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {watchitem.rate !== null ? formatCurrency(watchitem.rate) : watchitem.exception}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {watchitem.status}
                  </td> */}
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {watchitem.basis}
                    <InvoiceStatus status={invoice.status} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWatchitem id={watchitem.id} />
                      <DeleteWatchitem id={watchitem.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
