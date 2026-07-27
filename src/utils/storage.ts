import { UserProfile, WithdrawRequest, DailyTask, NotificationItem, AppSettings, QuizQuestion, QuizCategory, LeaderboardUser } from '../types';
import { initialCategories } from '../data/categories';
import { initialQuestions } from '../data/questions';

const STORAGE_KEYS = {
  USER: 'qmbd_user_profile',
  SETTINGS: 'qmbd_app_settings',
  WITHDRAWS: 'qmbd_withdraw_requests',
  NOTIFICATIONS: 'qmbd_notifications',
  QUESTIONS: 'qmbd_questions_data',
  CATEGORIES: 'qmbd_categories_data',
  TASKS: 'qmbd_daily_tasks',
  LEADERBOARD: 'qmbd_leaderboard'
};

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'guest_' + Math.random().toString(36).substring(2, 8),
  name: 'Guest Player',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  authMethod: 'guest',
  isGuest: true,
  coins: 50,
  xp: 100,
  level: 1,
  country: 'Bangladesh',
  referralCode: 'GUEST-880',
  totalReferred: 0,
  dailyQuizzesPlayed: 0,
  dailyCoinsEarned: 0,
  lastQuizDate: new Date().toISOString().split('T')[0],
  lastLoginDate: new Date().toISOString().split('T')[0],
  dailyStreak: 1,
  hasClaimedDailyBonus: false,
  spinsRemaining: 3,
  scratchesRemaining: 3,
  adsWatchedToday: 0,
  completedTaskIds: [],
  achievements: ['First Quiz'],
  role: 'user'
};

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: 'en',
  soundEnabled: true,
  vibrationEnabled: true,
  deviceFrameEnabled: false
};

const SEED_WITHDRAWS: WithdrawRequest[] = [
  {
    id: 'w_101',
    userId: 'u_772',
    userName: 'Tanvir Hossain',
    userPhone: '+8801712345678',
    method: 'bKash',
    accountNumber: '01712345678',
    amountBDT: 150,
    coinsDeducted: 1500,
    status: 'approved',
    requestedAt: '2026-07-26T14:20:00Z',
    processedAt: '2026-07-26T15:10:00Z'
  },
  {
    id: 'w_102',
    userId: 'u_891',
    userName: 'Sadia Islam',
    userPhone: '+8801898765432',
    method: 'Nagad',
    accountNumber: '01898765432',
    amountBDT: 100,
    coinsDeducted: 1000,
    status: 'approved',
    requestedAt: '2026-07-27T08:00:00Z',
    processedAt: '2026-07-27T08:30:00Z'
  }
];

const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n_1',
    title: 'Welcome to Quiz Master BD!',
    titleBn: 'কুইজ মাস্টার বিডিতে স্বাগতম!',
    message: 'Play quizzes daily, climb the leaderboard, and earn real cash reward via bKash, Nagad & Rocket!',
    messageBn: 'প্রতিদিন কুইজ খেলে পয়েন্ট অর্জন করুন এবং বিকাশ/নগদে টাকা উইথড্র করুন!',
    timestamp: 'Just now',
    read: false,
    type: 'system'
  },
  {
    id: 'n_2',
    title: 'Daily Bonus Available!',
    titleBn: 'দৈনিক বোনাস প্রস্তুত!',
    message: 'Claim your 50 Coins daily bonus from the homepage now.',
    messageBn: 'আজকের ৫০ কয়েন বোনাস সংগ্রহ করে নিন।',
    timestamp: '1 hour ago',
    read: false,
    type: 'bonus'
  }
];

const SEED_TASKS: DailyTask[] = [
  {
    id: 'task_quiz',
    title: 'Complete 5 Quizzes',
    titleBn: '৫টি কুইজ সম্পন্ন করুন',
    description: 'Play any 5 category quizzes today',
    descriptionBn: 'আজকে যেকোনো ৫টি কুইজ খেলুন',
    rewardCoins: 50,
    targetCount: 5,
    currentCount: 0,
    completed: false,
    claimed: false,
    icon: 'Brain'
  },
  {
    id: 'task_ad',
    title: 'Watch 3 Reward Ads',
    titleBn: '৩টি রিওয়ার্ড অ্যাড দেখুন',
    description: 'Watch 3 rewarded short videos',
    descriptionBn: '৩টি ছোট রিওয়ার্ড ভিডিও দেখুন',
    rewardCoins: 30,
    targetCount: 3,
    currentCount: 0,
    completed: false,
    claimed: false,
    icon: 'Video'
  },
  {
    id: 'task_invite',
    title: 'Invite a Friend',
    titleBn: 'একজনকে আমন্ত্রণ জানান',
    description: 'Share your referral code with friends',
    descriptionBn: 'বন্ধুর সাথে রেফারেল কোড শেয়ার করুন',
    rewardCoins: 100,
    targetCount: 1,
    currentCount: 0,
    completed: false,
    claimed: false,
    icon: 'UserPlus'
  },
  {
    id: 'task_login',
    title: 'Daily Login',
    titleBn: 'দৈনিক অ্যাপ খুলুন',
    description: 'Log in to Quiz Master BD today',
    descriptionBn: 'আজকে অ্যাপে প্রবেশ করুন',
    rewardCoins: 20,
    targetCount: 1,
    currentCount: 1,
    completed: true,
    claimed: false,
    icon: 'CalendarCheck'
  },
  {
    id: 'task_coins',
    title: 'Earn 100 Coins',
    titleBn: '১০০ কয়েন আয় করুন',
    description: 'Earn 100 coins across all activities',
    descriptionBn: 'মোট ১০০ কয়েন অর্জন করুন',
    rewardCoins: 40,
    targetCount: 100,
    currentCount: 0,
    completed: false,
    claimed: false,
    icon: 'Coins'
  }
];

