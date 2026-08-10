import Link from "next/link";

const inviteUrl = "/api/install";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand__mark brand-icon brand-icon--primary" aria-hidden="true"></span>
            <span className="brand__name">Pocket Tool</span>
          </Link>
          <p>Small utilities. Right where you need them.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/docs">Documentation</Link>
            <a href={inviteUrl}>Add the app</a>
            <a href="https://github.com/mloetta/pocket-tool" target="_blank" rel="noreferrer">Source code</a>
          </div>
          <div>
            <p className="footer-label">Project</p>
            <a href="https://discord.gg/Y67yNmsPuf" target="_blank" rel="noreferrer">Support server</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>Open-source and built for Discord.</span>
        <span>Not affiliated with Discord Inc.</span>
      </div>
    </footer>
  );
}
