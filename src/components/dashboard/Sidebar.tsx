"use client";

import { Logo } from "./Logo";
import { SidebarNavItem } from "./SidebarNavItem";
import { LogoutButton } from "./LogoutButton";
import { NAV_ITEMS } from "@/constants/navigation";
import { X } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border-light bg-form-bg">
      {/* Header with Logo and Close Button */}
      <div className="flex items-center justify-between px-4 py-4">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white-secondary hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4 custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-border-light p-4">
        <LogoutButton />
      </div>
    </aside>
  );
};
