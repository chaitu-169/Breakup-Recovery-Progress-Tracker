import React, { useState, useEffect } from 'react';
import { Music, Play, Heart, TrendingUp, Headphones } from 'lucide-react';
import { UserLog, User, MusicRecommendation } from '../types';
import { getMusicRecommendations } from '../utils/musicRecommendations';

interface MusicPageProps {
  logs: UserLog[];
  user: User | null;
}

export const MusicPage: React.FC<MusicPageProps> = ({ logs, user }) => {
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>([]);
  const [selectedMood, setSelectedMood] = useState<'sad' | 'healing' | 'empowering' | 'happy'>('healing');

  useEffect(() => {
    const recs = getMusicRecommendations(logs, selectedMood);
    setRecommendations(recs);
  }, [logs, selectedMood]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Discover healing music
          </h2>
          <p className="text-gray-600">
            Start tracking to get personalized music recommendations for your recovery journey.
          </p>
        </div>
      </div>
    );
  }

  const moodColors = {
    sad: 'from-blue-600 to-indigo-600',
    healing: 'from-purple-600 to-pink-600',
    empowering: 'from-orange-600 to-red-600',
    happy: 'from-green-600 to-teal-600'
  };

  const moodDescriptions = {
    sad: 'Let yourself feel and process emotions',
    healing: 'Music for growth and self-reflection',
    empowering: 'Build confidence and strength',
    happy: 'Celebrate your progress and joy'
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Headphones className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Healing Soundtrack
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover music tailored to your emotional journey. From processing difficult feelings to celebrating progress,
            find the perfect songs for every stage of your recovery.
          </p>
        </div>

        {/* Mood Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What mood are you in today?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['sad', 'healing', 'empowering', 'happy'] as const).map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedMood === mood
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className={`bg-gradient-to-r ${moodColors[mood]} p-3 rounded-lg w-fit mx-auto mb-4`}>
                  <Music className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                  {mood}
                </h3>
                <p className="text-sm text-gray-600">
                  {moodDescriptions[mood]}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Music Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recommended for you
            </h2>
            <div className="text-sm text-gray-600">
              Based on your {selectedMood} mood
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((song) => (
              <div key={song.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${moodColors[song.mood]} h-32 flex items-center justify-center`}>
                  <Music className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {song.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{song.artist}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">
                      {song.genre}
                    </span>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Music Stats */}
        {logs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Music Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {logs.reduce((total, log) => total + log.musicGenres.length, 0)}
                </h3>
                <p className="text-gray-600">Genres Explored</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {logs.filter(log => log.musicGenres.includes('Healing Music')).length}
                </h3>
                <p className="text-gray-600">Healing Sessions</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl">
                <div className="bg-gradient-to-r from-pink-600 to-red-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {logs.filter(log => log.musicGenres.includes('Breakup Songs')).length}
                </h3>
                <p className="text-gray-600">Processing Days</p>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Music Therapy Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🎵 Allow Yourself to Feel</h3>
              <p className="text-purple-100">
                It's okay to listen to sad songs when you need to process emotions. 
                Music helps us work through feelings in a healthy way.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">🌱 Gradual Progression</h3>
              <p className="text-purple-100">
                As you heal, gradually introduce more uplifting music. 
                Your playlist evolution reflects your emotional growth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">🎯 Create Playlists</h3>
              <p className="text-purple-100">
                Build different playlists for different moods and stages of your journey. 
                Having the right music ready can be incredibly powerful.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">💪 Empowerment Anthems</h3>
              <p className="text-purple-100">
                Discover songs that make you feel strong and confident. 
                These will become your go-to tracks for building resilience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};