import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="legal-page">
        <div className="shell legal-layout">
          <aside><p>LEGAL</p><h1>Privacy Policy</h1><span>Last updated 12 August 2026</span></aside>
          <article>
            <p className="legal-intro">This policy explains how the Pocket Tool project handles personal data when you use this website or interact with Pocket Tool on Discord.</p>

            <h2>1. Who is responsible</h2>
            <p>The Pocket Tool project operator is responsible for deciding how personal data is used for the website and bot. Privacy requests can be made through the contact details in section 12.</p>

            <h2>2. Website data</h2>
            <p>The website does not use advertising trackers or analytics cookies. Its hosting and security providers may process an IP address, request details, browser information and short-lived security or access-control cookies to deliver the site, prevent abuse and maintain service reliability. If you choose a colour theme, the preference is stored locally in your browser.</p>

            <h2>3. Discord bot data</h2>
            <p>When you install or invoke Pocket Tool, the service may process your Discord user identifier, basic profile details, installation scopes and time; encrypted OAuth access and refresh tokens used to maintain the authorization; Discord server, channel or message identifiers; the content and files you submit to a command; command and component interaction details; and operational error or usage records. The exact data depends on the action or command you choose.</p>

            <h2>4. Why data is used</h2>
            <p>Data is used to respond to commands, provide requested features, secure and maintain the service, diagnose errors, prevent misuse and understand service reliability. Under UK and European data protection law, these activities are based on providing the service you request, the project&apos;s legitimate interests in operating a secure and reliable service, legal obligations, or consent where a feature specifically asks for it.</p>

            <h2>5. Sharing and processors</h2>
            <p>Pocket Tool does not sell personal data. Limited data may be processed by Discord, hosting and content-delivery providers, database providers, and external service providers required by a command. Data may also be disclosed where required by law or when reasonably necessary to protect users, the service or the public.</p>

            <h2>6. International processing</h2>
            <p>Some providers may process data outside your country. Where UK or European transfer rules apply, the project relies on the safeguards offered by those providers and other lawful transfer mechanisms.</p>

            <h2>7. Retention</h2>
            <p>Personal data is retained only while it is needed for the purpose for which it was collected, to secure the service, resolve a dispute or meet a legal obligation. Browser theme preferences remain on your device until you change them or clear site data. Security and access cookies expire according to the provider&apos;s settings.</p>

            <h2>8. Your rights</h2>
            <p>Depending on where you live, you may have rights to access, correct, delete, restrict or object to the use of your personal data, request a portable copy, and withdraw consent without affecting earlier lawful processing. You may also complain to your local data protection authority.</p>

            <h2>9. Cookies and local storage</h2>
            <p>The website uses only essential security or access storage and a theme preference requested by the user. It does not set analytics, advertising or cross-site tracking cookies. See the <Link href="/cookies">Cookie Notice</Link> for details.</p>

            <h2>10. Children&apos;s privacy</h2>
            <p>Pocket Tool is not intended for anyone below the minimum age required to use Discord in their country.</p>

            <h2>11. Changes to this policy</h2>
            <p>This policy may be updated when the service or its data practices change. The date at the top identifies the current version.</p>

            <h2>12. Contact</h2>
            <p>For privacy questions or rights requests, join the <a href="https://discord.gg/Y67yNmsPuf" target="_blank" rel="noreferrer">support server</a> or contact <strong>@mloetta</strong> on Discord.</p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
