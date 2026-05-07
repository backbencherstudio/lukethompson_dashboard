import { SubscriptionPlan, SubscriptionStats } from '@/types/subscription.types';

export const mockSubscriptionStats: SubscriptionStats = {
    totalSubscribers: 389,
    activePlans: 3,
    monthlyRevenue: 4820,
    conversionRate: 24,
};

export const mockPlans: SubscriptionPlan[] = [
    {
        id: '1',
        name: 'Free Tier',
        tier: 'Free Tier',
        description: 'Entry level for new drivers',
        price: 0,
        features: [
            { id: 'f1', text: '5 stop logs per month', included: true },
            { id: 'f2', text: 'Basic detention calculator', included: true },
            { id: 'f3', text: 'Result screen view', included: true },
            { id: 'f4', text: 'PDF export', included: false },
            { id: 'f5', text: 'Weekly summary', included: false },
        ],
    },
    {
        id: '2',
        name: 'Pro Monthly',
        tier: 'Pro Monthly',
        description: 'For active owner-operators',
        price: 12.99,
        features: [
            { id: 'f1', text: 'Unlimited stop logs', included: true },
            { id: 'f2', text: 'Advanced detention calculator', included: true },
            { id: 'f3', text: 'Result screen view', included: true },
            { id: 'f4', text: 'PDF export', included: true },
            { id: 'f5', text: 'Weekly summary', included: true },
        ],
    },
    {
        id: '3',
        name: 'Pro Annual',
        tier: 'Pro Annual',
        description: 'Best value — save $56.88/yr',
        price: 99,
        features: [
            { id: 'f1', text: 'Unlimited stop logs', included: true },
            { id: 'f2', text: 'Advanced detention calculator', included: true },
            { id: 'f3', text: 'Result screen view', included: true },
            { id: 'f4', text: 'PDF export', included: true },
            { id: 'f5', text: 'Weekly summary', included: true },
        ],
    },
];