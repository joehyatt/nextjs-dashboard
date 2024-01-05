import Breadcrumbs from '@/app/ui/watchlist/breadcrumbs';
import { auth } from '@/auth'
import { getUserIdByEmail } from '@/app/lib/data';
import EditNameForm from '@/app/ui/account/edit-name-form';
 
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
                        label: '名前を変更する',
                        href: `/dashboard/account/editname`,
                        active: true,
                    },
                ]}
            />
            <EditNameForm user_id={user_id!} />
        </main>
    );
}