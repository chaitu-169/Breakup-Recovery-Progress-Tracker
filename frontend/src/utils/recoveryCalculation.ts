import { UserLog } from '../types';

export const calculateRecoveryPercentage = (logs: UserLog[]): number => {
  if (logs.length === 0) return 0;

  // Weights for different factors
  const weights = {
    mood: 0.4,          // 40% - Most important
    sleep: 0.2,         // 20% - Important for mental health
    social: 0.2,        // 20% - Social connections aid recovery
    consistency: 0.1,    // 10% - Regular logging shows commitment
    activity: 0.1       // 10% - Active lifestyle helps
  };

  // Calculate mood score (average mood / 10)
  const avgMood = logs.reduce((sum, log) => sum + log.mood, 0) / logs.length;
  const moodScore = avgMood / 10;

  // Calculate sleep score (optimal sleep is around 7-9 hours)
  const avgSleep = logs.reduce((sum, log) => sum + log.sleepHours, 0) / logs.length;
  const sleepScore = Math.min(1, Math.max(0, 1 - Math.abs(8 - avgSleep) / 4));

  // Calculate social score (more interactions = better, with diminishing returns)
  const avgSocial = logs.reduce((sum, log) => sum + log.socialInteractions, 0) / logs.length;
  const socialScore = Math.min(1, avgSocial / 5); // Cap at 5 interactions per day

  // Calculate consistency score (more recent logs = better)
  const daysSinceStart = Math.max(1, (new Date().getTime() - new Date(logs[logs.length - 1].date).getTime()) / (1000 * 60 * 60 * 24));
  const consistencyScore = Math.min(1, logs.length / daysSinceStart);

  // Calculate activity score (based on variety and frequency of activities)
  const totalActivities = logs.reduce((sum, log) => sum + log.activities.length, 0);
  const activityScore = Math.min(1, totalActivities / (logs.length * 3)); // Aim for 3 activities per day

  // Calculate weighted score
  const totalScore = 
    moodScore * weights.mood +
    sleepScore * weights.sleep +
    socialScore * weights.social +
    consistencyScore * weights.consistency +
    activityScore * weights.activity;

  // Add bonus for positive trends
  if (logs.length >= 3) {
    const recentMood = logs.slice(0, 3).reduce((sum, log) => sum + log.mood, 0) / 3;
    const olderMood = logs.slice(-3).reduce((sum, log) => sum + log.mood, 0) / 3;
    const trendBonus = Math.max(0, (recentMood - olderMood) / 10 * 0.1); // Up to 10% bonus
    return Math.min(100, (totalScore + trendBonus) * 100);
  }

  return Math.min(100, totalScore * 100);
};

// Fun recovery milestones
export const getRecoveryMilestone = (percentage: number): string => {
  if (percentage >= 90) return "🌟 Recovery Champion! You're absolutely crushing it!";
  if (percentage >= 80) return "🚀 Amazing progress! You're in the final stretch!";
  if (percentage >= 70) return "💪 Strong recovery! You're building serious resilience!";
  if (percentage >= 60) return "🌱 Growing stronger! Keep up the fantastic work!";
  if (percentage >= 50) return "🎯 Halfway there! You're on the right track!";
  if (percentage >= 40) return "🌈 Making real progress! Every step counts!";
  if (percentage >= 30) return "💚 Building momentum! You're doing great!";
  if (percentage >= 20) return "🌸 Early progress! You've taken the hardest step!";
  if (percentage >= 10) return "🌱 Starting strong! The journey has begun!";
  return "💙 Just beginning! Every expert was once a beginner!";
};