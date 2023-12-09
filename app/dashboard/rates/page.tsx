import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/rates/table';
import Calendar from '@/app/ui/rates/calendar';
import GroupSelect from '@/app/ui/rates/group-select';
import HotelSelect from '@/app/ui/rates/hotel-select';
import MonthSelect from '@/app/ui/rates/month-select';
import { fetchAllGroups, fetchAllHotels, fetchCapturedMonths } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Rates',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        group_code?: string;
        hotel_id?: string;
        cim?: string;
    };
}) {

    const groups = await fetchAllGroups();
    const group_code = searchParams?.group_code;
    const hotels = group_code ? await fetchAllHotels(group_code) : [];
    const hotel_id = searchParams?.hotel_id;
    const months = hotel_id ? await fetchCapturedMonths(hotel_id) : [];
    const cim = searchParams?.cim || months[0]?.cim;

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Rates</h1>
        </div>
        <GroupSelect groups={groups}/>
        {group_code ? <HotelSelect hotels={hotels}/> : <div>---</div>}
        {months ? <MonthSelect months={months}/> : <div>---</div>}
        {hotel_id && cim ? <Calendar hotel_id={hotel_id} cim={cim} /> : <div>...</div>}
        {hotel_id && cim ? <Table hotel_id={hotel_id} cim={cim} /> : <div>...</div>}
        </div>
    );
}