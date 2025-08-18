import { UserLog, MotivationalMessage } from '../types';

export const motivationalMessages: MotivationalMessage[] = [
  // Funny messages
  {
    id: 'sad-songs',
    message: "Listened to 5+ sad songs today? That's 30% of your healing quota! 😅 You're basically a professional at processing emotions now!",
    type: 'funny',
    condition: (logs) => logs.some(log => log.musicGenres.includes('Sad Songs') || log.musicGenres.includes('Breakup Songs'))
  },
  {
    id: 'low-sleep',
    message: "Sleep schedule looking like your ex's commitment level? 😴 Let's get those Z's back on track!",
    type: 'funny',
    condition: (logs) => logs.some(log => log.sleepHours < 6)
  },
  {
    id: 'social-butterfly',
    message: "Look at you being social! Your ex is missing out on this upgraded version of you! 🦋",
    type: 'funny',
    condition: (logs) => logs.some(log => log.socialInteractions >= 5)
  },

  // Motivational messages
  {
    id: 'consistent-logging',
    message: "You've been consistently tracking your journey. This self-awareness is your superpower! 💪",
    type: 'motivational',
    condition: (logs) => logs.length >= 7
  },
  {
    id: 'mood-improvement',
    message: "Your mood has been trending upward. You're literally proof that things get better! 📈",
    type: 'motivational',
    condition: (logs) => {
      if (logs.length < 3) return false;
      const recent = logs.slice(0, 3).reduce((sum, log) => sum + log.mood, 0) / 3;
      const older = logs.slice(-3).reduce((sum, log) => sum + log.mood, 0) / 3;
      return recent > older;
    }
  },
  {
    id: 'self-care',
    message: "You're actively working on yourself and that's incredibly brave. Keep investing in your happiness! ✨",
    type: 'motivational',
    condition: (logs) => logs.some(log => 
      log.activities.includes('Exercise') || 
      log.activities.includes('Meditation') || 
      log.activities.includes('Therapy')
    )
  },

  // Encouraging messages
  {
    id: 'rough-day',
    message: "Having a tough day? That's okay. Healing isn't linear, and you're still moving forward. 🌱",
    type: 'encouraging',
    condition: (logs) => logs.some(log => log.mood <= 4)
  },
  {
    id: 'new-activities',
    message: "I love seeing you try new activities! This is how you discover the amazing person you're becoming! 🌟",
    type: 'encouraging',
    condition: (logs) => {
      const allActivities = new Set(logs.flatMap(log => log.activities));
      return allActivities.size >= 5;
    }
  },
  {
    id: 'music-therapy',
    message: "Music is your emotional processing toolkit. You're using it like a pro therapist! 🎵",
    type: 'encouraging',
    condition: (logs) => logs.some(log => log.musicGenres.includes('Healing Music'))
  }
];

// Recovery percentage based messages
export const getMotivationalMessage = (recoveryPercentage: number): MotivationalMessage => {
  const percentageMessages: MotivationalMessage[] = [
    {
      id: 'champion',
      message: "🏆 You're a recovery champion! Look how far you've come - you're absolutely incredible!",
      type: 'motivational',
      condition: () => recoveryPercentage >= 85
    },
    {
      id: 'crushing-it',
      message: "🚀 You're absolutely crushing this recovery journey! Your future self is so proud of you!",
      type: 'motivational',
      condition: () => recoveryPercentage >= 70
    },
    {
      id: 'strong-progress',
      message: "💪 Your progress is genuinely impressive. You're building a life that's even better than before!",
      type: 'motivational',
      condition: () => recoveryPercentage >= 55
    },
    {
      id: 'good-momentum',
      message: "🌟 You've got great momentum going! Every day you're proving how strong and resilient you are!",
      type: 'encouraging',
      condition: () => recoveryPercentage >= 40
    },
    {
      id: 'building-strength',
      message: "🌱 You're building strength every day. This process is creating the most authentic version of you!",
      type: 'encouraging',
      condition: () => recoveryPercentage >= 25
    },
    {
      id: 'brave-start',
      message: "💙 Starting this journey takes incredible courage. You're already winning by showing up for yourself!",
      type: 'encouraging',
      condition: () => recoveryPercentage >= 10
    },
    {
      id: 'first-steps',
      message: "🌸 Every healing journey starts with a single step, and you've taken yours. That's beautiful!",
      type: 'encouraging',
      condition: () => true
    }
  ];

  // Find the first message that matches the condition
  return percentageMessages.find(msg => msg.condition([])) || percentageMessages[percentageMessages.length - 1];
};

export const getRandomMotivationalMessage = (logs: UserLog[]): MotivationalMessage => {
  const applicableMessages = motivationalMessages.filter(msg => msg.condition(logs));
  
  if (applicableMessages.length === 0) {
    // Fallback messages for when no conditions match
    const fallbackMessages: MotivationalMessage[] = [
      {
        id: 'general-encouragement',
        message: "You're on a journey of growth and self-discovery. Every day is progress! 🌟",
        type: 'encouraging',
        condition: () => true
      },
      {
        id: 'keep-going',
        message: "Healing takes time, and you're giving yourself that gift. Keep going! 💚",
        type: 'motivational',
        condition: () => true
      },
      {
        id: 'proud-of-you',
        message: "Just by being here and tracking your journey, you're showing incredible self-love! ✨",
        type: 'encouraging',
        condition: () => true
      }
    ];
    
    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }
  
  return applicableMessages[Math.floor(Math.random() * applicableMessages.length)];
};