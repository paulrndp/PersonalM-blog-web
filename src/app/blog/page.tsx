import Link from "next/link";
import { getPosts } from "@/actions/posts";
import { ArrowRight, Eye, Calendar, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog | Hannah Montemayor",
  description: "Read articles, reflections, and insights by Hannah Montemayor.",
};

export default async function BlogPage() {
  const posts = await getPosts({ category: "Blog", status: "published" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
          Articles &amp; Essays
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mt-1">
          The Blog
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Essays on storytelling, creativity, life lessons, and quiet observations.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 font-serif text-lg">No blog posts available right now.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-200 transition"
            >
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="text-amber-800 font-semibold">{post.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {post.views || 0} reads
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>

              <div
                className="mt-3 text-stone-600 text-sm sm:text-base line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content ? post.content.slice(0, 250) : "",
                }}
              />

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5"
                >
                  Continue reading <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
