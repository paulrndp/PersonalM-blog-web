import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateStory } from "@/actions/stories";
import { ArrowLeft, Save } from "lucide-react";

export default async function EditStoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const storyId = Number(id);
  const story = await prisma.story.findUnique({
    where: { id: storyId },
  });

  if (!story) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateStory(storyId, formData);
    redirect("/admin/stories");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/admin/stories"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to stories
      </Link>

      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Edit Story
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Update the metadata, synopsis, or cover for &quot;{story.title}&quot;.
        </p>
      </div>

      <form action={handleUpdate} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Story Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={story.title}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                defaultValue={story.genre || ""}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                defaultValue={story.tags || ""}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Synopsis / Description
            </label>
            <textarea
              name="desc"
              rows={4}
              required
              defaultValue={story.desc}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-700 block">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 rounded bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                <img
                  src={`/api/story/${story.id}/cover`}
                  alt="Current cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
                />
                <p className="text-[11px] text-stone-400">
                  Leave empty if you don&apos;t want to change the existing cover.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
