import { usePathname } from "next/navigation";
import { Tab } from "./types";

export function useTabLayout() {
  const pathname = usePathname();

  const isTabActive = (tab: Tab) => {
    return pathname === tab.path || (pathname === "/" && tab.path === "/");
  };

  const getTabClassName = (tab: Tab, isActive: boolean) => {
    return `relative px-4 py-2 text-sm transition-colors ${
      isActive
        ? `text-white border-b-2 ${tab.color}`
        : 'text-gray-400 hover:text-white'
    }`;
  };

  return {
    pathname,
    isTabActive,
    getTabClassName
  };
}
