import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-user'
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminData = auth?.user?.role === 'admin';
      
      const protectedRoutes = [
        '/checkout',
        '/profile', 
        '/orders',
        '/admin',
      ];
      
      const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');

      // 1. Unauthenticated users trying to access protected routes
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      // 2. Non-admin users trying to access admin routes
      if (isAdminRoute && !isAdminData) {
        return Response.redirect(new URL('/', nextUrl));
      }

      // 3. Authenticated users trying to access auth routes (login/register)
      if (isLoggedIn && nextUrl.pathname.startsWith('/auth/')) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      // Cast to correct type based on nextauth.d.ts augmentation
      session.user = token.data as any; // Keeping 'any' temporarily if the type structure is complex, but 'token.data' should match User
      return session;
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Return user without password
        const { password: _, ...rest } = user;


        return rest;
      },
    }),
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);