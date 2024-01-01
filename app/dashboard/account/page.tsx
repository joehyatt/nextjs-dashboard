// import Form from '@/app/ui/watchlist/edit-form';
import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import Form from '@/app/ui/dashboard/account-edit-form';
import Transition from '@/app/ui/rates/transition';
// import { fetchWatchitemById, fetchOldRates, fetchHotelById } from '@/app/lib/data';
// import { notFound } from 'next/navigation';
import { DeleteWatchitem2 } from '@/app/ui/watchlist/buttons';
 
export default async function Page({ params }: { params: { id: string } }) {
    // const id = params.id;
    // const watchitem = await fetchWatchitemById(id);
    // if (!watchitem) {
    //     notFound();
    // }

    // const hotel = await fetchHotelById(watchitem.hotel_id);
    // const oldRates = await fetchOldRates(watchitem.hotel_id, watchitem.cid)
    // const latestRate = oldRates && oldRates.length > 0 && oldRates[oldRates.length -1].rate
      
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            // { label: 'ウォッチリスト', href: '/dashboard/watchlist' },
            {
                label: 'アカウント',
                href: `/dashboard/account`,
                active: true,
            },
            ]}
        />
        <div>アカウント</div>
        <div>
            <div>名前</div>
            <div>メールアドレス</div>
            <div>パスワード</div>
            <div>LINE連携</div>
        </div>
        <div>
            <button>ホームに戻る</button>
            <button>ログアウト</button>
            <button>アカウントを削除する</button>
        </div>
        {/* <Form /> */}
        {/* <Transition oldRates={oldRates} hotel_name_jp={hotel!.hotel_name_jp} cid={watchitem.cid}/>
        <Form watchitem={watchitem} latestRate={latestRate || 100000} />
        <DeleteWatchitem2 id={id}/> */}
        </main>
    );
}