import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Share2, 
  Printer, 
  Heart, 
  Stethoscope, 
  Pill, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Disease, Hospital } from '../types';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { useLanguage } from '../context/LanguageContext';
import { CITY_URDU, DISEASE_CATEGORY_URDU, getTranslatedDisease, SEVERITY_URDU } from '../data/urduTranslations';

interface DiseaseDetailPageProps {
  disease: Disease;
  onBack: () => void;
  onNavigateToHospital: (hospital: Hospital) => void;
  onNavigateTab: (tab: string) => void;
}

export const DiseaseDetailPage: React.FC<DiseaseDetailPageProps> = ({
  disease: rawDisease,
  onBack,
  onNavigateToHospital,
  onNavigateTab
}) => {
  const { isUrdu } = useLanguage();
  const disease = getTranslatedDisease(rawDisease, isUrdu);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + '/#diseases-' + disease.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find relevant Pakistan hospitals that specialize in this condition's area
  const matchedSpecialty = 
    rawDisease.category === 'Cardiovascular' ? 'Cardiology' :
    rawDisease.category === 'Metabolic & Endocrine' ? 'Endocrinology' :
    rawDisease.category === 'Hepatic & Renal' ? 'Nephrology' :
    rawDisease.category === 'Infectious & Vector-Borne' ? 'Infectious Diseases' :
    rawDisease.category === 'Respiratory' ? 'Pulmonology' : 'Trauma & Emergency';

  const relevantHospitals = HOSPITALS_DATA.filter(h => 
    h.specialties.some(s => s.toLowerCase().includes(matchedSpecialty.toLowerCase())) ||
    h.specialties.some(s => s.toLowerCase().includes('emergency'))
  ).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#722F37] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{isUrdu ? 'تمام بیماریوں کی فہرست پر واپس جائیں' : 'Back to All Disease Guides'}</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-xs font-semibold text-[#4A121A] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#722F37]" />
            <span>
              {copied
                ? (isUrdu ? 'لنک کاپی ہو گیا!' : 'Link Copied!')
                : (isUrdu ? 'گائیڈ شیئر کریں' : 'Share Guide')}
            </span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-xs font-semibold text-[#4A121A] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#722F37]" />
            <span>{isUrdu ? 'طبی گائیڈ پرنٹ کریں' : 'Print Clinical Guide'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D2C7] shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2]">
              {isUrdu ? (DISEASE_CATEGORY_URDU[disease.category] || disease.category) : disease.category}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              disease.cure.isCurable 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {isUrdu
                ? (disease.cure.isCurable ? '✓ مکمل قابلِ علاج مرض' : '⚡ کنٹرول اور بہتری ممکن')
                : (disease.cure.isCurable ? '✓ Curable Condition' : '⚡ Clinically Reversible / Manageable')}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              {isUrdu
                ? `شدت: ${SEVERITY_URDU[disease.severity] || disease.severity}`
                : `Severity: ${disease.severity}`}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A121A] tracking-tight leading-tight">
            {disease.name}
          </h1>

          {disease.scientificName && (
            <p className="text-xs sm:text-sm text-[#8C766F] italic">
              {isUrdu ? 'طبی نام:' : 'Medical Nomenclature:'} {disease.scientificName}
            </p>
          )}
        </div>

        {/* Emergency Warning Callout Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
            <span>
              {isUrdu
                ? 'فوری ہنگامی خطرے کی علامات (1122 پر کال کریں یا ایمرجنسی جائیں)'
                : 'Immediate Emergency Warning Signs (Call 1122 or Proceed to ER)'}
            </span>
          </div>
          <ul className="text-xs sm:text-sm text-rose-950 space-y-1.5 pl-1">
            {disease.emergencyWarningSigns.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-rose-700">⚠</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-8">
        
        {/* Section 1: Definition & Pathology */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0E6DD] pb-3">
            <BookOpen className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
              {isUrdu ? '1. طبی تعریف اور بنیادی تعارف' : '1. Medical Definition & Clinical Overview'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#3E2D27] leading-relaxed">
            {disease.definition}
          </p>
          {disease.karachiContext && (
            <div className="p-4 rounded-2xl bg-[#FAF0E6] border border-[#DFCFC2] text-xs sm:text-sm text-[#5F4B44] leading-relaxed">
              <strong className="text-[#722F37] block mb-0.5">
                {isUrdu ? 'پاکستانی اور جنوبی ایشیائی آبادی کے تناظر میں:' : 'Pakistan & South Asian Population Context:'}
              </strong>
              {disease.karachiContext}
            </div>
          )}
        </div>

        {/* Section 2: Causes & Root Etiology */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0E6DD] pb-3">
            <Stethoscope className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
              {isUrdu ? '2. بنیادی وجوہات اور اسباب' : '2. Causes & Root Etiology'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {disease.causes.map((cause, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-[#4A121A] leading-relaxed">{cause}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Early Symptoms vs Acute Symptoms */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0E6DD] pb-3">
            <Heart className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
              {isUrdu ? '3. علامات: ابتدائی بمقابلہ شدید پیچیدگیاں' : '3. Symptom Progression: Early vs. Acute Complications'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                {isUrdu ? 'ابتدائی مرحلے کی علامات' : 'Early Stage Warning Symptoms'}
              </span>
              <ul className="text-xs sm:text-sm text-amber-950 space-y-2">
                {disease.symptoms.early.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
                {isUrdu ? 'شدید اور ہنگامی علامات' : 'Advanced & Acute Symptoms'}
              </span>
              <ul className="text-xs sm:text-sm text-rose-950 space-y-2">
                {disease.symptoms.acute.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Medical Treatments & Medications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-[#F0E6DD] pb-3">
            <Pill className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
              {isUrdu ? '4. مستند طبی علاج اور ادویات' : '4. Evidence-Based Medical Treatment & Pharmacology'}
            </h2>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#4A121A] uppercase tracking-wider">
              {isUrdu ? 'طبی معائنہ اور ٹیسٹنگ طریقہ کار:' : 'Clinical Management & Testing Procedures:'}
            </h4>
            <div className="space-y-2">
              {disease.treatment.medical.map((med, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD2] text-xs sm:text-sm text-[#4A121A]">
                  <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
                  <span>{med}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#4A121A] uppercase tracking-wider">
              {isUrdu ? 'بنیادی ادویات (صرف مستند ڈاکٹر کے مشورے سے):' : 'Frontline Medications:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {disease.treatment.medications.map((drug, idx) => (
                <span key={idx} className="text-xs sm:text-sm bg-[#FAF0E6] text-[#4A121A] px-3.5 py-1.5 rounded-xl border border-[#DFCFC2] font-semibold">
                  💊 {drug}
                </span>
              ))}
            </div>
          </div>

          {disease.treatment.procedures && disease.treatment.procedures.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-[#4A121A] uppercase tracking-wider">
                {isUrdu ? 'خصوصی طبی طریقہ کار:' : 'Specialized Interventional Procedures:'}
              </h4>
              <ul className="text-xs sm:text-sm text-[#5F4B44] space-y-1">
                {disease.treatment.procedures.map((proc, idx) => (
                  <li key={idx}>✓ {proc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 5: Curability, Remission & Long-Term Prevention */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0E6DD] pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
              {isUrdu ? '5. شفا، مستقل بہتری اور احتیاطی تدابیر' : '5. Curability Status, Remission & Long-Term Prevention'}
            </h2>
          </div>
          
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {disease.cure.curabilityDetails}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-[#4A121A] uppercase tracking-wider block">
              {isUrdu ? 'طویل المدتی بچاؤ کے سنہری اصول:' : 'Core Preventative Lifestyle Rules:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {disease.cure.prevention.map((prev, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDD2] text-xs text-[#5F4B44] flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{prev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 6: Dietary Recommendations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] border-b border-[#F0E6DD] pb-3">
            {isUrdu ? '6. بیماری کے مطابق غذائی پرہیز اور سفارشات' : '6. Condition-Specific Dietary Guidelines'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                {isUrdu ? 'مفید غذائیں (استعمال کریں):' : 'Foods to Embrace & Prioritize:'}
              </span>
              <ul className="text-xs sm:text-sm text-emerald-950 space-y-1.5">
                {disease.dietaryRecommendations.recommended.map((food, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                {isUrdu ? 'مضر غذائیں (پرہیز کریں):' : 'Foods to Strictly Limit or Avoid:'}
              </span>
              <ul className="text-xs sm:text-sm text-rose-950 space-y-1.5">
                {disease.dietaryRecommendations.avoid.map((food, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7: Matched Pakistan Tertiary Care Centers */}
        <div className="bg-gradient-to-br from-[#FAF0E6] to-[#F5EFEB] rounded-3xl p-6 sm:p-8 border border-[#DFCFC2] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                {isUrdu ? 'پاکستان ہسپتال ریفرل گائیڈ' : 'Pakistan Hospital Referral Route'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
                {isUrdu
                  ? `${disease.name} کے علاج کے لیے تجویز کردہ بڑے ہسپتال`
                  : `Recommended Tertiary Care Centers for ${disease.name}`}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('hospitals')}
              className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>{isUrdu ? '7 شہروں کی تمام ڈائریکٹری دیکھیں →' : 'View All 7-City Directory →'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relevantHospitals.map(h => (
              <div
                key={h.id}
                onClick={() => onNavigateToHospital(h)}
                className="p-4 bg-white rounded-2xl border border-[#D9C4B5] hover:border-[#722F37] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-[#722F37]">
                      📍 {isUrdu ? (CITY_URDU[h.city] || h.city) : h.city} {h.zone ? `• ${h.zone.split('&')[0]}` : ''}
                    </span>
                    {h.emergencyAvailable && (
                      <span className="text-rose-700 font-bold">{isUrdu ? '24/7 ایمرجنسی' : '24/7 ER'}</span>
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#4A121A] mt-1.5 line-clamp-1">{h.name}</h4>
                  <p className="text-[11px] text-[#78615A] mt-1 line-clamp-2">{h.address}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#F0E6DD] flex items-center justify-between text-xs">
                  <span className="text-rose-800 font-bold">{h.emergencyPhone}</span>
                  <span className="text-[#722F37] font-semibold">{isUrdu ? 'تفصیلات →' : 'Details →'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="pt-6 border-t border-[#E8DDD2] flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EDE4DC] border border-[#D9C4B5] text-xs font-bold text-[#4A121A] flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'تمام بیماریوں کی فہرست پر واپس جائیں' : 'Back to All Disease Guides'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('nutrition')}
          className="px-5 py-2.5 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs font-bold cursor-pointer"
        >
          <span>{isUrdu ? 'طبی ڈائٹ پلان دیکھیں →' : 'Explore Clinical Nutrition Plans →'}</span>
        </button>
      </div>

    </div>
  );
};
