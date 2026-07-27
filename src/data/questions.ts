import { QuizQuestion } from '../types';

export const initialQuestions: QuizQuestion[] = [
  // BANGLADESH
  {
    id: 'bd_1',
    categoryId: 'bangladesh',
    type: 'mcq',
    question: 'What is the official currency of Bangladesh?',
    questionBn: 'বাংলাদেশের সরকারি মুদ্রার নাম কী?',
    options: ['Taka (BDT)', 'Rupee', 'Rupiah', 'Dinar'],
    optionsBn: ['টাকা (BDT)', 'রুপি', 'রুপিয়া', 'দিনার'],
    correctOptionIndex: 0,
    explanation: 'The official currency of Bangladesh is the Bangladeshi Taka (BDT), represented by symbol ৳.',
    explanationBn: 'বাংলাদেশের সরকারি মুদ্রা হলো টাকা (BDT), যার প্রতীক ৳।',
    difficulty: 'easy'
  },
  {
    id: 'bd_2',
    categoryId: 'bangladesh',
    type: 'mcq',
    question: 'When did Bangladesh achieve independence?',
    questionBn: 'বাংলাদেশ কোন সালে স্বাধীনতা অর্জন করে?',
    options: ['1971', '1952', '1947', '1990'],
    optionsBn: ['১৯৭১', '১৯৫২', '১৯৪৭', '১৯৯০'],
    correctOptionIndex: 0,
    explanation: 'Bangladesh achieved independence in 1971 following the 9-month Liberation War ending on December 16.',
    explanationBn: '৯ মাসের মহান মুক্তিযুদ্ধের পর ১৬ই ডিসেম্বর ১৯৭১ সালে বাংলাদেশ চূড়ান্ত বিজয় ও স্বাধীনতা অর্জন করে।',
    difficulty: 'easy'
  },
  {
    id: 'bd_3',
    categoryId: 'bangladesh',
    type: 'true_false',
    question: 'The National Martyr’s Monument (Jatiyo Sriti Soudho) is located at Savar.',
    questionBn: 'জাতীয় স্মৃতিসৌধ সাভারে অবস্থিত।',
    options: ['True', 'False'],
    optionsBn: ['সত্য', 'মিথ্যা'],
    correctOptionIndex: 0,
    explanation: 'The National Martyr’s Monument was designed by Syed Mainul Hossain and is situated in Savar, Dhaka.',
    explanationBn: 'সৈয়দ মাইনুল হোসেনের নকশাকৃত জাতীয় স্মৃতিসৌধটি ঢাকা জেলার সাভারে অবস্থিত।',
    difficulty: 'easy'
  },
  {
    id: 'bd_4',
    categoryId: 'bangladesh',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&auto=format&fit=crop&q=80',
    question: 'Identify this iconic UNESCO World Heritage mangrove forest located in Bangladesh.',
    questionBn: 'ইউনেস্কো ঘোষিত বাংলাদেশের এই ম্যানগ্রোভ বনটির নাম কী?',
    options: ['Sundarbans', 'Ratargul', 'Lawachara', 'Bhawal Forest'],
    optionsBn: ['সুন্দরবন', 'রাতারগুল', 'লাওয়াছড়া', 'ভাওয়াল গড়'],
    correctOptionIndex: 0,
    explanation: 'The Sundarbans is the largest mangrove forest in the world and home to the Royal Bengal Tiger.',
    explanationBn: 'সুন্দরবন বিশ্বের একক বৃহত্তম ম্যানগ্রোভ বন যা রয়্যাল বেঙ্গল টাইগারের আবাসস্থল।',
    difficulty: 'medium'
  },

  // GENERAL KNOWLEDGE
  {
    id: 'gk_1',
    categoryId: 'gen_knowledge',
    type: 'mcq',
    question: 'Which is the largest ocean in the world?',
    questionBn: 'বিশ্বের সবচেয়ে বড় মহাসাগর কোনটি?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    optionsBn: ['প্রশান্ত মহাসাগর', 'আটলান্টিক মহাসাগর', 'ভারত মহাসাগর', 'উত্তর মহাসাগর'],
    correctOptionIndex: 0,
    explanation: 'The Pacific Ocean covers over 30% of the Earth’s surface, making it the largest ocean.',
    explanationBn: 'প্রশান্ত মহাসাগর পৃথিবীর পৃষ্ঠের ৩০%-এর বেশি এলাকা জুড়ে অবস্থিত, যা বৃহত্তম মহাসাগর।',
    difficulty: 'easy'
  },
  {
    id: 'gk_2',
    categoryId: 'gen_knowledge',
    type: 'mcq',
    question: 'How many colors are in a standard rainbow?',
    questionBn: 'প্রাকৃতিক রামধনুতে কয়টি রঙ থাকে?',
    options: ['7', '5', '6', '8'],
    optionsBn: ['৭টি', '৫টি', '৬টি', '৮টি'],
    correctOptionIndex: 0,
    explanation: 'The 7 colors of the rainbow are Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV).',
    explanationBn: 'রামধনুর ৭টি রঙ হলো বেগুনি, নীল, আসমানী, সবুজ, হলুদ, কমলা ও লাল (বে licencী)।',
    difficulty: 'easy'
  },

  // SCIENCE
  {
    id: 'sci_1',
    categoryId: 'science',
    type: 'mcq',
    question: 'What element does "O" represent on the periodic table?',
    questionBn: 'পর্যায় সারণিতে "O" কোন মৌলকে নির্দেশ করে?',
    options: ['Oxygen', 'Gold', 'Osmium', 'Ozone'],
    optionsBn: ['অক্সিজেন', 'স্বর্ণ', 'অসমিয়াম', 'ওজোন'],
    correctOptionIndex: 0,
    explanation: 'The chemical symbol "O" stands for Oxygen, atomic number 8.',
    explanationBn: 'রাসায়নিক প্রতীক "O" দ্বারা অক্সিজেন (পারমাণবিক সংখ্যা ৮) বোঝানো হয়।',
    difficulty: 'easy'
  },
  {
    id: 'sci_2',
    categoryId: 'science',
    type: 'true_false',
    question: 'Light travels faster than sound.',
    questionBn: 'আলো শব্দের চেয়ে দ্রুত ভ্রমণ করে।',
    options: ['True', 'False'],
    optionsBn: ['সত্য', 'মিথ্যা'],
    correctOptionIndex: 0,
    explanation: 'Light travels at roughly 300,000 km/s in vacuum, whereas sound travels at around 343 m/s in air.',
    explanationBn: 'আলোর গতি প্রতি সেকেন্ডে প্রায় ৩ লক্ষ কিলোমিটার, যেখানে শব্দের গতি বাতাসে মাত্র ৩৪৩ মিটার/সেকেন্ড।',
    difficulty: 'easy'
  },

  // MATH
  {
    id: 'math_1',
    categoryId: 'math',
    type: 'mcq',
    question: 'What is the square root of 144?',
    questionBn: '১৪৪ এর বর্গমূল কত?',
    options: ['12', '14', '10', '16'],
    optionsBn: ['১২', '১৪', '১০', '১৬'],
    correctOptionIndex: 0,
    explanation: '12 multiplied by 12 equals 144.',
    explanationBn: '১২ গুণ ১২ সমান ১৪৪, তাই ১৪৪ এর বর্গমূল ১২।',
    difficulty: 'easy'
  },
  {
    id: 'math_2',
    categoryId: 'math',
    type: 'mcq',
    question: 'If a triangle has angles of 60° and 70°, what is the third angle?',
    questionBn: 'একটি ত্রিভুজের দুটি কোণ ৬০° ও ৭০° হলে, তৃতীয় কোণটি কত?',
    options: ['50°', '60°', '40°', '90°'],
    optionsBn: ['৫০°', '৬০°', '৪০°', '৯০°'],
    correctOptionIndex: 0,
    explanation: 'The sum of angles in a triangle is 180°. 180 - (60 + 70) = 50°.',
    explanationBn: 'ত্রিভুজের ৩টি কোণের সমষ্টি ১৮০°। ১৮০ - (৬০ + ৭০) = ৫০°।',
    difficulty: 'medium'
  },

  // PROGRAMMING & COMPUTER
  {
    id: 'prog_1',
    categoryId: 'programming',
    type: 'mcq',
    question: 'Which programming language is known as the language of the web?',
    questionBn: 'ওয়েবের প্রধান প্রোগ্রামিং ভাষা হিসেবে কোনটি পরিচিত?',
    options: ['JavaScript', 'Python', 'C++', 'Java'],
    optionsBn: ['জাভাস্ক্রিপ্ট', 'পাইথন', 'সি++', 'জাভা'],
    correctOptionIndex: 0,
    explanation: 'JavaScript runs in browsers and powers dynamic web applications.',
    explanationBn: 'জাভাস্ক্রিপ্ট ব্রাউজারে চালিত হয় এবং ওয়েবসাইটের ইন্টারঅ্যাকটিভিটি পরিচালনা করে।',
    difficulty: 'easy'
  },
  {
    id: 'comp_1',
    categoryId: 'computer',
    type: 'mcq',
    question: 'What does RAM stand for in computing?',
    questionBn: 'কম্পিউটারে RAM এর পূর্ণরূপ কী?',
    options: ['Random Access Memory', 'Read Access Memory', 'Rapid Action Module', 'Run Active Mode'],
    optionsBn: ['Random Access Memory', 'Read Access Memory', 'Rapid Action Module', 'Run Active Mode'],
    correctOptionIndex: 0,
    explanation: 'RAM stands for Random Access Memory, the volatile high-speed workspace of a CPU.',
    explanationBn: 'RAM এর পূর্ণরূপ হলো Random Access Memory, যা প্রসেসরের কাজের জন্য অস্থায়ী দ্রুতগতির মেমোরি।',
    difficulty: 'easy'
  },

  // BCS & JOB PREPARATION
  {
    id: 'bcs_1',
    categoryId: 'bcs',
    type: 'mcq',
    question: 'Who wrote the national anthem of Bangladesh "Amar Sonar Bangla"?',
    questionBn: 'বাংলাদেশের জাতীয় সংগীত "আমার সোনার বাংলা"-র রচয়িতা কে?',
    options: ['Rabindranath Tagore', 'Kazi Nazrul Islam', 'Jibanananda Das', 'Sukanta Bhattacharya'],
    optionsBn: ['রবীন্দ্রনাথ ঠাকুর', 'কাজী নজরুল ইসলাম', 'জীবনানন্দ দাশ', 'সুকান্ত ভট্টাচার্য'],
    correctOptionIndex: 0,
    explanation: 'Rabindranath Tagore composed "Amar Sonar Bangla" in 1905 during the Partition of Bengal.',
    explanationBn: 'বিশ্বকবি রবীন্দ্রনাথ ঠাকুর ১৯০৫ সালে বঙ্গভঙ্গ রদ আন্দোলনের সময় এই কালজয়ী গানটি রচনা করেন।',
    difficulty: 'easy'
  },
  {
    id: 'bcs_2',
    categoryId: 'bcs',
    type: 'mcq',
    question: 'Which sector contributes the highest to Bangladesh’s export earnings?',
    questionBn: 'বাংলাদেশের রপ্তানি আয়ে সবচেয়ে বড় অবদান রাখে কোন খাত?',
    options: ['Readymade Garments (RMG)', 'Jute Products', 'Pharmaceuticals', 'Frozen Fish'],
    optionsBn: ['তৈরি পোশাক শিল্প (RMG)', 'পাটজাত পণ্য', 'ওষুধ শিল্প', 'হিমায়িত মাছ'],
    correctOptionIndex: 0,
    explanation: 'Readymade Garments (RMG) accounts for over 80% of Bangladesh’s annual export earnings.',
    explanationBn: 'বাংলাদেশের মোট রপ্তানি আয়ের ৮০ শতাংশের বেশি আসে তৈরি পোশাক (RMG) খাত থেকে।',
    difficulty: 'easy'
  },

  // ISLAMIC
  {
    id: 'is_1',
    categoryId: 'islamic',
    type: 'mcq',
    question: 'How many Surahs are there in the Holy Quran?',
    questionBn: 'পবিত্র কুরআনে মোট কতটি সূরা রয়েছে?',
    options: ['114', '110', '120', '100'],
    optionsBn: ['১১৪টি', '১১০টি', '১২০টি', '১০০টি'],
    correctOptionIndex: 0,
    explanation: 'The Holy Quran contains 114 Surahs, divided into 30 Juz (Paras).',
    explanationBn: 'পবিত্র আল-কুরআনে মোট ১১৪টি সূরা রয়েছে, যা ৩০টি পারায় বিভক্ত।',
    difficulty: 'easy'
  },

  // SPORTS
  {
    id: 'sp_1',
    categoryId: 'sports',
    type: 'mcq',
    question: 'In which year did Bangladesh play its first official Test Cricket match?',
    questionBn: 'বাংলাদেশ কত সালে প্রথম অফিসিয়াল টেস্ট ক্রিকেট ম্যাচ খেলে?',
    options: ['2000', '1997', '1999', '2003'],
    optionsBn: ['২০০০ সালে', '১৯৯৭ সালে', '১৯৯৯ সালে', '২০০৩ সালে'],
    correctOptionIndex: 0,
    explanation: 'Bangladesh played its inaugural Test match against India in November 2000 at Bangabandhu National Stadium.',
    explanationBn: 'নভেম্বর ২০০০ সালে ভারতের বিরুদ্ধে বঙ্গবন্ধু জাতীয় স্টেডিয়ামে বাংলাদেশ তাদের প্রথম ঐতিহাসিক টেস্ট ম্যাচ খেলে।',
    difficulty: 'medium'
  }
];
