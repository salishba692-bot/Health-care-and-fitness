import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, X, MapPin } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/hospitalsData';
import { useLanguage } from '../context/LanguageContext';
import { CITY_URDU } from '../data/urduTranslations';

interface EmergencyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmergencyContact {
  name: string;
  city: string;
  service: string;
  phone: string;
  speedDial: string;
  badge: string;
}

export const EmergencyDirectoryModal: React.FC<EmergencyDirectoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const { isUrdu } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('All');

  if (!isOpen) return null;

  const emergencyContacts: EmergencyContact[] = [
    {
      name: isUrdu ? 'نیشنل ریسکیو 1122 (سرکاری)' : 'National Rescue 1122',
      city: 'All Pakistan',
      service: isUrdu ? 'ملک گیر سرکاری ایمبولینس اور ہنگامی طبی امداد' : 'Official Disaster, Ambulance & Medical Trauma',
      phone: '1122',
      speedDial: '1122',
      badge: isUrdu ? 'مفت 24/7' : 'Govt Free 24/7'
    },
    {
      name: isUrdu ? 'ایدھی فاؤنڈیشن ایمبولینس' : 'Edhi Foundation Ambulance',
      city: 'All Pakistan',
      service: isUrdu ? 'پاکستان بھر میں 24/7 مفت ایمرجنسی ایمبولینس' : 'Nationwide 24/7 Emergency Ambulance Fleet',
      phone: '115',
      speedDial: '115',
      badge: isUrdu ? 'مفت فلاحی' : 'Free Charity'
    },
    {
      name: isUrdu ? 'چھیپا ایمبولینس سروس' : 'Chhipa Ambulance Service',
      city: 'Karachi',
      service: isUrdu ? 'فوری ٹریفک حادثہ اور ہنگامی ایمبولینس' : 'Rapid Road Accident & Emergency Transport',
      phone: '1020',
      speedDial: '1020',
      badge: isUrdu ? 'فلاحی' : 'Charity'
    },
    {
      name: isUrdu ? 'این آئی سی وی ڈی (NICVD) دل کا ایمرجنسی سینٹر' : 'NICVD Chest Pain & Heart ER',
      city: 'Karachi',
      service: isUrdu ? 'مفت انجیو پلاسٹی اور ہارٹ اٹیک کی فوری ایمرجنسی' : 'Primary Angioplasty & Acute Cardiac Emergency',
      phone: '+92 21 9920 1275',
      speedDial: '02199201275',
      badge: isUrdu ? 'امراضِ قلب 24/7' : 'Cardiology 24/7'
    },
    {
      name: isUrdu ? 'آغا خان یونیورسٹی ہسپتال ایمرجنسی' : 'Aga Khan University Hospital ER',
      city: 'Karachi',
      service: isUrdu ? 'JCI تصدیق شدہ لیول 1 ٹراما اور ایمرجنسی سینٹر' : 'JCI-Accredited Level-1 Trauma Center',
      phone: '+92 21 3486 1090',
      speedDial: '02134861090',
      badge: isUrdu ? 'نجی' : 'Private Tertiary'
    },
    {
      name: isUrdu ? 'انڈس ہسپتال کورنگی ایمرجنسی' : 'Indus Hospital Korangi ER',
      city: 'Karachi',
      service: isUrdu ? '100% مفت ایمرجنسی، آپریشن اور ٹراما علاج' : '100% Free Emergency & Trauma Wing',
      phone: '+92 21 111 111 446',
      speedDial: '021111111446',
      badge: isUrdu ? 'مفت فلاحی' : 'Free Charity'
    },
    {
      name: isUrdu ? 'پنجاب انسٹی ٹیوٹ آف کارڈیالوجی (PIC)' : 'Punjab Institute of Cardiology (PIC) ER',
      city: 'Lahore',
      service: isUrdu ? '24/7 ہارٹ اٹیک اور انجیو پلاسٹی ایمرجنسی' : '24/7 Acute Cardiac & Angioplasty Center',
      phone: '+92 42 9920 3051',
      speedDial: '04299203051',
      badge: isUrdu ? 'امراضِ قلب 24/7' : 'Cardiology 24/7'
    },
    {
      name: isUrdu ? 'میو ہسپتال لاہور ٹراما ایمرجنسی' : 'Mayo Hospital Trauma & ER',
      city: 'Lahore',
      service: isUrdu ? 'بڑا سرکاری ٹیچنگ اور ٹراما ایمرجنسی سینٹر' : 'Flagship Public Tertiary Emergency Wing',
      phone: '+92 42 9921 1100',
      speedDial: '04299211100',
      badge: isUrdu ? 'سرکاری' : 'Public Tertiary'
    },
    {
      name: isUrdu ? 'پمز (PIMS) ہسپتال اسلام آباد ایمرجنسی' : 'PIMS Hospital Emergency',
      city: 'Islamabad & Rawalpindi',
      service: isUrdu ? 'وفاقی دارالحکومت کا 24/7 ٹراما اور برن سینٹر' : 'Federal Capital 24/7 Trauma & Burn Center',
      phone: '+92 51 926 1170',
      speedDial: '0519261170',
      badge: isUrdu ? 'سرکاری' : 'Public Federal'
    },
    {
      name: isUrdu ? 'شفا انٹرنیشنل ہسپتال ایمرجنسی' : 'Shifa International Hospital ER',
      city: 'Islamabad & Rawalpindi',
      service: isUrdu ? 'فالج اور ایمرجنسی کا جدید ترین سینٹر' : 'JCI-Accredited Tertiary Emergency & Stroke Care',
      phone: '+92 51 846 4646',
      speedDial: '0518464646',
      badge: isUrdu ? 'نجی' : 'Private Tertiary'
    },
    {
      name: isUrdu ? 'الائیڈ ہسپتال فیصل آباد ایمرجنسی' : 'Allied Hospital Faisalabad ER',
      city: 'Faisalabad',
      service: isUrdu ? 'علاقائی لیول 1 ٹراما اور ایمرجنسی سینٹر' : 'Regional Level-1 Trauma & Emergency Hub',
      phone: '+92 41 921 0082',
      speedDial: '0419210082',
      badge: isUrdu ? 'سرکاری' : 'Public Tertiary'
    },
    {
      name: isUrdu ? 'لیڈی ریڈنگ ہسپتال (LRH) پشاور' : 'Lady Reading Hospital (LRH) ER',
      city: 'Peshawar',
      service: isUrdu ? 'خیبر پختونخوا کا سب سے بڑا ٹراما اور دل کا ایمرجنسی مرکز' : 'KPK Primary Trauma & Cardiac Emergency',
      phone: '+92 91 921 1441',
      speedDial: '0919211441',
      badge: isUrdu ? 'سرکاری' : 'Public MTI'
    },
    {
      name: isUrdu ? 'نشتر ہسپتال ملتان ایمرجنسی' : 'Nishtar Hospital Multan ER',
      city: 'Multan',
      service: isUrdu ? 'جنوبی پنجاب کا بڑا ایمرجنسی اور برن سینٹر' : 'South Punjab Emergency & Burns Wing',
      phone: '+92 61 920 0240',
      speedDial: '0619200240',
      badge: isUrdu ? 'سرکاری' : 'Public Tertiary'
    },
    {
      name: isUrdu ? 'سول ہسپتال کوئٹہ ایمرجنسی' : 'Sandeman Civil Hospital ER',
      city: 'Quetta',
      service: isUrdu ? 'بلوچستان کا مرکزی ٹراما اور ایمرجنسی سینٹر' : 'Balochistan Main Trauma & Emergency Care',
      phone: '+92 81 920 2020',
      speedDial: '0819202020',
      badge: isUrdu ? 'سرکاری' : 'Public Tertiary'
    },
    {
      name: isUrdu ? 'امنگ ذہنی صحت ہیلپ لائن' : 'Umang Mental Health Support',
      city: 'All Pakistan',
      service: isUrdu ? '24/7 مفت ذہنی دباؤ اور بحران کی مشاورت' : '24/7 Clinical Crisis & Suicide Prevention Helpline',
      phone: '+92 311 7786264',
      speedDial: '03117786264',
      badge: isUrdu ? 'مشاورت' : 'Crisis Support'
    },
  ];

  const filteredContacts = emergencyContacts.filter(
    c => selectedCity === 'All' || c.city === 'All Pakistan' || c.city === selectedCity
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D9C4B5] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-[#58111A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-400 flex items-center justify-center text-amber-200 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {isUrdu ? 'پاکستان 24/7 ایمرجنسی ہیلپ لائن نمبرز' : 'Pakistan 24/7 Emergency Hotlines'}
              </h3>
              <p className="text-xs text-rose-200">
                {isUrdu
                  ? '7 بڑے شہروں میں براہِ راست کال کرنے کے لیے کسی بھی بٹن پر کلک کریں'
                  : 'Tap any button to initiate direct call across 7 major cities'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-rose-200 hover:text-white hover:bg-rose-900/50 rounded-xl cursor-pointer"
            aria-label={isUrdu ? 'ایمرجنسی ڈائریکٹری بند کریں' : 'Close emergency modal'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Filter Bar */}
        <div className="px-5 py-3 bg-white border-b border-[#E8DDD2] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCity('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCity === 'All'
                ? 'bg-[#722F37] text-white shadow-2xs'
                : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#F2EAE2]'
            }`}
          >
            {isUrdu ? 'پورا پاکستان' : 'All Pakistan'}
          </button>
          {PAKISTAN_CITIES.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#722F37] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#F2EAE2]'
              }`}
            >
              {isUrdu ? (CITY_URDU[city] || city) : city}
            </button>
          ))}
        </div>

        {/* Contacts List */}
        <div className="p-5 overflow-y-auto space-y-2.5">
          {filteredContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white rounded-2xl border border-[#E0D2C7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rose-400 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#4A121A]">{contact.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {isUrdu ? (CITY_URDU[contact.city] || contact.city) : contact.city}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                    {contact.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#78615A] mt-0.5">{contact.service}</p>
                <span className="text-xs font-mono font-bold text-[#722F37] mt-1 block">{contact.phone}</span>
              </div>

              <a
                href={`tel:${contact.speedDial}`}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 shadow-2xs transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'ابھی کال کریں' : 'Call Now'}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8DDD2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#78615A]">
          <span>
            {isUrdu
              ? '1122 پر کال کرتے وقت ہمیشہ اپنا شہر، مکمل پتہ اور مریض کی حالت واضح بتائیں۔'
              : 'Always provide your exact city, sector/street, and patient condition to 1122 dispatch.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EDE4DC] border border-[#D9C4B5] rounded-xl font-semibold cursor-pointer self-end sm:self-auto"
          >
            {isUrdu ? 'بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
