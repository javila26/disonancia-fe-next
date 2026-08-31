"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

import { useRouter } from "next/navigation";

export default function Register() {
  const { register, loading, error, token, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    const result = await register(formData);

    if (result) router.push("/admin");
  };

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-white/15 bg-white/2 text-white shadow-none backdrop-blur-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="font-[roboto_mono] text-3xl font-semibold tracking-tight">Register</CardTitle>
          <CardDescription className="font-[plus_jakarta_sans] text-base text-stone-300">
            Create your account and get ready to manage vinyls.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block font-[plus_jakarta_sans] text-sm text-stone-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                className="w-full border border-white/15 bg-transparent px-4 py-3 font-[plus_jakarta_sans] text-white outline-none transition focus:border-white/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-[plus_jakarta_sans] text-sm text-stone-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
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
                placeholder="Create a password"
                value={formData.password}
                onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                className="w-full border border-white/15 bg-transparent px-4 py-3 font-[plus_jakarta_sans] text-white outline-none transition focus:border-white/40"
              />
            </div>

            {error && <p className="font-[plus_jakarta_sans] text-sm text-red-300">{error}</p>}
            {token && <p className="font-[plus_jakarta_sans] text-sm text-emerald-300">Token saved successfully.</p>}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-none bg-white font-[roboto_mono] text-sm font-semibold uppercase tracking-[0.2em] text-black hover:bg-stone-200"
            >
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center font-[plus_jakarta_sans] text-sm text-stone-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
