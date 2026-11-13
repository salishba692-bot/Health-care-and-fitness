import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Share2, 
  Printer, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data/articlesData';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedArticle } from '../data/urduTranslations';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: rawArticle,
  onBack,
  onSelectArticle,
  onNavigateTab
}) => {
  const { isUrdu } = useLanguage();
  const article = getTranslatedArticle(rawArticle, isUrdu);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + '/#articles-' + article.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const relatedArticles = ARTICLES_DATA.filter(a => a.id !== rawArticle.id).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#722F37] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{isUrdu ? 'تمام طبی مضامین پر واپس جائیں' : 'Back to All Health Articles'}</span>
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
                : (isUrdu ? 'مضمون شیئر کریں' : 'Share Article')}
            </span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-xs font-semibold text-[#4A121A] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#722F37]" />
            <span>{isUrdu ? 'پرنٹ گائیڈ' : 'Print Guide'}</span>
          </button>
        </div>
      </div>

      {/* Article Header Card */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold px-3 py-1 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2]">
            {article.category}
          </span>
          <span className="text-[#8C766F] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-[#8C766F]">•</span>
          <span className="text-[#8C766F]">{article.publishDate}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A121A] tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Author Bio Box */}
        <div className="p-4 bg-white rounded-2xl border border-[#E0D2C7] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF0E6] border border-[#DFCFC2] flex items-center justify-center text-[#722F37] font-serif font-bold text-base shrink-0">
              {article.author.charAt(3)}
            </div>
            <div>
              <strong className="text-xs sm:text-sm text-[#4A121A] block">{article.author}</strong>
              <span className="text-[11px] text-[#78615A]">{article.authorRole}</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            {isUrdu ? '✓ طبی ماہرین سے تصدیق شدہ' : '✓ Medically Verified'}
          </span>
        </div>
      </div>

      {/* Article Abstract Pull-Quote */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border-l-4 border-[#722F37] border-y border-r border-[#E8DDD2] shadow-xs">
        <p className="font-serif text-sm sm:text-base text-[#4A121A] italic leading-relaxed">
          "{article.summary}"
        </p>
      </div>

      {/* Full Body Paragraphs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D2C7] shadow-sm space-y-6 text-sm sm:text-base text-[#3E2D27] leading-relaxed">
        {article.contentParagraphs.map((paragraph, idx) => (
          <p key={idx} className={isUrdu ? '' : 'first-letter:text-2xl first-letter:font-serif first-letter:font-bold first-letter:text-[#722F37]'}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Clinical Takeaways */}
      <div className="bg-emerald-50/70 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? 'اہم طبی نکات اور عملی ہدایات' : 'Key Clinical Takeaways & Action Protocol'}</span>
        </div>
        <ul className="text-xs sm:text-sm text-emerald-950 space-y-2.5 pl-1">
          {article.keyTakeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-emerald-700 font-bold text-base mt-[-2px]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-semibold text-[#78615A]">
          {isUrdu ? 'موضوعات:' : 'Topics:'}
        </span>
        {article.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-white text-[#5A453F] px-3 py-1 rounded-xl border border-[#D9C4B5]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Articles Showcase */}
      <div className="pt-6 border-t border-[#E8DDD2] space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4A121A]">
          {isUrdu ? 'متعلقہ طبی مضامین' : 'Related Clinical Reading'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rawRel) => {
            const rel = getTranslatedArticle(rawRel, isUrdu);
            return (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rawRel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 bg-white rounded-2xl border border-[#E0D2C7] hover:border-[#722F37] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#722F37] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#4A121A] group-hover:text-[#722F37] line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#78615A] mt-1 line-clamp-2">{rel.summary}</p>
                </div>
                <span className="text-xs font-bold text-[#722F37] mt-3 flex items-center gap-1">
                  {isUrdu ? 'مضمون پڑھیں' : 'Read Article'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EDE4DC] border border-[#D9C4B5] text-xs font-bold text-[#4A121A] flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'تمام طبی مضامین پر واپس جائیں' : 'Back to All Health Articles'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs font-bold cursor-pointer"
        >
          <span>{isUrdu ? 'ہیلتھ ڈیش بورڈ کھولیں →' : 'Open Health Dashboard →'}</span>
        </button>
      </div>

    </article>
  );
};
