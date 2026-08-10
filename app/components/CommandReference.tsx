"use client";

import { useMemo, useState } from "react";

type Command = {
  name: string;
  description: string;
  syntax: string;
  category: string;
  context?: string;
};

const commands: Command[] = [
  { name: "/tts", description: "Convert up to 500 characters into a native Discord voice message.", syntax: "/tts text: … voice: Neutral language: English", category: "Create & media" },
  { name: "Quote This Message", description: "Create a custom quote card from a message, with type and visual controls.", syntax: "Message menu → Apps → Quote This Message", category: "Create & media", context: "Message command" },
  { name: "/gif", description: "Turn an uploaded image into a GIF.", syntax: "/gif image: attachment", category: "Create & media" },
  { name: "Speech to Text", description: "Transcribe audio attached to a message.", syntax: "Message menu → Apps → Speech to Text", category: "Create & media", context: "Message command" },
  { name: "/timestamp", description: "Generate a Discord timestamp from natural language, with timezone and style controls.", syntax: "/timestamp time: in 10 minutes timezone: Europe/London style: Relative Time", category: "Language & time" },
  { name: "/timezone", description: "See the current time in any supported timezone.", syntax: "/timezone zone: America/New_York", category: "Language & time" },
  { name: "/translate", description: "Translate text between supported languages, with automatic source detection.", syntax: "/translate text: … from: Auto Detect to: Use my locale", category: "Language & time" },
  { name: "Translate This Message", description: "Translate an existing message without copying it into a slash command.", syntax: "Message menu → Apps → Translate This Message", category: "Language & time", context: "Message command" },
  { name: "/tweet", description: "Display a rich X post preview and optionally translate its text.", syntax: "/tweet url: … language: Use my locale", category: "Language & time" },
  { name: "/user", description: "View global or server-specific information about a user.", syntax: "/user user: @member scope: Guild", category: "Lookups" },
  { name: "View User Profile", description: "Open the same profile lookup from a user context menu.", syntax: "User menu → Apps → View User Profile", category: "Lookups", context: "User command" },
  { name: "/avatar", description: "View a user’s global or server avatar with direct format links.", syntax: "/avatar user: @member scope: Global", category: "Lookups" },
  { name: "/banner", description: "View and download a user’s profile banner.", syntax: "/banner user: @member", category: "Lookups" },
  { name: "/role", description: "Inspect a role’s age, position, colours and key permissions.", syntax: "/role role: @role", category: "Lookups", context: "Server only" },
  { name: "/invite", description: "View information about a Discord invite link.", syntax: "/invite link: discord.gg/…", category: "Lookups" },
  { name: "/help", description: "Browse the commands currently available to you.", syntax: "/help", category: "Essentials" },
  { name: "/ping", description: "Check that Pocket Tool is online and responding.", syntax: "/ping", category: "Essentials" },
  { name: "/debug", description: "View basic runtime information about Pocket Tool.", syntax: "/debug", category: "Essentials" },
] as const;

export function CommandReference() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return commands;
    return commands.filter((command) =>
      [command.name, command.description, command.category, command.syntax].some((field) => field.toLowerCase().includes(value)),
    );
  }, [query]);

  const groups = useMemo(() => {
    return filtered.reduce<Record<string, Command[]>>((acc, command) => {
      (acc[command.category] ??= []).push(command);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="command-reference">
      <label className="command-search">
        <span className="sr-only">Search commands</span>
        <span aria-hidden="true">/</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands or capabilities…" />
        <kbd>{filtered.length}</kbd>
      </label>

      {Object.keys(groups).length ? Object.entries(groups).map(([category, items]) => (
        <section className="command-group" key={category}>
          <div className="command-group__heading">
            <h3>{category}</h3>
            <span>{items.length} {items.length === 1 ? "command" : "commands"}</span>
          </div>
          <div className="command-list">
            {items.map((command) => (
              <article className="command-card" key={`${category}-${command.name}`}>
                <div className="command-card__top">
                  <code>{command.name}</code>
                  {command.context && <span>{command.context}</span>}
                </div>
                <p>{command.description}</p>
                <pre><code>{command.syntax}</code></pre>
              </article>
            ))}
          </div>
        </section>
      )) : (
        <div className="empty-state">
          <p>No commands match “{query}”.</p>
          <button type="button" onClick={() => setQuery("")}>Clear search</button>
        </div>
      )}
    </div>
  );
}
