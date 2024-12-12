"use client";

import { Tab } from "./Tab";
import { tabs } from "./config";
import { useTabLayout } from "./useTabLayout";

export function TabLayout() {
  const { isTabActive } = useTabLayout();

  return (
    <nav className="flex-none h-10 bg-[#1e1e1e] flex items-center px-4 border-b border-[#2d2d2d]">
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          tab={tab}
          isActive={isTabActive(tab)}
        />
      ))}
    </nav>
  );
}
