import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Cookie Notice" };

export default function CookiePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="legal-page">
        <div className="shell legal-layout">
          <aside><p>LEGAL</p><h1>Cookie Notice</h1><span>Last updated 10 August 2026</span></aside>
          <article>
            <p className="legal-intro">This notice explains the cookies and similar browser storage used by the Pocket Tool website.</p>

            <h2>1. What this website uses</h2>
            <p>Pocket Tool does not use analytics, advertising, personalisation or cross-site tracking cookies. The website uses only storage needed for security or access control and a first-party theme preference chosen by the visitor.</p>

            <h2>2. Essential security and access storage</h2>
            <p>The hosting and content-delivery providers may set short-lived cookies to detect abusive traffic, balance requests, protect the service and, when access is restricted, keep a visitor signed in. These cookies are used only to provide and secure the service and cannot be disabled through this website.</p>

            <h2>3. Theme preference</h2>
            <p>When you switch between light and dark mode, the site stores <code>pocket-tool-theme</code> in your browser&apos;s local storage. Its value is either <code>light</code> or <code>dark</code>. It is used only to remember the appearance you selected and remains until you change it or clear this site&apos;s data.</p>

            <h2>4. Why there is no consent banner</h2>
            <p>No optional tracking technology is loaded. Essential storage is limited to delivering and securing the service, while the theme preference is stored only after you request that setting. If optional analytics, advertising or other non-essential storage is introduced, the site will request consent before using it.</p>

            <h2>5. Managing stored data</h2>
            <p>You can inspect, block or delete cookies and local storage through your browser settings. Blocking essential security or access cookies may prevent the website from loading or signing you in. Clearing local storage resets the theme to its default.</p>

            <h2>6. More information</h2>
            <p>For information about personal data and your rights, read the <Link href="/privacy">Privacy Policy</Link>. Questions can be sent through the <a href="https://discord.gg/Y67yNmsPuf" target="_blank" rel="noreferrer">support server</a> or to <strong>@mloetta</strong> on Discord.</p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
