import React, { useState } from 'react';
import { Calculator, Droplet, Flame, Ruler, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhoCalculatorsSuite: React.FC = () => {
  const { isUrdu } = useLanguage();

  // 1. HbA1c <-> eAG Converter
  const [hba1cVal, setHba1cVal] = useState<string>('6.2');
  const parsedA1c = parseFloat(hba1cVal) || 0;
  const estimatedAvgGlucose = Math.max(0, Math.round(28.7 * parsedA1c - 46.7));

  // 2. Daily Calorie (TDEE) & Water Needs
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(34);
  const [weightKg, setWeightKg] = useState<number>(76);
  const [heightCm, setHeightCm] = useState<number>(173);
  const [activityMult, setActivityMult] = useState<number>(1.375);

  const bmr = sex === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = Math.round(bmr * activityMult);
  const waterLiters = (weightKg * 0.035).toFixed(1);
  const proteinGrams = Math.round(weightKg * 1.1);

  // 3. Waist-to-Height Ratio (WHO Visceral Risk)
  const [waistCm, setWaistCm] = useState<number>(86);
  const whtr = heightCm > 0 ? +(waistCm / heightCm).toFixed(2) : 0;
  const whtrStatus =
    whtr < 0.43
      ? { label: isUrdu ? 'کم وزن خطرہ' : 'Underweight Risk', color: 'text-amber-700 bg-amber-50 border-amber-200' }
      : whtr < 0.50
      ? { label: isUrdu ? 'صحت مند (WHO Ideal < 0.50)' : 'Healthy WHO Ideal (< 0.50)', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' }
      : whtr < 0.58
      ? { label: isUrdu ? 'معتدل خطرہ (0.50 - 0.57)' : 'Increased Visceral Risk (0.50 - 0.57)', color: 'text-amber-800 bg-amber-50 border-amber-200' }
      : { label: isUrdu ? 'زیادہ کارڈیو میٹابولک خطرہ (≥ 0.58)' : 'High Cardiometabolic Risk (≥ 0.58)', color: 'text-rose-800 bg-rose-50 border-rose-200' };

  // 4. Asian WHO BMI & Ideal Body Weight
  const heightM = heightCm / 100;
  const asianBmi = heightM > 0 ? +(weightKg / (heightM * heightM)).toFixed(1) : 0;
  const idealMinKg = +(18.5 * heightM * heightM).toFixed(1);
  const idealMaxKg = +(22.9 * heightM * heightM).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F0E6DD] pb-4">
        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold border border-[#DFCFC2] inline-flex items-center gap-1">
          <Calculator className="w-3.5 h-3.5" />
          {isUrdu ? 'ڈبلیو ایچ او ہیلتھ کیلکولیٹرز' : 'WHO Clinical Calculators'}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A] mt-1.5">
          {isUrdu ? 'ساؤتھ ایشین بی ایم آئی، کیلوریز اور شوگر کیلکولیٹر' : 'Metabolic, Calorie & South Asian WHO Calculators'}
        </h3>
        <p className="text-xs sm:text-sm text-[#6E5A54] mt-0.5">
          {isUrdu
            ? 'جنوبی ایشیائی باشندوں کے لیے ڈبلیو ایچ او کے مخصوص معیارات کے مطابق اپنا وزن، کیلوریز، پانی اور شوگر اوسط معلوم کریں۔'
            : 'Precision formulas calibrated to WHO South Asian BMI cutoffs (Normal 18.5 - 22.9 kg/m²), HbA1c average glucose, and daily hydration.'}
        </p>
      </div>

      {/* Shared Body Inputs */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'جنس' : 'Sex'}</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as 'male' | 'female')}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
            >
              <option value="male">{isUrdu ? 'مرد' : 'Male'}</option>
              <option value="female">{isUrdu ? 'خاتون' : 'Female'}</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'عمر (سال)' : 'Age (yrs)'}</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'وزن (کلوگرام)' : 'Weight (kg)'}</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'قد (سینٹی میٹر)' : 'Height (cm)'}</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'کمر (cm)' : 'Waist (cm)'}</label>
            <input
              type="number"
              value={waistCm}
              onChange={(e) => setWaistCm(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#5F4B44] mb-1">{isUrdu ? 'روزانہ جسمانی سرگرمی' : 'Daily Activity Level (WHO Physical Activity)'}</label>
          <select
            value={activityMult}
            onChange={(e) => setActivityMult(Number(e.target.value))}
            className="w-full md:w-auto max-w-full px-3 py-2 rounded-xl bg-white border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
          >
            <option value={1.2}>{isUrdu ? 'کم حرکت (Desk job)' : 'Sedentary (Desk job, minimal exercise)'}</option>
            <option value={1.375}>{isUrdu ? 'ہلکی سرگرمی (ہفتے میں 1-3 دن واک)' : 'Lightly Active (WHO Light Walk 1-3 days/wk)'}</option>
            <option value={1.55}>{isUrdu ? 'معتدل سرگرمی (ہفتے میں 150-300 منٹ)' : 'Moderately Active (WHO 150-300 mins/wk Target)'}</option>
            <option value={1.725}>{isUrdu ? 'زیادہ سرگرمی (روزانہ ورزش)' : 'Very Active (Daily Intense Exercise)'}</option>
          </select>
        </div>
      </div>

      {/* 3 Result Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: TDEE, Protein & Water */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'روزانہ کیلوریز اور پانی' : 'Daily Energy & Water'}
            </span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#4A121A]">
            {tdee} <span className="text-xs font-sans font-normal text-[#78615A]">kcal / day</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0E6DD] text-xs">
            <div className="p-2.5 rounded-xl bg-[#FAF7F2]">
              <span className="text-[10px] text-[#78615A] block">Fat Loss Target</span>
              <strong className="text-[#4A121A]">{Math.max(1200, tdee - 400)} kcal</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2]">
              <span className="text-[10px] text-[#78615A] block">Daily Protein</span>
              <strong className="text-[#4A121A]">{proteinGrams} g / day</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200 font-semibold">
            <Droplet className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{isUrdu ? `تجویز کردہ پانی: ${waterLiters} لیٹر` : `Recommended Water: ${waterLiters} Liters/day`}</span>
          </div>
        </div>

        {/* Card 2: South Asian BMI & Waist-to-Height */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'ساؤتھ ایشین BMI اور کمر تناسب' : 'Asian BMI & Waist Ratio'}
            </span>
            <Ruler className="w-4 h-4 text-[#722F37]" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-serif font-bold text-[#4A121A]">{asianBmi}</span>
              <span className="text-xs text-[#78615A] ml-1">BMI</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-serif font-bold text-[#722F37]">{whtr}</span>
              <span className="text-xs text-[#78615A] ml-1">WHtR</span>
            </div>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${whtrStatus.color}`}>
            {whtrStatus.label}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5F4B44] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DDD2]">
            <Scale className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
            <span>
              {isUrdu
                ? `آئیڈیل وزن (WHO Asian): ${idealMinKg} - ${idealMaxKg} kg`
                : `Ideal Asian Weight: ${idealMinKg} - ${idealMaxKg} kg`}
            </span>
          </div>
        </div>

        {/* Card 3: HbA1c to eAG Converter */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'HbA1c سے اوسط شوگر کنورٹر' : 'HbA1c → Avg Glucose (eAG)'}
            </span>
            <Calculator className="w-4 h-4 text-[#722F37]" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#78615A] block mb-1">
              {isUrdu ? 'اپنا HbA1c (%) درج کریں:' : 'Enter HbA1c (%):'}
            </label>
            <input
              type="number"
              step="0.1"
              min="3"
              max="16"
              value={hba1cVal}
              onChange={(e) => setHba1cVal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-sm font-bold text-[#4A121A]"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#FAF0E6] border border-[#DFCFC2]">
            <span className="text-[11px] text-[#722F37] font-semibold block">
              {isUrdu ? '3 ماہ کی تخمینی اوسط شوگر:' : 'Estimated 90-Day Average Glucose:'}
            </span>
            <strong className="text-xl font-serif text-[#4A121A]">
              {estimatedAvgGlucose} <span className="text-xs font-sans font-normal">mg/dL</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
