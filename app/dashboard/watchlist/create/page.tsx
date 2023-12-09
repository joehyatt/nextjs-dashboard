import Form from '@/app/ui/watchlist/create-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchAllGroups, fetchAllHotels, fetchHotels, fetchOldRates } from '@/app/lib/data';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    group_code?: string;
    hotel_id?: string;
    cid?: string;
    rate?: number;
  };
}) {
  const groups = await fetchAllGroups();
  const group_code = searchParams?.group_code;
  const hotels = group_code ? await fetchAllHotels(group_code) : [];
  const hotel_id = searchParams?.hotel_id;
  
  // const hotels = await fetchHotels();
  // const hotel_id = searchParams?.hotel_id || "";
  const cid = searchParams?.cid || "2023-12-15";
  let rate = searchParams?.rate || undefined;
  if (rate === null) rate = undefined;

  const oldRates = hotel_id && cid ? await fetchOldRates(hotel_id, cid) : [];
 
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
      <Form groups={groups} hotels={hotels} hotel_id={hotel_id} cid={cid} rate={rate} oldRates={oldRates}/>
    </main>
  );
}