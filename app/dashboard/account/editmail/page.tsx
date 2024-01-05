import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { auth } from '@/auth'
import { getUserIdByEmail } from '@/app/lib/data';
import EditMailForm from '@/app/ui/account/edit-mail-form';
 
export default async function Page() {

    const authInfo = await auth()
    const user_id = await getUserIdByEmail(authInfo?.user?.email!)

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: '🙎アカウント',
                        href: `/dashboard/account`,
                        active: true,
                    },
                    {
                        label: 'メールアドレスを変更する',
                        href: `/dashboard/account/editmail`,
                        active: true,
                    },
                ]}
            />
            <EditMailForm user_id={user_id!} />
        </main>
    );
}