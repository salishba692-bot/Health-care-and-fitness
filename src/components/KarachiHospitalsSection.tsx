import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Search, 
  ExternalLink, 
  Star, 
  Bed, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Building2,
  X,
  Compass
} from 'lucide-react';
import { Hospital } from '../types';
import { KARACHI_ZONES, PAKISTAN_CITIES } from '../data/hospitalsData';
import { useLanguage } from '../context/LanguageContext';
import { CITY_URDU, HOSPITAL_TYPE_URDU, SPECIALTY_URDU } from '../data/urduTranslations';

interface KarachiHospitalsSectionProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital | null) => void;
  onOpenEmergencyModal: () => void;
  initialCity?: string;
  initialSpecialty?: string;
}

export const KarachiHospitalsSection: React.FC<KarachiHospitalsSectionProps> = ({
  hospitals,
  selectedHospital,
  onSelectHospital,
  onOpenEmergencyModal,
  initialCity = 'All',
  initialSpecialty = 'All'
}) => {
  const { isUrdu } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(initialSpecialty);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSelectedCity(initialCity);
    setSelectedZone('All');
  }, [initialCity]);

  useEffect(() => {
    setSelectedSpecialty(initialSpecialty);
  }, [initialSpecialty]);

  const specialtiesList = [
    'All',
    'Cardiology',
    'Emergency & Trauma',
    'Oncology',
    'Nephrology',
    'Pediatrics',
    'Diabetology',
    'Neurology',
    'Orthopedics',
    'General Surgery'
  ];

  const getCityLabel = (city: string) => (isUrdu ? (CITY_URDU[city] || city) : city);
  const getTypeLabel = (type: string) => (isUrdu ? (HOSPITAL_TYPE_URDU[type] || type) : type);
  const getSpecialtyLabel = (spec: string) => (isUrdu ? (SPECIALTY_URDU[spec] || spec) : spec);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(h => {
      // City filter
      if (selectedCity !== 'All' && h.city !== selectedCity) return false;

      // Zone filter (only if city is Karachi or All)
      if (selectedCity === 'Karachi' || selectedCity === 'All') {
        if (selectedZone !== 'All' && h.zone !== selectedZone) return false;
      }
      
      // Specialty filter
      if (selectedSpecialty !== 'All') {
        const hasSpecialty = h.specialties.some(s => 
          s.toLowerCase().includes(selectedSpecialty.toLowerCase())
        );
        if (!hasSpecialty) return false;
      }

      // Type filter
      if (selectedType !== 'All' && h.type !== selectedType) return false;

      // Emergency filter
      if (emergencyOnly && !h.emergencyAvailable) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          h.name.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          (h.zone && h.zone.toLowerCase().includes(q)) ||
          h.specialties.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [hospitals, selectedCity, selectedZone, selectedSpecialty, selectedType, emergencyOnly, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header and Quick Emergency Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider">
              {isUrdu ? 'پاکستان نیشنل ہسپتال ڈائریکٹری' : 'Pakistan Hospital Directory'}
            </span>
            <span className="text-xs text-[#78615A] font-medium">
              {isUrdu ? 'WHO اور PMDC تصدیق شدہ' : 'Verified 24/7 Emergency Info'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A121A] mt-1.5">
            {isUrdu
              ? 'پاکستان کے 7 بڑے شہروں کے مستند اور بہترین ہسپتال'
              : 'Top Hospitals Across 7 Major Cities of Pakistan'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5A54] mt-1 max-w-2xl">
            {isUrdu
              ? 'کراچی، لاہور، اسلام آباد و راولپنڈی، فیصل آباد، پشاور، ملتان اور کوئٹہ کے سرکاری، فلاحی (مفت) اور نجی 24/7 ایمرجنسی و ٹراما سینٹرز تک براہِ راست رسائی۔'
              : 'Find trusted public, free charity, and private hospitals with 24/7 emergency care across Karachi, Lahore, Islamabad & Rawalpindi, Faisalabad, Peshawar, Multan, and Quetta.'}
          </p>
        </div>

        <button
          onClick={onOpenEmergencyModal}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#892A3A] to-[#58111A] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer self-start md:self-auto"
        >
          <PhoneCall className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>{isUrdu ? 'پاکستان 24/7 ایمرجنسی اور 1122 ایمبولینس' : 'Pakistan 24/7 ER & Ambulance 1122'}</span>
        </button>
      </div>

      {/* 7 Major Cities of Pakistan Horizontal Scroller */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#5F4B44] px-1">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#722F37]" />
            {isUrdu ? 'پاکستان کا شہر منتخب کریں (7 بڑے مراکز):' : 'Select Pakistan City (7 Major Hubs):'}
          </span>
          <span className="text-[#8C766F] font-normal hidden sm:inline">
            {isUrdu ? 'فلٹر کرنے کے لیے شہر پر کلک کریں' : 'Click city to filter'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCity('All');
              setSelectedZone('All');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCity === 'All'
                ? 'bg-[#722F37] text-white shadow-xs'
                : 'bg-white text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
            }`}
          >
            {isUrdu ? `پورا پاکستان (${hospitals.length})` : `All Pakistan (${hospitals.length})`}
          </button>

          {PAKISTAN_CITIES.map((city) => {
            const count = hospitals.filter(h => h.city === city).length;
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedZone('All');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#722F37] text-white shadow-xs'
                    : 'bg-white text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
                }`}
              >
                📍 {getCityLabel(city)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* If Karachi is selected or All, show Karachi Sub-Divisions */}
      {(selectedCity === 'Karachi' || selectedCity === 'All') && (
        <div className="p-3 bg-[#FAF0E6]/60 rounded-2xl border border-[#E4D7CC] space-y-1.5">
          <div className="text-[11px] font-bold text-[#722F37] uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#722F37]" />
            <span>{isUrdu ? 'کراچی کے 7 شہری علاقوں کا ذیلی فلٹر:' : 'Karachi 7 Urban Zones Sub-Filter:'}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedZone('All')}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedZone === 'All'
                  ? 'bg-[#722F37] text-white'
                  : 'bg-white text-[#5F4B44] border border-[#D9C4B5]'
              }`}
            >
              {isUrdu ? 'تمام علاقے' : 'All Zones'}
            </button>
            {KARACHI_ZONES.map((zone) => {
              const isSelected = selectedZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#722F37] text-white'
                      : 'bg-white text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Search Bar Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E0D2C7] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#8C766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isUrdu
                  ? 'ہسپتال کا نام، شعبہ یا شہر تلاش کریں...'
                  : 'Search by hospital name, doctor specialty, or city...'
              }
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs sm:text-sm text-[#4A121A] placeholder:text-[#9B8881] focus:outline-hidden focus:ring-1 focus:ring-[#722F37] focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C766F] hover:text-[#4A121A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Specialty Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              aria-label={isUrdu ? 'طبی شعبے کے مطابق ہسپتال فلٹر کریں' : 'Filter hospitals by medical specialty'}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs font-medium text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
            >
              <option value="All">{getSpecialtyLabel('All')}</option>
              {specialtiesList.slice(1).map(s => (
                <option key={s} value={s}>{getSpecialtyLabel(s)}</option>
              ))}
            </select>
          </div>

          {/* Type Dropdown (Private / Public / Charity) */}
          <div className="lg:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label={isUrdu ? 'ہسپتال کی قسم کے مطابق فلٹر کریں' : 'Filter hospitals by facility type'}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs font-medium text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
            >
              <option value="All">{getTypeLabel('All')}</option>
              <option value="Private">{getTypeLabel('Private')}</option>
              <option value="Trust / Charity">{getTypeLabel('Trust / Charity')}</option>
              <option value="Public / Semi-Govt">{getTypeLabel('Public / Semi-Govt')}</option>
            </select>
          </div>

          {/* Emergency 24/7 Toggle */}
          <div className="lg:col-span-2 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#4A121A]">
              <input
                type="checkbox"
                checked={emergencyOnly}
                onChange={(e) => setEmergencyOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#722F37] accent-[#722F37] focus:ring-0"
              />
              <span className="flex items-center gap-1 text-rose-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isUrdu ? 'صرف 24/7 ایمرجنسی' : '24/7 ER Only'}
              </span>
            </label>
          </div>
        </div>

        {/* Results Count & Reset Filter */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F0E6DD] text-xs text-[#78615A]">
          <span>
            {isUrdu ? (
              <>پاکستان بھر میں <strong className="text-[#4A121A]">{filteredHospitals.length}</strong> ہسپتال دستیاب ہیں</>
            ) : (
              <>Showing <strong className="text-[#4A121A]">{filteredHospitals.length}</strong> hospitals matching criteria across Pakistan</>
            )}
          </span>
          {(selectedCity !== 'All' || selectedZone !== 'All' || selectedSpecialty !== 'All' || selectedType !== 'All' || emergencyOnly || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedZone('All');
                setSelectedSpecialty('All');
                setSelectedType('All');
                setEmergencyOnly(false);
                setSearchQuery('');
              }}
              className="text-[#722F37] font-semibold hover:underline"
            >
              {isUrdu ? 'تمام فلٹرز صاف کریں' : 'Reset all filters'}
            </button>
          )}
        </div>
      </div>

      {/* Hospitals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHospitals.map((hospital) => {
          return (
            <div
              key={hospital.id}
              className="bg-white rounded-3xl p-5 border border-[#E0D2C7] shadow-xs hover:shadow-md hover:border-[#722F37] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* City & Type Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2] truncate">
                      📍 {getCityLabel(hospital.city)}
                    </span>
                    {hospital.zone && (
                      <span className="text-[10px] text-[#78615A] bg-[#F5EFEB] px-2 py-0.5 rounded-full border border-[#E8DDD2]">
                        {hospital.zone.split('&')[0]}
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    hospital.type === 'Trust / Charity' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : hospital.type === 'Public / Semi-Govt'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-[#EDE4DC] text-[#5A453F]'
                  }`}>
                    {getTypeLabel(hospital.type)}
                  </span>
                </div>

                {/* Hospital Name & Rating */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4A121A] group-hover:text-[#722F37] transition-colors line-clamp-1">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#78615A]">
                    <div className="flex items-center text-amber-700 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                      <span>{hospital.rating}</span>
                    </div>
                    <span>•</span>
                    <span>
                      {hospital.reviewsCount} {isUrdu ? 'تصدیق شدہ مریضوں کے تبصرے' : 'verified patient reviews'}
                    </span>
                  </div>
                </div>

                {/* Address */}
                <p className="text-xs text-[#6E5A54] line-clamp-2 leading-relaxed">
                  {hospital.address}
                </p>

                {/* Bed Capacity & OPD Timings */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#78615A] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE3DA]">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>{hospital.bedCapacity} {isUrdu ? 'بستر' : 'Beds'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-[#722F37]" />
                    <span className="truncate">{hospital.opdTimings.split('(')[0]}</span>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hospital.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] bg-[#F5EFEB] text-[#5A453F] px-2 py-0.5 rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="text-[10px] bg-[#FAF7F2] text-[#8C766F] px-1.5 py-0.5 rounded-md font-medium">
                        +{hospital.specialties.length - 3} {isUrdu ? 'مزید' : 'more'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#F0E6DD] flex items-center justify-between gap-2">
                <a
                  href={`tel:${hospital.emergencyPhone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                  title={isUrdu ? 'براہِ راست ایمرجنسی ہیلپ لائن' : 'Direct Emergency Hotline'}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-700" />
                  <span>{isUrdu ? 'ایمرجنسی کال' : 'Call ER'}</span>
                </a>

                <button
                  onClick={() => onSelectHospital(hospital)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
                >
                  {isUrdu ? 'تفصیل دیکھیں' : 'View Details'}
                </button>

                <a
                  href={hospital.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-[#D9C4B5] hover:bg-[#FAF7F2] text-[#722F37] transition-colors cursor-pointer"
                  title={isUrdu ? 'گوگل میپس پر راستہ دیکھیں' : 'Directions on Google Maps'}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Hospitals Matched Fallback */}
      {filteredHospitals.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E0D2C7] p-8 space-y-3">
          <Building2 className="w-12 h-12 text-[#B8A59C] mx-auto opacity-60" />
          <h3 className="text-base font-bold text-[#4A121A]">
            {isUrdu ? 'منتخب فلٹر کے مطابق کوئی ہسپتال نہیں ملا' : 'No hospitals match the selected filter'}
          </h3>
          <p className="text-xs text-[#78615A] max-w-md mx-auto">
            {isUrdu
              ? 'شہر، طبی شعبہ یا زون کا فلٹر تبدیل کریں یا تمام ہسپتال دیکھنے کے لیے فلٹرز ری سیٹ کریں۔'
              : 'Try resetting your city, specialty, or zone selection, or disable the 24/7 ER filter to explore all available centers.'}
          </p>
          <button
            onClick={() => {
              setSelectedCity('All');
              setSelectedZone('All');
              setSelectedSpecialty('All');
              setSelectedType('All');
              setEmergencyOnly(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#722F37] text-white text-xs font-semibold cursor-pointer"
          >
            {isUrdu ? 'فلٹرز ری سیٹ کریں' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div 
            className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D9C4B5] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-[#E8DDD2] flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37]">
                    📍 {getCityLabel(selectedHospital.city)} {selectedHospital.zone ? `• ${selectedHospital.zone}` : ''}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {getTypeLabel(selectedHospital.type)}
                  </span>
                  {selectedHospital.emergencyAvailable && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      {isUrdu ? '24/7 ایمرجنسی دستیاب' : '24/7 Emergency'}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">{selectedHospital.name}</h3>
                <p className="text-xs text-[#78615A] mt-1">{selectedHospital.address}</p>
              </div>
              <button 
                onClick={() => onSelectHospital(null)}
                className="p-2 text-[#78615A] hover:bg-[#F2EAE2] rounded-xl cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
              
              {/* Emergency Hotline Alert Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    {isUrdu ? '24/7 ایمرجنسی ہیلپ لائن' : '24/7 Emergency Helpline'}
                  </span>
                  <span className="text-lg font-serif font-bold text-[#4A121A]">
                    {selectedHospital.emergencyPhone}
                  </span>
                  <p className="text-[11px] text-[#78615A]">
                    {isUrdu ? 'جنرل فون لائن:' : 'General phone:'} {selectedHospital.phone}
                  </p>
                </div>
                <a
                  href={`tel:${selectedHospital.emergencyPhone}`}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'ابھی ایمرجنسی کال کریں' : 'Call Emergency Now'}</span>
                </a>
              </div>

              {/* Consultation Fee & Bed Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E0D2C7]">
                  <span className="text-xs text-[#78615A] block">
                    {isUrdu ? 'او پی ڈی (OPD) مشورہ فیس' : 'OPD Doctor Fee'}
                  </span>
                  <span className="text-base font-bold text-[#4A121A] mt-0.5 block">{selectedHospital.feeRange}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E0D2C7]">
                  <span className="text-xs text-[#78615A] block">
                    {isUrdu ? 'بستروں کی گنجائش' : 'Hospital Beds'}
                  </span>
                  <span className="text-base font-bold text-[#4A121A] mt-0.5 block">
                    {selectedHospital.bedCapacity} {isUrdu ? 'انڈور بستر' : 'Total Beds'}
                  </span>
                </div>
              </div>

              {/* Key Medical Specialties */}
              <div>
                <h4 className="text-xs font-bold text-[#722F37] uppercase tracking-wider mb-2.5">
                  {isUrdu ? 'طبی شعبہ جات اور ماہرین' : 'Medical Departments'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.specialties.map((spec, i) => (
                    <span key={i} className="text-xs bg-white text-[#4A121A] px-3 py-1.5 rounded-xl border border-[#D9C4B5] font-medium">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities & Accreditations */}
              <div>
                <h4 className="text-xs font-bold text-[#722F37] uppercase tracking-wider mb-2.5">
                  {isUrdu ? 'جدید طبی سہولیات اور آلات' : 'Available Facilities'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedHospital.facilities.map((facility, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#5F4B44] bg-white p-2.5 rounded-xl border border-[#E8DDD2]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timings */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#E0D2C7] text-xs text-[#6E5A54] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#722F37] shrink-0" />
                <span>
                  <strong>{isUrdu ? 'او پی ڈی اوقات: ' : 'OPD Timings: '}</strong>
                  {selectedHospital.opdTimings}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#E8DDD2] flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-[#78615A]">
                {isUrdu ? 'PMDC اور ہیلتھ بورڈ سے تصدیق شدہ' : 'PMDC & Health Board Verified'}
              </span>
              <div className="flex gap-2">
                <a
                  href={selectedHospital.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EDE4DC] border border-[#D9C4B5] text-[#4A121A] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#722F37]" />
                  <span>{isUrdu ? 'گوگل میپس لوکیشن' : 'Google Maps Navigation'}</span>
                </a>
                <button
                  onClick={() => onSelectHospital(null)}
                  className="px-4 py-2 bg-[#722F37] hover:bg-[#58111A] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {isUrdu ? 'بند کریں' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
