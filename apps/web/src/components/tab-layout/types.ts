export interface Tab {
  label: string;
  path: string;
  color: string;
}

export interface TabProps {
  tab: Tab;
  isActive: boolean;
}

export interface TabLayoutProps {
  tabs: Tab[];
}
