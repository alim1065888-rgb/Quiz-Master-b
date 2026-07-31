import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Coins, ArrowUpRight, Clock, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { UserProfile, WithdrawRequest, WithdrawMethod, Language } from '../types';
import { translations } from '../data/translations';

interface WalletViewProps {
  user: UserProfile;
  withdraws: WithdrawRequest[];
  onRequestWithdraw: (method: WithdrawMethod, accountNumber: string, amountBDT: number) => void;
  onOpenAuthModal: () => void;
  language: Language;
  darkMode: boolean;
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  withdraws,
  onRequestWithdraw,
  onOpenAuthModal,
  language,
  darkMode,
}) => {
  const t = translations[language];

  const [selectedMethod, setSelectedMethod] = useState<WithdrawMethod>('bKash');
  const [accountNumber, setAccountNumber] = useState('');
  const [amountBDT, setAmountBDT] = useState<number>(100);
  const [errorMessage, setErrorMessage] = useState('');

  // Rate: 1000 Coins = 100 BDT
  const withdrawableBDT = Math.floor((user.coins / 1000) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (user.isGuest) {
      onOpenAuthModal();
      return;
    }

    if (amountBDT < 100) {
      setErrorMessage(t.min_withdraw);
      return;
    }

    const requiredCoins = (amountBDT / 100) * 1000;
    if (user.coins < requiredCoins) {
      setErrorMessage(`Insufficient coins. You need ${requiredCoins} coins to withdraw ${amountBDT} BDT.`);
      return;
    }

    if (accountNumber.length < 11) {
      setErrorMessage('Please enter a valid 11-digit mobile account number.');
      return;
    }

    onRequestWithdraw(selectedMethod, accountNumber, amountBDT);
    setAccountNumber('');
    alert('Withdrawal request submitted successfully! Pending admin approval.');
  };

  const myWithdraws = withdraws.filter((w) => w.userId === user.id);

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-xl mx-auto">
      <div>
        <h2 className="text-2xl font-black tracking-tight">{t.wallet}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Convert your quiz coins to real BDT cash via bKash, Nagad & Rocket
        </p>
      </div>

      {/* Guest Warning */}
      {user.isGuest && (
        <div 
          onClick={onOpenAuthModal}
          className="p-4 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500/60 transition-all"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm text-amber-700 dark:text-amber-400">
                {t.guest_limit_title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t.guest_withdraw_blocked}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-2xl shrink-0">
            {t.upgrade_account}
          </span>
        </div>
      )}

      {/* Balance Banner Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
              {t.wallet_balance}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Coins className="w-7 h-7 text-amber-400 fill-amber-400" />
              <span className="text-3xl font-black">{user.coins.toLocaleString()} Coins</span>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
            <Wallet className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-medium text-emerald-100">
          <div>
            <span>{t.bdt_balance}: </span>
            <span className="font-black text-amber-300 text-sm">৳ {withdrawableBDT} BDT</span>
          </div>
          <span className="bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
            {t.rate_info}
          </span>
        </div>
      </div>

      {/* Withdraw Form Card */}
      <div className={`p-5 sm:p-6 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <h3 className="font-extrabold text-base mb-4 flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-emerald-500" />
          <span>{t.request_withdraw}</span>
        </h3>

        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Method Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              {t.withdraw_method}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'bKash', name: 'bKash', color: 'border-pink-500/40 bg-pink-500/10 text-pink-600' },
                { id: 'Nagad', name: 'Nagad', color: 'border-orange-500/40 bg-orange-500/10 text-orange-600' },
                { id: 'Rocket', name: 'Rocket', color: 'border-purple-500/40 bg-purple-500/10 text-purple-600' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.id as WithdrawMethod)}
                  className={`p-3 rounded-2xl border font-black text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedMethod === m.id
                      ? `${m.color} border-2 shadow-sm scale-105`
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <span className="text-sm font-bold">{m.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">Instant Transfer</span>
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              {selectedMethod} {t.account_number}
            </label>
            <input
              type="tel"
              required
              placeholder="01712345678"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full px-3.5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
          </div>

          {/* Amount in BDT */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              {t.amount_bdt} (Min 100 BDT = 1000 Coins)
            </label>
            <input
              type="number"
              min={100}
              step={50}
              required
              value={amountBDT}
              onChange={(e) => setAmountBDT(Number(e.target.value))}
              className="w-full px-3.5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all"
          >
            {t.request_withdraw}
          </button>
        </form>
      </div>

      {/* Withdraw History */}
      <div className={`p-5 rounded-3xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
      }`}>
        <h3 className="font-extrabold text-base mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{t.withdraw_history}</span>
        </h3>

        {myWithdraws.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No withdrawal history found yet.</p>
        ) : (
          <div className="space-y-2.5">
            {myWithdraws.map((w) => (
              <div
                key={w.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
                    {w.method}
                  </div>
                  <div>
                    <p className="font-bold">{w.accountNumber}</p>
                    <span className="text-[10px] text-slate-400">
                      {new Date(w.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                    ৳ {w.amountBDT} BDT
                  </p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold capitalize ${
                    w.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-600'
                      : w.status === 'rejected'
                      ? 'bg-rose-500/20 text-rose-600'
                      : 'bg-amber-500/20 text-amber-600'
                  }`}>
                    {w.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
