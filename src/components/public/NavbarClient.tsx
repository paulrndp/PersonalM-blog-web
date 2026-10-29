"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function NavbarClient({ session }: { session: any }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Compact Mode when inside the Admin Panel
  if (isAdmin) {
    return (
      <header
        className="w-full border-b py-2 px-4 sm:px-8 z-40 transition-colors duration-250"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-main)",
        }}
      >
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
              <span
                className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: "var(--accent-subtle)",
                  color: "var(--accent-badge)",
                  borderColor: "var(--border-main)",
                }}
              >
                admin mode
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-5 text-xs font-sans tracking-normal">
              <Link
                href="/"
                className={`lowercase transition-colors ${
                  isActive("/") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                home
              </Link>
              <Link
                href="/figure-me-out"
                className={`lowercase transition-colors ${
                  isActive("/figure-me-out") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                figure me out
              </Link>
              <Link
                href="/story"
                className={`lowercase transition-colors ${
                  isActive("/story") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                stories
              </Link>
              <Link
                href="/blog"
                className={`lowercase transition-colors ${
                  isActive("/blog") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                blog
              </Link>
              <Link
                href="/random"
                className={`lowercase transition-colors ${
                  isActive("/random") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                random thoughts
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4 text-xs font-sans font-normal tracking-normal">
            <ThemeSwitcher inline />
            <Link
              href="/admin"
              className="lowercase font-semibold transition-colors"
              style={{ color: "var(--accent-main)" }}
            >
              dashboard
            </Link>
            <Link
              href="/"
              target="_blank"
              className="lowercase transition-colors hidden sm:inline nav-theme-link font-normal"
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
    <header
      className="w-full transition-colors duration-250 pt-4 sm:pt-6 pb-2"
      style={{
        backgroundColor: "var(--bg-page)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex items-end justify-between relative">
          {/* Left Navigation Links - Default Font */}
          <nav className="flex-1 flex items-center justify-around pb-3 pr-6 lg:pr-8">
            <Link
              href="/"
              className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                isActive("/") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              home
            </Link>
            <Link
              href="/figure-me-out"
              className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                isActive("/figure-me-out") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              figure me out
            </Link>
            <Link
              href="/story"
              className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                isActive("/story") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
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
              className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                isActive("/blog") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              blog
            </Link>
            <Link
              href="/random"
              className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                isActive("/random") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              random thoughts
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="lowercase font-sans font-semibold tracking-normal text-[15px] transition-colors"
                style={{ color: "var(--accent-main)" }}
              >
                dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={`lowercase font-sans tracking-normal text-[15px] transition-colors ${
                  isActive("/login") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
                sign in
              </Link>
            )}
            <ThemeSwitcher inline />
          </nav>
        </div>

        {/* Clean Horizontal Divider Line with Center Break for the Logo */}
        <div className="hidden md:flex items-center w-full -mt-2">
          <div
            className="flex-1 border-b transition-colors duration-250"
            style={{ borderColor: "var(--border-main)" }}
          />
          <div className="w-28 sm:w-32 lg:w-36 shrink-0 mx-6 lg:mx-8" />
          <div
            className="flex-1 border-b transition-colors duration-250"
            style={{ borderColor: "var(--border-main)" }}
          />
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
            <div
              className="flex-1 border-b transition-colors duration-250"
              style={{ borderColor: "var(--border-main)" }}
            />
            <span
              className="px-3 text-[11px] font-serif italic tracking-wider transition-colors duration-250"
              style={{ color: "var(--text-faint)" }}
            >
              hannah montemayor
            </span>
            <div
              className="flex-1 border-b transition-colors duration-250"
              style={{ borderColor: "var(--border-main)" }}
            />
          </div>

          {/* Mobile Nav Links - Default Font */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-sans tracking-normal px-2 pb-1">
            <Link
              href="/"
              className={`lowercase transition-colors ${
                isActive("/") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              home
            </Link>
            <Link
              href="/figure-me-out"
              className={`lowercase transition-colors ${
                isActive("/figure-me-out") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              figure me out
            </Link>
            <Link
              href="/story"
              className={`lowercase transition-colors ${
                isActive("/story") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              stories
            </Link>
            <Link
              href="/blog"
              className={`lowercase transition-colors ${
                isActive("/blog") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              blog
            </Link>
            <Link
              href="/random"
              className={`lowercase transition-colors ${
                isActive("/random") ? "nav-theme-link-active" : "nav-theme-link font-normal"
              }`}
            >
              random thoughts
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="lowercase font-semibold transition-colors"
                style={{ color: "var(--accent-main)" }}
              >
                dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={`lowercase transition-colors ${
                  isActive("/login") ? "nav-theme-link-active" : "nav-theme-link font-normal"
                }`}
              >
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
