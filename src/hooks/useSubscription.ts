'use client';

import { useState, useCallback } from 'react';
import { SubscriptionPlan } from '@/types/subscription.types';
import { mockPlans, mockSubscriptionStats } from '@/lib/api/subscription.mock';
import toast from 'react-hot-toast';

export const useSubscription = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
    const [deleteTarget, setDeleteTarget] = useState<SubscriptionPlan | null>(null);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [isAddingPlan, setIsAddingPlan] = useState(false);

    const stats = mockSubscriptionStats;

    // Edit handlers
    const handleEditPlan = useCallback((plan: SubscriptionPlan) => {
        setEditingPlan(plan);
    }, []);

    const handleCloseEdit = useCallback(() => {
        setEditingPlan(null);
    }, []);

    // Delete handlers
    const handleDeleteClick = useCallback((plan: SubscriptionPlan) => {
        setDeleteTarget(plan);
    }, []);

    const handleDeleteConfirm = useCallback((plan: SubscriptionPlan) => {
        setPlans((prev) => prev.filter((p) => p.id !== plan.id));
        setDeleteTarget(null);
        toast.success(`${plan.name} deleted`);
    }, []);

    const handleDeleteCancel = useCallback(() => {
        setDeleteTarget(null);
    }, []);

    // Add handlers
    const handleAddPlan = useCallback(() => {
        setIsAddingPlan(true);
    }, []);

    const handleCloseAdd = useCallback(() => {
        setIsAddingPlan(false);
    }, []);

    return {
        plans,
        stats,
        deleteTarget,
        editingPlan,
        isAddingPlan,
        handleEditPlan,
        handleCloseEdit,
        handleAddPlan,
        handleCloseAdd,
        handleDeleteClick,
        handleDeleteConfirm,
        handleDeleteCancel,
    };
};