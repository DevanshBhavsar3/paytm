import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

interface user {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface token extends JWT {
  uid: string;
}

interface session extends Session {
  user: {
    id: string;
    email: string;
    firstname: string;
  };
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (email && password) {
          try {
            const user = await prisma.user.findUnique({
              where: {
                email,
              },
            });

            if (!user) return null;

            const isPasswordRight = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordRight) {
              return user;
            } else {
              return null;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      const newSession: session = session as session;

      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.firstname = token.firstname as string;
      }

      return newSession;
    },
    jwt({ token, user }) {
      const newToken: token = token as token;

      if (user) {
        newToken.uid = user.id;
        newToken.firstname = (user as user).firstname;
      }

      return newToken;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
