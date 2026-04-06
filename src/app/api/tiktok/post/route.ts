import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tiktokAccounts, videoJobs } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { postVideoToTikTok } from "@/lib/tiktok/api";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoUrl, caption, accountIds } = await req.json();

  if (!videoUrl || !accountIds?.length) {
    return NextResponse.json({ error: "videoUrl and accountIds are required" }, { status: 400 });
  }

  // Fetch selected TikTok accounts belonging to this user
  const accounts = await db.query.tiktokAccounts.findMany({
    where: and(
      eq(tiktokAccounts.clerkUserId, userId),
      inArray(tiktokAccounts.id, accountIds),
      eq(tiktokAccounts.isActive, true)
    ),
  });

  if (!accounts.length) {
    return NextResponse.json({ error: "No valid accounts found" }, { status: 404 });
  }

  const results = [];

  for (const account of accounts) {
    // Create job record
    const [job] = await db.insert(videoJobs).values({
      clerkUserId: userId,
      tiktokAccountId: account.id,
      caption,
      videoUrl,
      status: "posting",
    }).returning();

    try {
      const postData = await postVideoToTikTok(account.accessToken, videoUrl, caption);

      await db.update(videoJobs).set({
        status: "success",
        tiktokPostId: postData.publish_id,
        updatedAt: new Date(),
      }).where(eq(videoJobs.id, job.id));

      results.push({
        accountId: account.id,
        displayName: account.displayName,
        status: "success",
        publishId: postData.publish_id,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      await db.update(videoJobs).set({
        status: "failed",
        errorMessage: message,
        updatedAt: new Date(),
      }).where(eq(videoJobs.id, job.id));

      results.push({
        accountId: account.id,
        displayName: account.displayName,
        status: "failed",
        error: message,
      });
    }
  }

  return NextResponse.json({ results });
}
