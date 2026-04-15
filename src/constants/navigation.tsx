import { NavItem } from "@/types/navigation.types";
import { DashboardIcon } from "@/components/ui/icons/DashboardIcon";
import { UserManagementIcon } from "@/components/ui/icons/UserManagementIcon";
import { SubscriptionIcon } from "@/components/ui/icons/SubscriptionIcon";
import { SettingsIcon } from "@/components/ui/icons/SettingsIcon";

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "User Management",
    href: "/dashboard/users",
    icon: UserManagementIcon,
  },
  {
    name: "Subscription",
    href: "/dashboard/subscription",
    icon: SubscriptionIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];


