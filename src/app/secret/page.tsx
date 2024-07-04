"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/nav";
import SignOutComponent from "../components/SignOutComponent";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (!session) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  

  if (loading) {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
      <div className="flex items-center justify-center gap-3 flex-col text-xl">
        Welcome {session?.user?.image ? <img src={session.user.image} className="w-24 h-24 rounded-full" /> : null}
        <h2 className="font-bold text-xl">
          {session?.user?.email}
          {" "}
        </h2>
          {session?.user?.name}
        <SignOutComponent />
      </div>
    </div>
  );
};

export default Dashboard;
