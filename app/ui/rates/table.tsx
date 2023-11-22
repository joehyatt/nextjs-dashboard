import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredRates } from '@/app/lib/data';
import CreateWatchitem from '@/app/ui/rates/buttons';


export default async function RatesTable(
  {
  hotel_id,
  cim,
}: {
  hotel_id: string;
  cim: string;
}
) {
  const rates = await fetchFilteredRates(hotel_id,cim);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          
          {/* SP用リスト表示 */}
          <div className="md:hidden">
            {rates?.map((rate) => (
              <div
                key={rate.id}
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
                      {/* <p>{rate.hotel_name_jp}</p> */}
                    </div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(rate.cid)}</p>
                  </div>
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {rate.rate !== null ? formatCurrency(rate.rate) : rate.exception}
                    </p>
                    {/* <p>{formatDateToLocal(rate.capture_date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <CreateWatchitem hotel_id={hotel_id} cid={rate.cid} rate={rate.rate || 0} />
                    {/* <UpdateInvoice id={invoice.id} /> */}
                    {/* <DeleteInvoice id={invoice.id} /> */}
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
                  Hotel
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Check-in
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rate
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Exception
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                  価格取得日
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rates?.map((rate) => (
                <tr
                  key={rate.id}
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
                      <p>{rate.hotel_name_jp}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(rate.cid)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {rate.rate !== null ? formatCurrency(rate.rate) : rate.exception}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {rate.exception}
                  </td> */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(rate.capture_date)}
                    {/* <InvoiceStatus status={invoice.status} /> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <CreateWatchitem hotel_id={hotel_id} cid={rate.cid} rate={rate.rate || 0} />
                      {/* <UpdateInvoice id={invoice.id} /> */}
                      {/* <DeleteInvoice id={invoice.id} /> */}
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
