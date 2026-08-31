"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-white/15 bg-white/5 text-white shadow-none backdrop-blur-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="font-[roboto_mono] text-3xl font-semibold tracking-tight">Login</CardTitle>
          <CardDescription className="font-[plus_jakarta_sans] text-base text-stone-300">
            Sign in to continue managing your vinyl collection.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-[plus_jakarta_sans] text-sm text-stone-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-white/15 bg-transparent px-4 py-3 font-[plus_jakarta_sans] text-white outline-none transition focus:border-white/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block font-[plus_jakarta_sans] text-sm text-stone-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-white/15 bg-transparent px-4 py-3 font-[plus_jakarta_sans] text-white outline-none transition focus:border-white/40"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-none bg-white font-[roboto_mono] text-sm font-semibold uppercase tracking-[0.2em] text-black hover:bg-stone-200"
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center font-[plus_jakarta_sans] text-sm text-stone-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-white underline underline-offset-4">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
