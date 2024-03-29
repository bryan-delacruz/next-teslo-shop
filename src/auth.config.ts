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
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log({ parsedCredentialsSuccess: parsedCredentials.success });

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

        if (!user) return null

        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...rest } = user

        console.log({ userRest: rest })

        return rest
      },
    }),
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)