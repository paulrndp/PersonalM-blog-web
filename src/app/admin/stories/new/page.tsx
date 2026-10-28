import Link from "next/link";
import { createStory } from "@/actions/stories";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewStoryPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    await createStory(formData);
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
          Create New Story
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Add a new serial novel or story collection to your catalog.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Story Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. The Whispering Pines"
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
                placeholder="e.g. Romance / Mystery"
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
                placeholder="e.g. #novel #romance #journey"
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
              placeholder="Describe the storyline, premise, or introduction..."
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Story Cover Image
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
            />
            <p className="text-[11px] text-stone-400">
              Recommended ratio: 4:5 or 16:10 portrait/landscape image (JPG, PNG).
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Create Story
          </button>
        </div>
      </form>
    </div>
  );
}
