import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { FAQ_CATEGORY_URDU, getTranslatedFaq } from '../data/urduTranslations';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Hospitals & Emergency', 'Diet & Nutrition', 'Metrics Tracking'];

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = selectedCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'مریضوں اور کمیونٹی کی رہنمائی' : 'Patient & Community Knowledge'}</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#4A121A]">
          {isUrdu ? 'اکثر پوچھے گئے سوالات (FAQ)' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-sm text-[#6E5A54] max-w-xl mx-auto">
          {isUrdu
            ? 'پاکستان کے 7 شہروں کے ایمرجنسی ہسپتال، ذیابیطس و بلڈ پریشر کی غذا اور ہیلتھ ٹریکنگ سے متعلق عام سوالات کے جوابات۔'
            : 'Common queries regarding Pakistan emergency healthcare, personalized diabetes and hypertension diets, and vital tracking.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#722F37] text-white shadow-2xs'
                : 'bg-white text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
            }`}
          >
            {isUrdu ? (FAQ_CATEGORY_URDU[cat] || cat) : cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((rawFaq) => {
          const faq = getTranslatedFaq(rawFaq, isUrdu);
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#E0D2C7] shadow-2xs overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#722F37] shrink-0" />
                  <span className="font-serif text-base sm:text-lg font-bold text-[#4A121A]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#722F37] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#F0E6DD] text-xs sm:text-sm text-[#5F4B44] leading-relaxed bg-[#FAF7F2]/50 animate-in fade-in duration-150">
                  <p>{faq.answer}</p>
                  <div className="mt-2 text-[10px] text-[#8C766F] font-semibold uppercase tracking-wider">
                    {isUrdu ? 'زمرہ:' : 'Category:'} {isUrdu ? (FAQ_CATEGORY_URDU[faq.category] || faq.category) : faq.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more guidance card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FAF0E6] to-[#F5EFEB] border border-[#DFCFC2] text-center space-y-2">
        <h4 className="font-serif text-base font-bold text-[#4A121A]">
          {isUrdu ? 'کیا آپ کو پاکستان کے ہسپتالوں کے بارے میں مزید معلومات درکار ہیں؟' : 'Have a specific medical question about Pakistan hospitals?'}
        </h4>
        <p className="text-xs text-[#78615A] max-w-lg mx-auto">
          {isUrdu
            ? 'ہماری مصدقہ ہسپتال ڈائریکٹری 7 بڑے شہروں کے ایمرجنسی اور او پی ڈی ڈیسک کے براہِ راست فون نمبر فراہم کرتی ہے۔'
            : 'Our verified hospital directory offers direct one-touch telephone links to emergency and OPD triage desks across 7 major cities.'}
        </p>
      </div>
    </div>
  );
};
