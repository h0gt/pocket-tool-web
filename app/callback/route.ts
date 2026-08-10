import { NextRequest, NextResponse } from "next/server";
import { getDiscordClientId, getDiscordRedirectUri, getSiteUrl, requireServerEnvironment } from "../lib/server-config";
import { recordDiscordInstallation } from "../lib/supabase-server";
import { encryptToken } from "../lib/token-crypto";

const stateCookie = "pocket-tool-oauth-state";

type DiscordToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
};

export const runtime = "nodejs";

function redirectHome(request: NextRequest, status: "success" | "cancelled" | "error") {
  const destination = new URL("/", getSiteUrl(request.url));
  destination.searchParams.set("install", status);
  const response = NextResponse.redirect(destination);
  response.cookies.set(stateCookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/callback",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get(stateCookie)?.value;

  if (request.nextUrl.searchParams.has("error")) return redirectHome(request, "cancelled");
  if (!code || !returnedState || !savedState || returnedState !== savedState) return redirectHome(request, "error");

  try {
    const tokenResponse = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: getDiscordClientId(),
        client_secret: requireServerEnvironment("DISCORD_CLIENT_SECRET"),
        grant_type: "authorization_code",
        code,
        redirect_uri: getDiscordRedirectUri(request.url),
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) throw new Error(`Discord token exchange failed with status ${tokenResponse.status}`);
    const token = await tokenResponse.json() as DiscordToken;
    if (!token.access_token || !token.refresh_token || token.token_type.toLowerCase() !== "bearer") throw new Error("Discord returned an invalid token response");

    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
      cache: "no-store",
    });

    if (!userResponse.ok) throw new Error(`Discord user lookup failed with status ${userResponse.status}`);
    const user = await userResponse.json() as DiscordUser;
    if (!user.id) throw new Error("Discord returned an invalid user response");

    const authorizedAt = new Date();
    await recordDiscordInstallation(user, {
      access_token: encryptToken(token.access_token),
      authorized_at: authorizedAt.toISOString(),
      expires_at: new Date(authorizedAt.getTime() + token.expires_in * 1000).toISOString(),
      expires_in: token.expires_in,
      integration_type: 1,
      refresh_token: encryptToken(token.refresh_token),
      scope: token.scope,
      source: "website_oauth",
      token_type: token.token_type,
      username: user.username,
      global_name: user.global_name,
      avatar: user.avatar,
    });

    return redirectHome(request, "success");
  } catch {
    return redirectHome(request, "error");
  }
}
