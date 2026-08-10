"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("pocket-tool-theme", next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light or dark mode"
      title="Toggle light or dark mode"
    >
      <span className="theme-icon theme-icon--sun" aria-hidden="true"></span>
      <span className="theme-icon theme-icon--moon" aria-hidden="true"></span>
    </button>
  );
}
