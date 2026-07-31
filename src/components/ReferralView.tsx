import React, { useState } from 'react';
import { Users, Copy, Share2, Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../data/translations';

interface ReferralViewProps {
  user: UserProfile;
  onApplyReferral: (code: string) => void;
  language: Language;
  darkMode: boolean;
}

export const ReferralView: React.FC<ReferralViewProps> = ({
  user,
  onApplyReferral,
  language,
  darkMode,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareUrl = window.location.origin + window.location.pathname + '?ref=' + user.referralCode;
    const text = `🎁 Quiz Master BD-এ আমার রেফারেল কোড "${user.referralCode}" দিয়ে ফ্রিতে ৫০ পয়েন্ট বোনাস পাবেন! প্রবেশ করুন: ${shareUrl}`;
    if (navigator.share) {
      navigator.share({ title: 'Quiz Master BD Invite', text, url: shareUrl });
    } else {
      navigator.clipboard.writeText(text);
      alert(language === 'bn' ? 'আমন্ত্রণ লিঙ্ক কপি হয়েছে!' : t.copied);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().length > 3) {
      onApplyReferral(inputCode.trim());
      setApplied(true);
      setInputCode('');
      alert('Referral code applied! +50 bonus coins added.');
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight">{t.invite_friends}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Invite your friends & earn +100 bonus coins for every successful referral!
        </p>
      </div>

      {/* Hero Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-900 text-white shadow-xl text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 mx-auto flex items-center justify-center mb-3">
          <Users className="w-9 h-9 text-amber-300" />
        </div>

        <h3 className="text-xl font-black">{t.your_ref_code}</h3>
        <p className="text-xs text-indigo-200 mt-1">Both you and your friend get +100 coins</p>

        {/* Code Box */}
        <div className="mt-5 p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-between gap-3 max-w-xs mx-auto">
          <span className="font-mono font-black text-xl tracking-wider text-amber-300">
            {user.referralCode}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 transition-all shadow"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="mt-4 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-xs inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.share_link}</span>
        </button>
      </div>

      {/* Enter Friend's Referral Code Card */}
      {!user.referredBy && (
        <div className={`p-5 rounded-3xl border ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
        }`}>
          <h4 className="font-extrabold text-sm mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-500" />
            <span>{t.enter_ref_code}</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Enter a friend's referral code to claim an instant 50 bonus coins.
          </p>

          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. QM-782914"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm uppercase outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shrink-0 shadow"
            >
              {t.apply_code}
            </button>
          </form>
        </div>
      )}

      {/* Referral Stats */}
      <div className={`p-5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <h4 className="font-extrabold text-sm mb-4">{t.ref_earnings}</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {user.totalReferred}
            </span>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
              {t.total_referred}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-2xl font-black text-amber-500">
              {user.totalReferred * 100}
            </span>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
              Coins Earned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
