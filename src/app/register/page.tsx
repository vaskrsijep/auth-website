"use client";
import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidMail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    console.log(email, password);

    if (!isValidMail(email)) {
      setError("Invalid email");
      return;
    }

    if (password.trim().length < 7) {
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("User already exists");
      } else if (res.status === 200) {
        setSuccess("User created successfully");
        
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h1 className="md:text-5xl text-5xl">Register page</h1>
        <div className="h-1 border-t w-full"></div>
        <div className={error ? "text-red-500" : "text-green-500"}>
          {error ? error : success}
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex items-center justify-center gap-7 flex-col w-full"
        >
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
          <Button type="submit" variant="default">
            Register
          </Button>
        </form>
        <div className="flex flex-row w-full items-center justify-center">
          <div className="h-1 border-t w-full" />
          <div className="w-full flex items-center justify-center text-center font-medium text-lg">
            or
          </div>
          <div className="h-1 border-t w-full" />
        </div>
      </div>
    </main>
  );
}
