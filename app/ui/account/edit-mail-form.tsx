'use client';

import { lusitana } from '@/app/ui/fonts';
import { Button } from '../button';
import { editMail } from '@/app/lib/actions';

export default function EditNameForm({user_id}: {user_id: string}) {

  return (
    <form action={editMail} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          メールアドレスを変更する
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="mail"
            >
              新しいメールアドレス
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="mail"
                type="email"
                name="mail"
                placeholder="新しいメールアドレスを入力"
                required
              />
              
            </div>
          </div>
          <input type='hidden' id='user_id' name='user_id' value={user_id} />
        </div>
        <Button className="mt-4 w-full">
        メールアドレスを変更する
        </Button>
        
      </div>
    </form>
  );
}

