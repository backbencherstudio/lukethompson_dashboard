"use client";

import { NotificationBell } from "./NotificationBell";
import { UserProfile } from "./UserProfile";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="border-b border-border-light bg-form-bg">
      <div className="flex h-16 items-center justify-end px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-white-secondary hover:bg-white/10 hover:text-white lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Spacer for alignment */}
        <div className="flex-1 lg:hidden" />

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NotificationBell />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};
