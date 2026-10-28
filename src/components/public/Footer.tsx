import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          <p className="font-serif text-sm font-semibold text-stone-800">
            Hannah Montemayor
          </p>
          <p className="mt-1">
            &copy; {currentYear} All rights reserved. Crafted with Next.js &amp; PostgreSQL.
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-stone-900 transition">
            Home
          </Link>
          <Link href="/story" className="hover:text-stone-900 transition">
            Stories
          </Link>
          <Link href="/blog" className="hover:text-stone-900 transition">
            Blog
          </Link>
          <Link href="/random" className="hover:text-stone-900 transition">
            Random Thoughts
          </Link>
          <Link href="/login" className="hover:text-stone-900 transition">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
