import Form from '@/app/ui/admin/edit-form';
import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import { fetchHotelById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [hotel] = await Promise.all([
        fetchHotelById(id),
    ]);

    if (!hotel) {
        notFound();
    }
      
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Admin', href: '/admin' },
            {
                label: 'Edit Hotel',
                href: `/admin/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form hotel={hotel} />
        </main>
    );
}