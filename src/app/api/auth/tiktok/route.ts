import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getTikTokAuthUrl } from "@/lib/tiktok/config";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // State encodes the clerk user ID for verification in callback
  const state = Buffer.from(JSON.stringify({ userId, ts: Date.now() })).toString("base64url");
  const authUrl = getTikTokAuthUrl(state);

  return NextResponse.redirect(authUrl);
}
