"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export const NotificationBell = () => {
  const [hasUnread] = useState(true);

  return (
    <button className="relative rounded-3xl border border-border-light p-2 hover:bg-white/5">
      <Bell size={20} className="text-white-secondary" />
      {hasUnread && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error-red" />
      )}
    </button>
  );
};
