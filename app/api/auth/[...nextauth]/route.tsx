import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { AuthOptions } from "next-auth"
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('account', account);
      // console.log('profile', profile)
      if (account?.provider === 'email') {
        // Email provider will fire signIn off two times and will have email.verificationRequest === true during the first part of the callback
        // When the verification email is being sent to the user 
      }
      if (account.provider === "google") {
        if (!profile.email_verified) {
          return false;
        }
        // Store this user in our database ?

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email
            }
          });

          if (!user) {
            const createdUser = await prisma.user.create({
              data: {
                id: profile?.sub,
                name: profile?.name,
                email: profile?.email,
                image: profile.picture
              }
            })
            console.log('created user', createdUser)
          }

          console.log('user', user)
        } catch (err) {
          console.log('err', err)
        }


        return profile.email_verified;
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    // async session({ session, token, user }) {
    //   // const newData = DB.find(...).data
    //   console.log(session, token, user)
    //   // session.newfield = newInfo
    //   return session
    // }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }