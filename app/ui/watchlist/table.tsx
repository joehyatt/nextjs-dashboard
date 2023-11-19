import Image from 'next/image';
import { UpdateWatchitem, DeleteWatchitem } from '@/app/ui/watchlist/buttons';
import WatchlistStatus from '@/app/ui/watchlist/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredWatchlist, fetchAllWhatchlist } from '@/app/lib/data';

export default async function WatchlistTable(
  {
  status
}: {
  status: string;
}
) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);

  // const watchlist = await fetchAllWhatchlist();
  const watchlist = await fetchFilteredWatchlist(status);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {watchlist?.map((watchitem) => (
              <div
                key={watchitem.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{watchitem.hotel_name_jp}</p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(watchitem.cid)}</p>
                  </div>
                  {/* <InvoiceStatus status={watchitem.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(watchitem.basis)}
                    </p>
                    <p>{watchitem.status}</p>
                  </div>
                  <div className="flex justify-end gap-2">
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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ホテル名
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  チェックイン日
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  基準価格
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ステータス
                </th>
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
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{watchitem.hotel_name_jp}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(watchitem.cid)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(watchitem.basis)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {watchitem.status}
                  </td>
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