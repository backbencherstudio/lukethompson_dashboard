import { Plus } from 'lucide-react';

interface AddPlanCardProps {
    onClick?: () => void;
}

export const AddPlanCard = ({ onClick }: AddPlanCardProps) => {
    return (
        <button
            onClick={onClick}
            className="flex w-[271px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#00E676] bg-[rgba(0,230,118,0.05)] p-4 hover:bg-[rgba(0,230,118,0.08)] transition-colors"
        >
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-3xl border border-dashed border-[#00E676] bg-[rgba(0,230,118,0.05)]">
                <Plus size={30} className="text-white" />
            </div>
            <div className="text-center">
                <h4 className="text-base font-bold text-white">Add New Plan</h4>
                <p className="text-sm text-white-secondary">Create a custom membership plan for your members</p>
            </div>
        </button>
    );
};