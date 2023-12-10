import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/watchlist/table';
import { CreateWatchitem } from '@/app/ui/watchlist/buttons';
import StatusFilter from '@/app/ui/watchlist/status-select';

export const metadata: Metadata = {
    title: 'ウォッチリスト',
};

export default function Page({
    searchParams,
}: {
    searchParams?: {
        status?: string;
    };
}) {
    const status = searchParams?.status || 'watching';

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>ウォッチリスト</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <CreateWatchitem />
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <StatusFilter />
        </div>
        <Table status={status} />
        </div>
    );
}