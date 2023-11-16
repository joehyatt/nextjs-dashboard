import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * from USERS where email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function setLinkToken(email: string, linkToken: string, nonce: string) {
  try {
    const updatedUser = await sql`UPDATE users SET link_token = ${linkToken}, nonce = ${nonce} WHERE email = ${email}`;
    return updatedUser;
  } catch (error) {
    console.error('Failed to set linkToken and nonce', error);
    throw new Error('Failed to set linkToken and nonce.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), linkToken: z.any() })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
            const { email, password, linkToken } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
 
            if (passwordsMatch) {
              if (linkToken) {
                console.log('認証成功');
                // nonce生成
                const {randomBytes} = require('crypto');
                const N=16;
                const randomStrings = randomBytes(N).reduce((p: number,i: number)=> p+(i%36).toString(36),'');
                const buf = Buffer.from(randomStrings);
                const nonce = buf.toString('base64');
                console.log('nonce:',nonce);
                await setLinkToken(email,linkToken,nonce);
              };
              return user;
            }
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});