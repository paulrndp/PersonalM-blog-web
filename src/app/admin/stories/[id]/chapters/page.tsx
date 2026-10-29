import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getStoryWithChapters, createChapter, deleteChapter } from "@/actions/stories";
import { ArrowLeft, PlusCircle, Trash2, Layers, Eye, BookOpen, Send } from "lucide-react";
import WYSIWYGEditor from "@/components/admin/WYSIWYGEditor";

export default async function AdminStoryChaptersPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const storyId = Number(id);
  const story = await getStoryWithChapters(storyId);

  if (!story) {
    notFound();
  }

  async function handleAddChapter(formData: FormData) {
    "use server";
    await createChapter(storyId, formData);
    redirect(`/admin/stories/${storyId}/chapters`);
  }

  return (
    <div className="max-w-5xl space-y-8">
      <Link
        href="/admin/stories"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to stories
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Chapters Manager
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
            {story.title}
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            {story.chapters.length} chapters published • {story.views || 0} total reads
          </p>
        </div>

        <Link
          href={`/story/${story.id}`}
          target="_blank"
          className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
        >
          View Public Page &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Existing Chapters List (2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-800" />
            Published Chapters
          </h2>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            {story.chapters.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                No chapters yet. Use the form on the right to add the first chapter!
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {story.chapters.map((chapter: any, index: number) => (
                  <div
                    key={chapter.id}
                    className="p-4 flex items-center justify-between hover:bg-stone-50/60 transition"
                  >
                    <div className="space-y-1 max-w-[75%]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          Part {index + 1}
                        </span>
                        <span className="text-[10px] text-stone-300">•</span>
                        <span className="text-[10px] text-stone-400">
                          {new Date(chapter.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-[10px] text-stone-300">•</span>
                        <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
                          <Eye className="w-2.5 h-2.5" /> {chapter.views || 0} reads
                        </span>
                      </div>

                      <h3 className="font-serif text-sm font-bold text-stone-900 truncate">
                        {chapter.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/story/read/${chapter.id}`}
                        target="_blank"
                        className="text-xs text-stone-400 hover:text-stone-700 font-medium px-2 py-1 rounded"
                      >
                        Preview
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteChapter(chapter.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-stone-400 hover:text-red-600 transition"
                          title="Delete Chapter"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add New Chapter Form */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-amber-800" />
            Add Chapter
          </h2>

          <form
            action={handleAddChapter}
            className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Chapter Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Chapter 1: The Departure"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>

            <WYSIWYGEditor
              name="content"
              label="Chapter Content (Rich Text / WYSIWYG)"
              placeholder="Write or format your serialized chapter text here..."
              minHeight="300px"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Publish Chapter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
