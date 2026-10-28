"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/account";
import { Feather, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const res = await loginAction(formData);
      return res || null;
    },
    null
  );

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 mx-auto flex items-center justify-center">
            <Feather className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Author Login
          </h1>
          <p className="text-xs text-stone-500">
            Enter your credentials to access the HannahM Admin Dashboard.
          </p>
        </div>

        {state?.error && (
          <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"
                name="username"
                required
                defaultValue="admin"
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="password"
                name="password"
                required
                defaultValue="password"
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 rounded-lg bg-stone-900 hover:bg-amber-900 text-white font-medium text-sm transition shadow-sm disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
