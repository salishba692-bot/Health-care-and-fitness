import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  X,
  RotateCcw
} from 'lucide-react';
import { PAKISTAN_CITIES, KARACHI_ZONES } from '../data/hospitalsData';
import { PakistanCity, KarachiZone } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CITY_URDU } from '../data/urduTranslations';

interface HealthAssessmentScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onNavigateToCity?: (city: PakistanCity) => void;
}

export const HealthAssessmentScanner: React.FC<HealthAssessmentScannerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onNavigateToCity
}) => {
  const { isUrdu } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [bpLevel, setBpLevel] = useState<string>('normal');
  const [sugarLevel, setSugarLevel] = useState<string>('normal');
  const [selectedCity, setSelectedCity] = useState<PakistanCity>('Karachi');
  const [selectedZone, setSelectedZone] = useState<KarachiZone>('Clifton & Defence');
  const [primaryConcern, setPrimaryConcern] = useState<string>('general');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  if (!isOpen) return null;

  const cityLabel = (c: PakistanCity) => (isUrdu ? CITY_URDU[c] || c : c);

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasResult(true);
    }, 900);
  };

  const handleReset = () => {
    setStep(1);
    setBpLevel('normal');
    setSugarLevel('normal');
    setPrimaryConcern('general');
    setHasResult(false);
  };

  const calculateRiskScore = () => {
    let score = 0;
    if (bpLevel === 'elevated') score += 2;
    if (bpLevel === 'high') score += 4;
    if (sugarLevel === 'prediabetic') score += 2;
    if (sugarLevel === 'diabetic') score += 4;
    if (primaryConcern === 'emergency') score += 3;

    if (score >= 6) {
      return {
        level: isUrdu ? 'فوری طبی توجہ درکار (WHO ترجیح)' : 'High Attention Required (WHO Priority)',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        advice: isUrdu
          ? 'ماہر ڈاکٹر سے فوری مشورے اور WHO کے مطابق طرزِ زندگی و ادویات کی ترتیب کی سفارش کی جاتی ہے۔'
          : 'Clinical specialist consultation and immediate WHO lifestyle + medical adjustments recommended.'
      };
    }
    if (score >= 3) {
      return {
        level: isUrdu ? 'معتدل امراضِ قلب و میٹابولک خطرہ' : 'Moderate Cardiometabolic Risk',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        advice: isUrdu
          ? 'WHO کے کم گلائسیمک (Low-GI) اور کم نمک والے غذائی پلان اپنائیں اور روزانہ وائٹلز ٹریک کریں۔'
          : 'Adopt WHO-compliant low-GI / low-sodium nutrition plans and track daily vitals closely.'
      };
    }
    return {
      level: isUrdu ? 'بہترین WHO صحت کا معیار' : 'Optimal WHO Cardiometabolic Health',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      advice: isUrdu
        ? 'آپ کی احتیاطی صحت بہترین ہے۔ ہفتے میں 150 تا 300 منٹ WHO ورزش اور متوازن غذا جاری رکھیں۔'
        : 'Your preventive profile looks solid. Maintain 150-300 mins/week of WHO physical activity and balanced whole foods.'
    };
  };

  const result = calculateRiskScore();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D9C4B5] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DDD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-[#4A121A] flex items-center justify-center text-amber-200 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                {isUrdu ? 'کیئر ہب WHO ہیلتھ اسکین' : 'CareHub WHO Health Scan'}
              </h3>
              <p className="text-xs text-[#78615A]">
                {isUrdu ? 'ذاتی طبی جائزہ اور پاکستان کے 7 شہروں کے ہسپتالوں کی رہنمائی' : 'Personalized Triage & Pakistan 7-City Hospital Route'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#78615A] hover:bg-[#F2EAE2] rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isScanning ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#722F37] border-t-transparent animate-spin mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#4A121A]">
                {isUrdu ? 'WHO صحت کے اشاریوں کا تجزیہ جاری ہے...' : 'Analyzing WHO Health Signals...'}
              </h4>
              <p className="text-xs text-[#78615A]">
                {isUrdu
                  ? `${cityLabel(selectedCity)} کے بڑے ہسپتالوں اور طبی غذائی پروٹوکول سے موازنہ کیا جا رہا ہے۔`
                  : `Calibrating against ${selectedCity} tertiary hospitals & clinical nutrition protocols.`}
              </p>
            </div>
          ) : !hasResult ? (
            <div className="space-y-5">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-[#722F37] uppercase tracking-wider">
                <span>{isUrdu ? `مرحلہ ${step} از 4` : `Step ${step} of 4`}</span>
                <span className="text-[#8C766F] font-normal">
                  {isUrdu ? 'WHO معیاری جانچ' : 'WHO Standard Assessment'}
                </span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#4A121A]">
                    {isUrdu ? 'آپ کے بلڈ پریشر کی موجودہ صورتحال کیا ہے؟' : 'What is your current blood pressure status?'}
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        id: 'normal',
                        label: isUrdu ? 'نارمل (< 120/80 mmHg)' : 'Normal (< 120/80 mmHg)',
                        sub: isUrdu ? 'مسلسل صحت مند WHO ریڈنگز' : 'Consistently healthy WHO resting readings'
                      },
                      {
                        id: 'elevated',
                        label: isUrdu ? 'پری ہائپرٹینشن (120-139 / 80-89)' : 'Prehypertension (120-139 / 80-89)',
                        sub: isUrdu ? 'قدرے زیادہ یا اتار چڑھاؤ والا بلڈ پریشر' : 'Slightly high or fluctuating'
                      },
                      {
                        id: 'high',
                        label: isUrdu ? 'ہائی بلڈ پریشر (≥ 140/90 mmHg)' : 'Hypertension (≥ 140/90 mmHg)',
                        sub: isUrdu ? 'تشخیص شدہ یا بلڈ پریشر کی دوا جاری ہے' : 'Diagnosed or taking blood pressure medication'
                      },
                      {
                        id: 'unknown',
                        label: isUrdu ? 'حال ہی میں چیک نہیں کروایا' : 'Not recently checked',
                        sub: isUrdu ? 'گزشتہ 6 ماہ میں پیمائش نہیں کی گئی' : 'Have not measured in the past 6 months'
                      }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setBpLevel(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          bpLevel === opt.id 
                            ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-xs' 
                            : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white'
                        }`}
                      >
                        <div>
                          <strong className="text-xs sm:text-sm text-[#4A121A] block">{opt.label}</strong>
                          <span className="text-[11px] text-[#78615A]">{opt.sub}</span>
                        </div>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          bpLevel === opt.id ? 'border-[#722F37] bg-[#722F37]' : 'border-[#C9B7AA]'
                        }`}>
                          {bpLevel === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-bold hover:bg-[#58111A] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isUrdu ? 'اگلا سوال' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#4A121A]">
                    {isUrdu ? 'آپ کی بلڈ شوگر یا ذیابیطس کی تاریخ کیا ہے؟' : 'How would you describe your blood sugar or diabetes history?'}
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        id: 'normal',
                        label: isUrdu ? 'نارمل فاسٹنگ شوگر (< 100 mg/dL)' : 'Normal Fasting (< 100 mg/dL)',
                        sub: isUrdu ? 'ہائی شوگر کی کوئی تاریخ نہیں' : 'No history of high blood sugar'
                      },
                      {
                        id: 'prediabetic',
                        label: isUrdu ? 'پری ذیابیطس / بارڈر لائن (100-125 mg/dL)' : 'Prediabetic / Impaired Fasting (100-125 mg/dL)',
                        sub: isUrdu ? 'بارڈر لائن نمبرز یا خاندانی تاریخ' : 'Borderline numbers or family history'
                      },
                      {
                        id: 'diabetic',
                        label: isUrdu ? 'تشخیص شدہ ٹائپ 2 ذیابیطس (≥ 126 mg/dL)' : 'Diagnosed Type 2 Diabetes (≥ 126 mg/dL)',
                        sub: isUrdu ? 'میٹفارمن، انسولین یا شوگر کی ادویات جاری ہیں' : 'Taking Metformin, insulin or oral agents'
                      },
                      {
                        id: 'unknown',
                        label: isUrdu ? 'معلوم نہیں / کبھی ٹیسٹ نہیں کروایا' : 'Unsure / Never tested',
                        sub: isUrdu ? 'محفوظ WHO بنیادی سطح قائم کرنا چاہتے ہیں' : 'Want to establish a safe WHO baseline'
                      }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setSugarLevel(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          sugarLevel === opt.id 
                            ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-xs' 
                            : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white'
                        }`}
                      >
                        <div>
                          <strong className="text-xs sm:text-sm text-[#4A121A] block">{opt.label}</strong>
                          <span className="text-[11px] text-[#78615A]">{opt.sub}</span>
                        </div>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          sugarLevel === opt.id ? 'border-[#722F37] bg-[#722F37]' : 'border-[#C9B7AA]'
                        }`}>
                          {sugarLevel === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl border border-[#D9C4B5] text-xs font-semibold text-[#78615A] cursor-pointer"
                    >
                      {isUrdu ? 'واپس' : 'Back'}
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-bold hover:bg-[#58111A] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isUrdu ? 'اگلا سوال' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#4A121A]">
                    {isUrdu ? 'آپ پاکستان کے کس بڑے شہر میں مقیم ہیں؟' : 'Which major city in Pakistan are you located in?'}
                  </h4>
                  <p className="text-xs text-[#78615A]">
                    {isUrdu
                      ? 'ہم آپ کے شہر کے مستند 24/7 ایمرجنسی ہسپتالوں اور ماہر ڈاکٹروں سے رہنمائی کرتے ہیں۔'
                      : 'We match verified 24/7 emergency hospitals and tertiary specialists in your city.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PAKISTAN_CITIES.map(city => (
                      <div
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`p-3 rounded-xl border text-xs font-medium cursor-pointer flex items-center justify-between ${
                          selectedCity === city 
                            ? 'bg-white border-[#722F37] text-[#722F37] font-bold shadow-xs' 
                            : 'bg-[#FAF7F2] border-[#E8DDD2] text-[#5A453F] hover:bg-white'
                        }`}
                      >
                        <span>📍 {cityLabel(city)}</span>
                        {selectedCity === city && <CheckCircle2 className="w-4 h-4 text-[#722F37]" />}
                      </div>
                    ))}
                  </div>

                  {selectedCity === 'Karachi' && (
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-[#722F37] uppercase tracking-wider block mb-1.5">
                        {isUrdu ? 'کراچی کا علاقہ / ڈویژن (اختیاری):' : 'Karachi Area / Division (Optional):'}
                      </label>
                      <select
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value as KarachiZone)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-medium text-[#4A121A]"
                      >
                        {KARACHI_ZONES.map(z => (
                          <option key={z} value={z}>{z}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl border border-[#D9C4B5] text-xs font-semibold text-[#78615A] cursor-pointer"
                    >
                      {isUrdu ? 'واپس' : 'Back'}
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-bold hover:bg-[#58111A] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isUrdu ? 'آخری سوال' : 'Final Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#4A121A]">
                    {isUrdu ? 'آج آپ کی بنیادی طبی یا صحت کی ترجیح کیا ہے؟' : 'What is your primary wellness or medical priority today?'}
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        id: 'general',
                        label: isUrdu ? 'احتیاطی غذا اور WHO صحت کی نگرانی' : 'Preventive Nutrition & WHO Metric Tracking',
                        sub: isUrdu ? 'روزانہ خوراک، ورزش اور دائمی امراض سے بچاؤ' : 'Optimize daily diet, exercise, and prevent chronic disease'
                      },
                      {
                        id: 'bp_diet',
                        label: isUrdu ? 'ہائی بلڈ پریشر / DASH ڈائٹ پلان' : 'Hypertension / DASH Diet Plan',
                        sub: isUrdu ? 'نمک میں کمی (<1500mg) اور پوٹاشیم کا توازن' : 'Sodium restriction (<1500mg) and potassium optimization'
                      },
                      {
                        id: 'diabetes_diet',
                        label: isUrdu ? 'ٹائپ 2 ذیابیطس اور شوگر کنٹرول' : 'Type 2 Diabetes Glycemic Stabilization',
                        sub: isUrdu ? 'کم گلائسیمک پاکستانی خوراک اور کھانے کے بعد چہل قدمی' : 'Low-GI Pakistani meal plan and post-meal activity'
                      },
                      {
                        id: 'emergency',
                        label: isUrdu ? `${cityLabel(selectedCity)} میں فوری ہسپتال کیئر` : `Urgent Hospital Care in ${selectedCity}`,
                        sub: isUrdu ? 'فوری طبی معائنہ یا ایمرجنسی ماہر وارڈ' : 'Immediate medical triage or emergency specialist wing'
                      }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setPrimaryConcern(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          primaryConcern === opt.id 
                            ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-xs' 
                            : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white'
                        }`}
                      >
                        <div>
                          <strong className="text-xs sm:text-sm text-[#4A121A] block">{opt.label}</strong>
                          <span className="text-[11px] text-[#78615A]">{opt.sub}</span>
                        </div>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          primaryConcern === opt.id ? 'border-[#722F37] bg-[#722F37]' : 'border-[#C9B7AA]'
                        }`}>
                          {primaryConcern === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="px-4 py-2 rounded-xl border border-[#D9C4B5] text-xs font-semibold text-[#78615A] cursor-pointer"
                    >
                      {isUrdu ? 'واپس' : 'Back'}
                    </button>
                    <button
                      onClick={handleStartScan}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#722F37] to-[#4A121A] text-white text-xs font-bold hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>{isUrdu ? 'ہیلتھ اسکین چلائیں' : 'Run Health Scan'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-5 animate-in fade-in">
              {/* Risk Level Badge */}
              <div className={`p-5 rounded-2xl border ${result.color} space-y-1.5`}>
                <span className="text-xs uppercase font-bold tracking-wider">
                  {isUrdu ? 'WHO صحت کا ابتدائی تجزیہ' : 'WHO Health Triage Assessment'}
                </span>
                <h4 className="font-serif text-xl font-bold">{result.level}</h4>
                <p className="text-xs leading-relaxed">{result.advice}</p>
              </div>

              {/* Matched City Hospital */}
              <div className="p-4 bg-white rounded-2xl border border-[#E0D2C7] space-y-2">
                <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider block">
                  {isUrdu
                    ? `${cityLabel(selectedCity)}${selectedCity === 'Karachi' ? ` (${selectedZone})` : ''} میں تجویز کردہ علاج`
                    : `Recommended Care in ${selectedCity}${selectedCity === 'Karachi' ? ` (${selectedZone})` : ''}`}
                </span>
                <p className="text-xs text-[#5F4B44] leading-relaxed">
                  {isUrdu ? (
                    <>
                      آپ کے شہر اور صحت کے علامات کی بنیاد پر ہماری ڈائریکٹری میں <strong>{cityLabel(selectedCity)}</strong> کے مستند بڑے ہسپتال شامل ہیں جہاں کارڈیالوجی، شوگر اور 24/7 ایمرجنسی کی سہولیات موجود ہیں۔
                    </>
                  ) : (
                    <>
                      Based on your city and health markers, our directory features verified tertiary centers in <strong>{selectedCity}</strong> equipped with cardiology, endocrinology, and 24/7 emergency wings.
                    </>
                  )}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateToCity) {
                      onNavigateToCity(selectedCity);
                    } else {
                      onNavigateTab('hospitals');
                    }
                  }}
                  className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>
                    {isUrdu ? `${cityLabel(selectedCity)} کے مستند ہسپتال دیکھیں ←` : `Explore Verified Hospitals in ${selectedCity} →`}
                  </span>
                </button>
              </div>

              {/* Matched Nutrition Plan */}
              <div className="p-4 bg-white rounded-2xl border border-[#E0D2C7] space-y-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  {isUrdu ? 'تجویز کردہ طبی غذا' : 'Recommended Clinical Diet'}
                </span>
                <p className="text-xs text-[#5F4B44] leading-relaxed">
                  {sugarLevel === 'diabetic' || sugarLevel === 'prediabetic'
                    ? (isUrdu
                        ? 'ٹائپ 2 ذیابیطس گلائسیمک استحکام پلان: فائبر سے بھرپور جو کی روٹی اور کھانے کی صحیح ترتیب کے ساتھ۔'
                        : 'The Type 2 Diabetes Glycemic Stabilization Plan with high-fiber roti substitutes and meal sequencing.')
                    : bpLevel === 'elevated' || bpLevel === 'high'
                    ? (isUrdu
                        ? 'بلڈ پریشر DASH پروٹوکول: روزانہ <1500mg نمک کی حد اور قدرتی نائٹریٹ والی سبزیاں۔'
                        : 'The Hypertension DASH Cardiovascular Protocol with <1500mg sodium limit and nitrate vasodilators.')
                    : (isUrdu
                        ? 'کولیسٹرول اور دل کی حفاظت کا طبی غذائی پلان۔'
                        : 'The Lipid Shield & Cardiovascular Maintenance Nutrition Plan.')}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTab('nutrition');
                  }}
                  className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>{isUrdu ? 'تجویز کردہ ڈائٹ پلان کھولیں ←' : 'Open Recommended Diet Protocol →'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl border border-[#D9C4B5] text-xs font-semibold text-[#78615A] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'دوبارہ اسکین کریں' : 'Retake Scan'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab('ai-consult');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold hover:bg-amber-200 cursor-pointer"
                  >
                    {isUrdu ? 'AI طبی مشیر سے پوچھیں' : 'Ask AI Consultant'}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab('dashboard');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-bold hover:bg-[#58111A] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{isUrdu ? 'وائٹلز ٹریک کریں' : 'Track Vitals'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

