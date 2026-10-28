import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  BookOpen,
  FileText,
  Sparkles,
  FileEdit,
  Eye,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    storiesCount,
    blogCount,
    randomCount,
    draftsCount,
    totalStoryReads,
    recentPosts,
  ] = await Promise.all([
    prisma.story.count(),
    prisma.post.count({
      where: {
        status: "published",
        OR: [{ category: "Blog" }, { category: "Both" }],
      },
    }),
    prisma.post.count({
      where: {
        status: "published",
        OR: [{ category: "Random" }, { category: "Both" }],
      },
    }),
    prisma.post.count({
      where: { status: "draft" },
    }),
    prisma.story.aggregate({
      _sum: { views: true },
    }),
    prisma.post.findMany({
      take: 5,
      orderBy: { id: "desc" },
    }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Overview Dashboard
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Summary of stories, blog articles, visitor views, and drafts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Post
          </Link>
          <Link
            href="/admin/stories/new"
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            New Story
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Stories
            </span>
            <BookOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {storiesCount}
          </div>
          <p className="text-xs text-stone-500">
            {totalStoryReads._sum.views || 0} total chapter reads
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Blog Posts
            </span>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {blogCount}
          </div>
          <p className="text-xs text-stone-500">Published articles</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Random Thoughts
            </span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {randomCount}
          </div>
          <p className="text-xs text-stone-500">Published musings</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Drafts
            </span>
            <FileEdit className="w-5 h-5 text-stone-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {draftsCount}
          </div>
          <p className="text-xs text-stone-500">Unpublished works</p>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Recent Posts
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            View all posts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider border-b border-stone-200">
                <th className="py-3 px-5">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {recentPosts.map((post: any) => (
                <tr key={post.id} className="hover:bg-stone-50/60 transition">
                  <td className="py-3.5 px-5 font-medium text-stone-900 max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 px-4">{post.category}</td>
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
                    })}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-amber-800 hover:text-amber-950 font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
