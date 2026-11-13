import React, { useState, useEffect } from 'react';
import { Baby, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EpiDose {
  id: string;
  ageEn: string;
  ageUr: string;
  vaccines: string;
  preventsEn: string;
  preventsUr: string;
}

const EPI_SCHEDULE: EpiDose[] = [
  {
    id: 'epi-birth',
    ageEn: 'At Birth (پیدائش کے فوراً بعد)',
    ageUr: 'پیدائش کے وقت',
    vaccines: 'BCG + OPV-0 + Hep-B (Birth Dose)',
    preventsEn: 'Tuberculosis (TB), Polio, Hepatitis B transmission',
    preventsUr: 'ٹی بی، پولیو اور ہیپاٹائٹس بی سے تحفظ',
  },
  {
    id: 'epi-6w',
    ageEn: '6 Weeks (ڈیڑھ ماہ)',
    ageUr: '6 ہفتے (ڈیڑھ ماہ)',
    vaccines: 'Penta-1 + PCV-1 + Rota-1 + OPV-1',
    preventsEn: 'Diphtheria, Pertussis, Tetanus, Pneumonia & Rotavirus Diarrhea',
    preventsUr: 'خناق، کالی کھانسی، تشنج، نمونیا اور دست',
  },
  {
    id: 'epi-10w',
    ageEn: '10 Weeks (اڑھائی ماہ)',
    ageUr: '10 ہفتے (اڑھائی ماہ)',
    vaccines: 'Penta-2 + PCV-2 + Rota-2 + OPV-2',
    preventsEn: 'Second booster for Pneumonia, Diarrhea & 5-in-1 childhood diseases',
    preventsUr: 'نمونیا، روٹا وائرس اور 5 مہلک بیماریوں کا دوسرا ڈوز',
  },
  {
    id: 'epi-14w',
    ageEn: '14 Weeks (ساڑھے تین ماہ)',
    ageUr: '14 ہفتے (ساڑھے تین ماہ)',
    vaccines: 'Penta-3 + PCV-3 + IPV-1 + OPV-3',
    preventsEn: 'Injectable & Oral Polio immunity + Full Pentavalent protection',
    preventsUr: 'پولیو (ٹیکہ اور قطرے) اور پینٹا ویلنٹ کورس کی تکمیل',
  },
  {
    id: 'epi-9m',
    ageEn: '9 Months (نو ماہ)',
    ageUr: '9 ماہ',
    vaccines: 'Measles-Rubella (MR-1) + Typhoid (TCV) + IPV-2',
    preventsEn: 'Measles, Rubella & Drug-Resistant Typhoid Fever (common in Pakistan)',
    preventsUr: 'خسرہ، روبیلا اور ٹائیفائیڈ بخار سے بچاؤ',
  },
  {
    id: 'epi-15m',
    ageEn: '15 Months (پندرہ ماہ)',
    ageUr: '15 ماہ',
    vaccines: 'Measles-Rubella (MR-2 Booster)',
    preventsEn: 'Lifelong immunity against Measles outbreaks',
    preventsUr: 'خسرہ کے خلاف عمر بھر کا تحفظ',
  },
];

export const VaccinationScheduleSection: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('carehub_epi_completed');
      return saved ? JSON.parse(saved) : ['epi-birth', 'epi-6w'];
    } catch {
      return ['epi-birth', 'epi-6w'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carehub_epi_completed', JSON.stringify(completedIds));
    } catch {
      // ignore
    }
  }, [completedIds]);

  const toggleDose = (id: string) => {
    setCompletedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F0E6DD] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isUrdu ? 'ڈبلیو ایچ او اور ای پی آئی پاکستان شیڈول' : 'WHO & Pakistan EPI Free Immunization Schedule'}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'بچوں کے حفاظتی ٹیکے اور زچہ و بچہ کی صحت' : 'Child Vaccination Tracker & Maternal Wellness Guide'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6E5A54] mt-0.5">
            {isUrdu
              ? 'پاکستان کے تمام سرکاری ہسپتالوں اور EPI مراکز پر یہ تمام ٹیکے بالکل مفت لگائے جاتے ہیں۔'
              : 'All EPI vaccines listed below are available 100% free across government hospitals & BHUs in all 7 Pakistani cities.'}
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#FAF0E6] border border-[#DFCFC2] text-xs font-bold text-[#722F37] shrink-0">
          {completedIds.length} / {EPI_SCHEDULE.length} {isUrdu ? 'مراحل مکمل' : 'Milestones Completed'}
        </div>
      </div>

      {/* EPI Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EPI_SCHEDULE.map((item) => {
          const done = completedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleDose(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                done
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#722F37]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Baby className="w-4 h-4 text-[#722F37] shrink-0" />
                  <span className="text-xs font-bold text-[#722F37]">
                    {isUrdu ? item.ageUr : item.ageEn}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#4A121A]">
                  {item.vaccines}
                </h4>
                <p className="text-xs text-[#5F4B44]">
                  {isUrdu ? item.preventsUr : item.preventsEn}
                </p>
              </div>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                done ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-[#C9B7AA]'
              }`}>
                {done && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* WHO Maternal Care Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF0E6] to-amber-50 border border-[#DFCFC2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
            <Heart className="w-4 h-4 text-rose-700" />
            <span>{isUrdu ? 'زچہ و بچہ (WHO Maternal Guidelines)' : 'WHO Antenatal & Maternal Care Protocol'}</span>
          </div>
          <p className="text-xs text-[#5F4B44] leading-relaxed">
            {isUrdu
              ? 'حمل کے دوران ڈبلیو ایچ او کم از کم 8 طبی معائنے، روزانہ آئرن اور فولک ایسڈ سپلیمنٹ، اور ٹی ٹی (Tetanus) کے 2 حفاظتی ٹیکوں کی سفارش کرتا ہے۔'
              : 'WHO recommends a minimum of 8 antenatal clinic contacts, daily Iron + Folic Acid (IFA) supplementation to prevent maternal anemia, blood pressure screening for pre-eclampsia, and Tetanus Toxoid (TT) immunization.'}
          </p>
        </div>
      </div>
    </div>
  );
};
