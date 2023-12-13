import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import Transition from '@/app/ui/rates/transition';
import { fetchWatchitemById, fetchHotels, fetchOldRates, fetchHotelById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { DeleteWatchitem2 } from '@/app/ui/watchlist/buttons';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const watchitem = await fetchWatchitemById(id);
    if (!watchitem) {
        notFound();
    }

    const hotel = await fetchHotelById(watchitem.hotel_id);
    const oldRates = await fetchOldRates(watchitem.hotel_id, watchitem.cid)
      
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
        <Transition oldRates={oldRates} hotel_name_jp={hotel!.hotel_name_jp} cid={watchitem.cid}/>
        <Form watchitem={watchitem} />
        <DeleteWatchitem2 id={id}/>
        </main>
    );
}