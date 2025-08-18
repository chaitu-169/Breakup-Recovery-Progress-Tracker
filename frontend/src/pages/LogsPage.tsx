import React, { useState } from 'react';
import { Plus, Calendar, Heart, Moon, Music, Users, BookOpen, Save } from 'lucide-react';
import { UserLog, User } from '../types';
import { LogsList } from '../components/LogsList';

interface LogsPageProps {
  onAddLog: (log: Omit<UserLog, 'id' | 'date'>) => void;
  user: User | null;
  logs: UserLog[];
}

export const LogsPage: React.FC<LogsPageProps> = ({ onAddLog, user, logs }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    mood: 5,
    sleepHours: 8,
    musicGenres: [] as string[],
    socialInteractions: 0,
    journalEntry: '',
    activities: [] as string[]
  });

  const musicGenres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Classical', 'Jazz', 'Country', 
    'R&B', 'Alternative', 'Indie', 'Sad Songs', 'Breakup Songs', 'Healing Music'
  ];

  const activities = [
    'Exercise', 'Meditation', 'Reading', 'Cooking', 'Movies', 'Gaming',
    'Socializing', 'Work', 'Therapy', 'Journaling', 'Art/Creative', 'Nature Walk'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onAddLog(formData);
    setFormData({
      mood: 5,
      sleepHours: 8,
      musicGenres: [],
      socialInteractions: 0,
      journalEntry: '',
      activities: []
    });
    setIsFormOpen(false);
  };

  const toggleGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      musicGenres: prev.musicGenres.includes(genre)
        ? prev.musicGenres.filter(g => g !== genre)
        : [...prev.musicGenres, genre]
    }));
  };

  const toggleActivity = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start tracking to begin your journey
          </h2>
          <p className="text-gray-600">
            Sign in or continue as a guest to start logging your daily progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Logs</h1>
            <p className="text-gray-600">Track your daily progress and emotional journey</p>
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Today's Log</span>
          </button>
        </div>

        {/* Add Log Form */}
        {isFormOpen && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  How are you feeling today?
                </h2>
              </div>

              {/* Mood */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Mood (1-10)</span>
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={(e) => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #f97316 25%, #eab308 50%, #84cc16 75%, #22c55e 100%)`
                    }}
                  />
                  <div className="text-2xl font-bold text-purple-600 min-w-[3rem] text-center">
                    {formData.mood}
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Very Low</span>
                  <span>Amazing</span>
                </div>
              </div>

              {/* Sleep */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  <span>Sleep Hours</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>

              {/* Music Genres */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <Music className="h-5 w-5 text-green-500" />
                  <span>Music Listened To</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {musicGenres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.musicGenres.includes(genre)
                          ? 'bg-purple-100 border-purple-500 text-purple-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Interactions */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Social Interactions</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.socialInteractions}
                  onChange={(e) => setFormData(prev => ({ ...prev, socialInteractions: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Number of people you interacted with"
                />
              </div>

              {/* Activities */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <span>Activities</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => toggleActivity(activity)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.activities.includes(activity)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Journal Entry */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  <span>Journal Entry (Optional)</span>
                </label>
                <textarea
                  value={formData.journalEntry}
                  onChange={(e) => setFormData(prev => ({ ...prev, journalEntry: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How are you feeling? What's on your mind today?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Log</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Logs List */}
        <LogsList logs={logs} />
      </div>
    </div>
  );
};