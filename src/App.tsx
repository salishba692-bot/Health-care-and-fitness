/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HealthDashboard } from './components/HealthDashboard';
import { KarachiHospitalsSection } from './components/KarachiHospitalsSection';
import { NutritionPlansSection } from './components/NutritionPlansSection';
import { DiseaseEncyclopediaSection } from './components/DiseaseEncyclopediaSection';
import { ArticlesSection } from './components/ArticlesSection';
import { FaqSection } from './components/FaqSection';
import { HealthAssessmentScanner } from './components/HealthAssessmentScanner';
import { TermsAndPrivacyPages } from './components/TermsAndPrivacyPages';
import { SitemapRobotView } from './components/SitemapRobotView';
import { EmergencyDirectoryModal } from './components/EmergencyDirectoryModal';
import { SkinCareRoutineSection } from './components/SkinCareRoutineSection';
import { FourLawsOfHappinessPage } from './components/FourLawsOfHappinessPage';
import { StressReleasePage } from './components/StressReleasePage';
import { FirstAidGuidePage } from './components/FirstAidGuidePage';
import { DiseaseDetailPage } from './components/DiseaseDetailPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { FitnessExercisesSection } from './components/FitnessExercisesSection';
import { AiMedicalConsultant } from './components/AiMedicalConsultant';
import { ClinicalToolsHub } from './components/ClinicalToolsHub';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Footer } from './components/Footer';

// Data imports
import { HOSPITALS_DATA } from './data/hospitalsData';
import { DISEASES_DATA } from './data/diseasesData';
import { NUTRITION_PLANS } from './data/nutritionPlansData';
import { ARTICLES_DATA } from './data/articlesData';
import { INITIAL_METRICS_DATA } from './data/fitnessMetricsData';
import { Hospital, Disease, NutritionPlan, Article, HealthMetricEntry, PakistanCity } from './types';
import {
  CITY_URDU,
  HOSPITAL_TYPE_URDU,
  SPECIALTY_URDU,
  DISEASE_CATEGORY_URDU,
  getTranslatedDisease,
} from './data/urduTranslations';

// Lucide Icons for overview section
import { 
  Activity, 
  MapPin, 
  Salad, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Heart,
  TrendingDown,
  Building2,
  BriefcaseMedical,
  PhoneCall
} from 'lucide-react';

