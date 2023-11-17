import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/watchlist/table';
import { CreateWatchitem } from '@/app/ui/watchlist/buttons';

export const metadata: Metadata = {
    title: 'Watchlist',
};

export default function Page() {
    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Watchlist</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            {/* <Search placeholder="Search invoices..." /> */}
            <CreateWatchitem />
        </div>
        <Table />
        {/* <Table query={query} currentPage={currentPage} /> */}
        </div>
    );
}