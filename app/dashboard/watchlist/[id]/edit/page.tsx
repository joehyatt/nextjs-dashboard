import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchWatchitemById, fetchHotels, fetchOldRates } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [watchitem, hotels] = await Promise.all([
        fetchWatchitemById(id),
        fetchHotels()
    ]);

    if (!watchitem) {
        notFound();
    }

    const oldRates = await fetchOldRates(watchitem.hotel_id, watchitem.cid)
      
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'ウォッチリスト', href: '/dashboard/watchlist' },
            {
                label: '基準価格の変更',
                href: `/dashboard/watchlist/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form watchitem={watchitem} />
        </main>
    );
}