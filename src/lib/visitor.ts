import { headers } from "next/headers";
import { prisma } from "./prisma";

export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export async function recordPostVisitor(postId: number, category: string | null) {
  try {
    const point = category || "Blog";
    const ip = await getClientIp();

    const existing = await prisma.visitor.findFirst({
      where: {
        postId,
        point,
        visitorIp: ip,
      },
    });

    if (!existing) {
      await prisma.visitor.create({
        data: {
          postId,
          point,
          visitorIp: ip,
        },
      });
    }

    const count = await prisma.visitor.count({
      where: {
        postId,
        point,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { views: count },
    });

    return count;
  } catch (error) {
    console.error("Failed to record post visitor:", error);
    return null;
  }
}

export async function recordChapterVisitor(chapterId: number, storyId: number) {
  try {
    const point = "Story";
    const ip = await getClientIp();

    const existing = await prisma.visitor.findFirst({
      where: {
        postId: chapterId,
        point,
        visitorIp: ip,
      },
    });

    if (!existing) {
      await prisma.visitor.create({
        data: {
          postId: chapterId,
          point,
          visitorIp: ip,
        },
      });
    }

    const count = await prisma.visitor.count({
      where: {
        postId: chapterId,
        point,
      },
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: { views: count },
    });

    // Sum all views for all chapters belonging to the story
    const aggregate = await prisma.chapter.aggregate({
      where: { storyId },
      _sum: { views: true },
    });

    const totalViews = aggregate._sum.views || 0;
    await prisma.story.update({
      where: { id: storyId },
      data: { views: totalViews },
    });

    return { chapterViews: count, storyViews: totalViews };
  } catch (error) {
    console.error("Failed to record chapter visitor:", error);
    return null;
  }
}
