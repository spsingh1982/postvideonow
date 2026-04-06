import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("tiktok-developers-site-verification=PwDcWjZKvQ1bjTcz1GQPLZilefksT8k7", {
    headers: { "Content-Type": "text/plain" },
  });
}
