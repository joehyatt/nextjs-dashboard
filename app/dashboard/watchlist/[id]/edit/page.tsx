import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchWatchitemById, fetchHotels } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [watchitem, hotels] = await Promise.all([
        fetchWatchitemById(id),
        fetchHotels(),
    ]);

    if (!watchitem) {
        notFound();
    }
      
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Watchlist', href: '/dashboard/watchlist' },
            {
                label: 'Edit Watchitem',
                href: `/dashboard/watchlist/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form watchitem={watchitem} hotels={hotels} />
        </main>
    );
}