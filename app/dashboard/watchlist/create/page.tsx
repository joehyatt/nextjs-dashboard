import Form from '@/app/ui/watchlist/create-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { fetchAllGroups, fetchAllHotels, fetchHotels, fetchOldRates } from '@/app/lib/data';
import RateTransition from '@/app/ui/watchlist/rate-transition';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    group_code?: string;
    hotel_id?: string;
    cid?: string;
    basis?: number;
  };
}) {
  const groups = await fetchAllGroups();
  const group_code = searchParams?.group_code;
  const hotels = group_code ? await fetchAllHotels(group_code) : [];
  const hotel_id = searchParams?.hotel_id;

  console.log(searchParams?.basis)
  
  // const hotels = await fetchHotels();
  // const hotel_id = searchParams?.hotel_id || "";
  let cid = searchParams?.cid || undefined;
  if (cid === null) cid = undefined;
  let basis = searchParams?.basis || undefined;
  if (basis === null) basis = undefined;

  const oldRates = hotel_id && cid ? await fetchOldRates(hotel_id, cid) : [];
  let latestRate = oldRates[oldRates.length-1]!.rate
  // if (latestRate === null) latestRate = undefined;
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'ウォッチリスト', href: '/dashboard/watchlist' },
          {
            label: '新規登録',
            href: '/dashboard/watchlist/create',
            active: true,
          },
        ]}
      />
      <Form groups={groups} hotels={hotels} group_code={group_code} hotel_id={hotel_id} cid={cid} basis={basis} latestRate={latestRate!}/>
      <RateTransition oldRates={oldRates} />
    </main>
  );
}