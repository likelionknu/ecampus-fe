import TabBar from "@/shared/components/TabBar";
import {
  SESSION_DASHBOARD_TAG_ITEMS,
  SESSION_MANAGEMENT_TAG_ITEMS,
  SESSION_TAG_ITEMS,
} from "@/shared/constants/tabItems";
import type { ComponentProps } from "react";
import { Outlet } from "react-router-dom";

interface SessionTabLayoutProps {
  tabType: "userSession" | "adminSession" | "adminDashboard";
}

const TAB_ITEMS_MAP = {
  userSession: SESSION_TAG_ITEMS,
  adminSession: SESSION_DASHBOARD_TAG_ITEMS,
  adminDashboard: SESSION_MANAGEMENT_TAG_ITEMS,
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
