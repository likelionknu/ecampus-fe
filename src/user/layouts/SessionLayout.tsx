import TabBar from "@/shared/components/TabBar";
import { Outlet } from "react-router-dom";

const testTabItems = [
  { label: "자료", path: "/user/sessions/files" },
  { label: "과제", path: "/user/sessions/assignments" },
  { label: "사용자 및 그룹", path: "/user/sessions/group" },
  { label: "질문 및 답변", path: "/user/sessionss/questions" },
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
