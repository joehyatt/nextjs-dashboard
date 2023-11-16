import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL('/dashboard', nextUrl));
        return Response.redirect(new URL('https://access.line.me/dialog/bot/accountLink?linkToken=tvIOicSRtTVe4EXhbPLDWCPfIPZemjDX&nonce=YzlvYzVwejB3cGtsdGM2OA==', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;