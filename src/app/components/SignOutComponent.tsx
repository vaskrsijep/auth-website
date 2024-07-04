
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function SignOutComponent() {
    
    // const session = await getServerSession();
    // if (!session) {
    //     return (
    //         <button
    //             className="text-sm font-medium leading-6 text-gray-900"
    //             onClick={() => signIn()}
    //         >
    //             Sign In
    //         </button>
    //     )
    // }

    return (
        <Button onClick={() => signOut()}>Sign out</Button>
    )
}