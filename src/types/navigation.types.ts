import { ComponentType } from "react";

export interface NavItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}
