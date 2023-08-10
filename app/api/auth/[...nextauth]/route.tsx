import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      name: "anon",
      credentials: {},
      async authorize(credentials, req) {
        //no need to check anything here, just create a new CT anonymous session and return the token
        // const authResult = await createAnonymousSession();
        /**
         * https://docs.commercetools.com/tutorials/anonymous-session#creating-a-token-with-a-new-anonymous-session
         * {
             "access_token": "vkFuQ6oTwj8_Ye4eiRSsqMeqLYNeQRJi",
             "token_type": "Bearer",
             "expires_in": 172800,
             "refresh_token": "{projectKey}:OWStLG0eaeVs7Yx3-mHcn8iAZohBohCiJSDdK1UCJ9U",
             "scope": "view_products:{projectKey} manage_my_orders:{projectKey} manage_my_profile:{projectKey}"
           }
         */
        // This becomes the user parameter in the signIn function below
        return { name: 'abcdefgh' };
      },
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // signIn needs to return a true/false value 
      // true means user is allowed to sign in 
      // false means display error

      console.log('user', user);
      console.log('account', account);
      console.log('profile', profile);
      // console.log('profile', profile)
      if (account?.provider === 'credentials') {
        // both email and google already insert into the database
        return true;
      }
      if (account?.provider === 'email') {
        console.log('signining in...', user, account, profile, email)
        // Email provider will fire signIn off two times and will have email.verificationRequest === true during the first part of the callback
        // When the verification email is being sent to the user 
      }
      if (account.provider === "google") {
        if (!profile.email_verified) {
          console.log('EMAIL IS NOT VERIFIED...')
          return false;
        }
        // Store this user in our database ?

        // try {
        //   const user = await prisma.user.findUnique({
        //     where: {
        //       email: profile?.email
        //     }
        //   });

        //   if (!user) {
        //     const createdUser = await prisma.user.create({
        //       data: {
        //         id: profile?.sub,
        //         name: profile?.name,
        //         email: profile?.email,
        //         image: profile.picture
        //       }
        //     })
        //     console.log('created user', createdUser)
        //   }
        // } catch (err) {
        //   console.log('err', err)
        // }

        console.log('here at last part of google signin', profile.email_verified)
        return profile.email_verified;
      }
      return true;
    },
    async session({ session, token, user }) {
      // const newData = DB.find(...).data
      console.log('session callback...')
      console.log('session data: ', session)
      console.log('token data: ', token)
      console.log('user data: ', user)
      // session.newfield = newInfo
      return session
    }
  },
  // session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }