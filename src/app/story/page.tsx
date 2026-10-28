import Link from "next/link";
import { getStories } from "@/actions/stories";
import { Layers, Eye, BookOpen, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Stories | Hannah Montemayor",
  description: "Browse original fiction, novels, and serialized chapters.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
          Library
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mt-1">
          Serialized Stories
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Immerse yourself in original stories, ongoing series, and published chapters.
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 font-serif text-lg">No stories published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img
                    src={`/api/story/${story.id}/cover`}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {story.genre && (
                    <span className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      {story.genre}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                    <Link href={`/story/${story.id}`}>{story.title}</Link>
                  </h2>
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                    {story.desc}
                  </p>
                  {story.tags && (
                    <p className="text-[11px] text-amber-800 font-medium">
                      {story.tags}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 mt-4">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {story.chapters.length || story.totalChapters || 0} Ch.
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {story.views || 0}
                    </span>
                  </div>

                  <Link
                    href={`/story/${story.id}`}
                    className="font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                  >
                    View Chapters <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
