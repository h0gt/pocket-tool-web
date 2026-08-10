import { getTableName, requireServerEnvironment } from "./server-config";
import type { EncryptedValue } from "./token-crypto";

type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
};

type InstallationExchange = {
  access_token: EncryptedValue;
  authorized_at: string;
  expires_at: string;
  expires_in: number;
  integration_type: 1;
  refresh_token: EncryptedValue;
  scope: string;
  source: "website_oauth";
  token_type: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
};

async function writeToSupabase(path: string, body: unknown, prefer?: string) {
  const url = requireServerEnvironment("SUPABASE_URL").replace(/\/$/, "");
  const key = requireServerEnvironment("SUPABASE_SECRET_KEY");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Supabase write failed with status ${response.status}`);
}

export async function recordDiscordInstallation(user: DiscordUser, exchange: InstallationExchange) {
  const installations = getTableName("SUPABASE_INSTALLATIONS_TABLE", "installations");
  const events = getTableName("SUPABASE_BOT_EVENTS_TABLE", "bot_events");

  await writeToSupabase(
    `${installations}?on_conflict=user_id`,
    { user_id: user.id, exchange },
    "resolution=merge-duplicates,return=minimal",
  );

  await writeToSupabase(
    events,
    {
      user_id: user.id,
      event_type: "user_installed",
      payload: {
        integration_type: exchange.integration_type,
        scopes: exchange.scope.split(" ").filter(Boolean),
        authorized_at: exchange.authorized_at,
      },
    },
    "return=minimal",
  );
}
