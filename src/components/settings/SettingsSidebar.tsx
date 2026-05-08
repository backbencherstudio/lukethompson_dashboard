import { SettingsTab } from '@/types/settings.types';
import { cn } from '@/lib/utils';

interface SettingsSidebarProps {
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

const TABS: { key: SettingsTab; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'password', label: 'Password' },
    { key: 'notifications', label: 'Notifications' },
];

export const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
    return (
        <div className="flex w-full flex-col gap-3 rounded-lg border border-border-light bg-form-bg p-4 sm:w-[200px] sm:p-6">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={cn(
                        'w-full rounded-sm px-3 py-2 text-left text-sm font-bold transition-all',
                        activeTab === tab.key
                            ? 'border border-border-light bg-[#0A0F1A] text-white'
                            : 'text-white-secondary hover:bg-white/5 hover:text-white'
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};