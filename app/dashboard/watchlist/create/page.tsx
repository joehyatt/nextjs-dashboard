import Form from '@/app/ui/watchlist/create-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchHotels } from '@/app/lib/data';
 
export default async function Page() {
  const hotels = await fetchHotels();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Watchlist', href: '/dashboard/watchlist' },
          {
            label: 'Create Watchitem',
            href: '/dashboard/watchlist/create',
            active: true,
          },
        ]}
      />
      <Form hotels={hotels} />
    </main>
  );
}