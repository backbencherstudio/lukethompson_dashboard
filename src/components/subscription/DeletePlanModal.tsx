'use client';

import { SubscriptionPlan } from '@/types/subscription.types';

interface DeletePlanModalProps {
    plan: SubscriptionPlan | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (plan: SubscriptionPlan) => void;
}

export const DeletePlanModal = ({ plan, isOpen, onClose, onConfirm }: DeletePlanModalProps) => {
    if (!isOpen || !plan) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative flex w-full max-w-[452px] flex-col items-center gap-6 rounded-xl border border-border-light bg-form-bg px-6 pb-6 pt-8">
                {/* Top Section - SVG Image */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/delete-plan-modal.png"
                        alt="Delete plan confirmation"
                        className="w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="flex w-full gap-3">
                    <button
                        onClick={() => onConfirm(plan)}
                        className="flex-1 rounded-[32px] bg-[#FF5C6C] px-4 py-2 text-sm text-white hover:bg-[#FF5C6C]/90 transition-colors"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-[32px] border border-white px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};