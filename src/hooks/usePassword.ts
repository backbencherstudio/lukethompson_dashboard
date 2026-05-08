'use client';

import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

export const usePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const errors = useMemo(() => {
        const errs: Record<string, string> = {};
        if (newPassword && newPassword.length < 8) {
            errs.newPassword = 'Must be at least 8 characters';
        }
        if (confirmPassword && newPassword !== confirmPassword) {
            errs.confirmPassword = 'Passwords do not match';
        }
        return errs;
    }, [newPassword, confirmPassword]);

    const hasChanges = !!oldPassword || !!newPassword || !!confirmPassword;

    const handleUpdate = useCallback(async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (Object.keys(errors).length > 0) {
            toast.error('Please fix the errors');
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
        toast.success('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, [oldPassword, newPassword, confirmPassword, errors]);

    const handleCancel = useCallback(() => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, []);

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        hasChanges,
        isLoading,
        handleUpdate,
        handleCancel,
    };
};