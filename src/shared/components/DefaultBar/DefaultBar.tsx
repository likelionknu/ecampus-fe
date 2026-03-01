import type { ReactNode } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

interface DefaultBarProps {
  children: ReactNode;
}

const DefaultBar = ({ children }: DefaultBarProps) => {
  return (
    <div className="flex min-h-screen">
      <NavBar />
      <main className="flex flex-1 flex-col">
        <Header />
        <div className="flex h-full w-full justify-start">{children}</div>
      </main>
    </div>
  );
};

export default DefaultBar;
