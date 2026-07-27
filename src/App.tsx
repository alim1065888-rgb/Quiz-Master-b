import React, { useState, useEffect } from 'react';
import { 
  UserProfile, QuizCategory, QuizQuestion, QuizResult, 
  WithdrawRequest, DailyTask, AppSettings, WithdrawMethod, Language 
} from './types';
import { 
  getStoredUser, saveStoredUser, 
  getStoredSettings, saveStoredSettings, 
  getStoredWithdraws, saveStoredWithdraws, 
  getStoredNotifications, saveStoredNotifications, 
  getStoredQuestions, saveStoredQuestions, 
  getStoredCategories, saveStoredCategories, 
  getStoredTasks, saveStoredTasks, 
  getStoredLeaderboard, saveStoredLeaderboard 
} from './utils/storage';
import { playSoundEffect, triggerVibration } from './utils/sound';

import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { CategoriesView } from './components/CategoriesView';
import { QuizPlayView } from './components/QuizPlayView';
import { QuizResultView } from './components/QuizResultView';
import { WalletView } from './components/WalletView';
import { ReferralView } from './components/ReferralView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { AdminPanelView } from './components/AdminPanelView';
import { AuthModal } from './components/AuthModal';
import { SpinWheelModal } from './components/SpinWheelModal';
import { ScratchCardModal } from './components/ScratchCardModal';
import { RewardAdModal } from './components/RewardAdModal';
import { DailyTasksModal } from './components/DailyTasksModal';
import { DeviceFrameWrapper } from './components/DeviceFrameWrapper';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile>(getStoredUser);
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings);
  const [activeTab, setActiveTab] = useState<string>('home');

  // App Data
  const [questions, setQuestions] = useState<QuizQuestion[]>(getStoredQuestions);
  const [categories, setCategories] = useState<QuizCategory[]>(getStoredCategories);
  const [withdraws, setWithdraws] = useState<WithdrawRequest[]>(getStoredWithdraws);
  const [notifications, setNotifications] = useState(getStoredNotifications);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(getStoredTasks);
  const [leaderboard, setLeaderboard] = useState(getStoredLeaderboard);

  // Active Quiz State
  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);
  const [isScratchModalOpen, setIsScratchModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);

  // Sync dark mode class on root html
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Handle user state saving
  const updateUserState = (newUser: UserProfile) => {
    setUser(newUser);
    saveStoredUser(newUser);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  // Claim Daily Login Reward
  const handleClaimDailyReward = () => {
    if (user.hasClaimedDailyBonus) return;

    const bonus = 50;
    const updated: UserProfile = {
      ...user,
      coins: user.coins + bonus,
      dailyCoinsEarned: user.dailyCoinsEarned + bonus,
      hasClaimedDailyBonus: true,
      dailyStreak: user.dailyStreak + 1
    };

    updateUserState(updated);
    playSoundEffect('fanfare', settings.soundEnabled);
    triggerVibration([80, 40, 80], settings.vibrationEnabled);
    alert('Daily Bonus Claimed! +50 Coins added to your wallet.');
  };

  // Start Quiz
  const handleStartQuiz = (catId: string) => {
    // Guest Quiz Limit Enforcement (max 5 quizzes/day)
    if (user.isGuest && user.dailyQuizzesPlayed >= 5) {
      setIsAuthModalOpen(true);
      return;
    }

    const cat = categories.find((c) => c.id === catId) || categories[0];
    const catQuestions = questions.filter((q) => q.categoryId === cat.id);
    
    // Fallback questions if specific category list is small
    const finalQList = catQuestions.length >= 3 ? catQuestions : questions.slice(0, 5);

    // Shuffle questions
    const shuffled = [...finalQList].sort(() => 0.5 - Math.random());

    setActiveCategory(cat);
    setActiveQuestions(shuffled);
    setQuizResult(null);
    setActiveTab('quiz_play');
  };

  // Finish Quiz
  const handleFinishQuiz = (result: QuizResult) => {
    setQuizResult(result);

    // Enforce guest coin limit
    let coinsToAdd = result.coinsEarned;
    if (user.isGuest && user.dailyCoinsEarned + coinsToAdd > 20) {
      coinsToAdd = Math.max(0, 20 - user.dailyCoinsEarned);
    }

    const updatedUser: UserProfile = {
      ...user,
      coins: user.coins + coinsToAdd,
      xp: user.xp + result.xpEarned,
      level: Math.floor((user.xp + result.xpEarned) / 500) + 1,
      dailyQuizzesPlayed: user.dailyQuizzesPlayed + 1,
      dailyCoinsEarned: user.dailyCoinsEarned + coinsToAdd,
      lastQuizDate: new Date().toISOString().split('T')[0]
    };

    updateUserState(updatedUser);
    setActiveTab('quiz_result');
  };

  // Reward handlers
  const handleAddRewardCoins = (coins: number) => {
    const updated: UserProfile = {
      ...user,
      coins: user.coins + coins,
      dailyCoinsEarned: user.dailyCoinsEarned + coins,
    };
    updateUserState(updated);
  };

  // Request Withdrawal
  const handleRequestWithdraw = (method: WithdrawMethod, accountNumber: string, amountBDT: number) => {
    const coinsNeeded = (amountBDT / 100) * 1000;
    const newReq: WithdrawRequest = {
      id: 'w_' + Date.now(),
      userId: user.id,
      userName: user.name,
      userPhone: user.phone || '01700000000',
      method: method,
      accountNumber: accountNumber,
      amountBDT: amountBDT,
      coinsDeducted: coinsNeeded,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    const updatedWithdraws = [newReq, ...withdraws];
    setWithdraws(updatedWithdraws);
    saveStoredWithdraws(updatedWithdraws);

    // Deduct coins from user
    const updatedUser: UserProfile = {
      ...user,
      coins: user.coins - coinsNeeded
    };
    updateUserState(updatedUser);
  };

  // Apply Referral Code
  const handleApplyReferral = (code: string) => {
    const updatedUser: UserProfile = {
      ...user,
      referredBy: code,
      coins: user.coins + 50
    };
    updateUserState(updatedUser);
  };

  // Claim Daily Task
  const handleClaimTask = (taskId: string) => {
    const task = dailyTasks.find((t) => t.id === taskId);
    if (!task || task.claimed) return;

    const updatedTasks = dailyTasks.map((t) => t.id === taskId ? { ...t, claimed: true } : t);
    setDailyTasks(updatedTasks);
    saveStoredTasks(updatedTasks);

    handleAddRewardCoins(task.rewardCoins);
  };

  // Admin Actions
  const handleAddQuestion = (newQ: QuizQuestion) => {
    const updated = [newQ, ...questions];
    setQuestions(updated);
    saveStoredQuestions(updated);
  };

  const handleDeleteQuestion = (qId: string) => {
    const updated = questions.filter((q) => q.id !== qId);
    setQuestions(updated);
    saveStoredQuestions(updated);
  };

  const handleApproveWithdraw = (wId: string) => {
    const updated = withdraws.map((w) => w.id === wId ? { ...w, status: 'approved' as const, processedAt: new Date().toISOString() } : w);
    setWithdraws(updated);
    saveStoredWithdraws(updated);
  };

  const handleRejectWithdraw = (wId: string) => {
    const updated = withdraws.map((w) => w.id === wId ? { ...w, status: 'rejected' as const, processedAt: new Date().toISOString() } : w);
    setWithdraws(updated);
    saveStoredWithdraws(updated);
  };

  const handleSendNotification = (title: string, message: string) => {
    const newNotif = {
      id: 'n_' + Date.now(),
      title,
      titleBn: title,
      message,
      messageBn: message,
      timestamp: 'Just now',
      read: false,
      type: 'system' as const
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <DeviceFrameWrapper
      enabled={settings.deviceFrameEnabled}
      onToggleFrame={() => handleUpdateSettings({ ...settings, deviceFrameEnabled: !settings.deviceFrameEnabled })}
      darkMode={settings.darkMode}
    >
      <div className={`min-h-screen transition-colors duration-200 ${
        settings.darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}>
        {/* Top Header Bar */}
        {activeTab !== 'quiz_play' && (
          <Header
            user={user}
            settings={settings}
            unreadCount={notifications.filter((n) => !n.read).length}
            onOpenNotifications={() => alert('Notifications: Welcome to Quiz Master BD!')}
            onToggleTheme={() => handleUpdateSettings({ ...settings, darkMode: !settings.darkMode })}
            onToggleLanguage={() => handleUpdateSettings({ ...settings, language: settings.language === 'en' ? 'bn' : 'en' })}
            onToggleDeviceFrame={() => handleUpdateSettings({ ...settings, deviceFrameEnabled: !settings.deviceFrameEnabled })}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* View Routing Stage */}
        <main className="max-w-4xl mx-auto p-4">
          {activeTab === 'home' && (
            <HomeView
              user={user}
              categories={categories}
              onSelectCategory={handleStartQuiz}
              onNavigate={setActiveTab}
              onClaimDailyReward={handleClaimDailyReward}
              onOpenSpin={() => setIsSpinModalOpen(true)}
              onOpenScratch={() => setIsScratchModalOpen(true)}
              onOpenTasks={() => setIsTasksModalOpen(true)}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesView
              categories={categories}
              onSelectCategory={handleStartQuiz}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'quiz' && (
            <CategoriesView
              categories={categories}
              onSelectCategory={handleStartQuiz}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'quiz_play' && activeCategory && (
            <QuizPlayView
              category={activeCategory}
              questions={activeQuestions}
              onFinishQuiz={handleFinishQuiz}
              onCancel={() => setActiveTab('home')}
              soundEnabled={settings.soundEnabled}
              vibrationEnabled={settings.vibrationEnabled}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'quiz_result' && quizResult && (
            <QuizResultView
              result={quizResult}
              onPlayAgain={() => handleStartQuiz(quizResult.categoryId)}
              onGoHome={() => setActiveTab('home')}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletView
              user={user}
              withdraws={withdraws}
              onRequestWithdraw={handleRequestWithdraw}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'referral' && (
            <ReferralView
              user={user}
              onApplyReferral={handleApplyReferral}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              leaderboard={leaderboard}
              currentUser={user}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onLogout={() => {
                localStorage.clear();
                window.location.reload();
              }}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onOpenAdmin={() => setActiveTab('admin')}
              language={settings.language}
              darkMode={settings.darkMode}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanelView
              questions={questions}
              categories={categories}
              withdraws={withdraws}
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onAddCategory={() => {}}
              onApproveWithdraw={handleApproveWithdraw}
              onRejectWithdraw={handleRejectWithdraw}
              onSendNotification={handleSendNotification}
              onCloseAdmin={() => setActiveTab('home')}
              darkMode={settings.darkMode}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {activeTab !== 'quiz_play' && (
          <BottomNav
            activeTab={activeTab === 'categories' ? 'quiz' : activeTab}
            onTabChange={setActiveTab}
            language={settings.language}
            darkMode={settings.darkMode}
            isAdmin={user.role === 'admin'}
          />
        )}

        {/* Modals */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(u) => updateUserState(u)}
          language={settings.language}
          darkMode={settings.darkMode}
        />

        <SpinWheelModal
          isOpen={isSpinModalOpen}
          onClose={() => setIsSpinModalOpen(false)}
          onReward={handleAddRewardCoins}
          spinsRemaining={user.spinsRemaining}
          soundEnabled={settings.soundEnabled}
          vibrationEnabled={settings.vibrationEnabled}
          darkMode={settings.darkMode}
        />

        <ScratchCardModal
          isOpen={isScratchModalOpen}
          onClose={() => setIsScratchModalOpen(false)}
          onReward={handleAddRewardCoins}
          scratchesRemaining={user.scratchesRemaining}
          soundEnabled={settings.soundEnabled}
          vibrationEnabled={settings.vibrationEnabled}
          darkMode={settings.darkMode}
        />

        <RewardAdModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          onReward={handleAddRewardCoins}
          soundEnabled={settings.soundEnabled}
          darkMode={settings.darkMode}
        />

        <DailyTasksModal
          isOpen={isTasksModalOpen}
          onClose={() => setIsTasksModalOpen(false)}
          tasks={dailyTasks}
          onClaimTask={handleClaimTask}
          language={settings.language}
          darkMode={settings.darkMode}
        />
      </div>
    </DeviceFrameWrapper>
  );
}
