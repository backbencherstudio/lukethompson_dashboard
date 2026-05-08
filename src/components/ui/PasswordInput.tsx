'use client';

import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    autoComplete?: string;
}

export const PasswordInput = ({
    label,
    value,
    onChange,
    placeholder = 'Enter password',
    error,
    autoComplete,
}: PasswordInputProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="flex w-full flex-col gap-2">
            <label className="text-base font-bold text-white">{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="w-full rounded border border-white/5 bg-white/8 px-4 py-4 pr-12 text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-2 focus:ring-green-success transition-all"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white-secondary hover:text-white transition-colors"
                >
                    {show ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
            </div>
            {error && <span className="text-xs text-error-red">{error}</span>}
        </div>
    );
};