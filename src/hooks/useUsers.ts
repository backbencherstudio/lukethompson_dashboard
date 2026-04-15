"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/types";
import { mockUsers } from "@/lib/api/users.mock";

export const useUsers = (initialUsers: User[] = mockUsers) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewUser = useCallback(
    (user: User) => {
      router.push(`/dashboard/users/${user.id}`);
    },
    [router],
  );

  const handleBanUser = useCallback((user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" }
          : u,
      ),
    );
    toast.success(
      `${user.name} ${user.status === "Banned" ? "unbanned" : "banned"} successfully`,
    );
  }, []);

  const handleDeleteUser = useCallback((user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success(`${user.name} deleted successfully`);
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setUsers(initialUsers);
        return;
      }
      const filtered = initialUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone?.toLowerCase().includes(query.toLowerCase()),
      );
      setUsers(filtered);
    },
    [initialUsers],
  );

  return {
    users,
    searchQuery,
    handleViewUser,
    handleBanUser,
    handleDeleteUser,
    handleSearch,
  };
};
