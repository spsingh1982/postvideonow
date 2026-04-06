export const TIKTOK_CONFIG = {
  clientKey: process.env.TIKTOK_CLIENT_KEY!,
  clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
  redirectUri: process.env.TIKTOK_REDIRECT_URI!,
  scopes: ["user.info.basic", "video.upload", "video.publish"].join(","),
  authUrl: "https://www.tiktok.com/v2/auth/authorize",
  tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
  userInfoUrl: "https://open.tiktokapis.com/v2/user/info/",
  videoInitUrl: "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/",
  videoPublishUrl: "https://open.tiktokapis.com/v2/post/publish/video/init/",
};

export function getTikTokAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_key: TIKTOK_CONFIG.clientKey,
    response_type: "code",
    scope: TIKTOK_CONFIG.scopes,
    redirect_uri: TIKTOK_CONFIG.redirectUri,
    state,
  });
  return `${TIKTOK_CONFIG.authUrl}?${params.toString()}`;
}
