const tableNamePattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const defaultDiscordClientId = "1489362526880796903";

export function requireServerEnvironment(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

export function getTableName(name: string, fallback: string) {
  const value = process.env[name]?.trim() || fallback;
  if (!tableNamePattern.test(value)) throw new Error(`Invalid table name configured for ${name}`);
  return value;
}

export function getSiteUrl(requestUrl: string) {
  return process.env.SITE_URL?.trim() || new URL(requestUrl).origin;
}

export function getDiscordRedirectUri(requestUrl: string) {
  return process.env.DISCORD_REDIRECT_URI?.trim() || new URL("/callback", requestUrl).toString();
}

export function getDiscordClientId() {
  return process.env.DISCORD_CLIENT_ID?.trim() || defaultDiscordClientId;
}

export function hasDiscordInstallEnvironment() {
  return Boolean(
    process.env.DISCORD_CLIENT_SECRET?.trim()
    && process.env.SUPABASE_URL?.trim()
    && process.env.SUPABASE_SECRET_KEY?.trim()
    && process.env.OAUTH_TOKEN_ENCRYPTION_KEY?.trim(),
  );
}
