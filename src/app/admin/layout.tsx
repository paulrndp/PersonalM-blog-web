import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { logoutAction } from "@/actions/account";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BookOpen,
  User,
  LogOut,
  ExternalLink,
  Feather,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-bold">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base block leading-tight">
                  HannahM
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-400">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          <nav className="p-4 space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-stone-400" />
              Overview
            </Link>

            <div className="pt-4 pb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Content
            </div>

            <Link
              href="/admin/posts"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <FileText className="w-4 h-4 text-stone-400" />
              All Posts
            </Link>

            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <PlusCircle className="w-4 h-4 text-amber-500" />
              Write New Post
            </Link>

            <Link
              href="/admin/stories"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <BookOpen className="w-4 h-4 text-stone-400" />
              Stories &amp; Chapters
            </Link>

            <div className="pt-4 pb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Settings
            </div>

            <Link
              href="/admin/account"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <User className="w-4 h-4 text-stone-400" />
              My Profile
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <ExternalLink className="w-4 h-4 text-stone-400" />
              View Public Site
            </Link>
          </nav>
        </div>

        {/* User bar & Logout */}
        <div className="p-4 border-t border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-700">
              <img
                src="/api/account/avatar"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-semibold text-white block">
                {session.username}
              </span>
              <span className="text-stone-400 text-[10px]">Administrator</span>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-red-400 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
