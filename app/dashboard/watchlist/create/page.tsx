import Form from '@/app/ui/watchlist/create-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchHotels } from '@/app/lib/data';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
  hotel_id?: string;
  cid?: string;
  rate?: number;
  };
}) {
  const hotels = await fetchHotels();
  const hotel_id = searchParams?.hotel_id || "";
  const cid = searchParams?.cid || "";
  let rate = searchParams?.rate || undefined;
  if (rate === null) rate = undefined;
 
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
      <Form hotels={hotels} hotel_id={hotel_id} cid={cid} rate={rate}/>
    </main>
  );
}