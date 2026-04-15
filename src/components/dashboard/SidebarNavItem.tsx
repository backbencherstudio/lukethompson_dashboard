"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation.types";

interface SidebarNavItemProps {
  item: NavItem;
}

export const SidebarNavItem = ({ item }: SidebarNavItemProps) => {
  const pathname = usePathname();

  // Exact match for dashboard, startsWith for nested routes
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
        isActive
          ? "bg-green-success text-white"
          : "text-white-secondary hover:bg-white/5",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{item.name}</span>
    </Link>
  );
};
