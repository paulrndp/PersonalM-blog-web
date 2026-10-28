import Link from "next/link";
import { getStories } from "@/actions/stories";
import { getPosts } from "@/actions/posts";
import { getAccountProfile } from "@/actions/account";
import { BookOpen, Sparkles, Feather, ArrowRight, Eye, Layers } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [stories, recentPosts, randomPosts, profile] = await Promise.all([
    getStories(),
    getPosts({ category: "Blog", status: "published", limit: 4 }),
    getPosts({ category: "Random", status: "published", limit: 3 }),
    getAccountProfile(),
  ]);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/80 to-transparent border-b border-stone-200/60 pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-stone-200">
              <img
                src="/api/account/avatar"
                alt="Hannah Montemayor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-200/50">
                <Feather className="w-3.5 h-3.5" />
                Author &amp; Storyteller
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Stories written from the heart, thoughts whispered to the stars.
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                {profile?.desc ||
                  "Welcome to my official digital home. Here you will find my serialized novels, introspective blog posts, and honest late-night thoughts."}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <Link
                  href="/story"
                  className="px-5 py-2.5 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-amber-900 transition flex items-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Stories
                </Link>
                <Link
                  href="/blog"
                  className="px-5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 font-medium text-sm hover:bg-stone-50 transition flex items-center gap-2 shadow-sm"
                >
                  Read Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              Serialized Works
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Featured Stories
            </h2>
          </div>
          <Link
            href="/story"
            className="text-sm font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            All Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {stories.length === 0 ? (
          <p className="text-stone-500 italic py-8">No stories published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img
                    src={`/api/story/${story.id}/cover`}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {story.genre && (
                    <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      {story.genre}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition line-clamp-1">
                      <Link href={`/story/${story.id}`}>{story.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {story.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        {story.chapters.length || story.totalChapters || 0} Ch.
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {story.views || 0} reads
                      </span>
                    </div>

                    <Link
                      href={`/story/${story.id}`}
                      className="font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Blog Posts Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              Articles &amp; Reflections
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            Browse Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-stone-500 italic py-8">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-sm hover:border-amber-200 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="text-amber-800 font-medium">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views || 0} views
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 hover:text-amber-800 transition">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  <div
                    className="text-sm text-stone-600 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: post.content ? post.content.slice(0, 180) : "",
                    }}
                  />
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5"
                  >
                    Read full article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Random Thoughts Stream */}
      {randomPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4 text-amber-800 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Random Thoughts</span>
            </div>

            <div className="space-y-6 divide-y divide-amber-200/40">
              {randomPosts.map((post) => (
                <div key={post.id} className="pt-5 first:pt-0">
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    <Link
                      href={`/blog/${post.id}`}
                      className="hover:text-amber-800 transition"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <div
                    className="text-sm text-stone-600 mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                  />
                  <div className="mt-3 text-xs text-stone-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/40 text-right">
              <Link
                href="/random"
                className="text-xs font-semibold text-amber-900 hover:underline inline-flex items-center gap-1"
              >
                View all thoughts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
