import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/rates/table';
import HotelSelect from '@/app/ui/rates/hotel-select';
import MonthSelect from '@/app/ui/rates/month-select';
import { fetchAllHotels, fetchCapturedMonths } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Rates',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
    hotel_id?: string;
    cim?: string;
    };
}) {

    const hotels = await fetchAllHotels();
    const hotel_id = searchParams?.hotel_id || '857817cd-0cfa-4f01-babc-aff31b6e0224';
    const months = await fetchCapturedMonths(hotel_id);
    const cim = searchParams?.cim || '2023-11';

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Rates</h1>
        </div>
        <HotelSelect hotels={hotels}/>
        <MonthSelect months={months}/>
        <Table hotel_id={hotel_id} cim={cim} />
        </div>
    );
}