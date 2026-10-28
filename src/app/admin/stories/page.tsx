import Link from "next/link";
import { getStories, deleteStory } from "@/actions/stories";
import { PlusCircle, BookOpen, Layers, Eye, Edit, Trash2 } from "lucide-react";

export default async function AdminStoriesPage() {
  const stories = await getStories();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Stories &amp; Chapters
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Manage your novels, series, and serialized chapters.
          </p>
        </div>

        <Link
          href="/admin/stories/new"
          className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm w-fit"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Create New Story
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {stories.length === 0 ? (
          <div className="text-center py-16 text-stone-500 text-sm">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            No stories created yet. Click &quot;Create New Story&quot; to begin!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3 px-5">Story</th>
                  <th className="py-3 px-4">Genre &amp; Tags</th>
                  <th className="py-3 px-4">Chapters</th>
                  <th className="py-3 px-4">Total Reads</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {stories.map((story: any) => (
                  <tr key={story.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 rounded overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                          <img
                            src={`/api/story/${story.id}/cover`}
                            alt={story.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-serif font-bold text-stone-900 text-sm block">
                            {story.title}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1 max-w-xs">
                            {story.desc}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-stone-800 block">
                          {story.genre || "General"}
                        </span>
                        <span className="text-stone-400 text-[10px]">
                          {story.tags || "—"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/stories/${story.id}/chapters`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition"
                      >
                        <Layers className="w-3.5 h-3.5 text-stone-500" />
                        {story.chapters.length} Chapters
                      </Link>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                        {story.views || 0}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right space-x-2">
                      <Link
                        href={`/admin/stories/${story.id}/chapters`}
                        className="px-2.5 py-1 text-xs rounded bg-stone-900 text-white hover:bg-amber-900 transition font-medium inline-block"
                      >
                        Chapters
                      </Link>

                      <Link
                        href={`/admin/stories/${story.id}/edit`}
                        className="p-1.5 inline-block text-stone-500 hover:text-amber-800 transition"
                        title="Edit Story"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteStory(story.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-stone-400 hover:text-red-600 transition"
                          title="Delete Story"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
