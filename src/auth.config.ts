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
      // const isLoggedIn = !!auth?.user
      // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true

      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", nextUrl))
      // }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

        if (!user) return null

        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...rest } = user


        return rest
      },
    }),
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)