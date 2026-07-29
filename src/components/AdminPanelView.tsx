import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Plus, Trash2, CheckCircle2, XCircle, 
  Send, Users, Wallet, Brain, Layers, ArrowLeft,
  Coins, Search, Edit3, Settings, AlertCircle, Sparkles, Key,
  FileSpreadsheet, Download, UploadCloud, Check
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { QuizQuestion, QuizCategory, WithdrawRequest, UserProfile } from '../types';

interface AdminPanelViewProps {
  questions: QuizQuestion[];
  categories: QuizCategory[];
  withdraws: WithdrawRequest[];
  currentUser: UserProfile;
  onAddQuestion: (question: QuizQuestion) => void;
  onDeleteQuestion: (qId: string) => void;
  onAddCategory: (category: QuizCategory) => void;
  onDeleteCategory: (catId: string) => void;
  onApproveWithdraw: (wId: string) => void;
  onRejectWithdraw: (wId: string) => void;
  onSendNotification: (title: string, message: string) => void;
  onAddCoinsToUser?: (amount: number) => void;
  onCloseAdmin: () => void;
  darkMode: boolean;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  questions,
  categories,
  withdraws,
  currentUser,
  onAddQuestion,
  onDeleteQuestion,
  onAddCategory,
  onDeleteCategory,
  onApproveWithdraw,
  onRejectWithdraw,
  onSendNotification,
  onAddCoinsToUser,
  onCloseAdmin,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'questions' | 'categories' | 'withdraws' | 'users' | 'notify'>('dashboard');

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

  // New Category Form
  const [catName, setCatName] = useState('');
  const [catNameBn, setCatNameBn] = useState('');
  const [catIcon, setCatIcon] = useState('Brain');
  const [catColor, setCatColor] = useState('from-blue-500 to-indigo-600');
  const [catDesc, setCatDesc] = useState('');

  // Notification Form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  // User search & custom bonus coins
  const [userSearch, setUserSearch] = useState('');
  const [bonusCoinsInput, setBonusCoinsInput] = useState('100');

  // Excel Upload States
  const [excelParsedQuestions, setExcelParsedQuestions] = useState<QuizQuestion[]>([]);
  const [isExcelUploading, setIsExcelUploading] = useState(false);
  const [excelFileName, setExcelFileName] = useState('');
  const [excelError, setExcelError] = useState('');

  // Mock list of registered app users
  const [registeredUsers, setRegisteredUsers] = useState<Partial<UserProfile>[]>([
    {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email || 'alim1065888@gmail.com',
      coins: currentUser.coins,
      xp: currentUser.xp,
      level: currentUser.level,
      role: 'admin',
      authMethod: currentUser.authMethod || 'google'
    },
    {
      id: 'usr_102',
      name: 'Tanvir Ahmed',
      email: 'tanvir.ahmed@gmail.com',
      coins: 450,
      xp: 1200,
      level: 3,
      role: 'user',
      authMethod: 'google'
    },
    {
      id: 'usr_103',
      name: 'Sumaiya Yeasmin',
      email: 'sumaiya.quiz@gmail.com',
      coins: 820,
      xp: 2100,
      level: 5,
      role: 'user',
      authMethod: 'phone'
    },
    {
      id: 'usr_104',
      name: 'Rahat Islam',
      email: 'rahat.bcs@gmail.com',
      coins: 310,
      xp: 890,
      level: 2,
      role: 'user',
      authMethod: 'email'
    }
  ]);

