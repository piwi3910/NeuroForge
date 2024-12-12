import { HeaderProps } from './types';

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="p-2 border-b border-[#2d2d2d]">
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
  );
}
