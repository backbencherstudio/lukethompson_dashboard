interface FeatureToggleProps {
    id: string;
    text: string;
    checked: boolean;
    onChange: (id: string, checked: boolean) => void;
}

export const FeatureToggle = ({ id, text, checked, onChange }: FeatureToggleProps) => {
    return (
        <label
            htmlFor={id}
            className="flex items-center gap-3 cursor-pointer rounded border border-white/5 bg-white/8 px-4 py-4"
        >
            <div className="flex justify-between items-center w-full">
                <span className="text-sm text-white-secondary peer-checked:text-white transition-colors">
                    {text}
                </span>
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(id, e.target.checked)}
                    className=" appearance-none w-3 h-3 rounded-full bg-black checked:bg-[#00E676] cursor-pointer focus:ring-0 focus:outline-none "
                />
            </div>
        </label>
    );
};