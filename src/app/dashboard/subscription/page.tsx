'use client';
import { useState } from 'react';
import { SubscriptionPlan } from '@/types/subscription.types';
import { PlanCard } from '@/components/subscription/PlanCard';
import { AddPlanCard } from '@/components/subscription/AddPlanCard';
import { DeletePlanModal } from '@/components/subscription/DeletePlanModal';
import { useSubscription } from '@/hooks/useSubscription';
import { Modal } from '@/components/ui/Modal';

export default function SubscriptionPage() {
  const {
    plans,
    deleteTarget,
    handleEditPlan,
    handleAddPlan,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useSubscription();
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)

  const handleEditPlanWithModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
  };
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-white">Subscription Plans</h1>
        <p className="text-sm text-white-secondary">Manage pricing, features, and billing configuration</p>
      </div>

      {/* Plan Cards */}
      <div className="flex flex-wrap gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEditPlan}
            onDelete={handleDeleteClick}
          />
        ))}
        <AddPlanCard onClick={handleAddPlan} />
      </div>

      {/* Delete Confirmation Modal */}
      <DeletePlanModal
        plan={deleteTarget}
        isOpen={!!deleteTarget}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Plan Modal */}
      <Modal
        isOpen={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        title={`Edit ${editingPlan?.name}`}
        size='xl'
      >
        <div className="space-y-4">
          <p>Edit form coming soon...</p>
        </div>
      </Modal>

    </div>
  );
};