import { CheckCircle2 } from 'lucide-react';

interface FeatureItemProps {
    text: string;
    included: boolean;
}

export const FeatureItem = ({ text, included }: FeatureItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <CheckCircle2
                size={20}
                className={included ? 'text-[#00E676]' : 'text-[#404040]'}
            />
            <span className={`text-sm ${included ? 'text-white-secondary' : 'text-[#404040]'}`}>
                {text}
            </span>
        </div>
    );
};