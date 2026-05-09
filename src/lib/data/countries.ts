import { lookup } from 'country-data-list';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import type { CountryCode } from 'libphonenumber-js';

export interface CountryOption {
    code: string;
    name: string;
    dialCode: string;
    maxLength: number;
}

// Get max phone number length for any country
const getCountryMaxLength = (countryCode: string): number => {
    try {
        const example = getExampleNumber(countryCode as CountryCode, examples);
        if (example) {
            const nationalNumber = example.nationalNumber;
            return nationalNumber.length;
        }
    } catch {
    }
    return 12;
};

export const getMaxLength = (code: string): number => {
    return getCountryMaxLength(code);
};

export const getAllCountries = (): CountryOption[] => {
    const all = lookup.countries({});
    return all
        .filter((c: { countryCallingCodes: string[]; status: string }) =>
            c.countryCallingCodes?.length > 0 && c.status === 'assigned'
        )
        .map((c: { alpha2: string; name: string; countryCallingCodes: string[] }) => ({
            code: c.alpha2,
            name: c.name,
            dialCode: c.countryCallingCodes[0],
            maxLength: getCountryMaxLength(c.alpha2),
        }))
        .sort((a: CountryOption, b: CountryOption) => a.name.localeCompare(b.name));
};