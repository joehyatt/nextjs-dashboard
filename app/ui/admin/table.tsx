import Image from 'next/image';
import { UpdateHotel } from '@/app/ui/admin/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateTimeToLocal, formatDateToLocal } from '@/app/lib/utils';
import { fetchAllHotelsWithLog, fetchAllHotels } from '@/app/lib/data';
import { captureScripts } from '@/app/lib/capture-scripts'
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export async function ScriptsTable() {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0"></div>
          {/* PC用表示 */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  取得用スクリプト名
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  取得対象ホテル
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Exception
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
              {captureScripts?.map((captureScript) => (
                <tr
                  key={captureScript.id}
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
                      <p>{captureScript.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {captureScript.name}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {captureScript.capture_month_count}
                  </td> */}
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(rate.capture_date)}
                    <InvoiceStatus status={invoice.status} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateHotel id={captureScript.id} /> */}
                      {/* <DeleteInvoice id={invoice.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}



export async function HotelsTable(
//   {
//   query,
//   currentPage,
// }: {
//   query: string;
//   currentPage: number;
// }
) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);

  const hotels = await fetchAllHotels();
  const logs = await fetchAllHotelsWithLog();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {/* {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          {/* PC用表示 */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ホテル名
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  取得用スクリプト
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  取得月数
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  2023-11
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  2023-12
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {hotels?.map((hotel) => (
                <tr
                  key={hotel.id}
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
                      <p>{hotel.hotel_name_jp}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {hotel.capture_script}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {hotel.capture_month_count}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs">
                    {/* { 
                      logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-11') ? // logがあるかチェック
                      new Date(logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-11')['timestamp']) > new Date(new Date().setDate(new Date().getDate() - 1)) ? 
                          <>
                            <CheckCircleIcon className="w-12 text-green-500"/>
                            {logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-11')['timestamp']}
                          </> :
                          <>
                            <ExclamationCircleIcon className="w-12 text-yellow-500"/>
                            {logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-11')['timestamp']}
                          </> : 
                        <XCircleIcon className="w-12 text-red-500" />
                    } */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs">
                    {/* { 
                      logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-12') ? // logがあるかチェック
                        new Date(logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-12')['timestamp']) > new Date(new Date().setDate(new Date().getDate() - 1)) ? 
                          <>
                            <CheckCircleIcon className="w-12 text-green-500"/>
                            {logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-12')['timestamp']}
                          </> :
                          <>
                            <ExclamationCircleIcon className="w-12 text-yellow-500"/>
                            {logs.find(log => log.hotel_id === hotel.id && log.capture_month === '2023-12')['timestamp']}
                          </> : 
                        <XCircleIcon className="w-12 text-red-500" />
                    } */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateHotel id={hotel.id} />
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
