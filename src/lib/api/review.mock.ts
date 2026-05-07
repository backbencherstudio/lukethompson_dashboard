export interface Review {
    id: string;
    driverName: string;
    driverAvatar?: string;
    email: string;
    facilityName: string;
    review: string;
}

export const mockReviews: Review[] = [
    {
        id: '1',
        driverName: 'Jacob',
        driverAvatar: '/Avatar.png',
        email: 'young@example.com',
        facilityName: 'Walmart DC Shelbyville. TN',
        review: 'Good Payer (80%+ pay rate)',
    },
    {
        id: '2',
        driverName: 'Michael Chen',
        driverAvatar: '/Avatar.png',
        email: 'michael.c@example.com',
        facilityName: 'Amazon Fulfillment Center',
        review: 'Average Payer (60-80% pay rate)',
    },
    {
        id: '3',
        driverName: 'Sarah Johnson',
        driverAvatar: '/Avatar.png',
        email: 'sarah.j@example.com',
        facilityName: 'Target Distribution Center',
        review: 'Excellent Payer (90%+ pay rate)',
    },
    {
        id: '4',
        driverName: 'David Wilson',
        driverAvatar: '/Avatar.png',
        email: 'david.w@example.com',
        facilityName: 'Costco Wholesale Depot',
        review: 'Good Payer (80%+ pay rate)',
    },
    {
        id: '5',
        driverName: 'Emma Thompson',
        driverAvatar: '/Avatar.png',
        email: 'emma.t@example.com',
        facilityName: 'Home Depot Logistics',
        review: 'Below Average Payer (40-60% pay rate)',
    },
    {
        id: '6',
        driverName: 'James Brown',
        driverAvatar: '/Avatar.png',
        email: 'james.b@example.com',
        facilityName: 'Walmart DC Shelbyville. TN',
        review: 'Good Payer (80%+ pay rate)',
    },
    {
        id: '7',
        driverName: 'Lisa Garcia',
        driverAvatar: '/Avatar.png',
        email: 'lisa.g@example.com',
        facilityName: 'FedEx Ground Hub',
        review: 'Average Payer (60-80% pay rate)',
    },
    {
        id: '8',
        driverName: 'Robert Taylor',
        driverAvatar: '/Avatar.png',
        email: 'robert.t@example.com',
        facilityName: 'UPS Distribution Center',
        review: 'Excellent Payer (90%+ pay rate)',
    },
    {
        id: '9',
        driverName: 'Maria Sanchez',
        driverAvatar: '/Avatar.png',
        email: 'maria.s@example.com',
        facilityName: 'Kroger Warehouse',
        review: 'Good Payer (80%+ pay rate)',
    },
];