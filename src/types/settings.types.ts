export type SettingsTab = 'general' | 'password' | 'notifications';

export interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
}