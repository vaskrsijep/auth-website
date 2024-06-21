"use client"
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";

const Dashboard = async () => {

  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav/>
       <div className="flex items-center justify-center gap-3 flex-col text-xl">
      Welcome
       <h2 className="font-bold text-xl">
       {session?.user?.email}
      </h2>
      <div onClick={() => signOut()}>
      <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
       </div>
    </div>
  );
};

export default Dashboard;