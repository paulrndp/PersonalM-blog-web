"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide the public footer on admin dashboard routes to maximize workspace space
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-20 transition-colors duration-250"
      style={{
        backgroundColor: "var(--bg-subtle)",
        borderColor: "var(--border-main)",
        color: "var(--text-muted)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <div>
          <p
            className="font-serif text-sm font-semibold"
            style={{ color: "var(--text-main)" }}
          >
            Hannah Montemayor
          </p>
          <p className="mt-1" style={{ color: "var(--text-muted)" }}>
            &copy; {currentYear} All rights reserved. Crafted with Next.js &amp; PostgreSQL.
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/" className="nav-theme-link hover:underline transition">
            Home
          </Link>
          <Link href="/story" className="nav-theme-link hover:underline transition">
            Stories
          </Link>
          <Link href="/blog" className="nav-theme-link hover:underline transition">
            Blog
          </Link>
          <Link href="/random" className="nav-theme-link hover:underline transition">
            Random Thoughts
          </Link>
          <Link href="/login" className="nav-theme-link hover:underline transition">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
