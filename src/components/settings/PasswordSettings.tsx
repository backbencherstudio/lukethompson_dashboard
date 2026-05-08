'use client';

import { usePassword } from '@/hooks/usePassword';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

export const PasswordSettings = () => {
    const {
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
    } = usePassword();

    return (
        <div className="flex w-full flex-col gap-6 rounded-xl border border-border-light bg-form-bg p-4 sm:p-6">
            <h2 className="text-lg font-bold text-white">Change Password</h2>

            <div className="flex flex-col gap-4">
                <PasswordInput
                    label="Old Password"
                    value={oldPassword}
                    onChange={setOldPassword}
                    placeholder="Enter old password"
                    autoComplete="current-password"
                />
                <PasswordInput
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Enter new password"
                    error={errors.newPassword}
                    autoComplete="new-password"
                />
                <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Confirm new password"
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white/50" onClick={handleCancel} disabled={!hasChanges}>
                    Cancel
                </Button>
                <Button variant="default" size="lg" className="w-full sm:w-auto" onClick={handleUpdate} isLoading={isLoading} disabled={!hasChanges}>
                    Update
                </Button>
            </div>
        </div>
    );
};