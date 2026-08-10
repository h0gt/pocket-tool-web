import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getDiscordClientId, getDiscordRedirectUri, hasDiscordInstallEnvironment } from "../../lib/server-config";

const stateCookie = "pocket-tool-oauth-state";

export const runtime = "nodejs";

export function GET(request: NextRequest) {
  const authorize = new URL("https://discord.com/oauth2/authorize");
  authorize.searchParams.set("client_id", getDiscordClientId());

  if (!hasDiscordInstallEnvironment()) return NextResponse.redirect(authorize);

  try {
    const state = randomBytes(32).toString("base64url");
    authorize.searchParams.set("response_type", "code");
    authorize.searchParams.set("redirect_uri", getDiscordRedirectUri(request.url));
    authorize.searchParams.set("scope", "applications.commands identify");
    authorize.searchParams.set("integration_type", "1");
    authorize.searchParams.set("state", state);

    const response = NextResponse.redirect(authorize);
    response.cookies.set(stateCookie, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600,
      path: "/callback",
    });
    return response;
  } catch {
    return NextResponse.redirect(authorize);
  }
}
