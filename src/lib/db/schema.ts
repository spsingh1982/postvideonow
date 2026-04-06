import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

// Users are managed by Clerk — we just store extra metadata
export const tiktokAccounts = pgTable("tiktok_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),          // Clerk user ID
  tiktokUserId: text("tiktok_user_id").notNull(),        // TikTok user ID
  displayName: text("display_name"),                     // TikTok display name
  avatarUrl: text("avatar_url"),                         // TikTok profile picture
  accessToken: text("access_token").notNull(),           // TikTok OAuth access token
  refreshToken: text("refresh_token"),                   // TikTok OAuth refresh token
  tokenExpiresAt: timestamp("token_expires_at"),         // Token expiry time
  isActive: boolean("is_active").default(true),          // Whether account is still connected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const videoJobs = pgTable("video_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),          // Who posted
  tiktokAccountId: uuid("tiktok_account_id")
    .references(() => tiktokAccounts.id),                // Which TikTok account
  caption: text("caption"),                              // Post caption
  videoUrl: text("video_url"),                           // Uploaded video URL
  status: text("status").default("pending"),             // pending | posting | success | failed
  tiktokPostId: text("tiktok_post_id"),                  // TikTok's publish ID after success
  errorMessage: text("error_message"),                   // Error details if failed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type TiktokAccount = typeof tiktokAccounts.$inferSelect;
export type VideoJob = typeof videoJobs.$inferSelect;
