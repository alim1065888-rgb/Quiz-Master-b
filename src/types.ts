export type AuthMethod = 'google' | 'phone' | 'email' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar: string;
  authMethod: AuthMethod;
  isGuest: boolean;
  coins: number;
  xp: number;
  level: number;
  country: string;
  referralCode: string;
  referredBy?: string;
  totalReferred: number;
  dailyQuizzesPlayed: number;
  dailyCoinsEarned: number;
  lastQuizDate: string; // YYYY-MM-DD
  lastLoginDate: string; // YYYY-MM-DD
  dailyStreak: number;
  hasClaimedDailyBonus: boolean;
  spinsRemaining: number;
  scratchesRemaining: number;
  adsWatchedToday: number;
  completedTaskIds: string[];
  achievements: string[];
  role: 'user' | 'admin';
}

export type QuestionType = 'mcq' | 'image' | 'true_false';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  categoryId: string;
  type: QuestionType;
  question: string;
  questionBn: string;
  imageUrl?: string;
  options: string[];
  optionsBn?: string[];
  correctOptionIndex: number;
  explanation: string;
  explanationBn: string;
  difficulty: Difficulty;
}

export interface QuizCategory {
  id: string;
  name: string;
  nameBn: string;
  iconName: string;
  color: string;
  questionCount: number;
  description: string;
  descriptionBn: string;
}

export interface QuizResult {
  categoryId: string;
  categoryName: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedQuestions: number;
  scorePercentage: number;
  coinsEarned: number;
  xpEarned: number;
  timeSpentSeconds: number;
  date: string;
}

export type WithdrawStatus = 'pending' | 'approved' | 'rejected';
export type WithdrawMethod = 'bKash' | 'Nagad' | 'Rocket';

export interface WithdrawRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  method: WithdrawMethod;
  accountNumber: string;
  amountBDT: number;
  coinsDeducted: number;
  status: WithdrawStatus;
  requestedAt: string;
  processedAt?: string;
  adminNote?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  rewardCoins: number;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  badgeColor: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  timestamp: string;
  read: boolean;
  type: 'bonus' | 'withdraw' | 'quiz' | 'system';
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  xp: number;
  rank: number;
  quizzesWon: number;
  badge?: string;
}

export type Language = 'en' | 'bn';

export interface AppSettings {
  darkMode: boolean;
  language: Language;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  deviceFrameEnabled: boolean;
}
