import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/rates/table';

export const metadata: Metadata = {
    title: 'Rates',
};

export default function Page() {
    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Rates</h1>
        </div>
        <Table />
        {/* <Table query={query} currentPage={currentPage} /> */}
        </div>
    );
}