import { useState } from "react";
import { useMatches } from "react-router-dom";
import DarkModeImg from "@shared/assets/DarkModeImg.png";
import LightModeImg from "@shared/assets/LightModeImg.png";

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
      <header className="border-ec-outline sticky top-0 flex h-20 w-full items-center justify-between border-b-2 py-6.75 pr-29.25 pl-8 dark:border-[#323232]">
        <h1 className="typo-sub-title">{pageTitle}</h1>
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
          className="border-ec-outline bg-ec-white relative flex h-9.5 w-27.5 cursor-pointer items-center overflow-hidden rounded-xl border-2 dark:border-[#323232] dark:bg-[#131313]"
        >
          <span
            aria-hidden
            className="bg-ec-outline absolute inset-0 h-full w-1/2 cursor-pointer rounded-md transition-transform duration-500 dark:bg-[#323232]"
            style={{
              transform: isDark ? "translateX(100.5%)" : "translateX(0%)",
            }}
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
