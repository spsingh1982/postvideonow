import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tiktokAccounts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accounts = await db.query.tiktokAccounts.findMany({
    where: and(
      eq(tiktokAccounts.clerkUserId, userId),
      eq(tiktokAccounts.isActive, true)
    ),
    columns: {
      id: true,
      tiktokUserId: true,
      displayName: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ accounts });
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { accountId } = await req.json();

  await db.update(tiktokAccounts).set({ isActive: false, updatedAt: new Date() })
    .where(and(eq(tiktokAccounts.id, accountId), eq(tiktokAccounts.clerkUserId, userId)));

  return NextResponse.json({ success: true });
}
