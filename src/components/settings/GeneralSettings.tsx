'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { ProfileData } from '@/types/settings.types';
import { PhoneInput } from '@/components/ui/PhoneInput';
import toast from 'react-hot-toast';

interface GeneralSettingsProps {
  profile: ProfileData;
  isLoading: boolean;
  onSave: (data: ProfileData) => void;
  onAvatarChange?: (file: File) => void;
}

export const GeneralSettings = ({ profile, isLoading, onSave, onAvatarChange }: GeneralSettingsProps) => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || '/Avatar.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setAvatarPreview(profile.avatar || '/Avatar.png');
  }, [profile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error('Only PNG or JPEG formats are allowed');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Pass to parent
    onAvatarChange?.(file);
  };

  const handleSave = () => {
    onSave({ firstName, lastName, email, phone, avatar: avatarPreview });
  };

  const handleCancel = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setAvatarPreview(profile.avatar || '/Avatar.png');
  };

  const hasChanges =
    firstName !== profile.firstName ||
    lastName !== profile.lastName ||
    email !== profile.email ||
    phone !== profile.phone ||
    avatarPreview !== (profile.avatar || '/Avatar.png');

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl border border-border-light bg-form-bg p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white">My Profile</h2>

      {/* Avatar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={avatarPreview} alt="Profile" fill className="object-cover" sizes="40px" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white">Profile Photo</h3>
            <p className="text-xs text-white-secondary">Min 400x400px, PNG or JPEG formats.</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button variant="secondary" size="sm" className="w-full sm:w-auto border-white/10 rounded-lg text-green-success" onClick={handleAvatarClick}>
          Change
        </Button>
      </div>

      {/* Personal Information */}
      <div className="flex flex-col gap-4 rounded-xl border border-border-light p-4">
        <div>
          <h3 className="text-sm font-bold text-white">Personal Information</h3>
          <p className="text-xs text-white-secondary">Modify Your Personal Information</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
          <FormInput label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
          <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
          <PhoneInput label="Phone Number" value={phone} onChange={setPhone} placeholder="Enter phone number" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
          <Button variant="default" size="lg" className="h-12 w-full sm:w-auto rounded-lg" onClick={handleSave} isLoading={isLoading} disabled={!hasChanges}>
            Save
          </Button>
          <Button variant="secondary" size="lg" className="h-12 w-full sm:w-auto border-green-success rounded-lg" onClick={handleCancel} disabled={!hasChanges}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};