'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth'
import bcrypt from 'bcrypt';

import { auth } from '@/auth';
import { getUserIdByEmail } from '@/app/lib/data'


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'],{
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});
   
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ date: true, id: true });

export async function createInvoice(prevState: State, formData: FormData) {

    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function signup(
  prevState: string | undefined,
  formData: FormData,
) {

  const formObj = Object.fromEntries(formData)
  const name = formObj.name as string;
  const email = formObj.email as string;
  const password = formObj.password as string;
  const password_encrypted = await bcrypt.hash(password,10);

  // ユーザー登録
  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name},${email},${password_encrypted})
    `;
  } catch (error) {
    if ((error as Error).message.includes('users_email_key')) {
      return 'EmailExists';
    }
    throw error;
  }

  // ログイン
  try {
    await signIn('credentials', {email,password});
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export type WatchitemState = {
  errors?: {
    group_code?: string[];
    hotel_id?: string[];
    cid?: string[];
    basis?: string[];
  };
  message?: string | null;
};

const WatchitemSchema = z.object({
    id: z.string(),
    hotel_id: z.string({
      invalid_type_error: 'Please select a hotel.',
    }),
    cid: z.string({
      invalid_type_error: 'Please select a check-in date.',
    }),
    basis: z.coerce
      .number()
      .gt(0, { message: 'Please enter a rate greater than ¥0.' }),
});
const WatchitemEditSchema = z.object({
  id: z.string(),
  basis: z.coerce
    .number()
    .gt(0, { message: 'Please enter a rate greater than ¥0.' }),
});

const CreateWatchitem = WatchitemSchema.omit({ id: true });

export async function createWatchitem(prevState: WatchitemState, formData: FormData) {

  const authInfo = await auth()
  const user_id = await getUserIdByEmail(authInfo!.user!.email!);

  // Validate form using Zod
  const validatedFields = CreateWatchitem.safeParse({
    hotel_id: formData.get('hotel'),
    cid: formData.get('cid'),
    basis: formData.get('basis'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Watchitem.',
    };
  }
 
  const { hotel_id, cid, basis } = validatedFields.data;
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO watchlist (user_id, hotel_id, cid, basis)
      VALUES (${user_id}, ${hotel_id}, ${cid}, ${basis})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Watchitem.',
    };
  }
 
  // Revalidate the cache for the home page and redirect the user.
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const UpdateWatchitem = WatchitemEditSchema.omit({ id: true });

export async function updateWatchitem(
  id: string,
  prevState: WatchitemState,
  formData: FormData,
) {

  const validatedFields = UpdateWatchitem.safeParse({
    // hotel_id: formData.get('hotel'),
    // cid: formData.get('cid'),
    basis: formData.get('basis'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Watchitem.',
    };
  }
 
  // const { hotel_id, cid, basis } = validatedFields.data;
  const { basis } = validatedFields.data;
 
  try {
    await sql`
      UPDATE watchlist
      SET basis = ${basis}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("Database Error: Failed to Update Watchitem.")
    return { message: 'Database Error: Failed to Update Watchitem.' };
  }
 
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteWatchitem(id: string) {
  try {
    await sql`DELETE FROM watchlist WHERE id = ${id}`;
    revalidatePath('/dashboard/watchlist');
    return { message: 'Deleted Watchitem.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Watchitem.' };
  }
  // revalidatePath('/dashboard');
  // redirect('/dashboard');
}

export type HotelState = {
  errors?: {
    capture_script?: string[];
    capture_month_count?: string[];
  };
  message?: string | null;
};

const HotelSchema = z.object({
    id: z.string(),
    capture_script: z.string({
      invalid_type_error: 'Please select a hotel.',
    }),
    capture_month_count: z.coerce
      .number()
      .gt(0, { message: 'Please enter a rate greater than 0.' }),
});

const UpdateHotel = HotelSchema.omit({ id: true });

export async function updateHotel(
  id: string,
  prevState: HotelState,
  formData: FormData,
) {

  const validatedFields = UpdateHotel.safeParse({
    capture_script: formData.get('capture_script'),
    capture_month_count: formData.get('capture_month_count'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Hotel.',
    };
  }

  const { capture_script, capture_month_count } = validatedFields.data;

  try {
    await sql`
      UPDATE hotels
      SET capture_script = ${capture_script}, capture_month_count = ${capture_month_count}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("Database Error: Failed to Update Hotel.")
    return { message: 'Database Error: Failed to Update Hotel.' };
  }
 
  revalidatePath('/admin');
  redirect('/admin');
}
