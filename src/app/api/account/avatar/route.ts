import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const account = await prisma.account.findFirst({
    select: { profile: true, firstname: true, lastname: true },
  });

  if (account?.profile && account.profile.length > 0) {
    return new NextResponse(account.profile, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  }

  const initials = `${account?.firstname?.[0] || "H"}${account?.lastname?.[0] || "M"}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="#e2e8f0"/>
    <circle cx="100" cy="100" r="90" fill="#cbd5e1"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-weight="bold" font-size="52" fill="#334155">
      ${initials}
    </text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
