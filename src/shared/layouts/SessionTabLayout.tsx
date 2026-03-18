import TabBar from "@/shared/components/TabBar";
import {
  ADMIN_DASHBOARD_TAG_ITEMS,
  ADMIN_MANAGEMENT_TAG_ITEMS,
  USER_SESSION_TAG_ITEMS,
} from "@/shared/constants/tabItems";
import type { ComponentProps } from "react";
import { Outlet } from "react-router-dom";

interface SessionTabLayoutProps {
  tabType: "userSession" | "adminManagement" | "adminDashboard";
}

const TAB_ITEMS_MAP = {
  userSession: USER_SESSION_TAG_ITEMS,
  adminManagement: ADMIN_MANAGEMENT_TAG_ITEMS,
  adminDashboard: ADMIN_DASHBOARD_TAG_ITEMS,
} as const;

function SessionTabLayout({ tabType }: SessionTabLayoutProps) {
  const items: ComponentProps<typeof TabBar>["items"] = TAB_ITEMS_MAP[tabType];

  return (
    <>
      <TabBar items={items} />
      <Outlet />
    </>
  );
}

export default SessionTabLayout;
