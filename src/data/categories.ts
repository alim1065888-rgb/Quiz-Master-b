import { QuizCategory } from '../types';

export const initialCategories: QuizCategory[] = [
  {
    id: 'gen_knowledge',
    name: 'General Knowledge',
    nameBn: 'সাধারণ জ্ঞান',
    iconName: 'Globe',
    color: 'from-blue-500 to-indigo-600',
    questionCount: 45,
    description: 'Test your awareness of national & world affairs',
    descriptionBn: 'দেশ ও বিদেশের সাধারণ জ্ঞান যাচাই করুন'
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    nameBn: 'বাংলাদেশ',
    iconName: 'Flag',
    color: 'from-emerald-600 to-green-700',
    questionCount: 50,
    description: 'History, geography, culture & affairs of Bangladesh',
    descriptionBn: 'বাংলাদেশের ইতিহাস, ভূগোল, সংস্কৃতি ও বিষয়াবলী'
  },
  {
    id: 'world',
    name: 'World History',
    nameBn: 'বিশ্ব ইতিহাস',
    iconName: 'Compass',
    color: 'from-purple-500 to-pink-600',
    questionCount: 30,
    description: 'International landmarks, history & events',
    descriptionBn: 'আন্তর্জাতিক মানচিত্র, ইতিহাস ও ঘটনাবলী'
  },
  {
    id: 'science',
    name: 'Science',
    nameBn: 'বিজ্ঞান',
    iconName: 'Atom',
    color: 'from-cyan-500 to-blue-600',
    questionCount: 35,
    description: 'Physics, Chemistry, Biology & Natural Wonders',
    descriptionBn: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও প্রকৃতি'
  },
  {
    id: 'math',
    name: 'Math & Logic',
    nameBn: 'গণিত ও যুক্তি',
    iconName: 'Calculator',
    color: 'from-amber-500 to-orange-600',
    questionCount: 40,
    description: 'Arithmetic, Algebra, Geometry & Puzzles',
    descriptionBn: 'পাটিগণিত, বীজগণিত, জ্যামিতি ও গণিত ধাঁধা'
  },
  {
    id: 'english',
    name: 'English Grammar',
    nameBn: 'ইংরেজি ব্যাকরণ',
    iconName: 'BookOpen',
    color: 'from-rose-500 to-red-600',
    questionCount: 38,
    description: 'Vocabulary, Idioms, Grammar & Literature',
    descriptionBn: 'শব্দ ভাণ্ডার, ব্যাকরণ ও সাহিত্য'
  },
  {
    id: 'computer',
    name: 'Computer & IT',
    nameBn: 'কম্পিউটার ও আইটি',
    iconName: 'Monitor',
    color: 'from-teal-500 to-emerald-600',
    questionCount: 32,
    description: 'Computer Hardware, Software & Internet',
    descriptionBn: 'কম্পিউটার হার্ডওয়্যার, সফটওয়্যার ও ইন্টারনেট'
  },
  {
    id: 'programming',
    name: 'Programming',
    nameBn: 'প্রোগ্রামিং',
    iconName: 'Code',
    color: 'from-violet-600 to-purple-800',
    questionCount: 25,
    description: 'Python, JavaScript, HTML, C++ & Algorithms',
    descriptionBn: 'পাইথন, জাভাস্ক্রিপ্ট, সি++ ও অ্যালগরিদম'
  },
  {
    id: 'history',
    name: 'History',
    nameBn: 'ইতিহাস',
    iconName: 'Landmark',
    color: 'from-amber-700 to-yellow-800',
    questionCount: 30,
    description: 'Ancient empires, Liberation War & modern eras',
    descriptionBn: 'প্রাচীন রাজবংশ, মুক্তিযুদ্ধ ও বিশ্ব ইতিহাস'
  },
  {
    id: 'geography',
    name: 'Geography',
    nameBn: 'ভূগোল',
    iconName: 'Map',
    color: 'from-emerald-500 to-teal-700',
    questionCount: 28,
    description: 'Continents, Oceans, Mountains & Countries',
    descriptionBn: 'মহাদেশ, মহাসাগর, পর্বতমালা ও দেশসমূহ'
  },
  {
    id: 'sports',
    name: 'Sports',
    nameBn: 'খেলাধুলা',
    iconName: 'Trophy',
    color: 'from-yellow-500 to-amber-600',
    questionCount: 35,
    description: 'Cricket, Football, Olympics & World Cups',
    descriptionBn: 'ক্রিকেট, ফুটবল, অলিম্পিক ও বিশ্বকাপ'
  },
  {
    id: 'islamic',
    name: 'Islamic Knowledge',
    nameBn: 'ইসলামিক জ্ঞান',
    iconName: 'Moon',
    color: 'from-emerald-700 to-green-900',
    questionCount: 40,
    description: 'Quran, Hadith, Prophets & Islamic History',
    descriptionBn: 'কুরআন, হাদিস, নবীগণের জীবনী ও ইতিহাস'
  },
  {
    id: 'iq_test',
    name: 'IQ Test & Puzzles',
    nameBn: 'আইকিউ টেস্ট',
    iconName: 'Brain',
    color: 'from-fuchsia-500 to-purple-600',
    questionCount: 30,
    description: 'Logical reasoning, visual brain teasers & riddles',
    descriptionBn: 'যৌক্তিক মানসিক দক্ষতা ও বুদ্ধির পরীক্ষা'
  },
  {
    id: 'current_affairs',
    name: 'Current Affairs',
    nameBn: 'সাম্প্রতিক বিষয়াবলী',
    iconName: 'Newspaper',
    color: 'from-sky-500 to-blue-700',
    questionCount: 42,
    description: 'Latest national & global news updates 2026',
    descriptionBn: 'সাম্প্রতিক জাতীয় ও আন্তর্জাতিক খবরাখবর'
  },
  {
    id: 'job_prep',
    name: 'Job Preparation',
    nameBn: 'চাকরির প্রস্তুতি',
    iconName: 'Briefcase',
    color: 'from-indigo-600 to-purple-700',
    questionCount: 60,
    description: 'Govt, Non-Govt & Corporate job exam questions',
    descriptionBn: 'সরকারি ও বেসরকারি চাকরির পরীক্ষার প্রশ্নাবলি'
  },
  {
    id: 'bcs',
    name: 'BCS Exam Special',
    nameBn: 'বিসিএস বিশেষ কুইজ',
    iconName: 'GraduationCap',
    color: 'from-rose-600 to-pink-700',
    questionCount: 75,
    description: 'Preliminary syllabus: Bangla, English, Math, Science',
    descriptionBn: 'বিসিএস প্রিলিমিনারি প্রস্তুতির মডেল টেস্ট'
  },
  {
    id: 'bank_job',
    name: 'Bank Job',
    nameBn: 'ব্যাংক জব',
    iconName: 'Building2',
    color: 'from-blue-600 to-slate-800',
    questionCount: 45,
    description: 'Banking awareness, analytical math & English',
    descriptionBn: 'ব্যাংক নিয়োগ পরীক্ষা ও অর্থনীতি'
  },
  {
    id: 'medical',
    name: 'Medical Admission',
    nameBn: 'মেডিকেল ভর্তি পরীক্ষা',
    iconName: 'Stethoscope',
    color: 'from-red-500 to-rose-600',
    questionCount: 40,
    description: 'Biology, Chemistry, Physics for MBBS aspirants',
    descriptionBn: 'জীববিজ্ঞান, রসায়ন ও পদার্থবিদ্যা'
  },
  {
    id: 'engineering',
    name: 'Engineering (BUET/RUET)',
    nameBn: 'ইঞ্জিনিয়ারিং ভর্তি',
    iconName: 'Cpu',
    color: 'from-cyan-600 to-teal-800',
    questionCount: 35,
    description: 'Higher Math, Physics & Chemistry problems',
    descriptionBn: 'উচ্চতর গণিত, পদার্থ ও রসায়ন প্রশ্ন'
  },
  {
    id: 'university_adm',
    name: 'University Admission (DU/RU)',
    nameBn: 'বিশ্ববিদ্যালয় ভর্তি (ঢাবি)',
    iconName: 'School',
    color: 'from-amber-600 to-orange-700',
    questionCount: 50,
    description: 'DU A, B, C Unit question patterns & mock test',
    descriptionBn: 'ঢাকা বিশ্ববিদ্যালয় ও অন্যান্য বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষা'
  }
];
