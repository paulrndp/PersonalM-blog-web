"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function NavbarClient({ session }: { session: any }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Compact Mode when inside the Admin Panel
  if (isAdmin) {
    return (
      <header className="w-full bg-white border-b border-stone-200 py-2 px-4 sm:px-8 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group"
              title="Return to Public Site"
            >
              <img
                src="/images/logo-hannahm.png"
                alt="hannah m."
                className="h-8 w-auto object-contain theme-logo-invert"
              />
              <span className="text-[10px] font-sans font-semibold tracking-wider text-amber-900 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                admin mode
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-5 text-xs font-sans font-normal tracking-normal text-stone-600">
              <Link href="/" className="lowercase hover:text-stone-950 transition-colors">
                home
              </Link>
              <Link href="/figure-me-out" className="lowercase hover:text-stone-950 transition-colors">
                figure me out
              </Link>
              <Link href="/story" className="lowercase hover:text-stone-950 transition-colors">
                stories
              </Link>
              <Link href="/blog" className="lowercase hover:text-stone-950 transition-colors">
                blog
              </Link>
              <Link href="/random" className="lowercase hover:text-stone-950 transition-colors">
                random thoughts
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4 text-xs font-sans font-normal tracking-normal">
            <ThemeSwitcher inline />
            <Link
              href="/admin"
              className="lowercase font-semibold text-amber-800 hover:text-amber-950 transition-colors"
            >
              dashboard
            </Link>
            <Link
              href="/"
              target="_blank"
              className="lowercase text-stone-500 hover:text-stone-800 transition-colors hidden sm:inline"
            >
              view public site &rarr;
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Signature Full Layout for Public Pages
  return (
    <header className="w-full bg-[#faf9f6] pt-4 sm:pt-6 pb-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex items-end justify-between relative">
          {/* Left Navigation Links - Default Font */}
          <nav className="flex-1 flex items-center justify-around pb-3 pr-6 lg:pr-8">
            <Link
              href="/"
              className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-600 hover:text-stone-950 transition-colors"
            >
              home
            </Link>
            <Link
              href="/figure-me-out"
              className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-600 hover:text-stone-950 transition-colors"
            >
              figure me out
            </Link>
            <Link
              href="/story"
              className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-600 hover:text-stone-950 transition-colors"
            >
              stories
            </Link>
          </nav>

          {/* Center Logo Illustration - Balanced Proportion */}
          <div className="shrink-0 px-6 lg:px-8 flex flex-col items-center">
            <Link href="/" className="group block focus:outline-none" title="Hannah Montemayor">
              <img
                src="/images/logo-hannahm.png"
                alt="hannah m."
                className="w-28 sm:w-32 lg:w-36 h-auto object-contain transition duration-300 group-hover:opacity-90 group-hover:scale-[1.02] theme-logo-invert"
              />
            </Link>
          </div>

          {/* Right Navigation Links - Default Font */}
          <nav className="flex-1 flex items-center justify-around pb-3 pl-6 lg:pl-8">
            <Link
              href="/blog"
              className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-600 hover:text-stone-950 transition-colors"
            >
              blog
            </Link>
            <Link
              href="/random"
              className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-600 hover:text-stone-950 transition-colors"
            >
              random thoughts
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="lowercase font-sans font-semibold tracking-normal text-[15px] text-amber-900 hover:text-amber-950 transition-colors"
              >
                dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="lowercase font-sans font-normal tracking-normal text-[15px] text-stone-400 hover:text-stone-800 transition-colors"
              >
                sign in
              </Link>
            )}
            <ThemeSwitcher inline />
          </nav>
        </div>

        {/* Clean Horizontal Divider Line with Center Break for the Logo */}
        <div className="hidden md:flex items-center w-full -mt-2">
          <div className="flex-1 border-b border-stone-300" />
          <div className="w-28 sm:w-32 lg:w-36 shrink-0 mx-6 lg:mx-8" />
          <div className="flex-1 border-b border-stone-300" />
        </div>

        {/* Mobile Header Layout (< 768px) */}
        <div className="md:hidden flex flex-col items-center space-y-3 pb-2">
          <Link href="/" className="group block focus:outline-none">
            <img
              src="/images/logo-hannahm.png"
              alt="hannah m."
              className="w-28 h-auto object-contain mx-auto transition duration-300 group-hover:opacity-90 theme-logo-invert"
            />
          </Link>

          {/* Mobile Divider Line */}
          <div className="w-full flex items-center px-4">
            <div className="flex-1 border-b border-stone-300" />
            <span className="px-3 text-[11px] text-stone-400 font-serif italic tracking-wider">
              hannah montemayor
            </span>
            <div className="flex-1 border-b border-stone-300" />
          </div>

          {/* Mobile Nav Links - Default Font */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-sans font-normal tracking-normal text-stone-600 px-2 pb-1">
            <Link href="/" className="lowercase hover:text-black">
              home
            </Link>
            <Link href="/figure-me-out" className="lowercase hover:text-black">
              figure me out
            </Link>
            <Link href="/story" className="lowercase hover:text-black">
              stories
            </Link>
            <Link href="/blog" className="lowercase hover:text-black">
              blog
            </Link>
            <Link href="/random" className="lowercase hover:text-black">
              random thoughts
            </Link>
            {session ? (
              <Link href="/admin" className="lowercase font-semibold text-amber-900">
                dashboard
              </Link>
            ) : (
              <Link href="/login" className="lowercase text-stone-400 hover:text-stone-800">
                sign in
              </Link>
            )}
            <ThemeSwitcher inline />
          </nav>
        </div>
      </div>
    </header>
  );
}
