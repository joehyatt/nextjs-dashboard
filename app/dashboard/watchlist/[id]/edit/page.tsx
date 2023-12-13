import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import Transition from '@/app/ui/rates/transition';
import { fetchWatchitemById, fetchHotels, fetchOldRates, fetchHotelById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
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
                label: '基準価格の変更',
                href: `/dashboard/watchlist/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Transition oldRates={oldRates} hotel_name_jp={hotel!.hotel_name_jp} cid={watchitem.cid}/>
        <Form watchitem={watchitem} />
        </main>
    );
}