import React from 'react';
import { TrendingUp, Moon, Music, Users, Calendar, Heart } from 'lucide-react';
import { UserLog, User } from '../types';
import { MoodChart } from '../components/charts/MoodChart';
import { RecoveryChart } from '../components/charts/RecoveryChart';
import { SleepMoodChart } from '../components/charts/SleepMoodChart';
import { getMotivationalMessage } from '../utils/motivationalMessages';

interface DashboardProps {
  logs: UserLog[];
  recoveryPercentage: number;
  user: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  logs, 
  recoveryPercentage, 
  user 
}) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start your journey to see your dashboard
          </h2>
          <p className="text-gray-600">
            Begin tracking your recovery to unlock personalized insights and progress visualization.
          </p>
        </div>
      </div>
    );
  }

  const recentLogs = logs.slice(0, 7);
  const averageMood = logs.length > 0 
    ? logs.reduce((sum, log) => sum + log.mood, 0) / logs.length 
    : 0;
  const averageSleep = logs.length > 0 
    ? logs.reduce((sum, log) => sum + log.sleepHours, 0) / logs.length 
    : 0;
  const totalSocialInteractions = logs.reduce((sum, log) => sum + log.socialInteractions, 0);
  
  const motivationalMessage = getMotivationalMessage(recoveryPercentage);

  const stats = [
    {
      title: 'Recovery Progress',
      value: `${Math.round(recoveryPercentage)}%`,
      icon: TrendingUp,
      color: 'from-purple-600 to-blue-600',
      description: 'Overall healing journey'
    },
    {
      title: 'Average Mood',
      value: `${averageMood.toFixed(1)}/10`,
      icon: Heart,
      color: 'from-pink-600 to-red-600',
      description: 'Your emotional wellbeing'
    },
    {
      title: 'Sleep Quality',
      value: `${averageSleep.toFixed(1)}h`,
      icon: Moon,
      color: 'from-indigo-600 to-purple-600',
      description: 'Average nightly rest'
    },
    {
      title: 'Social Connections',
      value: totalSocialInteractions.toString(),
      icon: Users,
      color: 'from-green-600 to-teal-600',
      description: 'Total interactions logged'
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Recovery Dashboard
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user.name}!
                </h2>
                <p className="text-gray-600">{motivationalMessage.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {stat.title}
                </p>
                <p className="text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        {logs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Mood Trends (Last 7 Days)
              </h3>
              <MoodChart logs={recentLogs} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Recovery Progress
              </h3>
              <RecoveryChart logs={logs} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Sleep vs Mood Correlation
              </h3>
              <SleepMoodChart logs={logs} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No data yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start logging your daily activities to see beautiful visualizations of your progress.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
              Add Your First Log
            </button>
          </div>
        )}

        {/* Recent Activity */}
        {logs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{log.date}</p>
                      <p className="text-sm text-gray-600">
                        Mood: {log.mood}/10 • Sleep: {log.sleepHours}h • Social: {log.socialInteractions} interactions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.mood >= 8 
                        ? 'bg-green-100 text-green-800'
                        : log.mood >= 6
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {log.mood >= 8 ? 'Great' : log.mood >= 6 ? 'Good' : 'Challenging'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};