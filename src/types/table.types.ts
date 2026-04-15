import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
  mobileHidden?: boolean; // Hide this column on mobile
  desktopOnly?: boolean; // Only show this column on desktop
}
