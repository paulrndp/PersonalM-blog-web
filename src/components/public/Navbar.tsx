import Link from "next/link";
import { BookOpen, Feather, Sparkles, User, FileText } from "lucide-react";
import { getSession } from "@/lib/auth";

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition">
            Hannah Montemayor
          </span>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-sans">
            Novels, Blog &amp; Thoughts
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-stone-700">
          <Link
            href="/"
            className="hover:text-amber-800 transition pb-1 border-b-2 border-transparent hover:border-amber-800"
          >
            Home
          </Link>
          <Link
            href="/story"
            className="hover:text-amber-800 transition pb-1 border-b-2 border-transparent hover:border-amber-800"
          >
            Stories
          </Link>
          <Link
            href="/blog"
            className="hover:text-amber-800 transition pb-1 border-b-2 border-transparent hover:border-amber-800"
          >
            Blog
          </Link>
          <Link
            href="/random"
            className="hover:text-amber-800 transition pb-1 border-b-2 border-transparent hover:border-amber-800"
          >
            Random Thoughts
          </Link>

          {session ? (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-stone-900 text-white hover:bg-amber-900 transition"
            >
              <User className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs text-stone-400 hover:text-stone-700 transition"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile quick links */}
        <div className="md:hidden flex items-center space-x-3 text-xs">
          <Link href="/story" className="text-stone-700 hover:text-amber-800">
            Stories
          </Link>
          <Link href="/blog" className="text-stone-700 hover:text-amber-800">
            Blog
          </Link>
          <Link href="/random" className="text-stone-700 hover:text-amber-800">
            Random
          </Link>
        </div>
      </div>
    </header>
  );
}
