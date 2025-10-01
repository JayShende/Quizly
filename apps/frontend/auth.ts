import NextAuth, {
  type NextAuthConfig,
  type NextAuthResult,
} from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { client } from "@repo/prisma/client";
import authConfig from "./auth.config";

// 1. Explicit config type
const config: NextAuthConfig = {
  adapter: PrismaAdapter(client),
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
};

// 2. Run NextAuth with explicit return type
const nextAuthResult = NextAuth(config);

// 3. Annotate destructured exports
export const auth: NextAuthResult["auth"] = nextAuthResult.auth;
export const handlers: NextAuthResult["handlers"] = nextAuthResult.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuthResult.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuthResult.signOut;