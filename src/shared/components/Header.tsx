import { useState } from "react";
import { useMatches } from "react-router-dom";
import LightModeImg from "@shared/assets/LightModeImg.png";
import DarkModeImg from "@shared/assets/DarkModeImg.png";

type HeaderRouteHandle = {
  title?: string;
};

function Header() {
  const matches = useMatches();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
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
    <div className="flex">
      <header className="border-ec-outline bg-ec-white sticky top-0 flex h-20 w-screen min-w-screen items-center justify-between border-b p-4">
        <h1 className="typo-sub-title text-ec-black">{pageTitle}</h1>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          onClick={handleToggleTheme}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggleTheme();
            }
          }}
          className="border-ec-outline bg-ec-white relative flex h-9.5 w-27.5 cursor-pointer overflow-hidden rounded-xl border-2"
        >
          <span
            aria-hidden
            className="bg-ec-outline-dark absolute inset-y-0 left-0 w-1/2 cursor-pointer rounded-md transition-transform duration-500"
            style={{ transform: isDark ? "translateX(100%)" : "translateX(0%)" }}
          />
          <div className="border-ec-outline-dark relative flex w-1/2 items-center justify-center">
            <img
              className="h-4.5 w-4.5"
              alt="NavLightModeImg"
              src={LightModeImg}
            />
          </div>
          <div className="border-ec-outline-dark relative flex w-1/2 items-center justify-center">
            <img className="h-4.5 w-4" alt="NavDarkModeImg" src={DarkModeImg} />
          </div>
        </button>
      </header>
    </div>
  );
}

export default Header;
