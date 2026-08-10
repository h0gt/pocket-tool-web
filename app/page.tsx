import Image from "next/image";
import { CommandShowcase } from "./components/CommandShowcase";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const inviteUrl = "/api/install";
const canaryUrl = "https://discord.com/oauth2/authorize?client_id=1489363092071518324";

const commandCards = [
  { command: "/translate", label: "Language", copy: "Translate text—or an existing message—without leaving Discord." },
  { command: "/avatar", label: "Profiles", copy: "Open global and server avatars in the format you need." },
  { command: "/gif", label: "Media", copy: "Turn an uploaded image into a shareable GIF in a few seconds." },
  { command: "/role", label: "Lookups", copy: "Inspect role age, colours, position and permissions at a glance." },
  { command: "/timezone", label: "Time", copy: "Check the current time anywhere with quick autocomplete." },
  { command: "Speech to Text", label: "Audio", copy: "Transcribe a voice message from its message menu." },
];

export default function Home() {
  return (
    <>
      <SiteHeader active="home" />
      <main id="main-content">
        <section className="hero">
          <div className="hero-grid-lines" aria-hidden="true"></div>
          <div className="shell hero__grid">
            <div className="hero__copy">
              <p className="open-source-pill">Open-source Discord utility app</p>
              <h1>Pocket Tool</h1>
              <p className="hero-headline">The small Discord tools you keep reaching for.</p>
              <p className="hero__lede">Quotes, timestamps, translation, TTS and the other useful little jobs—handled without pulling you out of the conversation.</p>
              <div className="hero__actions">
                <a className="button button--primary" href={inviteUrl}>Add to Discord <span aria-hidden="true">↗</span></a>
                <a className="button button--secondary" href="/docs">Browse the docs <span aria-hidden="true">→</span></a>
              </div>
              <div className="hero__meta" aria-label="Pocket Tool highlights">
                <span><i aria-hidden="true">✓</i> User-install ready</span>
                <span><i aria-hidden="true">✓</i> Works in DMs</span>
                <span><i aria-hidden="true">✓</i> Self-hostable</span>
              </div>
            </div>

            <div className="hero-demo">
              <figure className="hero-command-art">
                <Image
                  src="/hero-command-preview.png"
                  alt="Pocket Tool in Discord, responding to a timestamp command with an accurate relative time alongside translation and voice message examples"
                  width={1672}
                  height={941}
                  priority
                  sizes="(max-width: 900px) calc(100vw - 40px), 640px"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section essentials-section" aria-label="Why Pocket Tool">
          <div className="shell">
            <h2 className="section-title">Everything lives in the conversation</h2>
            <p className="section-lead">Install Pocket Tool once, then reach for it wherever Discord lets you work—without a dashboard, setup maze or second tab.</p>
            <div className="utility-grid">
              <article><span>/timestamp</span><h3>Time without the maths</h3><p>Natural-language timestamps and timezone lookups that display correctly for everyone.</p></article>
              <article><span>/tts</span><h3>Text to speech</h3><p>Speak your mind twin</p></article>
              <article><span>/translate</span><h3>Translation in context</h3><p>Translate typed text, existing messages.</p></article>
              <article><span>/user</span><h3>Useful stuff on users</h3><p>Inspect profiles, avatars, banners, roles and other things i think.</p></article>
            </div>
          </div>
        </section>

        <section className="section command-showcase-section" id="commands">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Inside the pocket</p>
              <h2 className="section-title">Real tools, inside Discord</h2>
              <p>Real Pocket Tool flows, captured in Discord. Pick a command to see how it works.</p>
            </div>
            <CommandShowcase />
          </div>
        </section>

        <section className="section section--tinted">
          <div className="shell">
            <div className="section-heading section-heading--row" data-reveal>
              <div>
                <p className="eyebrow">And plenty more</p>
                <h2 className="section-title">More utility, no extra workspace</h2>
              </div>
              <a className="button button--secondary" href="/docs#commands">View every command <span aria-hidden="true">→</span></a>
            </div>
            <div className="command-card-grid">
              {commandCards.map((card, index) => (
                <article className="mini-command-card" key={card.command} data-reveal style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
                  <div><span>{card.label}</span><i>{String(index + 1).padStart(2, "0")}</i></div>
                  <code>{card.command}</code>
                  <p>{card.copy}</p>
                  <a href={`/docs#commands`} aria-label={`Read about ${card.command}`}>Explore <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section open-source-section">
          <div className="shell open-source-grid">
            <div className="open-source-copy" data-reveal>
              <p className="eyebrow">Yours to run</p>
              <h2 className="section-title">Open source, end to end</h2>
              <p>Pocket Tool is built in TypeScript on Bun. Inspect every command, suggest an improvement, or run your own instance with the services you choose.</p>
              <div className="open-source-links">
                <a className="button button--primary" href="https://github.com/mloetta/pocket-tool" target="_blank" rel="noreferrer">View the repository <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="/docs#self-host">Self-hosting guide <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="terminal" data-reveal>
              <div className="terminal__bar"><span><i></i><i></i><i></i></span><small>pocket-tool · setup</small></div>
              <pre><code><span className="terminal-line"><i>$</i> git clone https://github.com/mloetta/pocket-tool</span><span className="terminal-line"><i>$</i> cd pocket-tool</span><span className="terminal-line"><i>$</i> bun install</span><span className="terminal-line"><i>$</i> cp .env.example .env</span><span className="terminal-line"><i>$</i> bun run start</span><span className="terminal-line terminal-line--success">✓ Pocket Tool is ready for interactions</span></code></pre>
            </div>
          </div>
        </section>

        <section className="canary-band">
          <div className="shell canary-band__inner" data-reveal>
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2>Put the useful tools in reach.</h2>
              <p>Add Pocket Tool to Discord now, or try Canary to see what is coming next.</p>
            </div>
            <div className="canary-band__actions">
              <a className="button button--on-dark" href={inviteUrl}>Add Pocket Tool <span aria-hidden="true">↗</span></a>
              <a className="button button--pink" href={canaryUrl} target="_blank" rel="noreferrer"><span className="canary-mark brand-icon brand-icon--canary" aria-hidden="true"></span>Try Canary <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
