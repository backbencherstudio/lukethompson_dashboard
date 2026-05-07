export interface PlanFeature {
    id: string;
    text: string;
    included: boolean;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    tier: 'Free Tier' | 'Pro Monthly' | 'Pro Annual';
    description: string;
    price: number;
    features: PlanFeature[];
}

export interface SubscriptionStats {
    totalSubscribers: number;
    activePlans: number;
    monthlyRevenue: number;
    conversionRate: number;
}