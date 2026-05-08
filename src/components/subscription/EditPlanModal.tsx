'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FormInput } from '@/components/ui/FormInput';
import { FormDropdown } from '@/components/ui/FormDropdown';
import { FeatureToggleGroup, Feature } from '@/components/ui/FeatureToggleGroup';
import { Button } from '@/components/ui/Button';
import { SubscriptionPlan } from '@/types/subscription.types';
import toast from 'react-hot-toast';

const DEFAULT_FEATURES: Feature[] = [
    { id: 'f1', text: 'Unlimited stop logs', included: false },
    { id: 'f2', text: 'Advanced detention calculator', included: false },
    { id: 'f3', text: 'Result screen view', included: false },
    { id: 'f4', text: 'PDF export', included: false },
    { id: 'f5', text: 'Weekly summary', included: false },
];

interface EditPlanModalProps {
    editingPlan: SubscriptionPlan | null;
    isAdding: boolean;
    handleCloseEdit: () => void;
    onSuccess: (message: string) => void;
}

export const EditPlanModal = ({ editingPlan, isAdding, handleCloseEdit, onSuccess }: EditPlanModalProps) => {
    const [badgeName, setBadgeName] = useState('');
    const [price, setPrice] = useState('');
    const [period, setPeriod] = useState('Monthly');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState<Feature[]>(DEFAULT_FEATURES);

    const isOpen = !!editingPlan || isAdding;
    const isEditing = !!editingPlan;

    useEffect(() => {
        if (editingPlan) {
            setBadgeName(editingPlan.tier);
            setPrice(editingPlan.price.toString());
            setDescription(editingPlan.description);
            setFeatures(
                editingPlan.features.map((f) => ({
                    id: f.id,
                    text: f.text,
                    included: f.included,
                }))
            );
        } else if (isAdding) {
            // Empty fields for new plan
            setBadgeName('');
            setPrice('');
            setDescription('');
            setFeatures(DEFAULT_FEATURES);
        }
    }, [editingPlan, isAdding]);

    const handleSave = () => {
        const message = isAdding
            ? 'New subscription plan has been successfully created!'
            : 'Subscription plan has been successfully updated!';

        handleCloseEdit();
        onSuccess(message);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseEdit} size="xl">
            <div className="flex flex-col gap-8">
                {/* Heading */}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                        {isAdding ? 'Add New Plan' : `Edit ${editingPlan?.name}`}
                    </h1>
                    <p className="text-sm font-medium text-white-secondary text-center">
                        Create a custom subscription plan for your members
                    </p>
                </div>

                {/* Form Fields */}
                <div className="flex gap-6">
                    <FormInput
                        label="Badge Name"
                        value={badgeName}
                        onChange={(e) => setBadgeName(e.target.value)}
                        placeholder="Enter badge name"
                    />

                    <FormInput
                        label="Set Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />

                    <FormDropdown
                        label="Period"
                        options={['Monthly', 'Yearly']}
                        value={period}
                        onChange={setPeriod}
                    />
                </div>

                {/* Description */}
                <FormInput
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    height='111px'
                />

                {/* Features */}
                <div className="flex flex-col gap-2">
                    <label className="text-base font-bold text-white">Add Features</label>
                    <FeatureToggleGroup features={features} onChange={setFeatures} />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full text-white hover:bg-white/10 border-white/50"
                        onClick={handleCloseEdit}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="default"
                        size="lg"
                        className="w-full text-white hover:bg-green-success/80"
                        onClick={handleSave}
                    >
                        {isAdding ? 'Create Plan' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};