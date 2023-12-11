import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/watchlist/table';
import { CreateWatchitem } from '@/app/ui/watchlist/buttons';
import StatusFilter from '@/app/ui/watchlist/status-select';
import { auth } from '@/auth';
import { getUserIdByEmail } from '@/app/lib/data'

export const metadata: Metadata = {
    title: 'ウォッチリスト',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        status?: string;
    };
}) {
    const status = searchParams?.status || 'watching';
    const authInfo = await auth()
    const user_id = await getUserIdByEmail(authInfo!.user!.email!);

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>ウォッチリスト</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <CreateWatchitem />
        </div>
        {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <StatusFilter />
        </div> */}
        <Table status={status} user_id = {user_id!} />
        </div>
    );
}