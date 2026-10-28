"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { recordChapterVisitor } from "@/lib/visitor";
import { revalidatePath } from "next/cache";

export async function getStories() {
  return await prisma.story.findMany({
    orderBy: { id: "desc" },
    include: {
      chapters: {
        select: { id: true, title: true, views: true, createdAt: true },
        orderBy: { id: "asc" },
      },
    },
  });
}

export async function getStoryWithChapters(id: number) {
  const story = await prisma.story.findUnique({
    where: { id },
    include: {
      chapters: {
        orderBy: { id: "asc" },
      },
    },
  });

  return story;
}

export async function getChapterWithNavigation(id: number) {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      story: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!chapter) return null;

  // Record visitor view and update story aggregate views
  await recordChapterVisitor(chapter.id, chapter.storyId);

  // Get all chapters for this story sorted by id
  const allStoryChapters = await prisma.chapter.findMany({
    where: { storyId: chapter.storyId },
    orderBy: { id: "asc" },
    select: { id: true, title: true },
  });

  const currentIndex = allStoryChapters.findIndex((c: any) => c.id === id);
  const minId = allStoryChapters[0]?.id;
  const maxId = allStoryChapters[allStoryChapters.length - 1]?.id;
  const prevChapter = currentIndex > 0 ? allStoryChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < allStoryChapters.length - 1
      ? allStoryChapters[currentIndex + 1]
      : null;

  return {
    chapter,
    story: chapter.story,
    allChapters: allStoryChapters,
    minId,
    maxId,
    prev: prevChapter,
    next: nextChapter,
  };
}

export async function createStory(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const tags = (formData.get("tags") as string) || null;
  const genre = (formData.get("genre") as string) || null;
  const coverFile = formData.get("cover") as File | null;

  let coverBytes: Uint8Array<ArrayBuffer> | null = null;
  if (coverFile && coverFile.size > 0) {
    coverBytes = Buffer.from(await coverFile.arrayBuffer()) as unknown as Uint8Array<ArrayBuffer>;
  }

  const newStory = await prisma.story.create({
    data: {
      title,
      desc,
      tags,
      genre,
      cover: coverBytes,
      views: 0,
      totalChapters: 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/story");
  revalidatePath("/admin/stories");

  return { success: true, story: newStory };
}

export async function updateStory(id: number, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const tags = (formData.get("tags") as string) || null;
  const genre = (formData.get("genre") as string) || null;
  const coverFile = formData.get("cover") as File | null;

  const dataToUpdate: any = {
    title,
    desc,
    tags,
    genre,
  };

  if (coverFile && coverFile.size > 0) {
    dataToUpdate.cover = Buffer.from(await coverFile.arrayBuffer()) as unknown as Uint8Array<ArrayBuffer>;
  }

  const updated = await prisma.story.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/");
  revalidatePath("/story");
  revalidatePath(`/story/${id}`);
  revalidatePath("/admin/stories");

  return { success: true, story: updated };
}

export async function deleteStory(id: number) {
  await requireAuth();

  await prisma.story.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/story");
  revalidatePath("/admin/stories");

  return { success: true };
}

export async function createChapter(storyId: number, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = (formData.get("content") as string) || "";

  const chapter = await prisma.chapter.create({
    data: {
      storyId,
      title,
      content,
      views: 0,
    },
  });

  const totalChapters = await prisma.chapter.count({
    where: { storyId },
  });

  await prisma.story.update({
    where: { id: storyId },
    data: { totalChapters },
  });

  revalidatePath(`/story/${storyId}`);
  revalidatePath("/admin/stories");

  return { success: true, chapter };
}

export async function updateChapter(id: number, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const content = (formData.get("content") as string) || "";

  const chapter = await prisma.chapter.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  revalidatePath(`/story/read/${id}`);
  revalidatePath(`/story/${chapter.storyId}`);
  revalidatePath("/admin/stories");

  return { success: true, chapter };
}

export async function deleteChapter(id: number) {
  await requireAuth();

  const chapter = await prisma.chapter.findUnique({
    where: { id },
    select: { storyId: true },
  });

  if (!chapter) return { success: false, error: "Chapter not found" };

  await prisma.chapter.delete({
    where: { id },
  });

  const totalChapters = await prisma.chapter.count({
    where: { storyId: chapter.storyId },
  });

  await prisma.story.update({
    where: { id: chapter.storyId },
    data: { totalChapters },
  });

  revalidatePath(`/story/${chapter.storyId}`);
  revalidatePath("/admin/stories");

  return { success: true };
}
