import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    height?: string;
}

export const FormInput = ({ label, error, id, className, height, ...props }: FormInputProps) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex w-full flex-col gap-2">
            <label htmlFor={inputId} className="text-base font-bold text-white">
                {label}
            </label>
            <input
                id={inputId}
                className="w-full rounded border border-white/5 bg-white/8 px-4 py-4 text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-2 focus:ring-green-success transition-all"
                {...props}
                style={{ height }}
            />
            {error && <span className="text-xs text-error-red">{error}</span>}
        </div>
    );
};