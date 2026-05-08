'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormDropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    width?: string;
    height?: string;
}

export const FormDropdown = ({
    label,
    options,
    value,
    onChange,
    error,
    width,

}: FormDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex w-full flex-col gap-2">
            <label className="text-base font-bold text-white">{label}</label>
            <div ref={dropdownRef} className="relative" style={{ width }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between rounded border border-white/5 bg-white/8 px-4 py-4 text-sm text-white transition-all"
                >
                    <span>{value}</span>
                    <ChevronDown className={cn('h-4 w-4 text-white-secondary transition-transform', isOpen && 'rotate-180')} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-[120px] rounded-lg border border-white/15 bg-white/10 backdrop-blur-[5px] p-2">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    'w-full px-4 py-[11px] text-left text-sm transition-colors rounded-md',
                                    option === value
                                        ? 'bg-[#00E676] text-black font-medium'
                                        : 'text-white hover:bg-white/10'
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-error-red">{error}</span>}
        </div>
    );
};