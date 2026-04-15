"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { PlanBreakdown } from "@/components/dashboard/PlanBreakdown";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { UserManagementIcon } from "@/components/ui/icons/UserManagementIcon";
import { MonthlyRevenueIcon } from "@/components/ui/icons/MonthlyRevenueIcon";
import { SubscriptionIcon } from "@/components/ui/icons/SubscriptionIcon";
import { StopsTodayIcon } from "@/components/ui/icons/StopsTodayIcon";
import {
  renderUserInfo,
  renderPlan,
  renderDate,
  renderActions,
} from "@/components/ui/table-renderers";
import {
  mockDashboardStats,
  mockRevenueData,
  mockPlanBreakdown,
} from "@/lib/api/dashboard.mock";
import { mockUsers } from "@/lib/api/users.mock";
import toast from "react-hot-toast";
import { User } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function DashboardPage() {
  const router = useRouter();
  const stats = mockDashboardStats;
  const [users, setUsers] = useState(mockUsers);

  const handleViewUser = (user: User) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  const handleBanUser = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" }
          : u,
      ),
    );
    toast.success(
      `${user.name} ${user.status === "Banned" ? "unbanned" : "banned"}`,
    );
  };

  const handleDeleteUser = (user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success(`${user.name} deleted`);
  };

  const handleSearch = (query: string) => {
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()),
    );
    setUsers(filtered);
  };

  const userColumns = [
    { key: "user", header: "User", render: renderUserInfo },
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
      render: (u: User) =>
        renderActions(u, {
          showEye: false,
          onView: handleViewUser,
          onBan: handleBanUser,
          onDelete: handleDeleteUser,
        }),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<UserManagementIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={<MonthlyRevenueIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Pro Subscribers"
          value={stats.proSubscribers.toLocaleString()}
          icon={<SubscriptionIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Stops Today"
          value={stats.stopsToday.toLocaleString()}
          icon={<StopsTodayIcon className="h-6 w-6 text-white" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={mockRevenueData} />
        </div>
        <div>
          <PlanBreakdown
            data={mockPlanBreakdown}
            totalSubscribers={stats.proSubscribers}
          />
        </div>
      </div>

      {/* User Table Preview */}
      <DataTable
        data={users}
        columns={userColumns}
        title="User Management"
        showSearch
        searchPlaceholder="Search users..."
        onSearch={handleSearch}
        maxRows={3}
        headerAction={
          <Button
            size="sm"
            className="h-9 rounded-lg text-black! font-semibold text-md tracking-[0.32px]!"
            onClick={() => router.push("/dashboard/users")}
          >
            See All
          </Button>
        }
      />
    </div>
  );
}