const SEED_LEADERBOARD: LeaderboardUser[] = [
  { id: 'l1', name: 'Md. Rafiqul Islam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', coins: 14200, xp: 8500, rank: 1, quizzesWon: 142, badge: '👑 Champion' },
  { id: 'l2', name: 'Farhana Akter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', coins: 11800, xp: 7100, rank: 2, quizzesWon: 110, badge: '🥈 Master' },
  { id: 'l3', name: 'Kazi Mahfuz', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', coins: 9500, xp: 5800, rank: 3, quizzesWon: 89, badge: '🥉 Expert' },
  { id: 'l4', name: 'Nusrat Jahan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', coins: 7800, xp: 4900, rank: 4, quizzesWon: 72 },
  { id: 'l5', name: 'Anisur Rahman', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', coins: 6400, xp: 4100, rank: 5, quizzesWon: 61 },
  { id: 'l6', name: 'Tania Sultana', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', coins: 5200, xp: 3400, rank: 6, quizzesWon: 48 },
  { id: 'l7', name: 'Sabbir Ahmed', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', coins: 4100, xp: 2800, rank: 7, quizzesWon: 39 }
];

export function getStoredUser(): UserProfile {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  if (!data) return DEFAULT_GUEST_USER;
  try {
    const user: UserProfile = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    
    // Reset daily counters if new day
    if (user.lastQuizDate !== today) {
      user.dailyQuizzesPlayed = 0;
      user.dailyCoinsEarned = 0;
      user.hasClaimedDailyBonus = false;
      user.spinsRemaining = user.isGuest ? 2 : 5;
      user.scratchesRemaining = user.isGuest ? 2 : 5;
      user.adsWatchedToday = 0;
      user.lastQuizDate = today;
      saveStoredUser(user);
    }
    return user;
  } catch {
    return DEFAULT_GUEST_USER;
  }
}

export function saveStoredUser(user: UserProfile) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getStoredSettings(): AppSettings {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!data) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getStoredWithdraws(): WithdrawRequest[] {
  const data = localStorage.getItem(STORAGE_KEYS.WITHDRAWS);
  if (!data) return SEED_WITHDRAWS;
  try {
    return JSON.parse(data);
  } catch {
    return SEED_WITHDRAWS;
  }
}

export function saveStoredWithdraws(requests: WithdrawRequest[]) {
  localStorage.setItem(STORAGE_KEYS.WITHDRAWS, JSON.stringify(requests));
}

export function getStoredNotifications(): NotificationItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  if (!data) return SEED_NOTIFICATIONS;
  try {
    return JSON.parse(data);
  } catch {
    return SEED_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(list: NotificationItem[]) {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
}

export function getStoredQuestions(): QuizQuestion[] {
  const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  if (!data) return initialQuestions;
  try {
    return JSON.parse(data);
  } catch {
    return initialQuestions;
  }
}

export function saveStoredQuestions(questions: QuizQuestion[]) {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function getStoredCategories(): QuizCategory[] {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!data) return initialCategories;
  try {
    return JSON.parse(data);
  } catch {
    return initialCategories;
  }
}

export function saveStoredCategories(categories: QuizCategory[]) {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

export function getStoredTasks(): DailyTask[] {
  const data = localStorage.getItem(STORAGE_KEYS.TASKS);
  if (!data) return SEED_TASKS;
  try {
    return JSON.parse(data);
  } catch {
    return SEED_TASKS;
  }
}

export function saveStoredTasks(tasks: DailyTask[]) {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

export function getStoredLeaderboard(): LeaderboardUser[] {
  const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
  if (!data) return SEED_LEADERBOARD;
  try {
    return JSON.parse(data);
  } catch {
    return SEED_LEADERBOARD;
  }
}

export function saveStoredLeaderboard(lb: LeaderboardUser[]) {
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(lb));
}
