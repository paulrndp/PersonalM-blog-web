import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin Account
  const existingAdmin = await prisma.account.findUnique({
    where: { username: "admin" },
  });

  const hashedPassword = await bcrypt.hash("password", 10);

  if (!existingAdmin) {
    await prisma.account.create({
      data: {
        username: "admin",
        password: hashedPassword,
        firstname: "Hannah",
        lastname: "Montemayor",
        desc: "Writer, storyteller, and creator of worlds. Welcome to my personal blog where I share my novels, reflections, and candid thoughts.",
      },
    });
    console.log("Admin account created (username: admin, password: password)");
  }

  // 2. Seed Sample Stories & Chapters
  const storiesCount = await prisma.story.count();
  if (storiesCount === 0) {
    const story1 = await prisma.story.create({
      data: {
        title: "The Whispering Pines",
        desc: "A heartfelt story of discovering one's roots and the unexpected journeys that define who we become.",
        genre: "Romance & Drama",
        tags: "#novel #romance #journey",
        views: 142,
        totalChapters: 2,
        chapters: {
          create: [
            {
              title: "Chapter 1: A Cold Beginning",
              content:
                "<p>The winter air held a crisp promise. Hannah tightened her woolen scarf around her neck and looked up at the quiet canopy of tall pine trees. Each step crunching beneath her boots reminded her of winters long past in the quiet countryside.</p><p>She had left the city behind, carrying nothing but a worn leather bag and a box of old letters that had arrived unaddressed to her doorstep.</p>",
              views: 89,
            },
            {
              title: "Chapter 2: Footsteps in the Snow",
              content:
                "<p>By mid-afternoon, the sun barely broke through the thick gray clouds. Ahead lay an old cabin with light spilling from a frosted window. Smoke curled lazily from the stone chimney.</p><p>'Someone is still here,' she whispered to herself, feeling a mix of trepidation and curiosity wash over her.</p>",
              views: 53,
            },
          ],
        },
      },
    });

    const story2 = await prisma.story.create({
      data: {
        title: "Echoes of Eternity",
        desc: "An epic tale across mystical realms, unraveling long-forgotten secrets of a hidden realm and ancient guardian stones.",
        genre: "Fantasy & Mystery",
        tags: "#fantasy #magic #chronicles",
        views: 215,
        totalChapters: 2,
        chapters: {
          create: [
            {
              title: "Prologue: The Awakening Stone",
              content:
                "<p>Deep beneath the emerald canopy of the forgotten forest, a faint blue glow resonated from the sacred obelisk. The runes, silent for five hundred years, began to pulse in rhythm with an unknown heartbeat.</p>",
              views: 120,
            },
            {
              title: "Chapter 1: The Keeper's Vow",
              content:
                "<p>Elaria drew her twin daggers and took a measured breath. The silence of the mountain pass was unnatural. No birds sang, and even the mountain winds had settled into an eerie calm.</p>",
              views: 95,
            },
          ],
        },
      },
    });

    console.log(`Created stories: ${story1.title}, ${story2.title}`);
  }

  // 3. Seed Sample Posts
  const postsCount = await prisma.post.count();
  if (postsCount === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "Finding Joy in the Little Things",
          content:
            "<p>Life moves fast, and often we get caught up in the big deadlines, huge milestones, and future plans. But today, I took an hour just sitting with a warm cup of jasmine tea, listening to the gentle drizzle against the windowpane.</p><p>True peace isn't found in reaching the destination; it is found in the quiet moments between the milestones. Be kind to yourself today.</p>",
          category: "Blog",
          status: "published",
          views: 64,
        },
        {
          title: "Late Night Musings on Stargazing",
          content:
            "<p>Have you ever looked at the stars and wondered where all the stray thoughts go at 2 AM? Just a quick reflection before calling it a night. The cosmos always has a way of putting our worries into perspective.</p>",
          category: "Random",
          status: "published",
          views: 42,
        },
        {
          title: "Behind the Scenes: How I Outline My Stories",
          content:
            "<p>Many of you have asked about my writing routine and how I keep character arcs consistent across dozens of chapters. Here is my 3-step process: character maps, conflict escalation grids, and ruthless revision sprints!</p>",
          category: "Both",
          status: "published",
          views: 98,
        },
        {
          title: "Upcoming Project Brainstorm (Work in Progress)",
          content:
            "<p>Notes and character sketches for next month's novella series.</p>",
          category: "Blog",
          status: "draft",
          views: 0,
        },
      ],
    });
    console.log("Sample blog posts seeded.");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
