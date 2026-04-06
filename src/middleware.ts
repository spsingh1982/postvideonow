import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/tiktok(.*)",
  "/api/auth/tiktok/callback(.*)",
]);

// Routes that must be publicly accessible (no auth)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/terms",
  "/privacy",
  "/tiktoksignature",
  "/tiktoksignature/",
  "/tiktokvns0sPZcTvdC6yVQOlfnXSnuUQjkrnt0.txt",
  "/tiktokVYkpHrLgBACy9L1eZJm8BkAi0vlfRlT4.txt",
  "/api/auth/tiktok",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
