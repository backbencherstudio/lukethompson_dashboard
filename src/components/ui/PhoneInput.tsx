'use client';

import 'react-phone-number-input/style.css';
import PhoneInputLib from 'react-phone-number-input';

interface PhoneInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
}

export const PhoneInput = ({
    label,
    value,
    onChange,
    error,
    placeholder = 'Enter phone number',
}: PhoneInputProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <label className="text-base font-bold text-white">{label}</label>
            <PhoneInputLib
                international
                defaultCountry="US"
                value={value}
                onChange={(val) => onChange(val || '')}
                placeholder={placeholder}
                className="w-full rounded border border-white/5 bg-white/8 text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-2 focus:ring-green-success transition-all"
                style={{
                    '--PhoneInputCountryFlag-height': '20px',
                    '--PhoneInputCountrySelectArrow-color': '#8DA2B8',
                    '--PhoneInputCountrySelectArrow-opacity': '1',
                } as React.CSSProperties}
            />
            {error && <span className="text-xs text-error-red">{error}</span>}
        </div>
    );
};