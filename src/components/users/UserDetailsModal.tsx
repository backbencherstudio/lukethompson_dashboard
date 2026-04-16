"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { User } from "@/types";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { mockStopLogs, StopLog } from "@/lib/api/stop-logs.mock";
import { cn } from "@/lib/utils";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const LOG_HEADERS = [
  "Location",
  "Arrival Time",
  "Dock In Time",
  "Complete Time",
  "Departure Time",
  "Detention Owned",
];

export const UserDetailModal = ({
  user,
  isOpen,
  onClose,
}: UserDetailModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (!isOpen || !user) return null;

  const userLogs = mockStopLogs.filter((log) => log.userId === user.id);
  const filteredLogs = userLogs.filter((log) =>
    log.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-form-bg border border-border-light custom-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light bg-form-bg px-6 py-4">
          <h2 className="text-2xl font-bold text-white font-liberation">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white-secondary hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={user.avatar || "/Avatar.png"}
                alt={user.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-white-secondary">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                Name
              </label>
              <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                <span className="text-sm text-white">{user.name}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                Email
              </label>
              <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                <span className="text-sm text-white">{user.email}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                Phone Number
              </label>
              <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                <span className="text-sm text-white">{user.phone || "-"}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                Join Date
              </label>
              <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                <span className="text-sm text-white">
                  {user.joiningDate
                    ? new Date(user.joiningDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border-light bg-form-bg/50 p-5">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold text-white">Log Summary</h3>
              <div className="relative w-full sm:w-[237px]">
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 bg-white/10 border-border-light pl-9"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white-secondary" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[rgba(254,254,254,0.10)]">
                    {LOG_HEADERS.map((header, i) => (
                      <th
                        key={header}
                        className={cn(
                          "px-4 py-3 text-left text-xs font-medium text-white",
                          i === 0 && "rounded-tl-lg",
                          i === LOG_HEADERS.length - 1 && "rounded-tr-lg",
                        )}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-b border-border-light last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-white">
                          {log.location}
                        </td>
                        <td className="px-4 py-3 text-sm text-white-secondary">
                          {log.arrivalTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-white-secondary">
                          {log.dockInTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-white-secondary">
                          {log.completeTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-white-secondary">
                          {log.departureTime}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-white">
                          {log.detentionOwned}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-white-secondary"
                      >
                        No stop logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredLogs.length > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
