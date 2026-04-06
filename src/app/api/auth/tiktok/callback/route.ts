import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getTikTokUserInfo } from "@/lib/tiktok/api";
import { db } from "@/lib/db";
import { tiktokAccounts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    console.error("TikTok OAuth error:", error);
    return NextResponse.redirect(new URL("/dashboard?error=tiktok_auth_failed", req.url));
  }

  try {
    // Exchange code for tokens
    const tokenData = await exchangeCodeForToken(code);
    const { access_token, refresh_token, expires_in, open_id } = tokenData;

    // Get TikTok user info
    const userInfo = await getTikTokUserInfo(access_token);

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // Upsert TikTok account (update if already exists, insert if new)
    const existing = await db.query.tiktokAccounts.findFirst({
      where: and(
        eq(tiktokAccounts.clerkUserId, userId),
        eq(tiktokAccounts.tiktokUserId, open_id)
      ),
    });

    if (existing) {
      await db
        .update(tiktokAccounts)
        .set({
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: expiresAt,
          displayName: userInfo.display_name,
          avatarUrl: userInfo.avatar_url,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(tiktokAccounts.id, existing.id));
    } else {
      await db.insert(tiktokAccounts).values({
        clerkUserId: userId,
        tiktokUserId: open_id,
        displayName: userInfo.display_name,
        avatarUrl: userInfo.avatar_url,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: expiresAt,
        isActive: true,
      });
    }

    return NextResponse.redirect(new URL("/dashboard?connected=tiktok", req.url));
  } catch (err) {
    console.error("TikTok callback error:", err);
    return NextResponse.redirect(new URL("/dashboard?error=tiktok_connect_failed", req.url));
  }
}
