import { Outlet } from "react-router-dom";
import Header from "@shared/components/Header";
import NavBar from "@shared/components/NavBar";

function BaseLayout() {
  return (
    <>
      <NavBar />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
