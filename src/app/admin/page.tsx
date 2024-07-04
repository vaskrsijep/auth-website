"use client"
import { useSession } from "next-auth/react";
import SignOutComponent from "../components/SignOutComponent";
import Nav from "@/components/nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {

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
    
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return router.push("/login");
    }


    return(
        <>
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex items-center justify-between gap-3 flex-row text-xl w-full">
            <Nav/>  
            <SignOutComponent />
            </div>
            <p>Admin</p>

        </div>
        </>
    )
}