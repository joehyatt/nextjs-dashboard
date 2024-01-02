'use client';

// import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { HotelsTable } from '@/app/lib/definitions';
// import { fetchFilteredHotels } from '@/app/lib/data';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
export default function HotelsTable({hotels}: {hotels: HotelsTable[]}) {
//   const hotels = await fetchFilteredHotels(query, currentPage);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams!);

    const handleSearch = (group_code:string, hotel_id:string) => {
        console.log(`Searching... ${hotel_id}`);
        console.log(`param hotel_id... ${params.get('hotel_id')}`)
        if (group_code && hotel_id) {
            params.set('group_code', group_code);
            params.set('hotel_id', hotel_id);
            params.delete('cim');
            params.delete('cid');
        } else {
            params.delete('group_code');
            params.delete('hotel_id');
            params.delete('cim');
            params.delete('cid');
        }
        replace(`${pathname}?${params.toString()}#calendar`);
    };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {hotels?.map((hotel) => (
              <div
                key={hotel.id}
                className={clsx(
                    "mb-2 w-full rounded-m p-2",
                    {
                        'bg-[#F66C16] text-[#fff]':  hotel.id === params.get('hotel_id'),
                    }
                )}
                // className="mb-2 w-full rounded-md bg-white p-2"
                onClick={() => handleSearch(hotel.group_code,hotel.id)}
              >
                <div className="flex items-center justify-between">
                      <p>🏨&nbsp;{hotel.hotel_name_jp}</p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
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
                  className={clsx(
                    "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg",
                    {
                        'bg-red-500 text-red-500':  hotel.id === params.get('hotel_id'),
                    }
                  )}
                //   className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{hotel.hotel_name_jp}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
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
