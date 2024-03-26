import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import {
 
  NextAuthConfig,
  type DefaultSession,

} from "next-auth";
import { db } from "./db";
import nextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";



/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
 export const authOptions:NextAuthConfig = {
  callbacks: {
    
    session: ({ session, user }) => {
      console.log("😎😎😎😎😎 session",session)
      return {
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }},
 
  
  redirect:()=>("/"),
},
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID !,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! ,
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the GITHUB provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret:process.env.NEXTAUTH_SECRET


  
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} =nextAuth(authOptions)


