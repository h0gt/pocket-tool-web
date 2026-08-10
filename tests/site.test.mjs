import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

test("includes the complete landing page, documentation and legal notices", async () => {
  const [home, docs, layout, privacy, cookies, footer] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/docs/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/cookies/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(home, /The small Discord tools you keep reaching for/);
  assert.match(home, /hero-command-preview\.png/);
  assert.match(home, /Real tools, inside Discord/);
  assert.match(home, /terminal-line/);
  assert.doesNotMatch(home, /playground|tonight at 6/i);
  assert.match(docs, /Command reference/);
  assert.match(docs, /Self-hosting/);
  assert.match(layout, /Pocket Tool/);
  assert.match(layout, /icons:[\s\S]*pocket-tool-icon\.png/);
  assert.match(privacy, /Your rights/);
  assert.match(cookies, /does not use analytics, advertising, personalisation or cross-site tracking cookies/);
  assert.match(cookies, /pocket-tool-theme/);
  assert.match(footer, /href="\/cookies"/);
  assert.match(await readFile(new URL("../app/components/CommandShowcase.tsx", import.meta.url), "utf8"), /<Image[^>]+unoptimized/);
});

test("includes the required brand and command assets", async () => {
  const files = await walk(new URL("../public/", import.meta.url));

  assert.ok(!files.some((file) => file.endsWith("og.png")));
  assert.ok(files.some((file) => file.endsWith("pocket-tool-icon.png")));
  assert.ok(files.some((file) => file.endsWith("pocket-tool-canary-icon.png")));
  assert.ok(files.some((file) => file.endsWith("hero-command-preview.png")));
  assert.ok(files.some((file) => file.endsWith("assets/time/timestamp_zone_focus.png")));
  assert.ok(files.some((file) => file.endsWith("assets/quote/quote.png")));
  assert.equal(files.filter((file) => file.toLowerCase().endsWith(".svg")).length, 0);
});

test("keeps public command examples and installation guidance accurate", async () => {
  const [home, docs, reference] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/docs/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CommandReference.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(home, /<span>\/timestamp<\/span>/);
  assert.match(home, /<span>\/tts<\/span>/);
  assert.match(home, /<span>\/translate<\/span>/);
  assert.match(home, /<span>\/user<\/span>/);
  assert.match(docs, /installed to your Discord account as a user app/);
  assert.doesNotMatch(`${docs}\n${reference}`, /ephemeral: false|EnglishUS|PortugueseBR/);
});

test("keeps dark mode flat and free of colour glow", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /:root\[data-theme="dark"\] \.hero\s*\{\s*background:\s*var\(--page\);\s*\}/s);
  assert.match(css, /:root\[data-theme="dark"\] \.hero-grid-lines\s*\{\s*background-image:\s*none;\s*\}/s);
});

test("sets the production security policy", async () => {
  const [config, proxy, layout] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../proxy.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  for (const header of [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Permissions-Policy",
    "Referrer-Policy",
  ]) assert.match(config, new RegExp(header));

  assert.match(proxy, /nonce-/);
  assert.match(proxy, /script-src-attr 'none'/);
  assert.match(proxy, /frame-ancestors 'self'/);
  assert.match(layout, /nonce=\{nonce\}/);
});

test("implements a server-side Discord installation callback", async () => {
  const [install, callback, database, home, header, footer] = await Promise.all([
    readFile(new URL("../app/api/install/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/callback/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/supabase-server.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(install, /applications\.commands identify/);
  assert.match(install, /integration_type", "1"/);
  assert.match(install, /httpOnly:\s*true/);
  assert.match(callback, /oauth2\/token/);
  assert.match(callback, /users\/@me/);
  assert.match(callback, /returnedState !== savedState/);
  assert.match(database, /access_token/);
  assert.match(database, /refresh_token/);
  assert.match(callback, /encryptToken\(token\.access_token\)/);
  assert.match(callback, /encryptToken\(token\.refresh_token\)/);
  assert.match(database, /user_installed/);
  assert.match(`${home}\n${header}\n${footer}`, /\/api\/install/);
});

async function walk(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, root);
    if (entry.isDirectory()) files.push(...await walk(child));
    else files.push(child.pathname.replaceAll("\\", "/"));
  }

  return files;
}
