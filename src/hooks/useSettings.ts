'use client';

import { useState, useCallback } from 'react';
import { SettingsTab, ProfileData } from '@/types/settings.types';
import { mockProfile } from '@/lib/api/settings.mock';
import toast from 'react-hot-toast';

export const useSettings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [profile, setProfile] = useState<ProfileData>(mockProfile);
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = useCallback((tab: SettingsTab) => {
        setActiveTab(tab);
    }, []);

    const handleProfileUpdate = useCallback(async (data: ProfileData) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setProfile(data);
        setIsLoading(false);
        toast.success('Profile updated successfully!');
    }, []);

    return {
        activeTab,
        profile,
        isLoading,
        handleTabChange,
        handleProfileUpdate,
    };
};