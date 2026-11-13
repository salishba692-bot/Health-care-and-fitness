import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/hospitalsData';
import { CITY_URDU } from '../data/urduTranslations';
import { PakistanCity } from '../types';
import { useLanguage } from '../context/LanguageContext';
import carehubLogo from '../assets/images/carehub_pakistan_logo_1794558080113.jpg';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onNavigateToCity?: (city: PakistanCity) => void;
  onOpenEmergencyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onNavigateToCity,
  onOpenEmergencyModal
}) => {
  const { isUrdu } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#4A121A] text-[#FAF7F2] border-t border-[#6B1E28] pt-14 pb-10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => { onNavigateTab('home'); scrollToTop(); }}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <img
                src={carehubLogo}
                alt="CareHub Pakistan Logo"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover shadow-md border border-amber-300/40 bg-[#FAF7F2]"
              />
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  {isUrdu ? 'کیئر ہب' : 'CareHub'}
                </span>
                <span className="text-xs px-2 py-0.5 ml-2 rounded-full bg-amber-400/20 text-amber-200 font-semibold border border-amber-300/30">
                  {isUrdu ? 'پاکستان • WHO' : 'Pakistan • WHO'}
                </span>
                <p className="text-[11px] text-rose-200 mt-0.5">
                  {isUrdu ? 'قومی صحت، اے آئی مشاورت اور غذائیت کا مرکز' : 'National Healthcare, AI Consult & Nutrition Hub'}
                </p>
              </div>
            </div>

            <p className="text-xs text-rose-100/80 leading-relaxed">
              {isUrdu
                ? 'کیئر ہب پاکستان عالمی ادارہ صحت (WHO) کے مطابق صحت کے اعدادوشمار، ذیابیطس و بلڈ پریشر کے مستند ڈائٹ پلان، اے آئی طبی رہنمائی اور پاکستان کے 7 بڑے شہروں کے ہسپتالوں کی مکمل ڈائریکٹری فراہم کرتا ہے۔'
                : "CareHub Pakistan provides WHO-aligned vital health metrics tracking, evidence-backed medical nutrition plans for Diabetes & Hypertension, AI clinical guidance, and verified hospital directories across Pakistan's 7 major cities."}
            </p>

            <div className="p-3.5 rounded-2xl bg-[#58111A] border border-[#782330] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block">
                  {isUrdu ? 'پاکستان ایمرجنسی 24/7' : 'Pakistan Emergency 24/7'}
                </span>
                <span className="text-xs text-rose-100">
                  {isUrdu ? 'ریسکیو 1122 | ایدھی 115 | ہسپتال ER' : 'Rescue 1122 | Edhi 115 | Tertiary ER'}
                </span>
              </div>
              <button
                onClick={onOpenEmergencyModal}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {isUrdu ? 'ہیلپ لائنز' : 'Hotlines'}
              </button>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {isUrdu ? 'صحت کے ماڈیولز' : 'Health Guides & Tools'}
            </h4>
            <ul className="space-y-2 text-xs text-rose-100/90">
              <li>
                <button onClick={() => { onNavigateTab('first-aid'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left font-semibold text-amber-100">
                  {isUrdu ? 'ابتدائی طبی امداد گائیڈ (First Aid)' : 'First Aid Guide (9 Emergencies)'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('ai-consult'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? '✨ اے آئی میڈیکل کنسلٹنٹ (WHO)' : '✨ AI Medical Consultant (WHO)'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('dashboard'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'صحت کے رجحانات اور ایشیائی BMI' : 'Health Trends & Asian BMI'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('tools'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'لیب رپورٹ چیکر، کیلکولیٹر اور ویکسین' : 'Lab Checker, Calculators & Vaccines'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('hospitals'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'پاکستان 7 شہروں کے ہسپتال' : 'Pakistan 7-City Hospital Directory'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('nutrition'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'شوگر، بی پی اور کولیسٹرول ڈائٹس' : 'Diabetes, BP & Cholesterol Diets'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('exercises'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'WHO روزانہ فٹنس ورزشیں' : 'WHO Daily Fitness Exercises'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('diseases'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'بیماریوں کی انسائیکلوپیڈیا اور علاج' : 'Diseases & Treatment Guide'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('happiness'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'خوشی کے چار سنہری اصول' : 'The Four Laws of Happiness'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('stress'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer text-left">
                  {isUrdu ? 'ذہنی دباؤ اور سٹریس ریلیز طریقے' : 'Stress Relief Tricks & Tips'}
                </button>
              </li>
            </ul>
          </div>

          {/* 7 Major Pakistani Cities */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {isUrdu ? '7 بڑے پاکستانی شہر' : '7 Major Cities'}
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-100/80">
              {PAKISTAN_CITIES.map((city) => (
                <li key={city}>
                  <button 
                    onClick={() => {
                      if (onNavigateToCity) {
                        onNavigateToCity(city);
                      } else {
                        onNavigateTab('hospitals');
                      }
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <span>📍</span>
                    <span>{isUrdu ? (CITY_URDU[city] || city) : city}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Nutrition Protocols & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {isUrdu ? 'طبی وسائل اور قوانین' : 'Health Guides & Legal'}
            </h4>
            <ul className="space-y-2 text-xs text-rose-100/90">
              <li>
                <button onClick={() => { onNavigateTab('articles'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer">
                  {isUrdu ? 'طبی مضامین اور گائیڈز' : 'Easy Health Articles'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('faq'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer">
                  {isUrdu ? 'اکثر پوچھے گئے سوالات (FAQ)' : 'Common Questions (FAQ)'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('nutrition'); scrollToTop(); }} className="hover:text-amber-200 transition-colors cursor-pointer">
                  {isUrdu ? 'WHO کم نمک DASH پروٹوکول' : 'Low-Salt High BP Diet Guide'}
                </button>
              </li>
              <li className="pt-2 border-t border-[#6B1E28]">
                <button onClick={() => { onNavigateTab('terms'); scrollToTop(); }} className="hover:text-amber-200 transition-colors block cursor-pointer">
                  {isUrdu ? 'استعمال کی شرائط (Terms)' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('privacy'); scrollToTop(); }} className="hover:text-amber-200 transition-colors block cursor-pointer">
                  {isUrdu ? 'رازداری کی پالیسی (Privacy Policy)' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigateTab('sitemap'); scrollToTop(); }} className="hover:text-amber-200 transition-colors block cursor-pointer">
                  {isUrdu ? 'سائٹ میپ اور روبوٹس (SEO)' : 'Sitemap & Robots.txt'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Medical Disclaimer */}
        <div className="pt-8 border-t border-[#6B1E28] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-rose-200/70">
          <p className="text-center md:text-left leading-relaxed max-w-3xl">
            {isUrdu
              ? '© 2026 کیئر ہب پاکستان۔ جملہ حقوق محفوظ ہیں۔ تمام طبی رہنمائی اور غذائی پلان عالمی ادارہ صحت (WHO) کی سفارشات کے مطابق تعلیمی آگاہی کے لیے ہیں اور یہ PMDC لائسنس یافتہ ڈاکٹر کے براہِ راست معائنے کا متبادل نہیں ہیں۔'
              : '© 2026 CareHub Pakistan. All rights reserved. All health guides and diet plans follow World Health Organization (WHO) advice for general awareness and do not replace seeing a licensed doctor.'}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#58111A] hover:bg-[#722F37] text-white border border-[#782330] transition-colors cursor-pointer shrink-0"
          >
            <span>{isUrdu ? 'اوپر جائیں' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
