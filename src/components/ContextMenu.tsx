"use client";

import { useEffect, useRef } from 'react';

interface ContextMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  divider?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#2d2d2d] border border-[#404040] rounded shadow-lg py-1 z-50"
      style={{
        left: x,
        top: y,
        minWidth: '160px'
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <div
            className="px-4 py-1.5 hover:bg-[#404040] cursor-pointer text-sm flex items-center gap-2"
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.icon && <span className="w-4">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {item.divider && <div className="my-1 border-t border-[#404040]" />}
        </div>
      ))}
    </div>
  );
}
