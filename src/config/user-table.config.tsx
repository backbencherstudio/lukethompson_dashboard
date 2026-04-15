import { User } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  renderUserInfo,
  renderPlan,
  renderDate,
  renderActions,
} from "@/components/ui/table-renderers";

export const createUserColumns = (handlers: {
  onView: (user: User) => void;
  onBan: (user: User) => void;
  onDelete: (user: User) => void;
  showEye?: boolean;
}) => [
  {
    key: "user",
    header: "User",
    render: renderUserInfo,
    className: "min-w-[200px]",
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
    key: "age",
    header: "Age",
    render: (u: User) => (
      <span className="text-sm text-white-secondary">{u.age || "-"}</span>
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
    render: (u: User) => renderActions(u, handlers),
    className: "text-right",
  },
];