function AppContent() {
  const { isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Data states
  const [hospitals, setHospitals] = useState<Hospital[]>(HOSPITALS_DATA);
  const [diseases, setDiseases] = useState<Disease[]>(DISEASES_DATA);
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>(NUTRITION_PLANS);
  const [articles, setArticles] = useState<Article[]>(ARTICLES_DATA);
  
  // Selected items for modal & pre-filter views
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [hospitalCityFilter, setHospitalCityFilter] = useState<string>('All');
  const [hospitalSpecialtyFilter, setHospitalSpecialtyFilter] = useState<string>('All');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<NutritionPlan | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Health Metrics State with LocalStorage
  const [metrics, setMetrics] = useState<HealthMetricEntry[]>(() => {
    try {
      const saved = localStorage.getItem('carehub_health_metrics');
      return saved ? JSON.parse(saved) : INITIAL_METRICS_DATA;
    } catch {
      return INITIAL_METRICS_DATA;
    }
  });

  // Persist metrics on changes
  useEffect(() => {
    try {
      localStorage.setItem('carehub_health_metrics', JSON.stringify(metrics));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }, [metrics]);

  // Try fetching API data if available (hospitals + persisted metrics)
  useEffect(() => {
    fetch('/api/hospitals')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setHospitals(data.data);
        }
      })
      .catch(() => {/* Use local fallback */});

    fetch('/api/metrics')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setMetrics(prev => (data.data.length >= prev.length ? data.data : prev));
        }
      })
      .catch(() => {/* Keep local metrics */});
  }, []);

  // Global Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync hash routing if user visits direct hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      if (hash.startsWith('diseases-')) {
        const diseaseId = hash.replace('diseases-', '');
        const found = diseases.find(d => d.id === diseaseId);
        if (found) {
          setSelectedDisease(found);
          setActiveTab('disease-detail');
        }
      } else if (hash.startsWith('articles-')) {
        const articleSlug = hash.replace('articles-', '');
        const found = articles.find(a => a.slug === articleSlug);
        if (found) {
          setSelectedArticle(found);
          setActiveTab('article-detail');
        }
      } else if (['dashboard', 'ai-consult', 'tools', 'hospitals', 'nutrition', 'exercises', 'diseases', 'articles', 'happiness', 'stress', 'first-aid', 'faq', 'terms', 'privacy', 'sitemap'].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, [diseases, articles]);

  const handleSelectDisease = (d: Disease | null) => {
    if (d) {
      setSelectedDisease(d);
      setActiveTab('disease-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedDisease(null);
      setActiveTab('diseases');
    }
  };

  const handleSelectArticle = (a: Article | null) => {
    if (a) {
      setSelectedArticle(a);
      setActiveTab('article-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedArticle(null);
      setActiveTab('articles');
    }
  };

  const handleAddMetric = (newEntry: Omit<HealthMetricEntry, 'id'>) => {
    const entryWithId: HealthMetricEntry = {
      ...newEntry,
      id: `m-${Date.now()}`
    };
    setMetrics(prev => [...prev, entryWithId]);

    // Async sync with Express API
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).catch(() => {/* Local persistence remains active */});
  };

  const handleNavigateToHospitalSpecialty = (specialty: string) => {
    setHospitalCityFilter('All');
    setHospitalSpecialtyFilter(specialty || 'All');
    setActiveTab('hospitals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCity = (city: PakistanCity) => {
    setHospitalSpecialtyFilter('All');
    setHospitalCityFilter(city);
    setActiveTab('hospitals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAiWithLabReport = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai-consult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1810] flex flex-col font-sans selection:bg-[#722F37] selection:text-white overflow-x-clip">
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />

      {/* Main Body Content based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-10 sm:space-y-14 lg:space-y-16 pb-10 sm:pb-14">
            
            {/* Hero Section */}
            <HeroSection
              onNavigateTab={setActiveTab}
              onOpenSearch={() => setSearchModalOpen(true)}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
              onOpenScanner={() => setScannerOpen(true)}
            />

            {/* Quick Live Health Tracker Snapshot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                        {isUrdu ? 'مریض ہیلتھ ڈیش بورڈ' : 'Your Health Tracker'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {isUrdu ? 'لائیو ریکارڈ' : 'Live Trends'}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#4A121A] mt-1">
                      {isUrdu ? 'روزانہ بائیو مارکرز اور صحت کا گراف' : 'Daily Health Numbers (BP, Sugar & Weight)'}
                    </h2>
                    <p className="text-xs text-[#78615A] mt-0.5">
                      {isUrdu
                        ? 'اپنے 30 دن کے بلڈ پریشر اور شوگر کے اتار چڑھاؤ کا جائزہ لیں۔'
                        : 'Track how your blood pressure, blood sugar, and weight are improving over 30 days.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                  >
                    <span>{isUrdu ? 'مکمل ڈیش بورڈ اور نیا اندراج' : 'Open Tracker & Add Reading'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Quick Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2]">
                    <div className="flex items-center justify-between text-xs text-[#78615A]">
                      <span>{isUrdu ? 'تازہ ترین بلڈ پریشر' : 'Latest Blood Pressure'}</span>
                      <span className="text-emerald-800 font-bold flex items-center">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -16 mmHg
                      </span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-[#4A121A] mt-1">
                      {metrics[metrics.length - 1]?.systolicBp || 122}/{metrics[metrics.length - 1]?.diastolicBp || 79} <span className="text-xs font-sans font-normal text-[#8C766F]">mmHg</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                      {isUrdu ? 'نارمل ریسٹنگ رینج' : 'Normal Resting Level'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2]">
                    <div className="flex items-center justify-between text-xs text-[#78615A]">
                      <span>{isUrdu ? 'فاسٹنگ بلڈ شوگر' : 'Fasting Blood Sugar'}</span>
                      <span className="text-emerald-800 font-bold flex items-center">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -19 mg/dL
                      </span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-[#4A121A] mt-1">
                      {metrics[metrics.length - 1]?.fastingGlucose || 95} <span className="text-xs font-sans font-normal text-[#8C766F]">mg/dL</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                      {isUrdu ? 'بہترین شوگر کنٹرول' : 'Healthy Fasting Level'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2]">
                    <div className="flex items-center justify-between text-xs text-[#78615A]">
                      <span>{isUrdu ? 'جسمانی وزن اور بی ایم آئی' : 'Body Weight & BMI'}</span>
                      <span className="text-emerald-800 font-bold flex items-center">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -3.6 kg
                      </span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-[#4A121A] mt-1">
                      {metrics[metrics.length - 1]?.weightKg || 77.6} <span className="text-xs font-sans font-normal text-[#8C766F]">kg</span>
                    </div>
                    <p className="text-[11px] text-[#78615A] font-semibold mt-1">
                      {isUrdu ? 'ایشیائی BMI 25.3 (ہدف: 22.9)' : 'Asian BMI 25.3 (Target: 22.9)'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* First Aid Guide Homepage Callout & Quick Link */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#FAF0E6] via-white to-[#F5EFEB] rounded-3xl p-6 sm:p-8 border border-[#DFCFC2] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#722F37] text-white text-xs font-bold uppercase tracking-wider">
                      <BriefcaseMedical className="w-3.5 h-3.5 text-amber-200" />
                      {isUrdu ? 'ہنگامی ابتدائی طبی امداد' : 'Emergency First Aid Guide'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                      {isUrdu ? '9 عام ایمرجنسی حالات' : '9 Common Emergencies'}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A]">
                    {isUrdu
                      ? 'فوری فرسٹ ایڈ گائیڈ — گھر اور باہر ہنگامی مدد'
                      : 'Step-by-Step First Aid Guide for 9 Common Emergencies'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5F4B44] leading-relaxed">
                    {isUrdu
                      ? 'جلنا، گلے میں چیز پھنسنا، شدید خون بہنا، ہڈی ٹوٹنا، لو لگنا، سانپ کا کاٹنا، کرنٹ لگنا، دل کا دورہ اور بے ہوشی کی صورت میں آسان اردو و انگریزی ہدایات، آواز میں سننے کی سہولت، سی پی آر ٹائمر اور ریسکیو 1122 مدد۔'
                      : 'Clear, easy-to-follow instructions for Burns, Choking, Severe Bleeding, Fractures, Heatstroke, Snake Bite, Electric Shock, Heart Attack, and Fainting — plus voice read-aloud, CPR beat helper, and Rescue 1122 support.'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(isUrdu
                      ? ['جلنا', 'گلا بند ہونا', 'شدید خون', 'ہڈی ٹوٹنا', 'لو لگنا', 'سانپ کا کاٹنا', 'کرنٹ لگنا', 'ہارٹ اٹیک', 'بے ہوشی']
                      : ['Burns', 'Choking', 'Severe Bleeding', 'Fractures', 'Heatstroke', 'Snake Bite', 'Electric Shock', 'Heart Attack', 'Fainting']
                    ).map((tag, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setActiveTab('first-aid');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF0E6] text-[#4A121A] hover:text-[#722F37] border border-[#E0D2C7] hover:border-[#722F37] text-[11px] font-semibold transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('first-aid');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer group"
                  >
                    <BriefcaseMedical className="w-4 h-4 text-amber-200" />
                    <span>{isUrdu ? 'مکمل فرسٹ ایڈ گائیڈ کھولیں' : 'Open First Aid Guide'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="tel:1122"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-700" />
                    <span>{isUrdu ? 'فوری مدد: 1122 ایمبولینس' : 'Emergency Helpline: Dial 1122'}</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Section B Interactive Hub: Lab Checker, WHO Calculators, Daily Meds/Water & Pakistan EPI */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ClinicalToolsHub onAskAiWithLabReport={handleAskAiWithLabReport} />
            </section>

            {/* Pakistan 7 Major Cities Hospitals Directory Highlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                      {isUrdu ? 'قومی ہیلتھ کیئر نیٹ ورک' : 'Pakistan Hospital Guide'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {isUrdu ? 'پاکستان کے 7 بڑے شہر' : '7 Major Cities of Pakistan'}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A] mt-1">
                    {isUrdu ? 'پاکستان بھر کے بہترین اور مستند ہسپتال' : 'Top Hospitals Across Pakistan'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E5A54] mt-1">
                    {isUrdu
                      ? 'کراچی، لاہور، اسلام آباد و راولپنڈی، فیصل آباد، پشاور، ملتان اور کوئٹہ کے بڑے ہسپتالوں کی مکمل تفصیل۔'
                      : 'Find trusted public, charity, and private hospitals in Karachi, Lahore, Islamabad & Rawalpindi, Faisalabad, Peshawar, Multan, and Quetta.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('hospitals')}
                  className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>{isUrdu ? 'پاکستان کے تمام 20+ ہسپتال دیکھیں' : 'Explore All 20+ Hospitals Across Pakistan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Featured Hospitals Across Different Cities */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {hospitals.filter((_, idx) => [0, 8, 12].includes(idx)).length > 0 ? (
                  hospitals.filter((_, idx) => [0, 8, 12].includes(idx)).map((h) => (
                    <div
                      key={h.id}
                      onClick={() => {
                        setSelectedHospital(h);
                        setActiveTab('hospitals');
                      }}
                      className="p-5 bg-white rounded-3xl border border-[#E0D2C7] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37]">
                            📍 {isUrdu ? CITY_URDU[h.city] || h.city : h.city} {h.zone ? `• ${h.zone.split('&')[0]}` : ''}
                          </span>
                          {h.emergencyAvailable && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                              {isUrdu ? '24/7 ایمرجنسی' : '24/7 ER'}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base font-bold text-[#4A121A] group-hover:text-[#722F37] line-clamp-1">
                          {h.name}
                        </h3>
                        <p className="text-xs text-[#78615A] line-clamp-2">{h.address}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {h.specialties.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[10px] bg-[#FAF7F2] text-[#5A453F] px-2 py-0.5 rounded-md border border-[#E8DDD2]">
                              {isUrdu ? SPECIALTY_URDU[s] || s : s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F0E6DD] flex items-center justify-between text-xs">
                        <span className="text-[#8C766F] font-medium">
                          {isUrdu ? HOSPITAL_TYPE_URDU[h.type] || h.type : h.type}
                        </span>
                        <span className="text-[#722F37] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          {isUrdu ? 'تفصیل دیکھیں →' : 'View Details →'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  hospitals.slice(0, 3).map((h) => (
                    <div
                      key={h.id}
                      onClick={() => {
                        setSelectedHospital(h);
                        setActiveTab('hospitals');
                      }}
                      className="p-5 bg-white rounded-3xl border border-[#E0D2C7] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37]">
                            📍 {isUrdu ? CITY_URDU[h.city] || h.city : h.city}
                          </span>
                          {h.emergencyAvailable && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                              {isUrdu ? '24/7 ایمرجنسی' : '24/7 ER'}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base font-bold text-[#4A121A] group-hover:text-[#722F37] line-clamp-1">
                          {h.name}
                        </h3>
                        <p className="text-xs text-[#78615A] line-clamp-2">{h.address}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Specialized Nutrition Section Teaser */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="bg-gradient-to-br from-[#FAF0E6] to-[#F5EFEB] rounded-3xl p-6 sm:p-8 border border-[#DFCFC2] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                      {isUrdu ? 'طبی غذائی پروٹوکول' : 'Healthy Eating Guides'}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#4A121A] mt-1">
                      {isUrdu ? 'ذیابیطس، ہائی بلڈ پریشر اور کولیسٹرول کے لیے ڈائٹ پلان' : 'Simple Diet Plans for Diabetes, High BP & Cholesterol'}
                    </h2>
                    <p className="text-xs text-[#78615A] mt-0.5">
                      {isUrdu
                        ? 'میدہ اور بناسپتی گھی کی جگہ فائبر سے بھرپور جو، دالوں اور صحت بخش چکنائی پر مبنی ہفتہ وار کھانے کا شیڈول۔'
                        : 'Easy weekly Pakistani meal plans swapping white flour and vanaspati ghee for whole grains, daal, and healthy cooking oils.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className="px-4 py-2 bg-[#722F37] text-white rounded-xl text-xs font-bold hover:bg-[#58111A] transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
                  >
                    {isUrdu ? 'ہفتہ وار ڈائٹ پلان دیکھیں' : 'View Weekly Meal Plans'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    onClick={() => { setSelectedPlan(nutritionPlans[0]); setActiveTab('nutrition'); }}
                    className="p-4 bg-white rounded-2xl border border-[#E0D2C7] hover:border-[#722F37] transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {isUrdu ? 'ٹائپ 2 ذیابیطس' : 'Type 2 Diabetes'}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#4A121A] mt-2">
                      {isUrdu ? 'شوگر کنٹرول ڈائٹ پلان' : 'Blood Sugar Control Diet'}
                    </h3>
                    <p className="text-[11px] text-[#78615A] mt-1 line-clamp-2">
                      {isUrdu
                        ? 'کم گلائسیمک جو کی روٹی، کھانے کی درست ترتیب اور حل پذیر فائبر سے شوگر متوازن رکھیں۔'
                        : 'Barley rotis, vegetables first, and natural fiber to prevent sudden sugar spikes.'}
                    </p>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlan(nutritionPlans[1]); setActiveTab('nutrition'); }}
                    className="p-4 bg-white rounded-2xl border border-[#E0D2C7] hover:border-[#722F37] transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      {isUrdu ? 'ہائی بلڈ پریشر' : 'High Blood Pressure'}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#4A121A] mt-2">
                      {isUrdu ? 'DASH قلبی و بلڈ پریشر پروٹوکول' : 'High BP Control Diet (DASH)'}
                    </h3>
                    <p className="text-[11px] text-[#78615A] mt-1 line-clamp-2">
                      {isUrdu
                        ? 'روزانہ نمک 1500mg سے کم رکھتے ہوئے چقندر اور پالک جیسے قدرتی نائٹریٹ سے بلڈ پریشر کم کریں۔'
                        : 'Keeps daily salt low while adding BP-friendly foods like spinach, banana, and beetroot.'}
                    </p>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlan(nutritionPlans[2]); setActiveTab('nutrition'); }}
                    className="p-4 bg-white rounded-2xl border border-[#E0D2C7] hover:border-[#722F37] transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {isUrdu ? 'کولیسٹرول صفائی' : 'Cholesterol Control'}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#4A121A] mt-2">
                      {isUrdu ? 'کولیسٹرول اور شریانوں کی حفاظت' : 'Cholesterol Lowering Diet'}
                    </h3>
                    <p className="text-[11px] text-[#78615A] mt-1 line-clamp-2">
                      {isUrdu
                        ? 'اسپغول، جو کے دلیے اور اومیگا 3 فیٹس کی مدد سے خراب LDL کولیسٹرول کم کریں۔'
                        : 'Natural fiber like ispaghol, oats, and healthy fats to help clear bad cholesterol.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Disease Encyclopedia Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                    {isUrdu ? 'طبی انسائیکلوپیڈیا' : 'Common Diseases Guide'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A] mt-1">
                    {isUrdu ? 'مشہور بیماریوں کی وجوہات، علامات اور علاج' : 'Causes, Symptoms & Treatment of Common Diseases'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E5A54] mt-1">
                    {isUrdu
                      ? 'پاکستان اور جنوبی ایشیا میں عام امراض کی طبی تعریف، قابلِ علاج کیفیت اور ہنگامی علامات جانیں۔'
                      : 'Read plain-language meanings, causes, treatments, and danger signs for common illnesses in Pakistan.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('diseases')}
                  className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>{isUrdu ? 'تمام 15+ بیماریاں دیکھیں ←' : 'Explore All 15+ Diseases →'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {diseases.slice(0, 4).map((rawDisease) => {
                  const d = getTranslatedDisease(rawDisease, isUrdu);
                  return (
                    <div
                      key={rawDisease.id}
                      onClick={() => handleSelectDisease(rawDisease)}
                      className="p-4 bg-white rounded-2xl border border-[#E0D2C7] hover:border-[#722F37] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37]">
                            {isUrdu
                              ? DISEASE_CATEGORY_URDU[rawDisease.category] || rawDisease.category.split('&')[0]
                              : rawDisease.category.split('&')[0]}
                          </span>
                          <span className={d.cure.isCurable ? 'text-emerald-800' : 'text-amber-800'}>
                            {isUrdu ? (d.cure.isCurable ? 'قابلِ علاج' : 'کنٹرول کے قابل') : (d.cure.isCurable ? 'Curable' : 'Reversible')}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-[#4A121A] mt-2 group-hover:text-[#722F37]">
                          {d.name}
                        </h3>
                        <p className="text-xs text-[#78615A] mt-1 line-clamp-2">
                          {d.definition}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#722F37] mt-3 pt-2 border-t border-[#F0E6DD] block">
                        {isUrdu ? 'مکمل طبی رہنمائی پڑھیں ←' : 'Read Full Medical Guide →'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Skin Care Routine Section (Dermatology & Climate Care) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SkinCareRoutineSection />
            </section>

            {/* Mental Wellbeing: Four Laws of Happiness & Stress Release */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                    {isUrdu ? 'نیورو سائنس اور ذہنی صحت' : 'Mental Health & Calm Mind'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A] mt-1">
                    {isUrdu ? 'ذہنی سکون، خوشی اور تناؤ پر قابو پانے کے طریقے' : 'Daily Happiness Tips & Stress Relief'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E5A54] mt-1">
                    {isUrdu
                      ? 'کلینیکل نیورو کیمیکل فریم ورک اور فوری پرسکون ہونے کی سائنسی مشقیں۔'
                      : 'Simple daily habits to lift your mood and easy exercises to calm stress fast.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Four Laws of Happiness Card */}
                <div 
                  onClick={() => { setActiveTab('happiness'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E0D2C7] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        {isUrdu ? 'نیورو کیمیکل فریم ورک' : '4 Happy Brain Habits'}
                      </span>
                      <span className="text-xs text-[#8C766F] font-semibold">
                        {isUrdu ? 'D.O.S.E. سائنس' : 'D.O.S.E. Guide'}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] group-hover:text-[#722F37] transition-colors">
                      {isUrdu ? 'خوشی کے چار اصول (Four Laws of Happiness)' : 'The Four Laws of Happiness'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed">
                      {isUrdu
                        ? 'جانیں کہ ڈوپامین، سیروٹونن، آکسیٹوسن اور اینڈورفنز کس طرح ہمارے حوصلے، اندرونی سکون اور ذہنی مضبوطی کو کنٹرول کرتے ہیں (روزانہ 15 منٹ کے عمل سمیت)۔'
                        : 'Learn how Dopamine, Serotonin, Oxytocin, and Endorphins shape your mood, calm, and energy — with a simple 15-minute daily habit checklist.'}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#F0E6DD] flex items-center justify-between text-xs font-bold text-[#722F37]">
                    <span>{isUrdu ? '4 اصول اور روزانہ عادات دیکھیں' : 'Explore the 4 Laws & Habits'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Stress Release Tricks & Tips Card */}
                <div 
                  onClick={() => { setActiveTab('stress'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E0D2C7] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-200">
                        {isUrdu ? 'ویگس نرو اور اعصابی سکون' : 'Instant Stress Relief'}
                      </span>
                      <span className="text-xs text-[#8C766F] font-semibold">
                        {isUrdu ? 'انٹرایکٹو سانس کی مشق' : 'Guided Breathing'}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] group-hover:text-[#722F37] transition-colors">
                      {isUrdu ? 'ذہنی تناؤ کم کرنے کی ترکیبیں اور سانس کی مشق' : 'Stress Release: Breathing & Calming Tips'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed">
                      {isUrdu
                        ? 'فزیولوجیکل سائی، ٹھنڈے پانی کا ریفلیکس، 5-4-3-2-1 گراؤنڈنگ اور کارٹیسول کم کرنے والی غذائیں جن سے 60 سیکنڈ میں ذہنی سکون ملے۔'
                        : 'Easy 60-second calming tricks like guided breathing, cold water face splash, 5-4-3-2-1 grounding, and sleep-friendly foods.'}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#F0E6DD] flex items-center justify-between text-xs font-bold text-[#722F37]">
                    <span>{isUrdu ? 'سانس کی مشق اور ترکیبیں شروع کریں' : 'Start Breathing Timer & Tips'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </section>

            {/* AI Medical Consultant Interactive Banner on Homepage */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#4A121A] via-[#722F37] to-[#8C3A44] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-300 text-[#4A121A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 fill-[#4A121A]" />
                      {isUrdu ? 'WHO مستند اے آئی طبی مشیر' : 'WHO-Aligned AI Health Helper'}
                    </span>
                    <span className="text-xs text-rose-200 font-medium hidden sm:inline">
                      {isUrdu ? 'جدید کلینیکل تشخیص' : 'Ask Follow-Up Questions'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FAF7F2]">
                    {isUrdu
                      ? 'کیا آپ کو بیماری کا صحیح علاج یا طبی مشورہ درکار ہے؟'
                      : 'Have a Health Question or Need Treatment Advice?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                    {isUrdu
                      ? 'ورلڈ ہیلتھ آرگنائزیشن (WHO) اور پاکستانی طبی معیارات کے مطابق علامات، وجوہات، مستند ادویات اور غذائی علاج کے بارے میں اردو یا انگریزی میں فوری مشورہ حاصل کریں۔'
                      : <>Ask our AI Medical Consultant about symptoms, causes, common medicines, and home diet tips based on <strong>World Health Organization (WHO)</strong> guidelines in English, Roman Urdu, or Urdu.</>}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200">
                    <span>✓ {isUrdu ? 'مستند طبی علاج' : 'Clear Treatment Guidance'}</span>
                    <span>•</span>
                    <span>✓ {isUrdu ? '7 شہروں کے ہسپتالوں کی رہنمائی' : 'Hospitals in 7 Pakistan Cities'}</span>
                    <span>•</span>
                    <span>✓ {isUrdu ? 'ایمرجنسی 1122 مدد' : 'Emergency 1122 Help'}</span>
                  </div>
                </div>

                <div className="shrink-0 relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('ai-consult');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-xl bg-white text-[#4A121A] hover:bg-amber-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#722F37]" />
                    <span>{isUrdu ? 'اے آئی میڈیکل کنسلٹنٹ کھولیں' : 'Open AI Medical Helper'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:1122"
                    className="px-6 py-3 rounded-xl bg-rose-900/60 hover:bg-rose-900 border border-rose-300/30 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{isUrdu ? 'قومی ایمرجنسی: 1122 پر کال کریں' : 'Emergency Helpline: Dial 1122'}</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Four Laws of Happiness Dedicated Callout (Directly Above FAQ) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#FAF0E6] rounded-3xl p-7 sm:p-10 border border-[#DFCFC2] shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isUrdu ? 'WHO ذہنی صحت فریم ورک • نیورو سائنس' : 'WHO Mental Health Guide • Easy Habits'}</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A121A]">
                  {isUrdu ? 'خوشی کے چار سنہری اصول (Four Laws of Happiness)' : 'The Four Laws of Happiness'}
                </h2>

                <p className="text-xs sm:text-sm text-[#5F4B44] leading-relaxed max-w-3xl">
                  {isUrdu
                    ? 'ورلڈ ہیلتھ آرگنائزیشن (WHO) کے مطابق صحت صرف بیماری کے نہ ہونے کا نام نہیں بلکہ مکمل جسمانی، ذہنی اور سماجی تندرستی ہے۔ خوشی کے چار اصول انسانی نیورو کیمسٹری (ڈوپامین، سیروٹونن، آکسیٹوسن اور اینڈورفنز) کو متوازن کر کے دائمی ذہنی تناؤ کو ختم کرنے اور زندگی میں حقیقی سکون پیدا کرنے کی سائنس بیان کرتے ہیں۔'
                    : 'According to the World Health Organization (WHO), true health means a strong body, a peaceful mind, and healthy relationships—not just the absence of illness. The Four Laws of Happiness explain in simple words how four natural body chemicals—Dopamine (motivation), Serotonin (inner calm), Oxytocin (love & trust), and Endorphins (natural energy & pain relief)—work together. Simple daily habits like morning sunlight, light exercise, small goals, and family time can naturally reduce stress and bring lasting happiness.'}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('happiness');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <span>{isUrdu ? 'خوشی کے 4 اصولوں کے بارے میں مزید پڑھیں' : 'Read More About the 4 Laws of Happiness'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* FAQ Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FaqSection />
            </section>

            {/* Health & Fitness Exercises (Directly Below FAQ) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FitnessExercisesSection />
            </section>
          </div>
        )}

        {/* Dedicated Disease Full Page */}
        {activeTab === 'disease-detail' && selectedDisease && (
          <DiseaseDetailPage
            disease={selectedDisease}
            onBack={() => {
              setActiveTab('diseases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToHospital={(h) => {
              setSelectedHospital(h);
              setActiveTab('hospitals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Dedicated Article Full Page */}
        {activeTab === 'article-detail' && selectedArticle && (
          <ArticleDetailPage
            article={selectedArticle}
            onBack={() => {
              setActiveTab('articles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={handleSelectArticle}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* The Four Laws of Happiness Dedicated Page */}
        {activeTab === 'happiness' && (
          <FourLawsOfHappinessPage
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Stress Release Dedicated Page */}
        {activeTab === 'stress' && (
          <StressReleasePage
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* First Aid Guide Dedicated Page */}
        {activeTab === 'first-aid' && (
          <FirstAidGuidePage
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(t) => {
              setActiveTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
          />
        )}

        {/* Health Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <HealthDashboard
            metrics={metrics}
            onAddMetric={handleAddMetric}
          />
        )}

        {/* AI Medical Consultant Tab */}
        {activeTab === 'ai-consult' && (
          <AiMedicalConsultant
            initialPrompt={aiInitialPrompt}
            onConsumeInitialPrompt={() => setAiInitialPrompt(undefined)}
            onNavigateToHospitals={() => {
              setHospitalCityFilter('All');
              setHospitalSpecialtyFilter('All');
              setActiveTab('hospitals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDiseases={() => {
              setActiveTab('diseases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToNutrition={() => {
              setActiveTab('nutrition');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Section B: Lab Report Checker, WHO Calculators, Daily Meds & EPI Vaccination Tab */}
        {activeTab === 'tools' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ClinicalToolsHub onAskAiWithLabReport={handleAskAiWithLabReport} />
          </div>
        )}

        {/* WHO Health & Fitness Exercises Tab */}
        {activeTab === 'exercises' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FitnessExercisesSection />
          </div>
        )}

        {/* Pakistan 7 Major Cities Hospitals Tab */}
        {activeTab === 'hospitals' && (
          <KarachiHospitalsSection
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            onSelectHospital={setSelectedHospital}
            onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
            initialCity={hospitalCityFilter}
            initialSpecialty={hospitalSpecialtyFilter}
          />
        )}

        {/* Nutrition & Diets Tab */}
        {activeTab === 'nutrition' && (
          <NutritionPlansSection
            plans={nutritionPlans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />
        )}

        {/* Disease Encyclopedia Tab */}
        {activeTab === 'diseases' && (
          <DiseaseEncyclopediaSection
            diseases={diseases}
            selectedDisease={selectedDisease}
            onSelectDisease={handleSelectDisease}
            onNavigateToHospitalWithSpecialty={handleNavigateToHospitalSpecialty}
          />
        )}

        {/* Clinical Articles Tab */}
        {activeTab === 'articles' && (
          <ArticlesSection
            articles={articles}
            selectedArticle={selectedArticle}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && <FaqSection />}

        {/* Terms of Service Tab */}
        {activeTab === 'terms' && (
          <TermsAndPrivacyPages type="terms" onBack={() => setActiveTab('home')} />
        )}

        {/* Privacy Policy Tab */}
        {activeTab === 'privacy' && (
          <TermsAndPrivacyPages type="privacy" onBack={() => setActiveTab('home')} />
        )}

        {/* Sitemap & Robots.txt Tab */}
        {activeTab === 'sitemap' && (
          <SitemapRobotView onBack={() => setActiveTab('home')} />
        )}
      </main>

      {/* Global Interactive Modals */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectHospital={(h) => {
          setSelectedHospital(h);
          setActiveTab('hospitals');
        }}
        onSelectDisease={(d) => {
          handleSelectDisease(d);
        }}
        onSelectNutritionPlan={(p) => {
          setSelectedPlan(p);
          setActiveTab('nutrition');
        }}
        onSelectArticle={(a) => {
          handleSelectArticle(a);
        }}
        onNavigateTab={(t) => setActiveTab(t)}
      />

      <HealthAssessmentScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onNavigateTab={setActiveTab}
        onNavigateToCity={handleNavigateToCity}
      />

      <EmergencyDirectoryModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onNavigateToCity={handleNavigateToCity}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
