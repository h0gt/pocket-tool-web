# Pocket Tool Website

The official landing page and documentation site for [Pocket Tool](https://github.com/mloetta/pocket-tool), a collection of focused Discord utilities.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Discord installation callback

1. Run `supabase/schema.sql` in the Supabase SQL editor.
2. Copy `.env.example` to `.env.local` and provide the server environment values.
3. Register the exact `DISCORD_REDIRECT_URI` in the Discord Developer Portal.
4. Add the same environment values to the Vercel project before deploying.

The callback stores the complete OAuth token response against the Discord `user_id`, which is the table's primary key. Access and refresh tokens are encrypted with AES-256-GCM before they reach Supabase. It also writes a `user_installed` row to `bot_events`. Pocket Tool can consume pending rows with its own server-side Supabase secret and mark each row as processed.

Generate `OAUTH_TOKEN_ENCRYPTION_KEY` as 32 random bytes encoded with base64. The website and bot must receive the same key through their server environments. When `expires_at` has passed, the bot decrypts `refresh_token`, exchanges it with Discord using `grant_type=refresh_token`, encrypts the returned access and refresh tokens, and replaces the `exchange` value for the same `user_id`.

Production values should use the public site URL:

```text
SITE_URL=https://pocket-tool.vercel.app
DISCORD_REDIRECT_URI=https://pocket-tool.vercel.app/callback
OAUTH_TOKEN_ENCRYPTION_KEY=base64-encoded-32-byte-key
```

## Production

```bash
npm run build
npm run start
```

## Quality checks

```bash
npm run lint
npm test
```

## Project structure

- `app/` contains the landing page, documentation, legal pages, and shared components.
- `public/` contains the Pocket Tool brand artwork and command screenshots.
- `tests/` contains the source and asset checks used before release.
