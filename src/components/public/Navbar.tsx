import Link from "next/link";
import { getSession } from "@/lib/auth";

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="w-full bg-[#faf9f6] pt-6 sm:pt-8 pb-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex items-end justify-between relative">
          {/* Left Navigation Links */}
          <nav className="flex-1 flex items-center justify-around pb-3 pr-6 lg:pr-10">
            <Link
              href="/"
              className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-700 hover:text-black hover:tracking-[0.26em] transition-all duration-200"
            >
              home
            </Link>
            <Link
              href="/figure-me-out"
              className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-700 hover:text-black hover:tracking-[0.26em] transition-all duration-200"
            >
              figure me out
            </Link>
            <Link
              href="/story"
              className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-700 hover:text-black hover:tracking-[0.26em] transition-all duration-200"
            >
              stories
            </Link>
          </nav>

          {/* Center Logo Illustration */}
          <div className="shrink-0 px-6 lg:px-8 flex flex-col items-center">
            <Link href="/" className="group block focus:outline-none" title="Hannah Montemayor">
              <img
                src="/images/logo-hannahm.png"
                alt="hannah m."
                className="w-36 lg:w-44 h-auto object-contain transition duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* Right Navigation Links */}
          <nav className="flex-1 flex items-center justify-around pb-3 pl-6 lg:pl-10">
            <Link
              href="/blog"
              className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-700 hover:text-black hover:tracking-[0.26em] transition-all duration-200"
            >
              blog
            </Link>
            <Link
              href="/random"
              className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-700 hover:text-black hover:tracking-[0.26em] transition-all duration-200"
            >
              random thoughts
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="lowercase text-[15px] font-medium tracking-[0.22em] text-amber-900 hover:text-amber-950 transition-all duration-200"
              >
                dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="lowercase text-[15px] font-light tracking-[0.22em] text-stone-400 hover:text-stone-800 transition-all duration-200"
              >
                sign in
              </Link>
            )}
          </nav>
        </div>

        {/* Clean Horizontal Divider Line with Center Break for the Logo */}
        <div className="hidden md:flex items-center w-full -mt-2">
          <div className="flex-1 border-b border-stone-300" />
          <div className="w-36 lg:w-44 shrink-0 mx-6 lg:mx-8" />
          <div className="flex-1 border-b border-stone-300" />
        </div>

        {/* Mobile Header Layout (< 768px) */}
        <div className="md:hidden flex flex-col items-center space-y-4">
          <Link href="/" className="group block focus:outline-none">
            <img
              src="/images/logo-hannahm.png"
              alt="hannah m."
              className="w-32 h-auto object-contain mx-auto transition duration-300 group-hover:opacity-90"
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

          {/* Mobile Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-light tracking-[0.16em] text-stone-700 px-2 pb-1">
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
          </nav>
        </div>
      </div>
    </header>
  );
}
