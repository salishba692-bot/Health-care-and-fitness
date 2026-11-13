import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Activity, 
  Salad, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  FlaskConical
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigateTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenEmergencyModal: () => void;
  onOpenScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateTab,
  onOpenSearch,
  onOpenEmergencyModal,
  onOpenScanner
}) => {
  const { isUrdu } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DDD2]">
      {/* Decorative Warm Cream & Maroon Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#722F37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Clinical Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#DFCFC2] text-[#722F37] text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {isUrdu
              ? 'کیئر ہب پاکستان • ڈبلیو ایچ او (WHO) معیار کے مطابق • 7 بڑے شہروں کا ہیلتھ نیٹ ورک'
              : 'CareHub Pakistan · WHO Health Guidelines · 7 Major Cities'}
          </span>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4A121A] tracking-tight leading-[1.15]">
              {isUrdu ? (
                <>
                  پورے <span className="text-[#892A3A] italic">پاکستان</span> کے لیے آپ کا قابلِ اعتماد ہیلتھ ہب
                </>
              ) : (
                <>
                  Your Everyday Health Guide for <span className="text-[#892A3A] italic">Pakistan</span>.
                </>
              )}
            </h1>
            
            <p className="text-base sm:text-xl text-[#5F4B44] leading-relaxed max-w-2xl font-normal">
              {isUrdu ? (
                <>
                  <strong className="text-[#4A121A]">WHO معیارات</strong> کے مطابق بلڈ پریشر اور شوگر ٹریک کریں، <strong className="text-[#722F37]">AI میڈیکل کنسلٹنٹ</strong> سے علاج جانیں، لیب رپورٹس چیک کریں، اور <strong className="text-[#4A121A]">پاکستان کے 7 بڑے شہروں</strong> کے بہترین ہسپتال تلاش کریں۔
                </>
              ) : (
                <>
                  Check your daily BP and sugar with <strong className="text-[#4A121A]">WHO guidelines</strong>, understand your lab reports, follow easy diet plans for <span className="font-semibold text-[#4A121A]">Diabetes, BP & Cholesterol</span>, ask our <strong className="text-[#722F37]">AI Medical Consultant</strong>, and find trusted hospitals in <span className="font-semibold text-[#4A121A]">7 major cities of Pakistan</span>.
                </>
              )}
            </p>

            {/* Quick Interactive Search Bar Trigger */}
            <div className="pt-2">
              <div 
                onClick={onOpenSearch}
                className="max-w-xl bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-[#D9C4B5] hover:border-[#722F37] shadow-md transition-all flex items-center justify-between gap-2 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 text-[#78615A] flex-1 min-w-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#722F37] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs sm:text-base text-[#8C766F] font-normal truncate">
                    {isUrdu
                      ? 'ہسپتال (AKUH, Shaukat Khanum, PIMS)، بیماریاں یا ڈائٹ تلاش کریں...'
                      : 'Search hospitals (AKUH, Shaukat Khanum, PIMS), diseases, or diet plans...'}
                  </span>
                </div>
                <button className="bg-[#722F37] hover:bg-[#58111A] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <span>{isUrdu ? 'تلاش' : 'Search'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Popular quick query tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#78615A]">
                <span className="font-medium text-[#4A121A]">{isUrdu ? 'اہم فیچرز:' : 'Quick Links:'}</span>
                <button onClick={() => onNavigateTab('first-aid')} className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-900 font-semibold border border-rose-300 hover:bg-rose-200 cursor-pointer">
                  {isUrdu ? 'ابتدائی طبی امداد (First Aid)' : 'First Aid Guide'}
                </button>
                <button onClick={() => onNavigateTab('ai-consult')} className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-semibold border border-amber-300 cursor-pointer">
                  {isUrdu ? 'AI طبی مشیر' : 'Ask AI Doctor'}
                </button>
                <button onClick={() => onNavigateTab('tools')} className="px-2.5 py-1 rounded-md bg-[#FAF0E6] hover:bg-[#EDE0D2] border border-[#DFCFC2] cursor-pointer">
                  {isUrdu ? 'لیب رپورٹ چیکر' : 'Lab Report Checker'}
                </button>
                <button onClick={() => onNavigateTab('exercises')} className="px-2.5 py-1 rounded-md bg-[#FAF0E6] hover:bg-[#EDE0D2] border border-[#DFCFC2] cursor-pointer">
                  {isUrdu ? 'WHO ورزشیں' : 'Daily Exercises'}
                </button>
                <button onClick={() => onNavigateTab('happiness')} className="px-2.5 py-1 rounded-md bg-[#FAF0E6] hover:bg-[#EDE0D2] border border-[#DFCFC2] cursor-pointer">
                  {isUrdu ? 'خوشی کے 4 اصول' : '4 Laws of Happiness'}
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('ai-consult')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] font-semibold text-xs sm:text-sm shadow-md shadow-[#722F37]/25 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{isUrdu ? 'AI میڈیکل کنسلٹنٹ (WHO)' : 'Ask AI Medical Consultant'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('hospitals')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white text-[#58111A] border-2 border-[#D9C4B5] hover:border-[#722F37] hover:bg-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>{isUrdu ? 'پاکستان 7 شہروں کے ہسپتال' : 'Find Hospitals (7 Cities)'}</span>
              </button>

              <button
                onClick={onOpenScanner}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 sm:py-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 hover:bg-amber-100 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Activity className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>{isUrdu ? 'صحت اسیسمنٹ اسکین' : 'Quick Health Check'}</span>
              </button>
            </div>

            {/* Quick Guarantees / Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-[#E8DDD2]">
              <div className="flex items-center space-x-2 text-xs text-[#5F4B44]">
                <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>{isUrdu ? 'پاکستان کے 7 بڑے شہر شامل' : '7 Major Pakistani Cities'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#5F4B44]">
                <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>{isUrdu ? 'ڈبلیو ایچ او (WHO) معیاری علاج' : 'Follows WHO Guidelines'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#5F4B44]">
                <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>{isUrdu ? 'مفت اور محفوظ ہیلتھ ڈیٹا' : 'Free & Private Health Tools'}</span>
              </div>
            </div>
          </div>

          {/* Right Feature Showcase Card / Interactive Hub */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#722F37]/30 to-amber-600/20 rounded-3xl blur-md opacity-60"></div>
              
              <div className="relative bg-white rounded-3xl p-5 sm:p-7 border border-[#E0D2C7] shadow-xl space-y-5">
                <div className="flex items-center justify-between gap-2 border-b border-[#F0E6DD] pb-4">
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                      {isUrdu ? 'لائیو ہیلتھ ہب' : 'Quick Health Tools'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A121A]">
                      {isUrdu ? 'پاکستان ٹرائیاج اور لیب ٹولز' : 'Checkups, Hospitals & Care'}
                    </h3>
                  </div>
                  <span className="flex h-3 w-3 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                {/* 4 Interactive Quick Features */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div 
                    onClick={() => onNavigateTab('tools')}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#722F37]/10 flex items-center justify-center text-[#722F37] mb-2 group-hover:scale-110 transition-transform">
                      <FlaskConical className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#4A121A]">{isUrdu ? 'لیب رپورٹ چیکر' : 'Lab Report Checker'}</h4>
                    <p className="text-[11px] text-[#78615A] mt-0.5">{isUrdu ? 'CBC، شوگر، کولیسٹرول' : 'CBC, HbA1c, Lipids'}</p>
                  </div>

                  <div 
                    onClick={() => onNavigateTab('hospitals')}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-800 mb-2 group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#4A121A]">{isUrdu ? '7 شہروں کے ہسپتال' : '7-City Hospitals'}</h4>
                    <p className="text-[11px] text-[#78615A] mt-0.5">{isUrdu ? '24/7 ایمرجنسی ونگز' : 'Pakistan 24/7 ER'}</p>
                  </div>

                  <div 
                    onClick={() => onNavigateTab('nutrition')}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-800 mb-2 group-hover:scale-110 transition-transform">
                      <Salad className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#4A121A]">{isUrdu ? 'طبی ڈائٹ پلانز' : 'Clinical Diets'}</h4>
                    <p className="text-[11px] text-[#78615A] mt-0.5">{isUrdu ? 'ذیابیطس اور بلڈ پریشر' : 'Diabetes & BP DASH'}</p>
                  </div>

                  <div 
                    onClick={() => onNavigateTab('diseases')}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-800 mb-2 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#4A121A]">{isUrdu ? 'امراض کا انسائیکلوپیڈیا' : 'Disease Guide'}</h4>
                    <p className="text-[11px] text-[#78615A] mt-0.5">{isUrdu ? 'وجوہات اور مکمل علاج' : 'Causes & WHO Cures'}</p>
                  </div>
                </div>

                {/* Instant Emergency Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#58111A] to-[#722F37] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-200 font-semibold uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{isUrdu ? 'پاکستان ایمبولینس و ایمرجنسی' : 'Pakistan Rescue 1122 & ER'}</span>
                    </div>
                    <p className="text-xs text-rose-100 mt-0.5">
                      {isUrdu ? '7 بڑے شہروں کے تصدیق شدہ ایمرجنسی نمبرز' : 'Instant one-tap verified 7-city emergency hotlines'}
                    </p>
                  </div>
                  <button
                    onClick={onOpenEmergencyModal}
                    className="w-full sm:w-auto px-3.5 py-2 bg-white text-[#58111A] hover:bg-amber-100 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-700" />
                    <span>{isUrdu ? 'کال کریں' : 'Call Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
