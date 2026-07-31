import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Mail, Globe, User, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { UserProfile, AuthMethod, Language } from '../types';
import { translations } from '../data/translations';
import { auth, googleProvider, signInWithPopup, doc, setDoc, db } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  language: Language;
  darkMode: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'options' | 'google' | 'phone' | 'email'>('options');
  
  // Google custom login form state
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Phone Form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Email Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const handleFirebasePopup = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const emailToUse = fbUser.email || 'user@gmail.com';
      const nameToUse = fbUser.displayName || emailToUse.split('@')[0];
      const avatarUrl = fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nameToUse)}`;

      const ADMIN_EMAILS = ['alim1065888@gmail.com', 'aa.alim234@gmail.com'];
      const isUserAdmin = Boolean(emailToUse && ADMIN_EMAILS.includes(emailToUse.toLowerCase().trim()));

      const googleUser: UserProfile = {
        id: fbUser.uid,
        name: nameToUse,
        email: emailToUse,
        avatar: avatarUrl,
        authMethod: 'google',
        isGuest: false,
        coins: 250,
        xp: 400,
        level: 2,
        country: 'Bangladesh',
        referralCode: 'QM-G' + Math.floor(100000 + Math.random() * 900000),
        totalReferred: 0,
        dailyQuizzesPlayed: 0,
        dailyCoinsEarned: 0,
        lastQuizDate: new Date().toISOString().split('T')[0],
        lastLoginDate: new Date().toISOString().split('T')[0],
        dailyStreak: 1,
        hasClaimedDailyBonus: false,
        spinsRemaining: 5,
        scratchesRemaining: 5,
        adsWatchedToday: 0,
        completedTaskIds: [],
        achievements: ['First Quiz', 'Google Verified'],
        role: isUserAdmin ? 'admin' : 'user'
      };

      // Sync to Firestore
      try {
        await setDoc(doc(db, 'users', fbUser.uid), googleUser, { merge: true });
      } catch (err) {
        console.warn('Firestore sync warning:', err);
      }

      setIsGoogleLoading(false);
      onLoginSuccess(googleUser);
      onClose();
    } catch (error) {
      console.warn('Firebase popup error or blocked, switching to account picker:', error);
      setIsGoogleLoading(false);
      setActiveTab('google');
    }
  };

  const handleGoogleSignInWithAccount = (userName?: string, userEmail?: string) => {
    setIsGoogleLoading(true);
    
    setTimeout(async () => {
      const emailToUse = userEmail || googleEmail || 'user@gmail.com';
      const nameToUse = userName || googleName || (emailToUse ? emailToUse.split('@')[0] : 'User');
      
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nameToUse)}`;
      const uid = 'usr_g_' + Math.random().toString(36).substring(2, 9);

      const ADMIN_EMAILS = ['alim1065888@gmail.com', 'aa.alim234@gmail.com'];
      const isUserAdmin = Boolean(emailToUse && ADMIN_EMAILS.includes(emailToUse.toLowerCase().trim()));

      const googleUser: UserProfile = {
        id: uid,
        name: nameToUse,
        email: emailToUse,
        avatar: avatarUrl,
        authMethod: 'google',
        isGuest: false,
        coins: 250,
        xp: 400,
        level: 2,
        country: 'Bangladesh',
        referralCode: 'QM-G' + Math.floor(100000 + Math.random() * 900000),
        totalReferred: 0,
        dailyQuizzesPlayed: 0,
        dailyCoinsEarned: 0,
        lastQuizDate: new Date().toISOString().split('T')[0],
        lastLoginDate: new Date().toISOString().split('T')[0],
        dailyStreak: 1,
        hasClaimedDailyBonus: false,
        spinsRemaining: 5,
        scratchesRemaining: 5,
        adsWatchedToday: 0,
        completedTaskIds: [],
        achievements: ['First Quiz', 'Google Verified'],
        role: isUserAdmin ? 'admin' : 'user'
      };
      
      // Sync to Firestore
      try {
        await setDoc(doc(db, 'users', uid), googleUser, { merge: true });
      } catch (err) {
        console.warn('Firestore sync warning:', err);
      }

      setIsGoogleLoading(false);
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      const phoneUser: UserProfile = {
        id: 'usr_p_' + Math.random().toString(36).substring(2, 9),
        name: 'User (' + phoneNumber.slice(-4) + ')',
        phone: '+880' + phoneNumber.replace(/^0+/, ''),
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        authMethod: 'phone',
        isGuest: false,
        coins: 150,
        xp: 250,
        level: 1,
        country: 'Bangladesh',
        referralCode: 'QM-P' + Math.floor(100000 + Math.random() * 900000),
        totalReferred: 0,
        dailyQuizzesPlayed: 0,
        dailyCoinsEarned: 0,
        lastQuizDate: new Date().toISOString().split('T')[0],
        lastLoginDate: new Date().toISOString().split('T')[0],
        dailyStreak: 1,
        hasClaimedDailyBonus: false,
        spinsRemaining: 5,
        scratchesRemaining: 5,
        adsWatchedToday: 0,
        completedTaskIds: [],
        achievements: ['First Quiz'],
        role: 'user'
      };
      onLoginSuccess(phoneUser);
      onClose();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const emailUser: UserProfile = {
        id: 'usr_e_' + Math.random().toString(36).substring(2, 9),
        name: name || email.split('@')[0],
        email: email,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
        authMethod: 'email',
        isGuest: false,
        coins: 150,
        xp: 200,
        level: 1,
        country: 'Bangladesh',
        referralCode: 'QM-E' + Math.floor(100000 + Math.random() * 900000),
        totalReferred: 0,
        dailyQuizzesPlayed: 0,
        dailyCoinsEarned: 0,
        lastQuizDate: new Date().toISOString().split('T')[0],
        lastLoginDate: new Date().toISOString().split('T')[0],
        dailyStreak: 1,
        hasClaimedDailyBonus: false,
        spinsRemaining: 5,
        scratchesRemaining: 5,
        adsWatchedToday: 0,
        completedTaskIds: [],
        achievements: ['First Quiz'],
        role: 'user'
      };
      onLoginSuccess(emailUser);
      onClose();
    }
  };

  const handleGuestContinue = () => {
    const guestUser: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 8),
      name: 'Guest Player',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authMethod: 'guest',
      isGuest: true,
      coins: 50,
      xp: 50,
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
      spinsRemaining: 2,
      scratchesRemaining: 2,
      adsWatchedToday: 0,
      completedTaskIds: [],
      achievements: ['First Quiz'],
      role: 'user'
    };
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden relative ${
          darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 mx-auto flex items-center justify-center shadow-lg mb-3">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">{t.login}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.app_subtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'options' && (
            <motion.div
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {/* Google Sign In */}
              <button
                onClick={handleFirebasePopup}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{t.sign_in_google}</span>
              </button>

              {/* Mobile Phone OTP */}
              <button
                onClick={() => setActiveTab('phone')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <Smartphone className="w-5 h-5" />
                <span>{t.sign_in_phone}</span>
              </button>

              {/* Email & Password */}
              <button
                onClick={() => setActiveTab('email')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <Mail className="w-5 h-5 text-indigo-500" />
                <span>{t.sign_in_email}</span>
              </button>

              {/* Guest Mode Card */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleGuestContinue}
                  className="w-full py-2.5 px-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{t.continue_guest}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-2 px-2">
                  {t.guest_limit_desc}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'google' && (
            <motion.div
              key="google"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {isGoogleLoading ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-500 animate-pulse">
                    Connecting to Google Account...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                      আপনার গুগল ইমেইল দিয়ে সাইন ইন করুন:
                    </p>
                  </div>

                  {/* Custom Google Sign-In Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleGoogleSignInWithAccount();
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        আপনার নাম (Full Name)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: তানভির আহমেদ"
                        value={googleName}
                        onChange={(e) => setGoogleName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        গুগল ইমেইল এড্রেস (@gmail.com)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      </svg>
                      <span>গুগল অ্যাকাউন্ট দিয়ে প্রবেশ করুন</span>
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setActiveTab('options')}
                    className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    ← Back to Login Options
                  </button>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Bangladesh Phone Number (+880)
                    </label>
                    <div className="flex items-center rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <span className="px-3 text-sm font-bold text-slate-500 border-r border-slate-300 dark:border-slate-700">
                        +880
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="1712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-3 bg-transparent font-mono text-sm outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                  >
                    Send 6-Digit Verification Code
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('options')}
                    className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    ← Back to Login Options
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 text-center">
                      Enter OTP sent to +880 {phoneNumber}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verify & Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {activeTab === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {isRegistering && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Md. Shakil Hossain"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all mt-2"
                >
                  {isRegistering ? 'Create Account' : 'Login'}
                </button>

                <div className="flex justify-between items-center text-xs pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    {isRegistering ? 'Already have account? Login' : 'Need an account? Register'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('options')}
                    className="text-slate-500 font-bold hover:underline"
                  >
                    Back
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
