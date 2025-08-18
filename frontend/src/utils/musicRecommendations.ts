import { UserLog, MusicRecommendation } from '../types';

const musicDatabase: MusicRecommendation[] = [
  // Sad/Processing Songs
  {
    id: 'someone-like-you',
    title: 'Someone Like You',
    artist: 'Adele',
    genre: 'Pop',
    mood: 'sad'
  },
  {
    id: 'hurt',
    title: 'Hurt',
    artist: 'Johnny Cash',
    genre: 'Country',
    mood: 'sad'
  },
  {
    id: 'breathe-me',
    title: 'Breathe Me',
    artist: 'Sia',
    genre: 'Alternative',
    mood: 'sad'
  },
  {
    id: 'mad-world',
    title: 'Mad World',
    artist: 'Gary Jules',
    genre: 'Alternative',
    mood: 'sad'
  },
  {
    id: 'hello',
    title: 'Hello',
    artist: 'Adele',
    genre: 'Pop',
    mood: 'sad'
  },

  // Healing Songs
  {
    id: 'lose-you-to-love-me',
    title: 'Lose You To Love Me',
    artist: 'Selena Gomez',
    genre: 'Pop',
    mood: 'healing'
  },
  {
    id: 'stronger-than-before',
    title: 'Stronger (What Doesn\'t Kill You)',
    artist: 'Kelly Clarkson',
    genre: 'Pop',
    mood: 'healing'
  },
  {
    id: 'new-rules',
    title: 'New Rules',
    artist: 'Dua Lipa',
    genre: 'Pop',
    mood: 'healing'
  },
  {
    id: 'thank-you-next',
    title: 'thank u, next',
    artist: 'Ariana Grande',
    genre: 'Pop',
    mood: 'healing'
  },
  {
    id: 'good-as-hell',
    title: 'Good as Hell',
    artist: 'Lizzo',
    genre: 'Pop',
    mood: 'healing'
  },
  {
    id: 'praying',
    title: 'Praying',
    artist: 'Kesha',
    genre: 'Pop',
    mood: 'healing'
  },

  // Empowering Songs
  {
    id: 'fight-song',
    title: 'Fight Song',
    artist: 'Rachel Platten',
    genre: 'Pop',
    mood: 'empowering'
  },
  {
    id: 'roar',
    title: 'Roar',
    artist: 'Katy Perry',
    genre: 'Pop',
    mood: 'empowering'
  },
  {
    id: 'confident',
    title: 'Confident',
    artist: 'Demi Lovato',
    genre: 'Pop',
    mood: 'empowering'
  },
  {
    id: 'stronger-britney',
    title: 'Stronger',
    artist: 'Britney Spears',
    genre: 'Pop',
    mood: 'empowering'
  },
  {
    id: 'girl-on-fire',
    title: 'Girl on Fire',
    artist: 'Alicia Keys',
    genre: 'R&B',
    mood: 'empowering'
  },
  {
    id: 'independent-women',
    title: 'Independent Women',
    artist: 'Destiny\'s Child',
    genre: 'R&B',
    mood: 'empowering'
  },

  // Happy Songs
  {
    id: 'good-4-u',
    title: 'good 4 u',
    artist: 'Olivia Rodrigo',
    genre: 'Pop',
    mood: 'happy'
  },
  {
    id: 'shake-it-off',
    title: 'Shake It Off',
    artist: 'Taylor Swift',
    genre: 'Pop',
    mood: 'happy'
  },
  {
    id: 'uptown-funk',
    title: 'Uptown Funk',
    artist: 'Bruno Mars',
    genre: 'Pop',
    mood: 'happy'
  },
  {
    id: 'dancing-queen',
    title: 'Dancing Queen',
    artist: 'ABBA',
    genre: 'Pop',
    mood: 'happy'
  },
  {
    id: 'good-vibes',
    title: 'Good Vibes',
    artist: 'Chris Janson',
    genre: 'Country',
    mood: 'happy'
  },
  {
    id: 'sunshine',
    title: 'Sunshine',
    artist: 'OneRepublic',
    genre: 'Pop',
    mood: 'happy'
  }
];

export const getMusicRecommendations = (
  logs: UserLog[], 
  requestedMood: 'sad' | 'healing' | 'empowering' | 'happy'
): MusicRecommendation[] => {
  // Filter songs by requested mood
  let recommendations = musicDatabase.filter(song => song.mood === requestedMood);

  // If user has logged music preferences, try to match genres
  if (logs.length > 0) {
    const userGenres = new Set(logs.flatMap(log => log.musicGenres));
    
    // Prioritize songs in genres the user has listened to
    recommendations.sort((a, b) => {
      const aMatch = userGenres.has(a.genre) ? 1 : 0;
      const bMatch = userGenres.has(b.genre) ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  // Shuffle and return top 9 recommendations
  const shuffled = recommendations.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 9);
};

export const getMoodBasedRecommendation = (logs: UserLog[]): 'sad' | 'healing' | 'empowering' | 'happy' => {
  if (logs.length === 0) return 'healing';

  // Get average mood from recent logs
  const recentLogs = logs.slice(0, 5);
  const averageMood = recentLogs.reduce((sum, log) => sum + log.mood, 0) / recentLogs.length;

  if (averageMood <= 3) return 'sad';
  if (averageMood <= 5) return 'healing';
  if (averageMood <= 7) return 'empowering';
  return 'happy';
};

// Fun music insights
export const getMusicInsight = (logs: UserLog[]): string => {
  if (logs.length === 0) return "Start logging to get personalized music insights!";

  const musicGenres = logs.flatMap(log => log.musicGenres);
  const genreCount = musicGenres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topGenre = Object.entries(genreCount).sort(([,a], [,b]) => b - a)[0];
  
  if (topGenre && topGenre[1] >= 3) {
    const insights: Record<string, string> = {
      'Sad Songs': "You're using music to process emotions - that's actually super healthy! 🎵",
      'Breakup Songs': "Those breakup songs are doing their job. You're healing through music! 💙",
      'Healing Music': "Your music choice shows you're actively working on self-care. Amazing! ✨",
      'Pop': "Pop music is keeping your spirits up - you know what works for you! 🎶",
      'Classical': "Classical music? Your brain is getting those dopamine hits while you heal! 🎼",
      'Hip Hop': "Hip hop beats are keeping you motivated. Keep that energy flowing! 🎤",
      'Rock': "Rock music is channeling your emotions in a powerful way! 🤘",
      'Electronic': "Electronic beats are keeping you moving forward. Dance it out! 🕺"
    };

    return insights[topGenre[0]] || `You're exploring ${topGenre[0]} - music diversity shows emotional growth! 🌟`;
  }

  return "You're exploring different music styles - variety is the spice of healing! 🌈";
};