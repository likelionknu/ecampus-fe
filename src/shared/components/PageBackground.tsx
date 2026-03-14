import type { CSSProperties, ReactNode } from "react";

type PageBackgroundProps = {
  children: ReactNode;
  variant?: "auth" | "status";
};

function PageBackground({ children, variant = "status" }: PageBackgroundProps) {
  const layoutStyle = {
    "--desktop-scale": "calc(100vw / 90rem)",
  } as CSSProperties;

  const gradientClassName =
    variant === "auth"
      ? "from-ec-blue-item to-ec-blue-item/40 pointer-events-none absolute inset-y-0 left-0 hidden w-223.5 bg-linear-to-r lg:block"
      : "from-ec-blue-item to-ec-blue-item/40 pointer-events-none absolute inset-y-0 left-0 hidden w-224.25 bg-linear-to-r lg:block";

  const containerClassName =
    variant === "auth"
      ? "relative z-10 flex min-h-screen w-full max-w-360 lg:min-h-0 lg:h-full lg:w-360 lg:max-w-none"
      : "relative z-10 flex min-h-screen w-full max-w-360 lg:min-h-0 lg:h-full lg:w-360 lg:max-w-none";

  return (
    <main className="bg-ec-white relative min-h-screen overflow-x-clip lg:h-screen lg:overflow-hidden">
      <div
        className="relative min-h-screen w-full lg:h-screen lg:min-h-0"
        style={layoutStyle}
      >
        <div className="relative w-full lg:h-screen lg:overflow-hidden">
          <div className="relative min-h-screen w-full lg:absolute lg:top-0 lg:right-0 lg:h-[calc(100vh/var(--desktop-scale))] lg:min-h-0 lg:w-360 lg:origin-top-right lg:transform-[scale(var(--desktop-scale))]">
            <div aria-hidden="true" className={gradientClassName} />
            <div className={containerClassName}>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageBackground;
