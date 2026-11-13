import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, MapPin, BookOpen, Salad, FileText, ArrowRight, Activity, BriefcaseMedical } from 'lucide-react';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { DISEASES_DATA } from '../data/diseasesData';
import { NUTRITION_PLANS } from '../data/nutritionPlansData';
import { ARTICLES_DATA } from '../data/articlesData';
import { Hospital, Disease, NutritionPlan, Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  CITY_URDU,
  HOSPITAL_TYPE_URDU,
  getTranslatedArticle,
  getTranslatedDisease,
  getTranslatedNutritionPlan,
} from '../data/urduTranslations';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHospital: (hospital: Hospital) => void;
  onSelectDisease: (disease: Disease) => void;
  onSelectNutritionPlan: (plan: NutritionPlan) => void;
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectHospital,
  onSelectDisease,
  onSelectNutritionPlan,
  onSelectArticle,
  onNavigateTab
}) => {
  const { isUrdu } = useLanguage();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Hospitals' | 'Diseases' | 'Diets' | 'Articles'>('All');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        hospitals: HOSPITALS_DATA.slice(0, 3),
        diseases: DISEASES_DATA.slice(0, 3),
        plans: NUTRITION_PLANS.slice(0, 2),
        articles: ARTICLES_DATA.slice(0, 2),
        isDefault: true
      };
    }

    const matchedHospitals = HOSPITALS_DATA.filter(h => 
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      (CITY_URDU[h.city] || '').toLowerCase().includes(q) ||
      (h.zone && h.zone.toLowerCase().includes(q)) ||
      h.specialties.some(s => s.toLowerCase().includes(q)) ||
      h.address.toLowerCase().includes(q)
    );

    const matchedDiseases = DISEASES_DATA.filter(d => {
      const tr = getTranslatedDisease(d, true);
      return (
        d.name.toLowerCase().includes(q) ||
        tr.name.toLowerCase().includes(q) ||
        d.definition.toLowerCase().includes(q) ||
        tr.definition.toLowerCase().includes(q) ||
        d.causes.some(c => c.toLowerCase().includes(q)) ||
        d.symptoms.early.some(s => s.toLowerCase().includes(q)) ||
        d.symptoms.acute.some(s => s.toLowerCase().includes(q))
      );
    });

    const matchedPlans = NUTRITION_PLANS.filter(p => {
      const tr = getTranslatedNutritionPlan(p, true);
      return (
        p.title.toLowerCase().includes(q) ||
        tr.title.toLowerCase().includes(q) ||
        p.targetCondition.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        tr.tagline.toLowerCase().includes(q) ||
        p.foodsToEmbrace.some(f => f.toLowerCase().includes(q))
      );
    });

    const matchedArticles = ARTICLES_DATA.filter(a => {
      const tr = getTranslatedArticle(a, true);
      return (
        a.title.toLowerCase().includes(q) ||
        tr.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        tr.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    return {
      hospitals: matchedHospitals,
      diseases: matchedDiseases,
      plans: matchedPlans,
      articles: matchedArticles,
      isDefault: false
    };
  }, [query]);

  if (!isOpen) return null;

  const filterLabels: Record<'All' | 'Hospitals' | 'Diseases' | 'Diets' | 'Articles', string> = {
    All: isUrdu ? 'سب' : 'All',
    Hospitals: isUrdu ? 'ہسپتال' : 'Hospitals',
    Diseases: isUrdu ? 'بیماریاں' : 'Diseases',
    Diets: isUrdu ? 'ڈائٹ پلان' : 'Diets',
    Articles: isUrdu ? 'مضامین' : 'Articles',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D9C4B5] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DDD2] bg-white flex items-center gap-3">
          <Search className="w-6 h-6 text-[#722F37] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'پاکستان کے ہسپتال، بیماریاں، شوگر یا بلڈ پریشر تلاش کریں...'
                : 'Search Pakistan hospitals, diseases, diabetes diet, blood pressure...'
            }
            className="w-full bg-transparent border-none text-[#2D1810] text-lg sm:text-xl placeholder:text-[#9A8680] focus:outline-hidden focus:ring-0"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[#F2EAE2] rounded-md text-[#78615A]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#F2EAE2] rounded-md text-[#78615A] text-xs font-semibold px-2 border border-[#E0D3C7]"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 bg-[#F5EFEB] border-b border-[#E8DDD2] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#78615A] font-medium mr-1">{isUrdu ? 'فلٹر:' : 'Filter:'}</span>
          {(['All', 'Hospitals', 'Diseases', 'Diets', 'Articles'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                filterType === type 
                  ? 'bg-[#722F37] text-white shadow-2xs' 
                  : 'bg-white text-[#5A453F] border border-[#DDD0C5] hover:bg-[#FAF7F2]'
              }`}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {searchResults.isDefault && (
            <div className="flex items-center justify-between text-xs font-semibold text-[#8C766F] uppercase tracking-wider px-1">
              <span>{isUrdu ? 'مقبول اور فوری رسائی' : 'Popular & Quick Links'}</span>
              <span>{isUrdu ? 'تلاش کے لیے لکھیں' : 'Type to search anything'}</span>
            </div>
          )}

          {/* First Aid Guide Match Banner */}
          {(searchResults.isDefault ||
            /first\s*aid|burn|chok|bleed|fractur|heatstroke|heat|snake|electric|shock|heart\s*attack|faint|cpr|1122|جلنا|سانپ|گلا|ہڈی|لو|بے ہوشی|فرسٹ ایڈ/i.test(query)) && (
            <div
              onClick={() => {
                onClose();
                onNavigateTab('first-aid');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3.5 rounded-xl bg-gradient-to-r from-[#FAF0E6] to-white border border-[#D9C4B5] hover:border-[#722F37] hover:shadow-sm transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#722F37] text-amber-200 flex items-center justify-center shrink-0">
                  <BriefcaseMedical className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#4A121A] group-hover:text-[#722F37]">
                    {isUrdu ? 'ابتدائی طبی امداد گائیڈ (First Aid — 9 ایمرجنسی حالات)' : 'First Aid Guide — 9 Common Emergencies'}
                  </h4>
                  <p className="text-xs text-[#78615A]">
                    {isUrdu
                      ? 'جلنا، گلا بند ہونا، شدید خون، ہڈی ٹوٹنا، لو لگنا، سانپ کا کاٹنا، کرنٹ، ہارٹ اٹیک، بے ہوشی'
                      : 'Burns, Choking, Bleeding, Fractures, Heatstroke, Snake Bite, Electric Shock, Heart Attack & Fainting'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#722F37] shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Hospitals Results */}
          {(filterType === 'All' || filterType === 'Hospitals') && searchResults.hospitals.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  {isUrdu ? `پاکستان ہسپتال (${searchResults.hospitals.length})` : `Pakistan Hospitals (${searchResults.hospitals.length})`}
                </span>
                <button 
                  onClick={() => { onClose(); onNavigateTab('hospitals'); }}
                  className="text-xs text-[#722F37] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  {isUrdu ? 'مکمل ڈائریکٹری دیکھیں' : 'View All Directory'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {searchResults.hospitals.map(hospital => (
                  <div
                    key={hospital.id}
                    onClick={() => { onClose(); onSelectHospital(hospital); }}
                    className="p-3 bg-white rounded-xl border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm text-[#4A121A] group-hover:text-[#722F37] line-clamp-1">
                        {hospital.name}
                      </h4>
                      {hospital.emergencyAvailable && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold shrink-0">
                          {isUrdu ? '24/7 ایمرجنسی' : '24/7 ER'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#78615A] mt-1 line-clamp-1">
                      📍 {isUrdu ? (CITY_URDU[hospital.city] || hospital.city) : hospital.city} {hospital.zone ? `• ${hospital.zone}` : ''} • {hospital.address}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#8C766F]">
                      <span>{isUrdu ? (HOSPITAL_TYPE_URDU[hospital.type] || hospital.type) : hospital.type}</span>
                      <span className="text-amber-700 font-medium">★ {hospital.rating} ({hospital.reviewsCount})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disease Guides Results */}
          {(filterType === 'All' || filterType === 'Diseases') && searchResults.diseases.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  {isUrdu ? `بیماریوں کا انسائیکلوپیڈیا (${searchResults.diseases.length})` : `Disease Encyclopedia & Cures (${searchResults.diseases.length})`}
                </span>
                <button 
                  onClick={() => { onClose(); onNavigateTab('diseases'); }}
                  className="text-xs text-[#722F37] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  {isUrdu ? 'تمام گائیڈز دیکھیں' : 'View All Guides'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {searchResults.diseases.map(rawDisease => {
                  const disease = getTranslatedDisease(rawDisease, isUrdu);
                  return (
                    <div
                      key={disease.id}
                      onClick={() => { onClose(); onSelectDisease(rawDisease); }}
                      className="p-3 bg-white rounded-xl border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm text-[#4A121A] group-hover:text-[#722F37]">
                          {disease.name}
                        </h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          disease.cure.isCurable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isUrdu
                            ? (disease.cure.isCurable ? 'قابلِ علاج' : 'قابلِ کنٹرول')
                            : (disease.cure.isCurable ? 'Curable' : 'Manageable')}
                        </span>
                      </div>
                      <p className="text-xs text-[#78615A] mt-1 line-clamp-2">
                        {disease.definition}
                      </p>
                      <div className="mt-2 text-[11px] text-[#722F37] font-medium flex items-center gap-1">
                        <span>{isUrdu ? 'وجوہات، علامات اور علاج دیکھیں' : 'View causes, symptoms & treatment'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nutrition Plans Results */}
          {(filterType === 'All' || filterType === 'Diets') && searchResults.plans.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
                  <Salad className="w-3.5 h-3.5" />
                  {isUrdu ? `طبی ڈائٹ اور غذائی پلان (${searchResults.plans.length})` : `Clinical Nutrition & Diets (${searchResults.plans.length})`}
                </span>
                <button 
                  onClick={() => { onClose(); onNavigateTab('nutrition'); }}
                  className="text-xs text-[#722F37] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  {isUrdu ? 'تمام ڈائٹ پلان دیکھیں' : 'View All Diets'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {searchResults.plans.map(rawPlan => {
                  const plan = getTranslatedNutritionPlan(rawPlan, isUrdu);
                  return (
                    <div
                      key={plan.id}
                      onClick={() => { onClose(); onSelectNutritionPlan(rawPlan); }}
                      className="p-3.5 bg-white rounded-xl border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded-md bg-[#EDE4DC] text-[#722F37] font-semibold">
                            {plan.targetCondition}
                          </span>
                          <h4 className="font-semibold text-sm text-[#4A121A] group-hover:text-[#722F37]">
                            {plan.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#78615A] mt-1 line-clamp-1">{plan.tagline}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#722F37] shrink-0 pl-3">
                        {plan.dailyCalorieTarget}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Articles Results */}
          {(filterType === 'All' || filterType === 'Articles') && searchResults.articles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  {isUrdu ? `طبی مضامین اور گائیڈز (${searchResults.articles.length})` : `Health Articles & Guides (${searchResults.articles.length})`}
                </span>
                <button 
                  onClick={() => { onClose(); onNavigateTab('articles'); }}
                  className="text-xs text-[#722F37] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  {isUrdu ? 'تمام مضامین دیکھیں' : 'View All Articles'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {searchResults.articles.map(rawArticle => {
                  const article = getTranslatedArticle(rawArticle, isUrdu);
                  return (
                    <div
                      key={article.id}
                      onClick={() => { onClose(); onSelectArticle(rawArticle); }}
                      className="p-3 bg-white rounded-xl border border-[#E8DDD2] hover:border-[#722F37] hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs text-[#8C766F] mb-1">
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-[#4A121A] group-hover:text-[#722F37]">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[#78615A] mt-1 line-clamp-1">{article.summary}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {searchResults.hospitals.length === 0 && 
           searchResults.diseases.length === 0 && 
           searchResults.plans.length === 0 && 
           searchResults.articles.length === 0 &&
           !/first\s*aid|burn|chok|bleed|fractur|heatstroke|heat|snake|electric|shock|heart\s*attack|faint|cpr|1122|جلنا|سانپ|گلا|ہڈی|لو|بے ہوشی|فرسٹ ایڈ/i.test(query) && (
            <div className="text-center py-12 px-4">
              <Activity className="w-12 h-12 text-[#B8A59C] mx-auto mb-3 opacity-60" />
              <h3 className="text-base font-semibold text-[#4A121A]">
                {isUrdu ? `"${query}" کے لیے کوئی نتیجہ نہیں ملا` : `No direct matches for "${query}"`}
              </h3>
              <p className="text-xs text-[#78615A] mt-1 max-w-sm mx-auto">
                {isUrdu
                  ? 'شوگر، بلڈ پریشر، آغا خان، لاہور، یا ڈینگی جیسے الفاظ تلاش کریں۔'
                  : 'Try searching for specific terms like "Blood Pressure", "AKUH", "Diabetes Meal", "NICVD", or "Dengue".'}
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#E8DDD2] flex items-center justify-between text-[11px] text-[#8C766F] px-5">
          <span>
            {isUrdu
              ? 'پاکستان کے 7 بڑے شہروں کے ہسپتالوں اور طبی گائیڈز میں تلاش کریں'
              : 'Search across Pakistan 7-City Hospitals & Medical Guides'}
          </span>
          <div className="flex gap-2">
            <span>
              {isUrdu ? 'بند کرنے کے لیے ' : 'Press '}
              <kbd className="bg-white px-1 py-0.5 border border-[#D9C4B5] rounded">ESC</kbd>
              {isUrdu ? ' دبائیں' : ' to close'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
