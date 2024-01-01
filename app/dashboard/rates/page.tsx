import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
// import Table from '@/app/ui/rates/table';
import Table from '@/app/ui/rates/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages, fetchHotelsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';

import Search from '@/app/ui/search';
import Calendar from '@/app/ui/rates/calendar';
import GroupSelect from '@/app/ui/rates/group-select';
import HotelSelect from '@/app/ui/rates/hotel-select';
import MonthSelect from '@/app/ui/rates/month-select';
import Transition from '@/app/ui/rates/transition';
import { fetchAllGroups, fetchAllHotels, fetchCapturedMonths, fetchFilteredRates, fetchOldRates, fetchHotelById, fetchFilteredHotels } from '@/app/lib/data';
import WatchlistForm from '@/app/ui/rates/watchlist-form';

export const metadata: Metadata = {
    title: '料金検索',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        group_code?: string;
        hotel_id?: string;
        cim?: string;
        cid?: string;
        query?: string;
        page?: string;
    };
}) {

    const groups = await fetchAllGroups();
    const group_code = searchParams?.group_code;
    const hotels = group_code ? await fetchAllHotels(group_code) : [];
    const hotel_id = searchParams?.hotel_id;
    const months = hotel_id ? await fetchCapturedMonths(hotel_id) : [];
    const cim = searchParams?.cim || months[0]?.cim;
    const rates = hotel_id && cim ? await fetchFilteredRates(hotel_id,cim) : [];
    const cid = searchParams?.cid || '';
    const oldRates = hotel_id && cid ? await fetchOldRates(hotel_id, cid) : [];
    const hotel = hotel_id && await fetchHotelById(hotel_id);
    const latestRate = oldRates && oldRates.length > 0 && oldRates[oldRates.length -1].rate;

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchHotelsPages(query);

    const filteredHotels = await fetchFilteredHotels(query, currentPage);

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between mb-10">
            <h1 className={`${lusitana.className} text-lg`}>🔎&nbsp;料金検索</h1>
        </div>


        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="ホテル名を検索..." />
        </div>

        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table hotels={filteredHotels} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>



        <div className='h-10 my-10'></div>
        <GroupSelect groups={groups} group_code={group_code}/>
        {group_code && <HotelSelect hotels={hotels} hotel_id={hotel_id} />}
        {months && months.length > 0 && <MonthSelect months={months} cim={cim}/>}
        {group_code && hotel_id && cim && rates && <Calendar hotel_id={hotel_id} cim={cim} rates={rates}/>}
        {oldRates.length !== 0 && hotel &&
        <>
            <Transition oldRates={oldRates} hotel={hotel} cid={cid}/>
            <WatchlistForm hotel_id={hotel_id} cid={cid} latestRate={latestRate || 100000} />
        </>
        }
        {/* {group_code && hotel_id && cim ? <Table group_code={group_code} hotel_id={hotel_id} cim={cim} /> : <div></div>} */}
        </div>
    );
}