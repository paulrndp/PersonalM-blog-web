import { getAccountProfile } from "@/actions/account";
import Link from "next/link";
import { BookOpen, Feather, Sparkles, Heart, Coffee, Compass } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Figure Me Out | Hannah Montemayor",
  description: "Get to know Hannah Montemayor — author, storyteller, and candid observer of life.",
};

export default async function FigureMeOutPage() {
  const profile = await getAccountProfile();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Intro Header */}
      <div className="text-center space-y-4 border-b border-stone-200 pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-sans">
          about the author
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          figure me out
        </h1>
        <p className="text-stone-500 font-serif italic text-lg max-w-xl mx-auto">
          &ldquo;Stories written from the heart, thoughts whispered to the stars.&rdquo;
        </p>
      </div>

      {/* Profile & Portrait Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl bg-stone-100">
              <img
                src="/api/account/avatar"
                alt="Hannah Montemayor"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-amber-100 border border-amber-200 text-amber-900 p-2.5 rounded-full shadow-md">
              <Feather className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            Author &amp; Storyteller
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Hello, I&apos;m {profile?.firstname || "Hannah"} {profile?.lastname || "Montemayor"}
          </h2>

          <div className="prose text-stone-600 text-base leading-relaxed space-y-3 font-sans">
            <p>
              {profile?.desc ||
                "Writer, storyteller, and creator of worlds. Welcome to my personal blog where I share my serialized novels, reflections, and candid thoughts."}
            </p>
            <p>
              Whether it&apos;s weaving complex romantic fantasy narratives in my novels or writing introspective essays over lukewarm midnight coffee, this digital journal is an unfiltered window into my creative mind.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/story"
              className="px-5 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-xs tracking-wider uppercase hover:bg-amber-950 transition flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Read My Stories
            </Link>
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 font-medium text-xs tracking-wider uppercase hover:bg-stone-50 transition flex items-center gap-2 shadow-sm"
            >
              Explore Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Fun Facts / Little Sparks */}
      <div className="bg-stone-50/80 rounded-2xl border border-stone-200/80 p-8 sm:p-10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-stone-900 text-center">
          a few little things about me
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Caffeine &amp; Solitude</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              My favorite writing hours are between 11 PM and 3 AM when the world is calm and stories flow naturally.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Raw Human Sentiments</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              I believe vulnerable honesty connects souls faster than any clever literary metaphor.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-900">Uncharted Paths</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every novel begins with a question I don&apos;t know the answer to, and writing it is how I find out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
