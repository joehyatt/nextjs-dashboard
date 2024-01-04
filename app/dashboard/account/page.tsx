import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
 
export default async function Page({ params }: { params: { id: string } }) {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
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
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">ホームに戻る</Button>
                </div>
                <form
                    className='mt-6'
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                    >
                    {/* <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">サインアウト</div>
                    </button> */}
                    <Button type="submit">サインアウトする</Button>
                </form>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">アカウントを削除する</Button>
                </div>
            </div>
        </main>
    );
}