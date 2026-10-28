import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryWithChapters } from "@/actions/stories";
import { BookOpen, Layers, Eye, ArrowLeft, ArrowRight, Calendar } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const story = await getStoryWithChapters(Number(id));
  if (!story) return { title: "Story Not Found" };
  return {
    title: `${story.title} | Hannah Montemayor`,
    description: story.desc,
  };
}

export default async function StoryDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const story = await getStoryWithChapters(Number(id));

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link
        href="/story"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to all stories
      </Link>

      {/* Story Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
        <div className="md:w-72 md:shrink-0 aspect-[4/5] bg-stone-100 relative">
          <img
            src={`/api/story/${story.id}/cover`}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {story.genre && (
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-900">
                  {story.genre}
                </span>
              )}
              {story.tags && (
                <span className="text-xs text-stone-400">{story.tags}</span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {story.title}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {story.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center gap-6 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Layers className="w-4 h-4 text-stone-400" />
              {story.chapters.length} Total Chapters
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Eye className="w-4 h-4 text-stone-400" />
              {story.views || 0} Total Reads
            </span>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-800" />
            Table of Contents
          </h2>
          <span className="text-xs text-stone-400">
            {story.chapters.length} parts available
          </span>
        </div>

        {story.chapters.length === 0 ? (
          <p className="text-stone-500 italic py-6">
            No chapters published for this story yet.
          </p>
        ) : (
          <div className="divide-y divide-stone-200/70 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
            {story.chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                href={`/story/read/${chapter.id}`}
                className="group flex items-center justify-between p-5 hover:bg-stone-50/80 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                      Part {index + 1}
                    </span>
                    <span className="text-xs text-stone-300">•</span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(chapter.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition">
                    {chapter.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-stone-400 group-hover:text-amber-800 transition">
                  <span className="text-xs flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {chapter.views || 0}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
