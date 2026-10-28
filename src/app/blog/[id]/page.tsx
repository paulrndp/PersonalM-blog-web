import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostWithNavigation } from "@/actions/posts";
import { ArrowLeft, ArrowRight, Calendar, Eye, Share2 } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getPostWithNavigation(Number(id));
  if (!data?.post) return { title: "Post Not Found" };
  return {
    title: `${data.post.title} | Hannah Montemayor`,
  };
}

export default async function BlogPostReaderPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getPostWithNavigation(Number(id));

  if (!data?.post) {
    notFound();
  }

  const { post, prev, next } = data;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
      </Link>

      <div className="space-y-4 border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold tracking-wide uppercase">
          <span>{post.category}</span>
          <span>•</span>
          <span className="text-stone-400 font-normal">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="text-stone-400 font-normal flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {post.views || 0} views
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          {post.title}
        </h1>
      </div>

      <div
        className="prose prose-stone max-w-none text-base sm:text-lg text-stone-800 leading-relaxed font-serif"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      {/* Prev / Next Navigation */}
      <div className="border-t border-b border-stone-200 py-6 my-12 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.id}`}
            className="flex flex-col text-left group max-w-[45%]"
          >
            <span className="text-xs text-stone-400 inline-flex items-center gap-1 group-hover:text-amber-800">
              <ArrowLeft className="w-3 h-3" /> Previous Post
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-stone-800 group-hover:text-amber-800 transition line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/blog/${next.id}`}
            className="flex flex-col text-right group max-w-[45%]"
          >
            <span className="text-xs text-stone-400 inline-flex items-center justify-end gap-1 group-hover:text-amber-800">
              Next Post <ArrowRight className="w-3 h-3" />
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-stone-800 group-hover:text-amber-800 transition line-clamp-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
