import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import Transition from '@/app/ui/rates/transition';
import { fetchWatchitemById, fetchOldRates, fetchHotelById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { DeleteWatchitem2 } from '@/app/ui/watchlist/buttons';
import { HotelForm } from '@/app/lib/definitions';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const watchitem = await fetchWatchitemById(id);
    if (!watchitem) {
        notFound();
    }

    const hotel = await fetchHotelById(watchitem.hotel_id);
    const oldRates = await fetchOldRates(watchitem.hotel_id, watchitem.cid)
    const latestRate = oldRates && oldRates.length > 0 && oldRates[oldRates.length -1].rate
      
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            // { label: 'ウォッチリスト', href: '/dashboard/watchlist' },
            {
                label: 'ウォッチリストの編集',
                href: `/dashboard/watchlist/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Transition oldRates={oldRates} hotel={hotel as HotelForm} cid={watchitem.cid}/>
        <Form watchitem={watchitem} latestRate={latestRate || 100000} />
        <DeleteWatchitem2 id={id}/>
        </main>
    );
}