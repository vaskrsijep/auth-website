import { connectMongoDB } from "@/lib/db";
import User from "@/lib/models/User";
import NextAuth, { Account, User as AuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Credentials({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          await connectMongoDB();
          try {
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account }) {
          if (account?.provider == "credentials") {
            return true;
          }
          if (account?.provider == "github") {
            await connectMongoDB();
            try {
              const existingUser = await User.findOne({ email: user.email });
              if (!existingUser) {
                const newUser = new User({
                  email: user.email,
                });
    
                await newUser.save();
                return true;
              }
              return true;
            } catch (err) {
              console.log("Error saving user", err);
              return false;
            }
          }
        },
      },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
