import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Music, BookOpen, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { User } from '../types';
import { getMotivationalMessage } from '../utils/motivationalMessages';

interface HomePageProps {
  user: User | null;
  recoveryPercentage: number;
  onShowAuth?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ user, recoveryPercentage, onShowAuth }) => {
  const motivationalMessage = getMotivationalMessage(recoveryPercentage);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Healing Journey
                </span>{' '}
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Track your emotional progress, discover personalized insights, and celebrate every step forward in your recovery journey.
              </p>
            </div>

            {user && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {Math.round(recoveryPercentage)}%
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.name}!
                </h3>
                <p className="text-gray-600 mb-4">{motivationalMessage.message}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/logs"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                  >
                    Add Today's Log
                  </Link>
                  <Link
                    to="/dashboard"
                    className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                  >
                    View Progress
                  </Link>
                </div>
              </div>
            )}

            {!user && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to start your recovery journey?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands who are tracking their emotional wellness and celebrating progress every day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {onShowAuth && (
                    <button
                      onClick={onShowAuth}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </button>
                  )}
                  <Link
                    to="/logs"
                    className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all inline-flex items-center justify-center space-x-2"
                  >
                    <span>Try as Guest</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to heal and grow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive tracking system helps you understand your patterns, celebrate progress, and stay motivated on your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your mood, sleep, and social interactions with beautiful visualizations and insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-lg w-fit mb-4">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Music Therapy
              </h3>
              <p className="text-gray-600">
                Get personalized music recommendations based on your current emotional state and recovery phase.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-lg w-fit mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Daily Journaling
              </h3>
              <p className="text-gray-600">
                Express your thoughts and feelings with optional journal entries to process your emotions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Motivational Support
              </h3>
              <p className="text-gray-600">
                Receive encouraging messages and celebrate milestones with humor and positivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8">
            "The wound is the place where the Light enters you."
          </blockquote>
          <cite className="text-lg text-purple-200">— Rumi</cite>
        </div>
      </section>
    </div>
  );
};