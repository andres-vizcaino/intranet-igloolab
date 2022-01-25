import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from 'lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id

      return session // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    newUser: '/auth/new-user',
  },
})
