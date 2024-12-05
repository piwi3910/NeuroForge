"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabLayout() {
  const pathname = usePathname();

  const tabs = [
    { label: "Project", path: "/project-info", color: "border-yellow-500" },
    { label: "Architecture", path: "/architecture", color: "border-blue-500" },
    { label: "Project Management", path: "/project", color: "border-green-500" },
    { label: "Coding", path: "/", color: "border-violet-500" },
    { label: "Preview", path: "/preview", color: "border-red-500" },
  ];

  return (
    <nav className="flex-none h-10 bg-[#1e1e1e] flex items-center px-4 border-b border-[#2d2d2d]">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path || (pathname === "/" && tab.path === "/");
        return (
          <Link
            key={tab.label}
            href={tab.path}
            className={`relative px-4 py-2 text-sm transition-colors ${
              isActive
                ? `text-white border-b-2 ${tab.color}`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
