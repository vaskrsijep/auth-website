import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { CredentialsProviderType } from "next-auth/providers"
import { Account, User as AuthUser } from "next-auth"
import User from "@/lib/models/User"
import { connectMongoDB } from "@/lib/db"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                await connectMongoDB();
                try {
                    const user = await User.findOne({email: credentials.email})
                    if(user) {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                        if(isPasswordCorrect) {
                            return user
                        } else {
                            throw new Error("Incorrect password")
                        }
                    }
                } catch (err) {
                    throw new Error(err as string)
                }
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ]
} 

