"use client"
import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/secret");
    }

    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }

  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/secret");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Nav />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
            rel="noopener noreferrer"
          >
            By vaske
          </a>
        </div>
      </div>

      <div className="mt-32 flex items-center justify-center flex-col gap-10">
        <h1 className="md:text-5xl text-5xl">Login page</h1>
        <div className="h-1 border-t w-full"></div>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-7 flex-col w-full">
          <div className="flex items-start justify-start gap-3 flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
              placeholder="Email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex items-start justify-start gap-3 flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
              placeholder="Password"
              name="password"
              id="password"
            />
          </div>
          <Button type="submit" variant="default">Login</Button>
        </form>
        <div className="flex flex-row w-full items-center justify-center">
          <div className="h-1 border-t w-full" />
          <div className="w-full flex items-center justify-center text-center font-medium text-lg">
            or
          </div>
          <div className="h-1 border-t w-full" />
        </div>
        <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => {
              signIn("github");
            }}
          >
            Sign In with Github
          </button>
          <button
            className="w-full bg-[#4285F4] text-white py-2 rounded hover:bg-[#4285F4]"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign In with Google
          </button>
      </div>
    </main>
  );
}
