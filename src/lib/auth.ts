
import NextAuth from "next-auth"
import { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
export const { handlers, auth } = NextAuth(req => {
 if (req) {
  console.log(req)
 }
 return { providers: [ GitHub ] }
})
