import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Search, 
  PhoneCall, 
  Menu, 
  X, 
  MapPin, 
  Salad, 
  BookOpen, 
  FileText, 
  HelpCircle,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  Dumbbell,
  FlaskConical,
  Languages,
  BriefcaseMedical
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import carehubLogo from '../assets/images/carehub_pakistan_logo_1794558080113.jpg';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenEmergencyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenEmergencyModal
}) => {
  const { lang, toggleLang, isUrdu } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wellnessDropdownOpen, setWellnessDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWellnessDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { id: 'dashboard', label: isUrdu ? 'ڈیش بورڈ' : 'Dashboard', icon: Activity },
    { id: 'ai-consult', label: isUrdu ? 'AI معالج' : 'AI Consult', icon: Sparkles },
    { id: 'tools', label: isUrdu ? 'لیب و ٹولز' : 'Lab & Tools', icon: FlaskConical },
    { id: 'hospitals', label: isUrdu ? 'ہسپتال' : 'Hospitals', icon: MapPin },
    { id: 'nutrition', label: isUrdu ? 'غذائیت' : 'Diet Plans', icon: Salad },
    { id: 'diseases', label: isUrdu ? 'بیماریاں' : 'Diseases', icon: BookOpen },
  ];

  const wellnessItems = [
    { id: 'first-aid', label: isUrdu ? 'ابتدائی طبی امداد (First Aid)' : 'First Aid Guide (9 Steps)', icon: BriefcaseMedical, desc: isUrdu ? 'جلنا، سانپ، دل کا دورہ و ایمرجنسی' : 'Burns, choking, heart attack & CPR' },
    { id: 'articles', label: isUrdu ? 'طبی مضامین' : 'Health Articles', icon: FileText, desc: isUrdu ? 'بیماریوں پر آسان رہنمائی' : 'Easy-to-read health guides' },
    { id: 'exercises', label: isUrdu ? 'روزانہ ورزشیں (WHO)' : 'WHO Daily Exercises', icon: Dumbbell, desc: isUrdu ? 'واک، پٹھوں اور دل کی ورزش' : 'Simple daily fitness routines' },
    { id: 'happiness', label: isUrdu ? 'خوشی کے 4 اصول' : '4 Laws of Happiness', icon: Heart, desc: isUrdu ? 'ذہنی صحت اور خوش رہنے کی عادات' : 'Brain habits for daily happiness' },
    { id: 'stress', label: isUrdu ? 'تناؤ سے نجات' : 'Stress Relief & Breathing', icon: ShieldAlert, desc: isUrdu ? '60 سیکنڈ میں پرسکون ہونے کے طریقے' : '60-second calm & breathing timer' },
    { id: 'faq', label: isUrdu ? 'عام سوالات' : 'Patient FAQ', icon: HelpCircle, desc: isUrdu ? 'عام سوالات کے آسان جوابات' : 'Common questions & answers' },
  ];

  const allMobileNavItems = [...primaryNavItems, ...wellnessItems];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setWellnessDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWellnessActive = wellnessItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DDD2] shadow-xs transition-all print:hidden">
      {/* Top Emergency Ticker */}
      <div className="bg-[#58111A] text-[#FAF7F2] text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-300"></span>
            </span>
            <span className="text-amber-200 font-semibold tracking-wide uppercase text-[11px] shrink-0">
              {isUrdu ? 'پاکستان ایمرجنسی 24/7:' : 'Pakistan Emergency 24/7:'}
            </span>
            <span className="hidden sm:inline text-rose-100 truncate">
              {isUrdu
                ? 'ریسکیو 1122 | ایدھی 115 | چھیپا 1020 | NICVD | میو / پمز / ایل آر ایچ ایمرجنسی'
                : 'Rescue 1122 | Edhi: 115 | Chhipa: 1020 | NICVD: (021) 9920-1275 | Mayo / PIMS / LRH ER'}
            </span>
            <span className="sm:hidden text-rose-100 truncate">
              {isUrdu ? 'ایمبولینس: 1122 یا 115' : 'Dial Rescue 1122 or 115'}
            </span>
          </div>
          <button 
            onClick={onOpenEmergencyModal}
            className="text-amber-200 hover:text-white underline text-[11px] font-medium shrink-0 ml-3 flex items-center gap-1 cursor-pointer"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{isUrdu ? 'ایمرجنسی نمبرز' : 'Emergency Directory'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group select-none shrink-0 min-w-0"
          >
            <img
              src={carehubLogo}
              alt="CareHub Pakistan Logo"
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md shadow-[#722F37]/20 border border-[#D9C4B5] bg-[#FAF7F2] group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#4A121A] tracking-tight">CareHub</span>
                <span className="hidden xs:inline-block sm:inline-block text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] font-semibold tracking-wide border border-[#722F37]/20 whitespace-nowrap">
                  Pakistan • WHO
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#78615A] tracking-wide font-medium hidden sm:block truncate">
                {isUrdu ? 'صحت، ہسپتال اور AI میڈیکل ہب' : 'Health, Hospitals & AI Medical Hub'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-[#722F37] bg-[#EDE4DC] font-bold shadow-2xs'
                  : 'text-[#5A453F] hover:text-[#722F37] hover:bg-[#F2EAE2]'
              }`}
            >
              {isUrdu ? 'ہوم' : 'Overview'}
            </button>

            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#722F37] bg-[#EDE4DC] font-bold shadow-2xs'
                      : item.id === 'ai-consult'
                      ? 'text-[#722F37] bg-amber-50/80 border border-amber-200/70 hover:bg-amber-100/70'
                      : 'text-[#5A453F] hover:text-[#722F37] hover:bg-[#F2EAE2]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive || item.id === 'ai-consult' ? 'text-[#722F37]' : 'text-[#8E7972]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Wellness & WHO Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setWellnessDropdownOpen(prev => !prev)}
                className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isWellnessActive
                    ? 'text-[#722F37] bg-[#EDE4DC] font-bold shadow-2xs'
                    : 'text-[#5A453F] hover:text-[#722F37] hover:bg-[#F2EAE2]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWellnessActive ? 'text-[#722F37]' : 'text-[#8E7972]'}`} />
                <span>{isUrdu ? 'فلاح و صحت' : 'Wellness & WHO'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${wellnessDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {wellnessDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#DFCFC2] p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {wellnessItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#FAF0E6] text-[#722F37]'
                            : 'hover:bg-[#FAF7F2] text-[#4A121A]'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive ? 'bg-[#722F37] text-white' : 'bg-[#F5EFEB] text-[#722F37]'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{item.label}</span>
                          <span className="text-[10px] text-[#78615A] block">{item.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* English <-> Urdu Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-[#FAF0E6] border border-[#D9C4B5] hover:border-[#722F37] text-[#4A121A] text-[11px] sm:text-xs font-bold shadow-2xs transition-all cursor-pointer shrink-0"
              title="Switch between English and Urdu (اردو)"
              aria-label="Toggle English and Urdu language"
            >
              <Languages className="w-3.5 h-3.5 text-[#722F37]" />
              <span className={lang === 'en' ? 'text-[#722F37]' : 'text-[#8C766F]'}>EN</span>
              <span className="text-[#C9B7AA]">/</span>
              <span className={lang === 'ur' ? 'text-[#722F37]' : 'text-[#8C766F]'}>اردو</span>
            </button>

            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 px-2.5 py-2 rounded-lg bg-white border border-[#E4D7CC] text-[#634E47] hover:text-[#722F37] hover:border-[#722F37]/40 text-sm shadow-2xs transition-all cursor-pointer group"
              title="Global Search (Ctrl+K)"
              aria-label="Search CareHub"
            >
              <Search className="w-4 h-4 text-[#8C766F] group-hover:text-[#722F37]" />
              <span className="hidden lg:inline text-xs text-[#8C766F]">{isUrdu ? 'تلاش...' : 'Search...'}</span>
            </button>

            {/* Mobile & Tablet Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#5A453F] hover:bg-[#EDE4DC] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E8DDD2] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#722F37] bg-[#EDE4DC] font-semibold'
                  : 'text-[#5A453F] hover:bg-[#F2EAE2]'
              }`}
            >
              {isUrdu ? 'ہوم / اوور ویو' : 'Overview'}
            </button>
            {allMobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer text-left ${
                    isActive
                      ? 'text-[#722F37] bg-[#EDE4DC] font-semibold'
                      : 'text-[#5A453F] hover:bg-[#F2EAE2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#722F37]' : 'text-[#8E7972]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8DDD2] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergencyModal();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-semibold text-sm cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{isUrdu ? 'پاکستان 24/7 ایمرجنسی ہاٹ لائنز' : 'Pakistan 24/7 Emergency Hotlines'}</span>
            </button>
            <div className="flex justify-between text-xs text-[#78615A] pt-2 px-1">
              <button onClick={() => handleNavClick('terms')} className="hover:underline">Terms of Service</button>
              <button onClick={() => handleNavClick('privacy')} className="hover:underline">Privacy Policy</button>
              <button onClick={() => handleNavClick('sitemap')} className="hover:underline">Sitemap & Robots</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
