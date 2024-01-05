'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
//   KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { editName } from '@/app/lib/actions';

export default function EditNameForm({user_id}: {user_id: string}) {
//   const [code, action] = useFormState(editName, undefined);

  return (
    <form action={editName} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          名前を変更する
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              新しい名前（ニックネーム）
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="新しい名前を入力"
                required
              />
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <input type='hidden' id='user_id' name='user_id' value={user_id} />
        </div>
        <Button className="mt-4 w-full">
            名前を変更する
        </Button>
        {/* <LoginButton /> */}
        {/* <div className="flex h-8 items-end space-x-1">
          {code === 'CredentialSignin' && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div> */}
      </div>
    </form>
  );
}

// function LoginButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button className="mt-4 w-full" aria-disabled={pending}>
//       ログイン <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//     </Button>
//   );
// }
