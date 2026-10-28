import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapterWithNavigation } from "@/actions/stories";
import { ArrowLeft, ArrowRight, BookOpen, Eye, List } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getChapterWithNavigation(Number(id));
  if (!data) return { title: "Chapter Not Found" };
  return {
    title: `${data.chapter.title} - ${data.story.title} | Hannah Montemayor`,
  };
}

export default async function ChapterReaderPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getChapterWithNavigation(Number(id));

  if (!data) {
    notFound();
  }

  const { chapter, story, prev, next } = data;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4 text-xs text-stone-500">
        <Link
          href={`/story/${story.id}`}
          className="inline-flex items-center gap-1.5 font-medium hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {story.title}
        </Link>

        <span className="inline-flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {chapter.views || 0} reads
        </span>
      </div>

      {/* Chapter Heading */}
      <div className="text-center space-y-3 pt-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          {story.title}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          {chapter.title}
        </h1>
        <p className="text-xs text-stone-400">
          Published on{" "}
          {new Date(chapter.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Chapter Content Body */}
      <div
        className="prose prose-stone max-w-none text-base sm:text-lg text-stone-800 leading-relaxed font-serif pt-4"
        dangerouslySetInnerHTML={{ __html: chapter.content || "" }}
      />

      {/* Prev / Next Navigation Bar */}
      <div className="border-t border-b border-stone-200 py-6 my-12 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/story/read/${prev.id}`}
            className="flex flex-col text-left group"
          >
            <span className="text-xs text-stone-400 inline-flex items-center gap-1 group-hover:text-amber-800">
              <ArrowLeft className="w-3 h-3" /> Previous Part
            </span>
            <span className="font-serif text-sm sm:text-base font-semibold text-stone-800 group-hover:text-amber-800 transition line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/story/${story.id}`}
          className="p-2.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition"
          title="Table of Contents"
        >
          <List className="w-5 h-5" />
        </Link>

        {next ? (
          <Link
            href={`/story/read/${next.id}`}
            className="flex flex-col text-right group"
          >
            <span className="text-xs text-stone-400 inline-flex items-center justify-end gap-1 group-hover:text-amber-800">
              Next Part <ArrowRight className="w-3 h-3" />
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
