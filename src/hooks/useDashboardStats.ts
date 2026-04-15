"use client";

import { useState, useMemo } from "react";
import {
  mockDashboardStats,
  mockRevenueData,
  mockPlanBreakdown,
} from "@/lib/api/dashboard.mock";

export const useDashboardStats = () => {
  
  const [isLoading, setIsLoading] = useState(true);

 
  const data = useMemo(() => {
   
    setTimeout(() => setIsLoading(false), 500);

    return {
      stats: mockDashboardStats,
      revenueData: mockRevenueData,
      planBreakdown: mockPlanBreakdown,
    };
  }, []);

  return {
    stats: data.stats,
    revenueData: data.revenueData,
    planBreakdown: data.planBreakdown,
    isLoading,
  };
};
