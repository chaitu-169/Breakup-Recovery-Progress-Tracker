export interface User {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean;
  password?: string;
  createdAt?: string;
}

export interface UserLog {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  sleepHours: number;
  musicGenres: string[];
  socialInteractions: number;
  journalEntry?: string;
  activities: string[];
}

export interface MusicRecommendation {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: 'sad' | 'healing' | 'empowering' | 'happy';
  spotifyUrl?: string;
}

export interface MotivationalMessage {
  id: string;
  message: string;
  type: 'funny' | 'motivational' | 'encouraging';
  condition: (logs: UserLog[]) => boolean;
}