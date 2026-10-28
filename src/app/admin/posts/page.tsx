import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/actions/posts";
import { PlusCircle, FileText, Trash2, Edit } from "lucide-react";

export default async function AdminPostsPage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "All" } = await props.searchParams;

  const whereClause: any = {};
  if (tab === "Blog") {
    whereClause.OR = [{ category: "Blog" }, { category: "Both" }];
  } else if (tab === "Random") {
    whereClause.OR = [{ category: "Random" }, { category: "Both" }];
  } else if (tab === "Drafts") {
    whereClause.status = "draft";
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Posts Management
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Create, edit, organize, and publish your articles and random thoughts.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm w-fit"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Create New Post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 text-xs font-semibold">
        {["All", "Blog", "Random", "Drafts"].map((item) => (
          <Link
            key={item}
            href={`/admin/posts?tab=${item}`}
            className={`pb-3 px-3 border-b-2 transition ${
              tab === item
                ? "border-amber-800 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-stone-500 text-sm">
            <FileText className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            No posts found in this category.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3 px-5">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-3.5 px-5 font-medium text-stone-900 max-w-sm truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-4 font-medium">{post.category}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{post.views || 0}</td>
                    <td className="py-3.5 px-4 text-stone-400">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-1.5 inline-block text-stone-500 hover:text-amber-800 transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deletePost(post.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-stone-400 hover:text-red-600 transition"
                          title="Delete"
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