  // Excel Sample Download Function
  const handleDownloadSampleExcel = () => {
    const sampleRows = [
      {
        'Question (প্রশ্ন)': 'বাংলাদেশের স্বাধীনতা দিবস কোনটি?',
        'Option 1 (অপশন ১)': '২৬ মার্চ',
        'Option 2 (অপশন ২)': '১৬ ডিসেম্বর',
        'Option 3 (অপশন ৩)': '২১ ফেব্রুয়ারি',
        'Option 4 (অপশন ৪)': '১৪ এপ্রিল',
        'Correct Option Number (১-৪)': 1,
        'Explanation (ব্যাখ্যা)': '১৯৭১ সালের ২৬ মার্চ বাংলাদেশের স্বাধীনতা ঘোষিত হয়।',
        'Category ID (ক্যাটাগরি ID)': catId || 'gen_knowledge'
      },
      {
        'Question (প্রশ্ন)': 'What is the capital city of Bangladesh?',
        'Option 1 (অপশন ১)': 'Dhaka',
        'Option 2 (Option 2)': 'Chittagong',
        'Option 3 (Option 3)': 'Sylhet',
        'Option 4 (Option 4)': 'Khulna',
        'Correct Option Number (১-৪)': 1,
        'Explanation (ব্যাখ্যা)': 'Dhaka is the capital and largest city of Bangladesh.',
        'Category ID (ক্যাটাগরি ID)': catId || 'gen_knowledge'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quiz_Questions');
    XLSX.writeFile(workbook, 'Quiz_Master_Questions_Template.xlsx');
  };

  // Excel File Upload & Parse
  const handleExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    setIsExcelUploading(true);
    setExcelError('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          setExcelError('এক্সেল ফাইলে কোন ডাটা পাওয়া যায়নি।');
          setIsExcelUploading(false);
          return;
        }

        const parsedList: QuizQuestion[] = [];

        rawJson.forEach((row: any, idx: number) => {
          // Helper to find column matching any substring
          const getRowVal = (keys: string[]): string => {
            for (const k of Object.keys(row)) {
              const cleanK = k.toLowerCase().trim();
              if (keys.some((target) => cleanK.includes(target.toLowerCase()))) {
                return String(row[k] || '').trim();
              }
            }
            return '';
          };

          const qTextStr = getRowVal(['question', 'প্রশ্ন', 'q_text', 'title']);
          const opt1Str = getRowVal(['option 1', 'option1', 'opt1', 'অপশন ১', 'অপশন 1']);
          const opt2Str = getRowVal(['option 2', 'option2', 'opt2', 'অপশন ২', 'অপশন 2']);
          const opt3Str = getRowVal(['option 3', 'option3', 'opt3', 'অপশন ৩', 'অপশন 3']);
          const opt4Str = getRowVal(['option 4', 'option4', 'opt4', 'অপশন ৪', 'অপশন 4']);
          const catIdStr = getRowVal(['category', 'category id', 'ক্যাটাগরি', 'catid']) || catId;
          const expStr = getRowVal(['explanation', 'ব্যাখ্যা', 'desc', 'ans_desc']);
          const correctRaw = getRowVal(['correct', 'sothik', 'সঠিক', 'ans', 'answer']);

          let correctOptionIdx = 0;
          if (correctRaw) {
            const parsedNum = parseInt(String(correctRaw).replace(/\D/g, ''));
            if (!isNaN(parsedNum)) {
              if (parsedNum >= 1 && parsedNum <= 4) correctOptionIdx = parsedNum - 1;
              else if (parsedNum >= 0 && parsedNum <= 3) correctOptionIdx = parsedNum;
            }
          }

          if (qTextStr && opt1Str && opt2Str) {
            parsedList.push({
              id: `q_xl_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
              categoryId: catIdStr || 'gen_knowledge',
              type: 'mcq',
              question: qTextStr,
              questionBn: qTextStr,
              options: [opt1Str, opt2Str, opt3Str || 'Option 3', opt4Str || 'Option 4'],
              optionsBn: [opt1Str, opt2Str, opt3Str || 'Option 3', opt4Str || 'Option 4'],
              correctOptionIndex: correctOptionIdx,
              explanation: expStr || 'সঠিক উত্তর নির্বাচন করা হয়েছে।',
              explanationBn: expStr || 'সঠিক উত্তর নির্বাচন করা হয়েছে।',
              difficulty: 'medium'
            });
          }
        });

        if (parsedList.length === 0) {
          setExcelError('ফাইল থেকে সঠিক বিন্যাসের প্রশ্ন পাওয়া যায়নি। দয়া করে ডেমো টেমপ্লেট ডাউনলোড করে ফরম্যাটটি দেখে নিন।');
        } else {
          setExcelParsedQuestions(parsedList);
        }
      } catch (err) {
        console.error('Excel parse error:', err);
        setExcelError('এক্সেল ফাইল প্রসেস করতে সমস্যা হয়েছে। অন্য একটি .xlsx / .csv চেষ্টা করুন।');
      } finally {
        setIsExcelUploading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Confirm Import
  const handleConfirmExcelImport = () => {
    if (excelParsedQuestions.length === 0) return;
    
    excelParsedQuestions.forEach((q) => {
      onAddQuestion(q);
    });

    alert(`অভিনন্দন! মোট ${excelParsedQuestions.length} টি প্রশ্ন সফলভাবে কুইজ ডাটাবেজে যুক্ত করা হয়েছে!`);
    setExcelParsedQuestions([]);
    setExcelFileName('');
  };

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
        explanation: explanation || 'Correct answer according to official syllabus.',
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
      alert('নতুন কুইজ প্রশ্ন ডাটাবেজে যুক্ত হয়েছে!');
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (catName) {
      const newCat: QuizCategory = {
        id: 'cat_' + Date.now(),
        name: catName,
        nameBn: catNameBn || catName,
        iconName: catIcon,
        color: catColor,
        questionCount: 5,
        description: catDesc || 'Practice category questions',
        descriptionBn: catDesc || 'অনুশীলন ক্যাটাগরির প্রশ্নসমূহ'
      };
      onAddCategory(newCat);
      setCatName('');
      setCatNameBn('');
      setCatDesc('');
      alert('নতুন ক্যাটাগরি তৈরি হয়েছে!');
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifTitle && notifMsg) {
      onSendNotification(notifTitle, notifMsg);
      setNotifTitle('');
      setNotifMsg('');
      alert('সব ইউজারের কাছে পুশ নোটিফিকেশন পাঠানো হয়েছে!');
    }
  };

  const handleGrantCoins = (uId: string, name: string) => {
    const coins = parseInt(bonusCoinsInput) || 100;
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === uId ? { ...u, coins: (u.coins || 0) + coins } : u))
    );
    if (uId === currentUser.id && onAddCoinsToUser) {
      onAddCoinsToUser(coins);
    }
    alert(`${name}-কে ${coins} কয়েন বোনাস প্রদান করা হয়েছে!`);
  };

  const pendingWithdraws = withdraws.filter((w) => w.status === 'pending');
  const totalPendingBDT = pendingWithdraws.reduce((acc, curr) => acc + curr.amountBDT, 0);

  const filteredUsers = registeredUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-24 animate-fade-in max-w-3xl mx-auto">
      {/* Admin Top Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-900 to-slate-900 p-5 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <span>Admin Control Panel</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase">
                SUPER ADMIN
              </span>
            </h2>
            <p className="text-xs text-purple-200">
              Quiz Master BD অ্যাডমিন প্যানেল - সম্পূর্ণ অ্যাপ কন্ট্রোল ও সিস্টেম পরিচালনা
            </p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold gap-1 overflow-x-auto shadow-inner">
        {[
          { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: ShieldCheck },
          { id: 'questions', label: `প্রশ্ন পরিচালনা (${questions.length})`, icon: Brain },
          { id: 'categories', label: `ক্যাটাগরি (${categories.length})`, icon: Layers },
          { id: 'withdraws', label: `উইথড্র (${pendingWithdraws.length})`, icon: Wallet },
          { id: 'users', label: 'ইউজার ম্যানেজমেন্ট', icon: Users },
          { id: 'notify', label: 'নোটিফিকেশন', icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-xl whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-purple-600 text-white font-extrabold shadow-md'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
              <Brain className="w-6 h-6 mb-2 text-purple-500" />
              <span className="text-2xl font-black">{questions.length}</span>
              <p className="text-xs font-bold text-slate-500">মোট প্রশ্ন</p>
            </div>
            <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-6 h-6 mb-2 text-emerald-500" />
              <span className="text-2xl font-black">{categories.length}</span>
              <p className="text-xs font-bold text-slate-500">মোট ক্যাটাগরি</p>
            </div>
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <Wallet className="w-6 h-6 mb-2 text-amber-500" />
              <span className="text-2xl font-black">{withdraws.length}</span>
              <p className="text-xs font-bold text-slate-500">পেন্ডিং উইথড্র (৳{totalPendingBDT})</p>
            </div>
            <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
              <Users className="w-6 h-6 mb-2 text-blue-500" />
              <span className="text-2xl font-black">{registeredUsers.length}</span>
              <p className="text-xs font-bold text-slate-500">একটিভ ইউজার</p>
            </div>
          </div>

          <div className={`p-5 rounded-3xl border space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <h3 className="font-extrabold text-sm flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>এডমিন রিয়েলটাইম স্ট্যাটাস</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block font-bold">লগইন এডমিন ইমেইল:</span>
                <span className="font-mono font-extrabold text-slate-800 dark:text-slate-100">
                  {currentUser.email || 'alim1065888@gmail.com'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block font-bold">ফায়ারবেস স্টোরেজ সিঙ্ক:</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>সক্রিয় (Connected to Firestore DB)</span>
                </span>
              </div>
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
              <span>নতুন কুইজ প্রশ্ন যুক্ত করুন</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">ক্যাটাগরি সিলেক্ট করুন</label>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameBn} ({c.name})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">প্রশ্ন (বাংলায়)</label>
              <input
                type="text"
                required
                placeholder="যেমনঃ বাংলাদেশের রাজধানী কোনটি?"
                value={qTextBn}
                onChange={(e) => setQTextBn(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
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

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="অপশন ১ (যেমনঃ ঢাকা)"
                value={opt0}
                onChange={(e) => setOpt0(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                required
                placeholder="অপশন ২ (যেমনঃ চট্টগ্রাম)"
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="অপশন ৩ (যেমনঃ সিলেট)"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="text"
                placeholder="অপশন ৪ (যেমনঃ খুলনা)"
                value={opt3}
                onChange={(e) => setOpt3(e.target.value)}
                className="px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">সঠিক উত্তর নির্ধারণ করুন</label>
              <select
                value={correctIdx}
                onChange={(e) => setCorrectIdx(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              >
                <option value={0}>অপশন ১</option>
                <option value={1}>অপশন ২</option>
                <option value={2}>অপশন ৩</option>
                <option value={3}>অপশন ৪</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow transition-all"
            >
              পাবলিশ প্রশ্ন (Publish Question)
            </button>
          </form>

          {/* Excel / CSV Import Section */}
          <div className={`p-5 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                <div>
                  <h3 className="font-extrabold text-sm">এক্সেল (Excel) ফাইল দিয়ে বাল্ক প্রশ্ন আপলোড</h3>
                  <p className="text-[11px] text-slate-400">.xlsx / .xls / .csv ফাইল থেকে একবারে শত শত প্রশ্ন ইনপোর্ট করুন</p>
                </div>
              </div>
              <button
                onClick={handleDownloadSampleExcel}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>স্যাম্পল ফাইল ডাউনলোড</span>
              </button>
            </div>

            {/* File upload drag/drop zone */}
            <div className="border-2 border-dashed border-emerald-500/30 rounded-2xl p-4 text-center bg-emerald-500/5 hover:bg-emerald-500/10 transition-all cursor-pointer relative">
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleExcelFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <UploadCloud className="w-8 h-8 text-emerald-500 mx-auto mb-1 animate-bounce" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {excelFileName ? `সিলেক্টেড ফাইল: ${excelFileName}` : 'এখানে এক্সেল বা CSV ফাইল ড্রপ করুন অথবা সিলেক্ট করুন'}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                সাপোর্টেড ফরম্যাট: .xlsx, .xls, .csv (Question, Option 1, Option 2, Option 3, Option 4, Correct Option)
              </span>
            </div>

            {isExcelUploading && (
              <p className="text-xs font-bold text-amber-500 text-center animate-pulse">
                এক্সেল ফাইল প্রসেস করা হচ্ছে...
              </p>
            )}

            {excelError && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{excelError}</span>
              </div>
            )}

            {/* Parsed questions preview & confirm */}
            {excelParsedQuestions.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    ✓ মোট {excelParsedQuestions.length} টি প্রশ্ন পাওয়া গিয়েছে!
                  </span>
                  <button
                    onClick={handleConfirmExcelImport}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>সব প্রশ্ন ডাটাবেজে যুক্ত করুন</span>
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {excelParsedQuestions.slice(0, 10).map((q, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] border flex justify-between items-center">
                      <div className="truncate flex-1 pr-2">
                        <span className="font-bold">{i + 1}. {q.questionBn}</span>
                        <span className="text-slate-400 block text-[10px]">{q.optionsBn.join(' | ')} (সঠিক: অপশন {q.correctOptionIndex + 1})</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full font-bold text-[9px]">
                        Ready
                      </span>
                    </div>
                  ))}
                  {excelParsedQuestions.length > 10 && (
                    <p className="text-[10px] text-center text-slate-400 py-1">
                      ...এবং আরও {excelParsedQuestions.length - 10} টি প্রশ্ন
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* List of existing questions with delete option */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-500">ডাটাবেজে থাকা প্রশ্নসমূহ ({questions.length})</h4>
            {questions.map((q) => (
              <div key={q.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0 flex-1">
                  <span className="font-bold block truncate">{q.questionBn || q.question}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{q.question}</span>
                </div>
                <button
                  onClick={() => onDeleteQuestion(q.id)}
                  className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="space-y-5">
          <form onSubmit={handleCreateCategory} className={`p-5 rounded-3xl border space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <h3 className="font-extrabold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>নতুন কুইজ ক্যাটাগরি তৈরি করুন</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">ক্যাটাগরি নাম (বাংলা)</label>
              <input
                type="text"
                required
                placeholder="যেমনঃ কম্পিউটার ও প্রযুক্তি"
                value={catNameBn}
                onChange={(e) => setCatNameBn(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Category Name (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Technology & Computing"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">কালার গ্রেডিয়েন্ট</label>
              <select
                value={catColor}
                onChange={(e) => setCatColor(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              >
                <option value="from-blue-500 to-indigo-600">Blue & Indigo</option>
                <option value="from-emerald-500 to-teal-600">Emerald & Teal</option>
                <option value="from-amber-500 to-orange-600">Amber & Orange</option>
                <option value="from-purple-500 to-pink-600">Purple & Pink</option>
                <option value="from-rose-500 to-red-600">Rose & Red</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition-all"
            >
              ক্যাটাগরি যুক্ত করুন
            </button>
          </form>

          {/* List of categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((c) => (
              <div key={c.id} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-xs">{c.nameBn} ({c.name})</h4>
                  <p className="text-[11px] text-slate-400">{c.questionCount} টি প্রশ্ন সক্রিয়</p>
                </div>
                {categories.length > 2 && (
                  <button
                    onClick={() => onDeleteCategory(c.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WITHDRAWS TAB */}
      {activeTab === 'withdraws' && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm">পেন্ডিং উইথড্র ক্যাশআউট রিকুয়েস্ট</h3>
          {withdraws.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">কোন উইথড্র রিকুয়েস্ট নেই।</p>
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
                      className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 hover:bg-emerald-700 text-xs shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>অনুমোদন করুন</span>
                    </button>
                    <button
                      onClick={() => onRejectWithdraw(w.id)}
                      className="px-3 py-2 rounded-xl bg-rose-600 text-white font-bold flex items-center gap-1 hover:bg-rose-700 text-xs shadow"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>বাতিল</span>
                    </button>
                  </div>
                ) : (
                  <span className={`capitalize font-bold px-3 py-1 rounded-full text-xs ${
                    w.status === 'approved' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'
                  }`}>
                    {w.status === 'approved' ? 'Approved & Paid' : 'Rejected'}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="ইউজার নাম বা ইমেইল দিয়ে খুঁজুন..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>
            <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-2 rounded-2xl border border-amber-500/30">
              <span className="text-[11px] font-bold text-slate-500">বোনাস কয়েন:</span>
              <input
                type="number"
                value={bonusCoinsInput}
                onChange={(e) => setBonusCoinsInput(e.target.value)}
                className="w-16 px-2 py-0.5 rounded-lg border text-center text-xs font-black bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredUsers.map((u) => (
              <div key={u.id} className={`p-4 rounded-3xl border flex items-center justify-between gap-3 text-xs ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm">{u.name}</h4>
                    {u.role === 'admin' && (
                      <span className="bg-purple-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded-full">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-[11px]">{u.email}</p>
                  <div className="flex items-center gap-2 mt-1 text-amber-500 font-extrabold">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{u.coins} Coins</span>
                    <span className="text-slate-400">• Level {u.level}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleGrantCoins(u.id!, u.name!)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1 shadow"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>+{bonusCoinsInput} কয়েন দিন</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFY TAB */}
      {activeTab === 'notify' && (
        <form onSubmit={handleBroadcast} className={`p-5 rounded-3xl border space-y-3 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'
        }`}>
          <h3 className="font-extrabold text-sm flex items-center gap-2">
            <Send className="w-4 h-4 text-purple-600" />
            <span>ব্রডকাস্ট পুশ নোটিফিকেশন পাঠান</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">নোটিফিকেশন টাইটেল</label>
            <input
              type="text"
              required
              placeholder="যেমনঃ ৫০ কয়েন উইকেন্ড বোনাস উপভোগ করুন!"
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">নোটিফিকেশন মেসেজ</label>
            <textarea
              required
              rows={3}
              placeholder="যেমনঃ এখনই লগইন করুন এবং কুইজ খেলে ডাবল পয়েন্ট আয় করুন।"
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
            <span>মেসেজ পাঠান (Broadcast Alert)</span>
          </button>
        </form>
      )}
    </div>
  );
};
