"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { requireAuth } from "@/lib/auth";
import { recordPostVisitor } from "@/lib/visitor";
import { revalidatePath } from "next/cache";

export interface PostFilterOptions {
  category?: "All" | "Blog" | "Random" | "Both";
  status?: "draft" | "published" | "all";
  limit?: number;
}

export async function getPosts(options: PostFilterOptions = {}) {
  const { category, status = "published", limit } = options;

  const whereClause: Prisma.PostWhereInput = {};

  if (status !== "all") {
    whereClause.status = status;
  }

  if (category && category !== "All") {
    whereClause.OR = [{ category }, { category: "Both" }];
  }

  return await prisma.post.findMany({
    where: whereClause,
    orderBy: { id: "desc" },
    take: limit,
  });
}

export async function getPostWithNavigation(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) return null;

  // Record visitor view
  await recordPostVisitor(post.id, post.category);

  // Find Next post (Id > currentId, ascending)
  const nextPost = await prisma.post.findFirst({
    where: {
      id: { gt: id },
      status: "published",
      ...(post.category === "Blog"
        ? { OR: [{ category: "Blog" }, { category: "Both" }] }
        : post.category === "Random"
        ? { OR: [{ category: "Random" }, { category: "Both" }] }
        : {}),
    },
    orderBy: { id: "asc" },
    select: { id: true, title: true },
  });

  // Find Prev post (Id < currentId, descending)
  const prevPost = await prisma.post.findFirst({
    where: {
      id: { lt: id },
      status: "published",
      ...(post.category === "Blog"
        ? { OR: [{ category: "Blog" }, { category: "Both" }] }
        : post.category === "Random"
        ? { OR: [{ category: "Random" }, { category: "Both" }] }
        : {}),
    },
    orderBy: { id: "desc" },
    select: { id: true, title: true },
  });

  return {
    post,
    next: nextPost,
    prev: prevPost,
  };
}

export async function createPost(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isBlog = formData.get("blog") === "Blog";
  const isRandom = formData.get("random") === "Random";
  const submitType = formData.get("submit") as string; // "Draft" or "Published"

  let category = "Blog";
  if (isBlog && isRandom) {
    category = "Both";
  } else if (isRandom) {
    category = "Random";
  }

  const status = submitType === "Draft" ? "draft" : "published";

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      category,
      status,
      views: 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/random");
  revalidatePath("/admin/posts");

  return { success: true, post: newPost };
}

export async function updatePost(id: number, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isBlog = formData.get("blog") === "Blog";
  const isRandom = formData.get("random") === "Random";
  const submitType = formData.get("submit") as string;

  let category = "Blog";
  if (isBlog && isRandom) {
    category = "Both";
  } else if (isRandom) {
    category = "Random";
  }

  const status = submitType === "Draft" ? "draft" : "published";

  const updated = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      category,
      status,
    },
  });

  revalidatePath("/");
  revalidatePath(`/blog/${id}`);
  revalidatePath("/blog");
  revalidatePath("/random");
  revalidatePath("/admin/posts");

  return { success: true, post: updated };
}

export async function deletePost(id: number) {
  await requireAuth();

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/random");
  revalidatePath("/admin/posts");

  return { success: true };
}
