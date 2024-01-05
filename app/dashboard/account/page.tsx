import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import Link from 'next/link';
import { signOut } from '@/auth';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { auth } from '@/auth'
import { getUserIdByEmail, getUserInfo } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {

    const authInfo = await auth()
    const user_id = await getUserIdByEmail(authInfo?.user?.email!)
    const userInfo = await getUserInfo(user_id!)

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                {
                    label: '🙎アカウント',
                    href: `/dashboard/account`,
                    active: true,
                },
                ]}
            />
            <div>
                <div className='rounded-m'>
                    <div>🏷&nbsp;名前</div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>{userInfo?.name}</p>
                        <Link href="/dashboard/account/editname"><button>変更する</button></Link>
                    </div>
                </div>

                <div className='mt-5'>
                    <div>📧&nbsp;メールアドレス</div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>{userInfo?.email}</p>
                        <Link href="/dashboard/account/editmail">
                            <button className='h-10 justify-center items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>変更する</button>
                        </Link>
                    </div>
                </div>

                <div className='mt-5'>
                    <div>🔑&nbsp;パスワード</div>
                    <div className='w-full flex flex-row justify-between'>
                        <p className='h-10 flex items-center'>********</p>
                        <button className='h-10 justify-center items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>変更する</button>
                    </div>
                </div>

                <div className='mt-5'>
                    <div>🔗&nbsp;LINE連携</div>
                    <div>{userInfo?.line_id ? 
                        <div className='w-full flex flex-row justify-between'>
                            <div className='flex flex-row items-center'>連携済み<CheckBadgeIcon className='w-5 text-green-500' /></div>
                            <button className='h-10 justify-center items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>解除する</button>
                        </div> 
                        : 
                        '未連携'
                    }</div>
                </div>

            </div>

            <div className='mt-12'>
                <Link href="/dashboard" className="flex w-full h-10 justify-center items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    ホームに戻る
                </Link>
                <form
                    className='mt-6'
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                    >
                    <Button type="submit">サインアウトする</Button>
                </form>

                {/* <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">アカウントを削除する</Button>
                </div> */}
            </div>
        </main>
    );
}