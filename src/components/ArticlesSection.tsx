import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  X,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedArticle } from '../data/urduTranslations';

interface ArticlesSectionProps {
  articles: Article[];
  selectedArticle: Article | null;
  onSelectArticle: (article: Article | null) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  selectedArticle,
  onSelectArticle
}) => {
  const { isUrdu } = useLanguage();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleShare = (slug: string) => {
    navigator.clipboard?.writeText(window.location.origin + '/#articles-' + slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider">
              {isUrdu ? 'طبی علمی ذخیرہ و مضامین' : 'Clinical Knowledge Base'}
            </span>
            <span className="text-xs text-[#78615A] font-medium">
              {isUrdu ? 'ماہرِ امراض ڈاکٹروں کی تحریر و تصدیق' : 'Written & Verified by Medical Specialists'}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'اہم طبی اور بیماریوں سے بچاؤ کے مضامین' : 'Essential Medical & Disease Guides'}
          </h1>
          <p className="text-sm text-[#6E5A54] mt-1 max-w-2xl">
            {isUrdu
              ? 'پاکستانی آبادی میں ہائی بلڈ پریشر، ذیابیطس، کولیسٹرول اور ڈینگی بخار کے علاج اور حفاظتی تدابیر پر مستند اور عملی رہنمائی۔'
              : 'Practical, evidence-backed guides on managing hypertension, reversing prediabetes in South Asian populations, and recognizing acute clinical warning signs.'}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((rawArticle) => {
          const article = getTranslatedArticle(rawArticle, isUrdu);
          return (
            <article
              key={article.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D2C7] shadow-xs hover:shadow-md hover:border-[#722F37] transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectArticle(rawArticle)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8C766F]">
                  <span className="font-bold text-[#722F37] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] group-hover:text-[#722F37] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Author Info */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#78615A] border-t border-[#F0E6DD]">
                  <div>
                    <strong className="text-[#4A121A] block">{article.author}</strong>
                    <span className="text-[11px] text-[#8C766F]">{article.authorRole}</span>
                  </div>
                  <span className="text-[11px] text-[#8C766F]">{article.publishDate}</span>
                </div>
              </div>

              {/* Read button & tags */}
              <div className="mt-5 pt-3 border-t border-[#F0E6DD] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-[#FAF7F2] text-[#5A453F] px-2 py-0.5 rounded-md border border-[#E8DDD2]">
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#722F37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {isUrdu ? 'مکمل مضمون پڑھیں' : 'Read Full Article'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
