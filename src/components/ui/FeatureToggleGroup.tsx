import { FeatureToggle } from './FeatureToggle';

export interface Feature {
    id: string;
    text: string;
    included: boolean;
}

interface FeatureToggleGroupProps {
    features: Feature[];
    onChange: (features: Feature[]) => void;
}

export const FeatureToggleGroup = ({ features, onChange }: FeatureToggleGroupProps) => {
    const handleToggle = (id: string, checked: boolean) => {
        const updated = features.map((f) =>
            f.id === id ? { ...f, included: checked } : f
        );
        onChange(updated);
    };

    return (
        <div className="flex flex-col gap-3">
            {features.map((feature) => (
                <FeatureToggle
                    key={feature.id}
                    id={feature.id}
                    text={feature.text}
                    checked={feature.included}
                    onChange={handleToggle}
                />
            ))}
        </div>
    );
};