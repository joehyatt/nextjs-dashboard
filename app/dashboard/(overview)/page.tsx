import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { completeAccountLink, getUserIdByEmail } from '@/app/lib/data';
import { auth } from '@/auth'

export default async function Page() {

  const authInfo = await auth()
  const user_id = await getUserIdByEmail(authInfo?.user?.email!)
  const lineToken = await completeAccountLink(user_id!);
  const linkUrl = `https://access.line.me/dialog/bot/accountLink?linkToken=${lineToken.link_token}&nonce=${lineToken.nonce}`  

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        ダッシュボード
      </h1>
      <p className='mb-4'>ようこそ{authInfo?.user?.name}さん！</p>

      {lineToken.link_token && lineToken.nonce &&
        <button className='my-4 p-3 rounded-md bg-emerald-500 text-white'><a href={linkUrl}>LINEアカウント連携を完了させる</a></button>
      }
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>アカウント情報</h2>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 py-2 px-4">
            <div className="bg-white px-6 py-3">
              <span>名前（ニックネーム）</span><span className='ml-10'>{authInfo?.user?.name}</span>
            </div>
          </div>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 py-2 px-4">
            <div className="bg-white px-6 py-3">
              <span>メールアドレス</span><span className='ml-10'>{authInfo?.user?.email}</span>
            </div>
          </div>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 py-2 px-4">
            <div className="bg-white px-6 py-3">
              <span>LINE連携</span><span className='ml-10'>連携済み</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}