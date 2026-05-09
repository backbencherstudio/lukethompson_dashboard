'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CountryOption, getAllCountries } from '@/lib/data/countries';

interface CountryDropdownProps {
    selected: CountryOption;
    onSelect: (country: CountryOption) => void;
}

export const CountryDropdown = ({ selected, onSelect }: CountryDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const allCountries = useMemo(() => getAllCountries(), []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return allCountries;
        const q = searchQuery.toLowerCase();
        return allCountries.filter(
            c => c.name.toLowerCase().includes(q) || c.dialCode.includes(q)
        );
    }, [allCountries, searchQuery]);

    const handleSelect = (country: CountryOption) => {
        onSelect(country);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div ref={dropdownRef} className="relative flex-shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-4 pl-2 pr-1 text-sm text-white hover:opacity-80 transition-opacity"
            >
                <CircleFlag countryCode={selected.code.toLowerCase()} className="h-5 w-5" />
                <span className="text-white-secondary">{selected.dialCode}</span>
                <ChevronDown className={cn('h-3 w-3 text-white-secondary transition-transform', isOpen && 'rotate-180')} />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[280px] rounded-lg border border-white/15 bg-form-bg backdrop-blur-[5px]">
                    <div className="border-b border-white/10 p-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white-secondary" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search countries..."
                                className="w-full rounded border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white-secondary outline-none focus:border-green-success"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => handleSelect(country)}
                                className={cn(
                                    'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                    country.code === selected.code
                                        ? 'bg-green-success/20 text-white'
                                        : 'text-white-secondary hover:bg-white/10 hover:text-white'
                                )}
                            >
                                <CircleFlag countryCode={country.code.toLowerCase()} className="h-5 w-5 flex-shrink-0" />
                                <span className="flex-1 text-left truncate">{country.name}</span>
                                <span className="text-white-secondary flex-shrink-0">{country.dialCode}</span>
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <p className="px-4 py-3 text-sm text-white-secondary text-center">No countries found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};