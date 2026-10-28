import Link from "next/link";
import { getPosts } from "@/actions/posts";
import { Sparkles, Eye, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Random Thoughts | Hannah Montemayor",
  description: "Casual thoughts, musings, and momentary reflections.",
};

export default async function RandomThoughtsPage() {
  const posts = await getPosts({ category: "Random", status: "published" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Musings &amp; Notes
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mt-1">
          Random Thoughts
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Candid thoughts, brief notes, and little sparks of everyday life.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 font-serif text-lg">No random thoughts recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-amber-50/50 border border-amber-200/50 p-6 sm:p-8 rounded-2xl shadow-sm hover:border-amber-300 transition space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1 text-stone-500">
                  <Eye className="w-3 h-3" /> {post.views || 0} views
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900">
                <Link href={`/blog/${post.id}`} className="hover:text-amber-800 transition">
                  {post.title}
                </Link>
              </h2>

              <div
                className="text-stone-700 leading-relaxed font-serif text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
