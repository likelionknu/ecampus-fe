import { Outlet } from "react-router-dom";
import DefaultBar from "../components/DefaultBar/DefaultBar";

function BaseLayout() {
  return (
    <>
      <DefaultBar>
        <main>
          <Outlet />
        </main>
      </DefaultBar>
    </>
  );
}

export default BaseLayout;
