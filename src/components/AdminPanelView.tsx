import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Plus, Trash2, CheckCircle2, XCircle, 
  Send, Users, Wallet, Brain, Layers, ArrowLeft 
} from 'lucide-react';
import { QuizQuestion, QuizCategory, WithdrawRequest, Language } from '../types';

interface AdminPanelViewProps {
  questions: QuizQuestion[];
  categories: QuizCategory[];
  withdraws: WithdrawRequest[];
  onAddQuestion: (question: QuizQuestion) => void;
  onDeleteQuestion: (qId: string) => void;
  onAddCategory: (category: QuizCategory) => void;
  onApproveWithdraw: (wId: string) => void;
  onRejectWithdraw: (wId: string) => void;
  onSendNotification: (title: string, message: string) => void;
  onCloseAdmin: () => void;
  darkMode: boolean;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  questions,
  categories,
  withdraws,
  onAddQuestion,
  onDeleteQuestion,
  onAddCategory,
  onApproveWithdraw,
  onRejectWithdraw,
  onSendNotification,
  onCloseAdmin,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'questions' | 'withdraws' | 'notify'>('dashboard');

  // New Question Form
  const [catId, setCatId] = useState(categories[0]?.id || 'gen_knowledge');
  const [qText, setQText] = useState('');
  const [qTextBn, setQTextBn] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');

  // Notification Form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (qText && opt0 && opt1) {
      const newQ: QuizQuestion = {
        id: 'q_adm_' + Date.now(),
        categoryId: catId,
        type: 'mcq',
        question: qText,
        questionBn: qTextBn || qText,
        options: [opt0, opt1, opt2 || 'Option 3', opt3 || 'Option 4'],
        optionsBn: [opt0, opt1, opt2 || 'Option 3', opt3 || 'Option 4'],
        correctOptionIndex: Number(correctIdx),
        explanation: explanation || 'Correct answer according to official curriculum.',
        explanationBn: explanation || 'অফিসিয়াল সিলেবাস অনুযায়ী সঠিক উত্তর।',
        difficulty: 'medium'
      };
      onAddQuestion(newQ);
      setQText('');
      setQTextBn('');
      setOpt0('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setExplanation('');
      alert('New quiz question published successfully!');
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifTitle && notifMsg) {
      onSendNotification(notifTitle, notifMsg);
      setNotifTitle('');
      setNotifMsg('');
      alert('Push notification broadcasted to all users!');
    }
  };

  const pendingWithdraws = withdraws.filter((w) => w.status === 'pending');

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-2xl mx-auto">
      {/* Admin Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <span>Admin Panel</span>
              <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">PRO</span>
            </h2>
            <p className="text-xs text-slate-500">
              Manage Quiz Master BD database, users, cash payouts & push alerts
            </p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'questions', label: 'Add Questions' },
          { id: 'withdraws', label: `Withdraws (${pendingWithdraws.length})` },
          { id: 'notify', label: 'Push Notification' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-3 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
              <Brain className="w-6 h-6 mb-2" />
              <span className="text-2xl font-black">{questions.length}</span>
              <p className="text-xs font-bold text-slate-500">Total Questions</p>
            </div>
            <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-6 h-6 mb-2" />
              <span className="text-2xl font-black">{categories.length}</span>
              <p className="text-xs font-bold text-slate-500">Categories</p>
            </div>
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <Wallet className="w-6 h-6 mb-2" />
              <span className="text-2xl font-black">{withdraws.length}</span>
              <p className="text-xs font-bold text-slate-500">Withdraw Requests</p>
            </div>
            <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
              <Users className="w-6 h-6 mb-2" />
              <span className="text-2xl font-black">1,420</span>
              <p className="text-xs font-bold text-slate-500">Active Users</p>
            </div>
          </div>
        </div>
      )}

      {/* QUESTIONS TAB */}
      {activeTab === 'questions' && (
        <div className="space-y-5">
          <form onSubmit={handleCreateQuestion} className={`p-5 rounded-3xl border space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <h3 className="font-extrabold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-600" />
              <span>Add New Quiz Question</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Select Category</label>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.nameBn})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Question (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. What is the capital of Bangladesh?"
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Question (Bangla)</label>
              <input
                type="text"
                placeholder="যেমনঃ বাংলাদেশের রাজধানী কোনটি?"
                value={qTextBn}
                onChange={(e) => setQTextBn(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Option A (e.g. Dhaka)"
                value={opt0}
                onChange={(e) => setOpt0(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                required
                placeholder="Option B (e.g. Chittagong)"
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Option C (e.g. Sylhet)"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="Option D (e.g. Khulna)"
                value={opt3}
                onChange={(e) => setOpt3(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Correct Option Index</label>
              <select
                value={correctIdx}
                onChange={(e) => setCorrectIdx(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow transition-all"
            >
              Publish Question to Database
            </button>
          </form>

          {/* List of existing questions with delete button */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-500">Existing Questions ({questions.length})</h4>
            {questions.map((q) => (
              <div key={q.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs">
                <span className="font-bold line-clamp-1">{q.question}</span>
                <button
                  onClick={() => onDeleteQuestion(q.id)}
                  className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WITHDRAWS TAB */}
      {activeTab === 'withdraws' && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm">Pending Withdraw Requests</h3>
          {withdraws.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No withdraw requests.</p>
          ) : (
            withdraws.map((w) => (
              <div key={w.id} className={`p-4 rounded-3xl border flex items-center justify-between gap-3 text-xs ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow'
              }`}>
                <div>
                  <h4 className="font-extrabold text-sm">{w.userName}</h4>
                  <p className="text-slate-500 font-mono mt-0.5">{w.method} • {w.accountNumber}</p>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">৳ {w.amountBDT} BDT</span>
                </div>

                {w.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onApproveWithdraw(w.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRejectWithdraw(w.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold flex items-center gap-1 hover:bg-rose-700"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <span className="capitalize font-bold text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    {w.status}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* NOTIFY TAB */}
      {activeTab === 'notify' && (
        <form onSubmit={handleBroadcast} className={`p-5 rounded-3xl border space-y-3 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
        }`}>
          <h3 className="font-extrabold text-sm flex items-center gap-2">
            <Send className="w-4 h-4 text-purple-600" />
            <span>Send Broadcast Push Notification</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Notification Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 50 Coins Weekend Bonus!"
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Message</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Log in now and play BCS Special quiz to claim double coins!"
              value={notifMsg}
              onChange={(e) => setNotifMsg(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Push Alert</span>
          </button>
        </form>
      )}
    </div>
  );
};
