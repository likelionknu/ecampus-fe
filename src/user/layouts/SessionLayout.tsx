import TabBar from "@/shared/components/TabBar";
import { Outlet } from "react-router-dom";

const testTabItems = [
  { label: "자료", path: "/test" },
  { label: "과제", path: "/user/session" },
  { label: "사용자 및 그룹", path: "/user/dashboard" },
  { label: "질문 및 답변", path: "/admin/sessions" },
];

function SessionLayout() {
  return (
    <>
      <TabBar items={testTabItems} />
      <>
        <Outlet />
      </>
    </>
  );
}

export default SessionLayout;
