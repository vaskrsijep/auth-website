"use client";
import AuthProvider from "@/lib/SessionProvider";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export default async function AuthProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log(session);

  return (
    <SessionProvider basePath={"/auth"} session={session}>
      {children}
    </SessionProvider>
  );
}