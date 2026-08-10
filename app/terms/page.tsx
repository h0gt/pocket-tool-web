import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="legal-page">
        <div className="shell legal-layout">
          <aside><p>LEGAL</p><h1>Terms of Service</h1><span>Last updated 10 August 2026</span></aside>
          <article>
            <p className="legal-intro">By accessing or using Pocket Tool, you confirm that you have read and agreed to these terms. If you do not agree, do not use the service.</p>
            <h2>1. Description of service</h2><p>Pocket Tool provides automated features, commands and integrations through Discord. Features may be changed, suspended or removed when reasonably necessary.</p>
            <h2>2. User responsibilities</h2><p>You must not use the service for unlawful activity; abuse, exploit or harass others; interfere with or overload the service; distribute malicious content; or attempt unauthorised access. You are responsible for the content you submit and how you use the results.</p>
            <h2>3. Privacy</h2><p>The service may process interaction data needed to operate, secure and improve its features. Pocket Tool does not sell personal data. See the <a href="/privacy">Privacy Policy</a> and <a href="/cookies">Cookie Notice</a> for details.</p>
            <h2>4. Third-party services</h2><p>Pocket Tool relies on Discord, hosting infrastructure and external processing services. Availability and processing by those providers are also governed by their own terms and policies.</p>
            <h2>5. Availability</h2><p>The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Continuous availability, error-free operation and the accuracy of every output cannot be guaranteed.</p>
            <h2>6. Liability</h2><p>Nothing in these terms excludes liability that cannot lawfully be excluded. To the maximum extent permitted by law, the Pocket Tool project is not responsible for indirect or consequential loss caused by outages, third-party services, user content or misuse of the service.</p>
            <h2>7. Suspension and termination</h2><p>Access may be limited or terminated when reasonably necessary to protect users or the service, respond to legal requirements, or address a breach of these terms.</p>
            <h2>8. Changes</h2><p>These terms may be updated when the service or applicable requirements change. The date at the top identifies the current version.</p>
            <h2>9. Platform rules</h2><p>You must comply with Discord&apos;s Terms of Service and Community Guidelines while using Pocket Tool.</p>
            <h2>10. Contact</h2><p>For support or legal questions, join the <a href="https://discord.gg/Y67yNmsPuf" target="_blank" rel="noreferrer">support server</a> or contact <strong>@mloetta</strong> on Discord.</p>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
