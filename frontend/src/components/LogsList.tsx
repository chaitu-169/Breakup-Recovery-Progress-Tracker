import React from 'react';
import { Calendar, Heart, Moon, Music, Users, BookOpen } from 'lucide-react';
import { UserLog } from '../types';

interface LogsListProps {
  logs: UserLog[];
}

export const LogsList: React.FC<LogsListProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No logs yet
        </h3>
        <p className="text-gray-600">
          Start your recovery journey by adding your first daily log above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Your Journey History</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {logs.map((log) => (
          <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.mood >= 8 
                      ? 'bg-green-100 text-green-800'
                      : log.mood >= 6
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {log.mood >= 8 ? 'Great Day' : log.mood >= 6 ? 'Good Day' : 'Challenging Day'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <span className="text-sm text-gray-600">Mood</span>
                  <p className="font-semibold text-gray-900">{log.mood}/10</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-indigo-500" />
                <div>
                  <span className="text-sm text-gray-600">Sleep</span>
                  <p className="font-semibold text-gray-900">{log.sleepHours}h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-600">Social</span>
                  <p className="font-semibold text-gray-900">{log.socialInteractions} interactions</p>
                </div>
              </div>
            </div>

            {log.musicGenres.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Music className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Music Genres</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {log.musicGenres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {log.activities.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Activities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {log.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {log.journalEntry && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Journal Entry</span>
                </div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                  "{log.journalEntry}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};