import React from 'react';
import { User as UserType } from '../types';
import { UserProfile } from '../components/UserProfile';
import { Heart } from 'lucide-react';

interface ProfilePageProps {
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
  recoveryPercentage: number;
  totalLogs: number;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  recoveryPercentage,
  totalLogs
}) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to view your profile
          </h2>
          <p className="text-gray-600">
            Create an account or sign in to manage your recovery journey.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-gray-600">
            Manage your account and track your recovery journey progress.
          </p>
        </div>

        <UserProfile
          user={user}
          onUpdateUser={onUpdateUser}
          recoveryPercentage={recoveryPercentage}
          totalLogs={totalLogs}
        />
      </div>
    </div>
  );
};