import React, { useState } from 'react';
import { Globe, Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { DISEASES_DATA } from '../data/diseasesData';
import { ARTICLES_DATA } from '../data/articlesData';
import { useLanguage } from '../context/LanguageContext';

interface SitemapRobotViewProps {
  onBack: () => void;
}

export const SitemapRobotView: React.FC<SitemapRobotViewProps> = ({ onBack }) => {
  const { isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copied, setCopied] = useState(false);

  const host = typeof window !== 'undefined' ? window.location.origin : 'https://carehub.pk';
  const now = new Date().toISOString().split('T')[0];

  const robotsContent = `User-agent: *
Allow: /
Disallow: /api/

# CareHub Pakistan Sitemap Location
Sitemap: ${host}/sitemap.xml
`;

  const corePages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/#first-aid', changefreq: 'weekly', priority: '0.9' },
    { path: '/#dashboard', changefreq: 'daily', priority: '0.9' },
    { path: '/#ai-consult', changefreq: 'daily', priority: '0.9' },
    { path: '/#tools', changefreq: 'weekly', priority: '0.9' },
    { path: '/#hospitals', changefreq: 'weekly', priority: '0.9' },
    { path: '/#nutrition', changefreq: 'weekly', priority: '0.8' },
    { path: '/#exercises', changefreq: 'weekly', priority: '0.8' },
    { path: '/#diseases', changefreq: 'weekly', priority: '0.9' },
    { path: '/#articles', changefreq: 'weekly', priority: '0.8' },
    { path: '/#happiness', changefreq: 'weekly', priority: '0.8' },
    { path: '/#stress', changefreq: 'weekly', priority: '0.8' },
    { path: '/#faq', changefreq: 'monthly', priority: '0.6' },
    { path: '/#terms', changefreq: 'monthly', priority: '0.3' },
    { path: '/#privacy', changefreq: 'monthly', priority: '0.3' },
  ];

  const totalUrls = corePages.length + DISEASES_DATA.length + ARTICLES_DATA.length;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${corePages.map(p => `  <url>
    <loc>${host}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
  <!-- WHO Clinical Disease Guides -->
${DISEASES_DATA.map(d => `  <url>
    <loc>${host}/#diseases-${d.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  <!-- Clinical Articles & Preventive Guides -->
${ARTICLES_DATA.map(a => `  <url>
    <loc>${host}/#articles-${a.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  const currentContent = activeTab === 'sitemap' ? sitemapXml : robotsContent;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'کیئر ہب ہوم پیج پر واپس جائیں' : 'Back to CareHub Overview'}</span>
      </button>

      <div className="space-y-3 border-b border-[#E8DDD2] pb-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase">
            {isUrdu ? 'SEO انفراسٹرکچر اور کرالنگ' : 'SEO Infrastructure & Crawling'}
          </span>
          <span className="text-xs text-[#78615A]">
            {isUrdu ? 'گوگل سرچ کنسول اور Schema.org کے لیے مکمل تیار' : 'Full Google Search Console & Schema.org Ready'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A121A]">
          {isUrdu ? 'سائٹ میپ اور Robots.txt پروٹوکول' : 'Sitemap & Robots.txt Protocol'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed">
          {isUrdu
            ? 'کیئر ہب پاکستان مکمل SEO میٹا ڈیٹا، OpenGraph کارڈز، canonical ٹیگز اور ڈائنامک XML سائٹ میپ کے ساتھ تیار کیا گیا ہے تاکہ پاکستان کے 7 شہروں کے ہسپتال، WHO ورزشیں، AI طبی مشورے اور بیماریوں کے گائیڈ آسانی سے سرچ انجن میں انڈیکس ہو سکیں۔'
            : 'CareHub Pakistan is engineered with complete SEO metadata, OpenGraph cards, canonical tags, and dynamic server-side XML sitemaps to ensure Pakistan 7-city hospital directories, WHO exercise protocols, AI medical guidance, and clinical disease guides are indexed.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sitemap'
                ? 'bg-[#722F37] text-white shadow-xs'
                : 'bg-white text-[#5F4B44] border border-[#D9C4B5]'
            }`}
          >
            {isUrdu ? `sitemap.xml (${totalUrls} لنکس)` : `sitemap.xml (${totalUrls} URLs)`}
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'robots'
                ? 'bg-[#722F37] text-white shadow-xs'
                : 'bg-white text-[#5F4B44] border border-[#D9C4B5]'
            }`}
          >
            robots.txt
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activeTab === 'sitemap' ? '/sitemap.xml' : '/robots.txt'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-xs font-semibold text-[#4A121A] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#722F37]" />
            <span>{isUrdu ? 'لائیو لنک کھولیں' : 'Open Live Endpoint'}</span>
            <ExternalLink className="w-3 h-3 text-[#8C766F]" />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF0E6] text-[#722F37] hover:bg-[#EDE0D2] border border-[#DFCFC2] text-xs font-bold cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isUrdu ? 'کاپی ہو گیا' : 'Copied') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="bg-[#2D1810] text-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#4A352F] shadow-xl overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-amber-100">
          {currentContent}
        </pre>
      </div>
    </div>
  );
};

