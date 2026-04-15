export interface DashboardStats {
  totalUsers: number;
  monthlyRevenue: number;
  proSubscribers: number;
  stopsToday: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface PlanBreakdown {
  name: string;
  value: number;
  color: string;
  subscribers: number;
}

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  monthlyRevenue: 4820,
  proSubscribers: 389,
  stopsToday: 1204,
};

export const mockRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 4100 },
  { month: "Apr", revenue: 3900 },
  { month: "May", revenue: 4300 },
  { month: "Jun", revenue: 4500 },
  { month: "Jul", revenue: 4400 },
  { month: "Aug", revenue: 4600 },
  { month: "Sep", revenue: 4700 },
  { month: "Oct", revenue: 4550 },
  { month: "Nov", revenue: 4750 },
  { month: "Dec", revenue: 4820 },
];

export const mockPlanBreakdown: PlanBreakdown[] = [
  {
    name: "Pro Monthly",
    value: 60,
    color: "#33D17A",
    subscribers: 241,
  },
  {
    name: "Pro Annualy",
    value: 30,
    color: "#FFFFFF",
    subscribers: 148,
  },
  {
    name: "Free Tier",
    value: 10,
    color: "rgba(255, 255, 255, 0.10)",
    subscribers: 1024,
  },
];
