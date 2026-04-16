export interface StopLog {
  id: string;
  userId: string;
  location: string;
  arrivalTime: string;
  dockInTime: string;
  completeTime: string;
  departureTime: string;
  detentionOwned: number;
}

export const mockStopLogs: StopLog[] = [
  {
    id: "1",
    userId: "1",
    location: "Warehouse A - Dock 3",
    arrivalTime: "2024-01-15 08:30",
    dockInTime: "2024-01-15 08:45",
    completeTime: "2024-01-15 14:20",
    departureTime: "2024-01-15 14:35",
    detentionOwned: 45,
  },
  {
    id: "2",
    userId: "1",
    location: "Distribution Center B",
    arrivalTime: "2024-01-16 09:15",
    dockInTime: "2024-01-16 09:30",
    completeTime: "2024-01-16 13:45",
    departureTime: "2024-01-16 14:00",
    detentionOwned: 30,
  },
  {
    id: "3",
    userId: "1",
    location: "Terminal C - Gate 7",
    arrivalTime: "2024-01-17 07:45",
    dockInTime: "2024-01-17 08:00",
    completeTime: "2024-01-17 16:30",
    departureTime: "2024-01-17 16:45",
    detentionOwned: 60,
  },
  {
    id: "4",
    userId: "2",
    location: "Warehouse D",
    arrivalTime: "2024-01-14 10:00",
    dockInTime: "2024-01-14 10:15",
    completeTime: "2024-01-14 12:30",
    departureTime: "2024-01-14 12:45",
    detentionOwned: 25,
  },
  {
    id: "5",
    userId: "2",
    location: "Logistics Hub E",
    arrivalTime: "2024-01-15 11:20",
    dockInTime: "2024-01-15 11:35",
    completeTime: "2024-01-15 15:10",
    departureTime: "2024-01-15 15:25",
    detentionOwned: 35,
  },
  {
    id: "6",
    userId: "1",
    location: "Warehouse F - Dock 2",
    arrivalTime: "2024-01-18 08:00",
    dockInTime: "2024-01-18 08:15",
    completeTime: "2024-01-18 12:45",
    departureTime: "2024-01-18 13:00",
    detentionOwned: 20,
  },
  {
    id: "7",
    userId: "3",
    location: "Terminal G",
    arrivalTime: "2024-01-19 09:30",
    dockInTime: "2024-01-19 09:45",
    completeTime: "2024-01-19 11:20",
    departureTime: "2024-01-19 11:35",
    detentionOwned: 15,
  },
  {
    id: "8",
    userId: "4",
    location: "Warehouse H",
    arrivalTime: "2024-01-20 07:15",
    dockInTime: "2024-01-20 07:30",
    completeTime: "2024-01-20 15:00",
    departureTime: "2024-01-20 15:15",
    detentionOwned: 50,
  },
];
