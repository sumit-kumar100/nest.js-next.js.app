"use client";

import React from "react";
import { Icons } from "@/components/icons";

import { SiteHeader } from "./site-header";
import { SiteMenu } from "./site-menus";

export interface SideMenu {
  title: string;
  href: string;
  disables?: boolean;
  icon?: any;
}
[];

const role1: SideMenu[] = [
  {
    title: "Users",
    href: "/",
    icon: Icons.Users,
  },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex">
      <div className="flex-0 sticky top-0 z-50 h-screen lg:w-[22vw]">
        <SiteMenu menus={role1} />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-3 lg:w-[78vw] lg:px-6 lg:pb-6">
        <SiteHeader />
        <div className="mt-16 text-sm">{children}</div>
      </div>
    </div>
  );
};
