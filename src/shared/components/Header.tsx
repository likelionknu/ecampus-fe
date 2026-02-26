import { useState } from "react";
import { useMatches } from "react-router-dom";

type HeaderRouteHandle = {
  title?: string;
};

function Header() {
  const matches = useMatches();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const pageTitle =
    [...matches]
      .reverse()
      .map((match) => (match.handle as HeaderRouteHandle | undefined)?.title)
      .find((title) => typeof title === "string") ?? "eCampus";

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;

      document.documentElement.classList.toggle("dark", next);
      document.documentElement.style.colorScheme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");

      return next;
    });
  };

  return (
    <header className="flex items-center justify-between border-b border-ec-outline-dark p-4">
      <h1 className="typo-sub-title">{pageTitle}</h1>
      <button
        type="button"
        onClick={handleToggleTheme}
        className="rounded-md border border-ec-outline-dark px-4 py-2 text-body-2 transition-colors hover:bg-ec-outline dark:border-ec-sub dark:hover:bg-zinc-800"
      >
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
}

export default Header;
