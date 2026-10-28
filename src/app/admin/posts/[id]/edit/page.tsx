import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/actions/posts";
import { ArrowLeft, Save, Send } from "lucide-react";

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const postId = Number(id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updatePost(postId, formData);
    redirect("/admin/posts");
  }

  const isBlog = post.category === "Blog" || post.category === "Both";
  const isRandom = post.category === "Random" || post.category === "Both";

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to posts
      </Link>

      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Edit Post
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Update the content or change the publication status.
        </p>
      </div>

      <form action={handleUpdate} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={post.title || ""}
              placeholder="Enter post title..."
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Category Placement
            </label>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="blog"
                  value="Blog"
                  defaultChecked={isBlog}
                  className="rounded border-stone-300 text-amber-800 focus:ring-amber-800"
                />
                Blog Article
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="random"
                  value="Random"
                  defaultChecked={isRandom}
                  className="rounded border-stone-300 text-amber-800 focus:ring-amber-800"
                />
                Random Thoughts
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Post Content (HTML or plain text)
            </label>
            <textarea
              name="content"
              rows={14}
              required
              defaultValue={post.content || ""}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            name="submit"
            value="Draft"
            className="px-5 py-2.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            Save as Draft
          </button>

          <button
            type="submit"
            name="submit"
            value="Published"
            className="px-6 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            Update &amp; Publish
          </button>
        </div>
      </form>
    </div>
  );
}
