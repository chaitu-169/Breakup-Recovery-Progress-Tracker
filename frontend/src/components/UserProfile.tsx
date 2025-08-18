import React, { useState } from 'react';
import { User, Edit3, Save, X, Calendar, Mail, Heart } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onUpdateUser: (updatedUser: UserType) => void;
  recoveryPercentage: number;
  totalLogs: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdateUser,
  recoveryPercentage,
  totalLogs
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedUser: UserType = {
      ...user,
      name: formData.name,
      email: formData.email
    };

    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setErrors({});
    setIsEditing(false);
  };

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.isGuest ? 'Guest Profile' : 'Your Profile'}
            </h2>
            <p className="text-gray-600">Manage your recovery journey</p>
          </div>
        </div>
        
        {!user.isGuest && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {Math.round(recoveryPercentage)}%
          </h3>
          <p className="text-gray-600">Recovery Progress</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-full w-fit mx-auto mb-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {totalLogs}
          </h3>
          <p className="text-gray-600">Days Logged</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-full w-fit mx-auto mb-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {user.isGuest ? 'Guest' : joinDate}
          </h3>
          <p className="text-gray-600">
            {user.isGuest ? 'Session' : 'Member Since'}
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          ) : (
            <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
              {user.name}
            </p>
          )}
        </div>

        {!user.isGuest && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{user.email}</span>
              </p>
            )}
          </div>
        )}

        {isEditing && (
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {user.isGuest && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
          <h3 className="text-lg font-semibold mb-2">Upgrade Your Experience</h3>
          <p className="text-purple-100 mb-4">
            Create an account to save your progress permanently and access advanced features.
          </p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Create Account
          </button>
        </div>
      )}
    </div>
  );
};