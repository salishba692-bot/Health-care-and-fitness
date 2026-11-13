import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Heart, 
  Stethoscope, 
  Pill, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Disease, DiseaseCategory, Hospital } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DISEASE_CATEGORY_URDU, getTranslatedDisease } from '../data/urduTranslations';

interface DiseaseEncyclopediaSectionProps {
  diseases: Disease[];
  selectedDisease: Disease | null;
  onSelectDisease: (disease: Disease | null) => void;
  onNavigateToHospitalWithSpecialty: (specialty: string) => void;
}

export const DiseaseEncyclopediaSection: React.FC<DiseaseEncyclopediaSectionProps> = ({
  diseases,
  selectedDisease,
  onSelectDisease,
  onNavigateToHospitalWithSpecialty
}) => {
  const { isUrdu } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Cardiovascular',
    'Metabolic & Endocrine',
    'Infectious & Vector-Borne',
    'Respiratory',
    'Hepatic & Renal',
    'Neurological',
    'Gastrointestinal'
  ];

  const filteredDiseases = useMemo(() => {
    return diseases.filter(d => {
      if (selectedCategory !== 'All' && d.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const translated = getTranslatedDisease(d, isUrdu);
        const matches = 
          d.name.toLowerCase().includes(q) ||
          translated.name.toLowerCase().includes(q) ||
          (d.scientificName && d.scientificName.toLowerCase().includes(q)) ||
          d.definition.toLowerCase().includes(q) ||
          translated.definition.toLowerCase().includes(q) ||
          d.causes.some(c => c.toLowerCase().includes(q)) ||
          d.symptoms.early.some(s => s.toLowerCase().includes(q)) ||
          d.symptoms.acute.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [diseases, selectedCategory, searchQuery, isUrdu]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider">
              {isUrdu ? 'طبی انسائیکلوپیڈیا (بیماریوں کی گائیڈ)' : 'Common Diseases Guide'}
            </span>
            <span className="text-xs text-[#78615A] font-medium">
              {isUrdu ? 'مستند WHO طبی خلاصے' : 'WHO-Aligned Health Guides'}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'بیماریوں کی تعریف، وجوہات، علاج اور شفا' : 'Meanings, Causes, Treatments & Prevention'}
          </h1>
          <p className="text-sm text-[#6E5A54] mt-1 max-w-2xl">
            {isUrdu
              ? 'پاکستان میں عام امراضِ قلب، ذیابیطس، موسمی و متعدی بخار اور دائمی بیماریوں کی علامات، ادویات اور ہنگامی خطرات کی مکمل رہنمائی۔'
              : 'Easy-to-understand guides for heart disease, diabetes, dengue, typhoid, and other common illnesses — covering symptoms, medicines, home care, and emergency warning signs.'}
          </p>
        </div>

        {/* Quick Triage Badge */}
        <div className="flex items-center gap-2 text-xs bg-white px-3.5 py-2 rounded-xl border border-[#D9C4B5] self-start md:self-auto text-[#5F4B44]">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{isUrdu ? 'ماہرِ امراض سے تصدیق شدہ' : 'Follows WHO Health Standards'}</span>
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="space-y-4">
        {/* Category Horizontal Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count = cat === 'All' ? diseases.length : diseases.filter(d => d.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#722F37] text-white shadow-xs'
                    : 'bg-white text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
                }`}
              >
                {isUrdu ? (DISEASE_CATEGORY_URDU[cat] || cat) : cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-[#8C766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'بیماری کا نام یا علامت تلاش کریں (مثلاً بخار، شوگر، سینے میں درد)...'
                : 'Search by condition name, symptoms (e.g. fever, chest pain, sugar)...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9C4B5] text-xs sm:text-sm text-[#4A121A] placeholder:text-[#9B8881] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C766F] hover:text-[#4A121A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiseases.map((rawDisease) => {
          const disease = getTranslatedDisease(rawDisease, isUrdu);
          return (
            <div
              key={disease.id}
              className="bg-white rounded-3xl p-5 border border-[#E0D2C7] shadow-xs hover:shadow-md hover:border-[#722F37] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Category & Cure Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2] truncate">
                    {isUrdu ? (DISEASE_CATEGORY_URDU[disease.category] || disease.category) : disease.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    disease.cure.isCurable 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isUrdu
                      ? (disease.cure.isCurable ? 'مکمل قابلِ علاج' : 'کنٹرول اور بہتری ممکن')
                      : (disease.cure.isCurable ? 'Curable' : 'Can Be Controlled')}
                  </span>
                </div>

                {/* Name & Scientific Name */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4A121A] group-hover:text-[#722F37] transition-colors">
                    {disease.name}
                  </h3>
                  {disease.scientificName && (
                    <p className="text-[11px] text-[#8C766F] italic mt-0.5">
                      {disease.scientificName}
                    </p>
                  )}
                </div>

                {/* Definition */}
                <p className="text-xs text-[#6E5A54] line-clamp-3 leading-relaxed">
                  {disease.definition}
                </p>

                {/* Key Early Symptoms Snippet */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DDD2] space-y-1">
                  <span className="text-[11px] font-bold text-[#5F4B44] block">
                    {isUrdu ? 'ابتدائی علامات:' : 'Common Early Signs:'}
                  </span>
                  <ul className="text-[11px] text-[#78615A] space-y-0.5">
                    {disease.symptoms.early.slice(0, 2).map((sym, idx) => (
                      <li key={idx} className="line-clamp-1">• {sym}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[#F0E6DD]">
                <button
                  onClick={() => onSelectDisease(rawDisease)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] group-hover:bg-[#722F37] text-[#4A121A] group-hover:text-white border border-[#D9C4B5] group-hover:border-[#722F37] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>{isUrdu ? 'مکمل طبی گائیڈ پڑھیں' : 'Read Full Medical Guide'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
