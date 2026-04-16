"use client";

import { useState, useCallback } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/api/users.mock";
import toast from "react-hot-toast";

export const useDashboardUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setUsers(mockUsers);
      return;
    }
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.phone?.toLowerCase().includes(query.toLowerCase()),
    );
    setUsers(filtered);
  }, []);

  const handleBanUser = useCallback((user: User) => {
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
  }, []);

  const handleDeleteUser = useCallback((user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success(`${user.name} deleted`);
  }, []);

  return {
    users,
    handleSearch,
    handleBanUser,
    handleDeleteUser,
  };
};
