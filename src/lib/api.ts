const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface Story {
  id: number;
  title: string;
  desc: string;
  tags?: string | null;
  genre?: string | null;
  cover?: any;
  views?: number | null;
  totalChapters?: number | null;
  createdAt: string;
  chapters: ChapterSummary[];
}

export interface ChapterSummary {
  id: number;
  title: string;
  views?: number | null;
  createdAt: string;
}

export interface ChapterDetail {
  id: number;
  storyId: number;
  title: string;
  content?: string | null;
  views?: number | null;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content?: string | null;
  category: string;
  status: string;
  views?: number | null;
  createdAt: string;
}

export interface AuthorProfile {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  desc?: string | null;
}

export async function fetchStories(): Promise<Story[]> {
  try {
    const res = await fetch(`${API_BASE}/stories`, { next: { revalidate: 60 } });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("fetchStories error:", error);
    return [];
  }
}

export async function fetchStoryById(id: number): Promise<Story | null> {
  try {
    const res = await fetch(`${API_BASE}/stories/${id}`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("fetchStoryById error:", error);
    return null;
  }
}

export async function fetchChapterById(id: number) {
  try {
    const res = await fetch(`${API_BASE}/stories/chapters/${id}`, { cache: "no-store" });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("fetchChapterById error:", error);
    return null;
  }
}

export async function fetchPosts(params: {
  category?: string;
  status?: string;
  limit?: number;
} = {}): Promise<Post[]> {
  try {
    const url = new URL(`${API_BASE}/posts`);
    if (params.category) url.searchParams.set("category", params.category);
    if (params.status) url.searchParams.set("status", params.status);
    if (params.limit) url.searchParams.set("limit", String(params.limit));

    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("fetchPosts error:", error);
    return [];
  }
}

export async function fetchPostById(id: number) {
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, { cache: "no-store" });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("fetchPostById error:", error);
    return null;
  }
}

export async function fetchStatsOverview(token: string) {
  try {
    const res = await fetch(`${API_BASE}/stats/overview`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("fetchStatsOverview error:", error);
    return null;
  }
}

export async function fetchAuthorProfile(): Promise<AuthorProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/avatar`, { next: { revalidate: 120 } });
    // Or call auth me if token available
    return null;
  } catch {
    return null;
  }
}

export async function trackPostView(postId: number, category?: string) {
  try {
    await fetch(`${API_BASE}/visitors/post/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
      cache: "no-store",
    });
  } catch (e) {
    // Non-blocking analytics error
  }
}

export async function trackChapterView(chapterId: number) {
  try {
    await fetch(`${API_BASE}/visitors/chapter/${chapterId}`, {
      method: "POST",
      cache: "no-store",
    });
  } catch (e) {
    // Non-blocking analytics error
  }
}
