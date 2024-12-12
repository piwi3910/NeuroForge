import Link from "next/link";
import { TabProps } from "./types";
import { useTabLayout } from "./useTabLayout";

export function Tab({ tab, isActive }: TabProps) {
  const { getTabClassName } = useTabLayout();

  return (
    <Link
      key={tab.label}
      href={tab.path}
      className={getTabClassName(tab, isActive)}
    >
      {tab.label}
    </Link>
  );
}
