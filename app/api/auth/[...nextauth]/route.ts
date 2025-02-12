import prisma from "@/app/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
      async authorize(credentials, req) {
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
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
