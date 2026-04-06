import { TIKTOK_CONFIG } from "./config";

export async function exchangeCodeForToken(code: string) {
  const res = await fetch(TIKTOK_CONFIG.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: TIKTOK_CONFIG.clientKey,
      client_secret: TIKTOK_CONFIG.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: TIKTOK_CONFIG.redirectUri,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error_description || data.error);
  return data;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(TIKTOK_CONFIG.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: TIKTOK_CONFIG.clientKey,
      client_secret: TIKTOK_CONFIG.clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error_description || data.error);
  return data;
}

export async function getTikTokUserInfo(accessToken: string) {
  const res = await fetch(
    `${TIKTOK_CONFIG.userInfoUrl}?fields=open_id,union_id,avatar_url,display_name`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = await res.json();
  if (data.error?.code !== "ok") throw new Error(data.error?.message || "Failed to get user info");
  return data.data.user;
}

export async function postVideoToTikTok(
  accessToken: string,
  videoUrl: string,
  caption: string
) {
  // Step 1: Initialize video post
  const initRes = await fetch(TIKTOK_CONFIG.videoPublishUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title: caption,
        privacy_level: "SELF_ONLY", // sandbox safe — change to PUBLIC_TO_EVERYONE for production
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url: videoUrl,
      },
    }),
  });
  const initData = await initRes.json();
  if (initData.error?.code !== "ok") {
    throw new Error(initData.error?.message || "Failed to initialize video post");
  }
  return initData.data;
}
