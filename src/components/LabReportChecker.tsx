import React, { useState } from 'react';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LabReportCheckerProps {
  onAskAiWithLabReport?: (summaryPrompt: string) => void;
}

type StatusType = 'normal' | 'borderline' | 'high' | 'empty';

interface MarkerResult {
  status: StatusType;
  labelEn: string;
  labelUr: string;
  noteEn: string;
  noteUr: string;
}

export const LabReportChecker: React.FC<LabReportCheckerProps> = ({ onAskAiWithLabReport }) => {
  const { isUrdu } = useLanguage();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [hba1c, setHba1c] = useState<string>('5.9');
  const [fastingGlucose, setFastingGlucose] = useState<string>('104');
  const [ldl, setLdl] = useState<string>('118');
  const [triglycerides, setTriglycerides] = useState<string>('145');
  const [hemoglobin, setHemoglobin] = useState<string>('13.8');
  const [platelets, setPlatelets] = useState<string>('210000');
  const [creatinine, setCreatinine] = useState<string>('0.95');
  const [alt, setAlt] = useState<string>('32');

  const analyzeHba1c = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v < 5.7) return { status: 'normal', labelEn: 'Normal (< 5.7%)', labelUr: 'نارمل (< 5.7%)', noteEn: 'Optimal 3-month glycemic control per WHO criteria.', noteUr: 'ڈبلیو ایچ او کے مطابق گزشتہ 3 ماہ کی شوگر بالکل نارمل ہے۔' };
    if (v < 6.5) return { status: 'borderline', labelEn: 'Prediabetes (5.7 - 6.4%)', labelUr: 'پری ذیابیطس (5.7 - 6.4%)', noteEn: 'Early insulin resistance. Adopt low-GI diet & 15-min post-meal walks.', noteUr: 'ابتدائی انسولین مزاحمت۔ کم گلائسیمک غذا اور کھانے کے بعد 15 منٹ چہل قدمی شروع کریں۔' };
    return { status: 'high', labelEn: 'Diabetic Range (≥ 6.5%)', labelUr: 'ذیابیطس رینج (≥ 6.5%)', noteEn: 'Meets WHO Diabetes threshold. Consult endocrinologist & review medications.', noteUr: 'ڈبلیو ایچ او ذیابیطس معیار کے مطابق زیادہ ہے۔ فوراً معالج سے مشورہ کریں۔' };
  };

  const analyzeGlucose = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v < 70) return { status: 'high', labelEn: 'Hypoglycemia (< 70 mg/dL)', labelUr: 'کم شوگر (< 70)', noteEn: 'Low blood sugar alert! Consume 15g fast carbs immediately if symptomatic.', noteUr: 'خون میں شوگر خطرناک حد تک کم ہے! علامات ہوں تو فوراً میٹھا لیں۔' };
    if (v <= 99) return { status: 'normal', labelEn: 'Normal (70 - 99 mg/dL)', labelUr: 'نارمل (70 - 99)', noteEn: 'Healthy WHO fasting plasma glucose.', noteUr: 'فاسٹنگ شوگر صحت مند حد میں ہے۔' };
    if (v <= 125) return { status: 'borderline', labelEn: 'Impaired Fasting (100 - 125)', labelUr: 'بارڈر لائن (100 - 125)', noteEn: 'Prediabetes range. Replace white flour/sugar with barley & fiber.', noteUr: 'بارڈر لائن شوگر۔ سفید آٹا اور چینی ترک کر کے جو اور فائبر استعمال کریں۔' };
    return { status: 'high', labelEn: 'High / Diabetic (≥ 126 mg/dL)', labelUr: 'زیادہ (≥ 126)', noteEn: 'Exceeds WHO fasting threshold. Schedule HbA1c & physician consultation.', noteUr: 'ڈبلیو ایچ او معیار سے زیادہ ہے۔ ایچ بی اے 1 سی اور ڈاکٹر سے معائنہ کروائیں۔' };
  };

  const analyzeLdl = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v < 100) return { status: 'normal', labelEn: 'Optimal (< 100 mg/dL)', labelUr: 'بہترین (< 100)', noteEn: 'Low atherosclerotic plaque burden.', noteUr: 'دل اور شریانوں کے لیے بہترین سطح۔' };
    if (v <= 159) return { status: 'borderline', labelEn: 'Borderline High (100 - 159)', labelUr: 'معتدل زیادہ (100 - 159)', noteEn: 'Limit vanaspati ghee & fried foods; add ispaghol husk & walnuts.', noteUr: 'گھی اور تلی چیزیں کم کریں؛ اسپغول اور اخروٹ شامل کریں۔' };
    return { status: 'high', labelEn: 'High Risk (≥ 160 mg/dL)', labelUr: 'زیادہ خطرہ (≥ 160)', noteEn: 'Elevated cardiovascular risk. Discuss statin/lipid protocol with doctor.', noteUr: 'دل کے امراض کا خطرہ۔ کارڈیالوجسٹ سے کولیسٹرول علاج پر مشورہ کریں۔' };
  };

  const analyzeTrig = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v < 150) return { status: 'normal', labelEn: 'Normal (< 150 mg/dL)', labelUr: 'نارمل (< 150)', noteEn: 'Healthy triglyceride metabolism.', noteUr: 'ٹرائی گلیسرائیڈ نارمل سطح پر ہیں۔' };
    if (v <= 199) return { status: 'borderline', labelEn: 'Borderline High (150 - 199)', labelUr: 'بارڈر لائن (150 - 199)', noteEn: 'Cut sugary drinks, mithai, and refined rice portions.', noteUr: 'میٹھے مشروبات، مٹھائی اور چاول کم کریں۔' };
    return { status: 'high', labelEn: 'High (≥ 200 mg/dL)', labelUr: 'زیادہ (≥ 200)', noteEn: 'Risk of fatty liver & metabolic syndrome. Focus on omega-3 & cardio.', noteUr: 'فیٹی لیور کا خطرہ۔ مچھلی کا تیل (اومیگا 3) اور روزانہ واک کریں۔' };
  };

  const analyzeHb = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    const lowCutoff = gender === 'male' ? 13.0 : 12.0;
    const highCutoff = gender === 'male' ? 17.5 : 15.5;
    if (v < 8.0) return { status: 'high', labelEn: 'Severe Anemia (< 8.0 g/dL)', labelUr: 'شدید خون کی کمی (< 8.0)', noteEn: 'Urgent medical evaluation required per WHO anemia guidelines.', noteUr: 'شدید انیمیا! فوری ڈاکٹر سے رجوع کریں۔' };
    if (v < lowCutoff) return { status: 'borderline', labelEn: `Low / Anemia (< ${lowCutoff})`, labelUr: `خون کی کمی (< ${lowCutoff})`, noteEn: 'Evaluate iron/ferritin & Vitamin B12; boost spinach, lentils, and dates.', noteUr: 'آئرن اور بی 12 ٹیسٹ کروائیں؛ پالک، دالیں اور کھجور کھائیں۔' };
    if (v <= highCutoff) return { status: 'normal', labelEn: 'Normal WHO Range', labelUr: 'نارمل رینج', noteEn: 'Healthy oxygen-carrying hemoglobin level.', noteUr: 'ہیموگلوبن بالکل صحت مند سطح پر ہے۔' };
    return { status: 'borderline', labelEn: 'Elevated Hemoglobin', labelUr: 'زیادہ ہیموگلوبن', noteEn: 'Verify hydration status or consult hematology if persistently high.', noteUr: 'پانی کی کمی چیک کریں یا معالج سے مشورہ کریں۔' };
  };

  const analyzePlatelets = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v < 50000) return { status: 'high', labelEn: 'Critical Low (< 50,000)', labelUr: 'خطرناک کمی (< 50,000)', noteEn: 'High bleeding risk (Dengue warning). Visit 24/7 Hospital ER immediately.', noteUr: 'ڈینگی/خون بہنے کا شدید خطرہ! فوراً ایمرجنسی ہسپتال جائیں۔' };
    if (v < 150000) return { status: 'borderline', labelEn: 'Low (50k - 149k)', labelUr: 'کم پلیٹ لیٹس', noteEn: 'Monitor CBC every 24h if fever present; maintain strict ORS hydration.', noteUr: 'بخار ہو تو ہر 24 گھنٹے بعد سی بی سی کروائیں اور او آر ایس پئیں۔' };
    if (v <= 450000) return { status: 'normal', labelEn: 'Normal (150k - 450k)', labelUr: 'نارمل (150k - 450k)', noteEn: 'Healthy clotting & platelet count.', noteUr: 'پلیٹ لیٹس کی تعداد بالکل نارمل ہے۔' };
    return { status: 'borderline', labelEn: 'Elevated (> 450,000)', labelUr: 'زیادہ (> 450,000)', noteEn: 'Can occur post-infection or inflammation; re-test with physician.', noteUr: 'انفیکشن کے بعد بڑھ سکتے ہیں؛ ڈاکٹر سے مشورہ کریں۔' };
  };

  const analyzeCreatinine = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    const upper = gender === 'male' ? 1.3 : 1.1;
    if (v <= upper && v >= 0.6) return { status: 'normal', labelEn: 'Normal Kidney Function', labelUr: 'نارمل گردے کی کارکردگی', noteEn: 'Healthy renal filtration rate.', noteUr: 'گردوں کا فلٹریشن نظام صحت مند ہے۔' };
    if (v <= 1.8) return { status: 'borderline', labelEn: 'Mildly Elevated', labelUr: 'ہلکا اضافہ', noteEn: 'Avoid NSAID painkillers; check eGFR & stay well hydrated.', noteUr: 'درد کی گولیاں (NSAIDs) ترک کریں اور پانی کا استعمال بڑھائیں۔' };
    return { status: 'high', labelEn: 'High (> 1.8 mg/dL)', labelUr: 'زیادہ (> 1.8)', noteEn: 'Consult a Nephrologist (e.g., SIUT / tertiary renal wing) promptly.', noteUr: 'فوراً ماہرِ امراضِ گردہ (Nephrologist) سے رجوع کریں۔' };
  };

  const analyzeAlt = (valStr: string): MarkerResult => {
    const v = parseFloat(valStr);
    if (isNaN(v) || valStr.trim() === '') return { status: 'empty', labelEn: 'Not Entered', labelUr: 'درج نہیں', noteEn: '', noteUr: '' };
    if (v <= 40) return { status: 'normal', labelEn: 'Normal (≤ 40 U/L)', labelUr: 'نارمل (≤ 40)', noteEn: 'Healthy liver enzyme profile.', noteUr: 'جگر کے انزائمز نارمل ہیں۔' };
    if (v <= 80) return { status: 'borderline', labelEn: 'Mildly Raised (41 - 80)', labelUr: 'ہلکا اضافہ (41 - 80)', noteEn: 'Common in fatty liver; reduce fructose/fats & verify Hepatitis B/C screening.', noteUr: 'فیٹی لیور کی علامت ہو سکتی ہے؛ چکنائی کم کریں اور ہیپاٹائٹس اسکریننگ کروائیں۔' };
    return { status: 'high', labelEn: 'Elevated (> 80 U/L)', labelUr: 'کافی زیادہ (> 80)', noteEn: 'Active hepatic stress. Consult hepatologist & check viral hepatitis panel.', noteUr: 'جگر پر دباؤ۔ ہیپاٹالوجسٹ سے معائنہ اور ہیپاٹائٹس ٹیسٹ کروائیں۔' };
  };

  const markers = [
    { id: 'hba1c', title: 'HbA1c (%)', unit: '%', value: hba1c, setter: setHba1c, placeholder: '5.7', refRange: '< 5.7%', res: analyzeHba1c(hba1c) },
    { id: 'glucose', title: isUrdu ? 'فاسٹنگ شوگر (Fasting Glucose)' : 'Fasting Blood Glucose', unit: 'mg/dL', value: fastingGlucose, setter: setFastingGlucose, placeholder: '95', refRange: '70 - 99', res: analyzeGlucose(fastingGlucose) },
    { id: 'ldl', title: isUrdu ? 'ایل ڈی ایل کولیسٹرول (LDL)' : 'LDL Cholesterol', unit: 'mg/dL', value: ldl, setter: setLdl, placeholder: '95', refRange: '< 100', res: analyzeLdl(ldl) },
    { id: 'trig', title: isUrdu ? 'ٹرائی گلیسرائیڈز (Triglycerides)' : 'Triglycerides', unit: 'mg/dL', value: triglycerides, setter: setTriglycerides, placeholder: '130', refRange: '< 150', res: analyzeTrig(triglycerides) },
    { id: 'hb', title: isUrdu ? 'ہیموگلوبن (Hemoglobin)' : 'Hemoglobin (Hb)', unit: 'g/dL', value: hemoglobin, setter: setHemoglobin, placeholder: '14.0', refRange: gender === 'male' ? '13.0-17.5' : '12.0-15.5', res: analyzeHb(hemoglobin) },
    { id: 'platelets', title: isUrdu ? 'پلیٹ لیٹس (Platelets / Dengue)' : 'Platelets Count (CBC / Dengue)', unit: '/µL', value: platelets, setter: setPlatelets, placeholder: '200000', refRange: '150k-450k', res: analyzePlatelets(platelets) },
    { id: 'creatinine', title: isUrdu ? 'سیرم کریٹینائن (Kidney)' : 'Serum Creatinine (Kidney)', unit: 'mg/dL', value: creatinine, setter: setCreatinine, placeholder: '0.9', refRange: gender === 'male' ? '0.7-1.3' : '0.6-1.1', res: analyzeCreatinine(creatinine) },
    { id: 'alt', title: isUrdu ? 'اے ایل ٹی / ایس جی پی ٹی (Liver)' : 'ALT / SGPT (Liver)', unit: 'U/L', value: alt, setter: setAlt, placeholder: '28', refRange: '≤ 40', res: analyzeAlt(alt) },
  ];

  const handleAskAi = () => {
    if (!onAskAiWithLabReport) return;
    const summary = markers
      .filter(m => m.value.trim() !== '')
      .map(m => `${m.title}: ${m.value} ${m.unit} (${m.res.labelEn})`)
      .join(', ');
    const prompt = isUrdu
      ? `Meri blood test report ke mutabiq (Gender: ${gender}): ${summary}. Barah-e-karam WHO guidelines ke mutabiq mukammal tajzia, parhez aur aglay qadam Urdu mein batayein.`
      : `Please analyze my lab report values according to WHO clinical standards (Sex: ${gender}): ${summary}. Explain what needs attention, dietary steps, and which Pakistani specialist or follow-up test is recommended.`;
    onAskAiWithLabReport(prompt);
  };

  const handleClear = () => {
    setHba1c('');
    setFastingGlucose('');
    setLdl('');
    setTriglycerides('');
    setHemoglobin('');
    setPlatelets('');
    setCreatinine('');
    setAlt('');
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold border border-[#DFCFC2] flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5" />
              {isUrdu ? 'ڈبلیو ایچ او لیب رپورٹ چیکر' : 'WHO Lab Reference Analyzer'}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'اپنے بلڈ ٹیسٹ کی رپورٹ خود چیک کریں' : 'Blood Test & Lab Report Values Checker'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6E5A54] mt-0.5">
            {isUrdu
              ? 'اپنے CBC، شوگر (HbA1c)، کولیسٹرول، گردے اور جگر کے ٹیسٹ درج کر کے فوری ڈبلیو ایچ او تجزیہ دیکھیں۔'
              : 'Enter values from your Pakistani diagnostic lab report (CBC, HbA1c, Lipid, Renal, LFT) for instant WHO normal vs risk classification.'}
          </p>
        </div>

        {/* Sex & Reset controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#D9C4B5] text-xs font-bold">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                gender === 'male' ? 'bg-[#722F37] text-white shadow-2xs' : 'text-[#5F4B44]'
              }`}
            >
              {isUrdu ? 'مرد' : 'Male'}
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                gender === 'female' ? 'bg-[#722F37] text-white shadow-2xs' : 'text-[#5F4B44]'
              }`}
            >
              {isUrdu ? 'خاتون' : 'Female'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl border border-[#D9C4B5] hover:bg-[#FAF7F2] text-[#78615A] cursor-pointer"
            title={isUrdu ? 'تمام خانے صاف کریں' : 'Clear all fields'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Input + Live Interpretation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markers.map((m) => {
          const badgeColors =
            m.res.status === 'normal'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : m.res.status === 'borderline'
              ? 'bg-amber-100 text-amber-900 border-amber-200'
              : m.res.status === 'high'
              ? 'bg-rose-100 text-rose-900 border-rose-200'
              : 'bg-gray-100 text-gray-600 border-gray-200';

          return (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-2.5 hover:border-[#722F37]/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="min-w-0">
                  <label className="text-xs font-bold text-[#4A121A] block">{m.title}</label>
                  <span className="text-[11px] text-[#78615A]">
                    WHO Ref: <strong>{m.refRange}</strong> {m.unit}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <input
                    type="number"
                    step="any"
                    value={m.value}
                    onChange={(e) => m.setter(e.target.value)}
                    placeholder={m.placeholder}
                    className="w-28 sm:w-24 px-2.5 py-1.5 rounded-xl bg-white border border-[#D9C4B5] text-xs sm:text-sm font-bold text-[#4A121A] text-right focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                  />
                  <span className="text-[11px] font-medium text-[#78615A] min-w-[2.5rem]">{m.unit}</span>
                </div>
              </div>

              {m.res.status !== 'empty' && (
                <div className="pt-2 border-t border-[#E8DDD2] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${badgeColors}`}>
                      {m.res.status === 'normal' && <CheckCircle2 className="w-3 h-3" />}
                      {m.res.status === 'borderline' && <AlertTriangle className="w-3 h-3" />}
                      {m.res.status === 'high' && <AlertOctagon className="w-3 h-3" />}
                      <span>{isUrdu ? m.res.labelUr : m.res.labelEn}</span>
                    </span>
                  </div>
                  <p className={`text-xs text-[#5F4B44] leading-relaxed ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
                    {isUrdu ? m.res.noteUr : m.res.noteEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom AI Action */}
      {onAskAiWithLabReport && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#58111A] to-[#722F37] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="font-serif font-bold text-base text-[#FAF7F2]">
              {isUrdu ? 'AI ڈاکٹر سے مکمل لیب رپورٹ تجزیہ کروائیں' : 'Want a Personalized Medical Explanation?'}
            </h4>
            <p className="text-xs text-rose-100">
              {isUrdu
                ? 'اپنی تمام درج کردہ رپورٹس براہِ راست AI میڈیکل کنسلٹنٹ کو بھیجیں۔'
                : 'Send these exact lab numbers directly to our AI Medical Consultant for WHO-aligned advice.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAskAi}
            className="px-5 py-2.5 rounded-xl bg-white text-[#4A121A] hover:bg-amber-100 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#722F37]" />
            <span>{isUrdu ? 'AI سے رپورٹ پر مشورہ لیں' : 'Analyze Report with AI Consultant'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
