import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const storyId = Number(id);

  if (isNaN(storyId)) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const story = await prisma.story.findUnique({
    where: { id: storyId },
    select: { cover: true, title: true },
  });

  if (story?.cover && story.cover.length > 0) {
    return new NextResponse(story.cover, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  }

  // Fallback elegant SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f1f5f9;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="24" fill="#475569">
      ${story?.title ? story.title.slice(0, 30) : "Hannah Montemayor"}
    </text>
    <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#94a3b8">
      Novel &amp; Stories
    </text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
