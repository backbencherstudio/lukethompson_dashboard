import { Eye } from "lucide-react";
import { User } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import {
  renderUserInfo,
  renderPlan,
  renderDate,
} from "@/components/ui/table-renderers";

interface UserTableColumnsConfig {
  onView: (user: User) => void;
  onBan: (user: User) => void;
  onDelete: (user: User) => void;
  showEye?: boolean;
}

export const createUserColumns = ({
  onView,
  onBan,
  onDelete,
  showEye = true,
}: UserTableColumnsConfig) => [
  {
    key: "user",
    header: "User",
    render: renderUserInfo,
  },
  {
    key: "phone",
    header: "Phone",
    render: (u: User) => (
      <span className="text-sm text-white-secondary">{u.phone || "-"}</span>
    ),
  },
  {
    key: "subscription",
    header: "Subscription",
    render: (u: User) => (
      <span className="text-sm text-white-secondary">
        {u.subscription || "-"}
      </span>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    render: (u: User) => renderPlan(u.plan || "Free Tier"),
  },
  {
    key: "stops",
    header: "Stops",
    render: (u: User) => (
      <span className="text-sm text-white">{u.stops || 0}</span>
    ),
  },
  {
    key: "joiningDate",
    header: "Joining Date",
    render: (u: User) => renderDate(u.joiningDate || u.createdAt),
  },
  {
    key: "status",
    header: "Status",
    render: (u: User) => <StatusBadge status={u.status || "Active"} />,
  },
  {
    key: "actions",
    header: "Action",
    render: (u: User) => (
      <div className="flex items-center gap-2">
        {showEye && (
          <button
            onClick={() => onView(u)}
            className="rounded p-1.5 text-white-secondary hover:bg-white/10 hover:text-white transition-colors"
          >
            <Eye size={18} />
          </button>
        )}
        <CustomDropdown
          options={[
            {
              label: u.status === "Banned" ? "Unban User" : "Ban User",
              value: "ban",
              className:
                u.status === "Banned"
                  ? "text-white hover:bg-white/10"
                  : "bg-error-red text-white hover:bg-error-red/80",
              onClick: () => onBan(u),
            },
            {
              label: "Delete User",
              value: "delete",
              className: "text-error-red hover:bg-error-red hover:text-white",
              onClick: () => onDelete(u),
            },
          ]}
          trigger={
            <button className="rounded p-1.5 text-white-secondary hover:bg-white/10 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </button>
          }
        />
      </div>
    ),
  },
];
