import React, { useState } from 'react';
import { 
  Salad, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Flame, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Coffee, 
  Utensils, 
  Apple, 
  Clock,
  Calculator
} from 'lucide-react';
import { NutritionPlan, DailyMealPlan, MealItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DAY_URDU, getTranslatedNutritionPlan, NUTRITION_URDU_MAP } from '../data/urduTranslations';

interface NutritionPlansSectionProps {
  plans: NutritionPlan[];
  selectedPlan: NutritionPlan | null;
  onSelectPlan: (plan: NutritionPlan) => void;
}

export const NutritionPlansSection: React.FC<NutritionPlansSectionProps> = ({
  plans,
  selectedPlan,
  onSelectPlan
}) => {
  const { isUrdu } = useLanguage();
  const rawPlan = selectedPlan || plans[0];
  const currentPlan = getTranslatedNutritionPlan(rawPlan, isUrdu);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  // Custom Macro Calculator State
  const [userWeight, setUserWeight] = useState<number>(75);
  const [activityFactor, setActivityFactor] = useState<number>(1.375); // lightly active
  const [healthGoal, setHealthGoal] = useState<'diabetes' | 'bp' | 'cholesterol' | 'weightLoss'>('diabetes');

  // Simple Harris-Benedict approximate calorie calculation
  const calculatedMaintenance = Math.round(userWeight * 22 * activityFactor);
  const targetCalories = healthGoal === 'weightLoss' 
    ? calculatedMaintenance - 400 
    : healthGoal === 'diabetes' 
    ? calculatedMaintenance - 250 
    : calculatedMaintenance;

  const currentDailySchedule: DailyMealPlan = 
    currentPlan.weeklySchedule.find(d => d.day === selectedDay) || currentPlan.weeklySchedule[0];

  const handlePrint = () => {
    window.print();
  };

  const mealLabelMap: Record<string, string> = {
    Breakfast: 'ناشتہ',
    'Morning Snack': 'صبح کا ہلکا ناشتہ',
    Lunch: 'دوپہر کا کھانا',
    'Evening Snack': 'شام کا ناشتہ',
    Dinner: 'رات کا کھانا',
  };

  const renderMealCard = (mealType: string, item: MealItem, icon: React.ReactNode) => {
    return (
      <div className="bg-white p-5 rounded-2xl border border-[#E0D2C7] shadow-2xs hover:border-[#722F37] transition-all space-y-3">
        <div className="flex items-center justify-between border-b border-[#F0E6DD] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FAF0E6] text-[#722F37]">
              {icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#722F37]">
              {isUrdu ? (mealLabelMap[mealType] || mealType) : mealType}
            </span>
          </div>
          <span className="text-xs font-bold text-[#4A121A] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8DDD2]">
            {item.calories} {isUrdu ? 'کیلوریز' : 'kcal'}
          </span>
        </div>

        <div>
          <h4 className="font-serif text-base font-bold text-[#4A121A]">
            {item.name}
          </h4>
          <p className="text-xs text-[#78615A] mt-1">
            <strong>{isUrdu ? 'مقدار:' : 'Portion:'}</strong> {item.portion}
          </p>
        </div>

        {/* Macros Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DDD2]">
          <div>
            <span className="text-[#8C766F] block">{isUrdu ? 'پروٹین' : 'Protein'}</span>
            <strong className="text-[#4A121A]">{item.protein}g</strong>
          </div>
          <div>
            <span className="text-[#8C766F] block">{isUrdu ? 'کاربز' : 'Carbs'}</span>
            <strong className="text-[#4A121A]">{item.carbs}g</strong>
          </div>
          <div>
            <span className="text-[#8C766F] block">{isUrdu ? 'چکنائی' : 'Fats'}</span>
            <strong className="text-[#4A121A]">{item.fats}g</strong>
          </div>
        </div>

        <div className="text-[11px] text-[#5F4B44] bg-[#FAF0E6]/60 p-2.5 rounded-xl border border-[#DFCFC2] leading-relaxed">
          <strong className="text-[#722F37]">{isUrdu ? 'طبی فائدہ: ' : 'Why It Helps: '}</strong>
          {item.clinicalBenefits}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider">
              {isUrdu ? 'طبی غذائی رہنمائی (کلینیکل نیوٹریشن)' : 'Healthy Eating Guides'}
            </span>
            <span className="text-xs text-[#78615A] font-medium">
              {isUrdu ? 'پاکستانی گھریلو کھانوں کے مطابق' : 'Made for Pakistani Home Kitchens'}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'سائنسی غذائی پلان اور خصوصی پرہیز' : 'Simple Diet Plans for Health Conditions'}
          </h1>
          <p className="text-sm text-[#6E5A54] mt-1 max-w-2xl">
            {isUrdu
              ? 'شوگر (ذیابیطس) کو کنٹرول کرنے، ہائی بلڈ پریشر کے لیے نمک کم کرنے (DASH) اور کولیسٹرول گھٹانے کے لیے ڈاکٹروں کے تجویز کردہ پاکستانی غذائی پلان۔'
              : 'Doctor-approved Pakistani meal plans made to keep blood sugar steady, lower high blood pressure with less salt, and reduce high cholesterol.'}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-[#58111A] text-xs font-semibold shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Printer className="w-4 h-4 text-[#722F37]" />
          <span>{isUrdu ? 'ڈائٹ پلان پرنٹ / محفوظ کریں' : 'Print / Save Plan'}</span>
        </button>
      </div>

      {/* Plan Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {plans.map((raw) => {
          const plan = getTranslatedNutritionPlan(raw, isUrdu);
          const isSelected = raw.id === rawPlan.id;
          const conditionLabel = isUrdu ? (NUTRITION_URDU_MAP[raw.id]?.targetCondition || raw.targetCondition) : raw.targetCondition;
          return (
            <div
              key={raw.id}
              onClick={() => {
                onSelectPlan(raw);
                setSelectedDay('Monday');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-md'
                  : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  raw.targetCondition === 'Diabetes'
                    ? 'bg-amber-100 text-amber-800'
                    : raw.targetCondition.includes('BP')
                    ? 'bg-rose-100 text-rose-800'
                    : raw.targetCondition.includes('Cholesterol')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {conditionLabel}
                </span>
                <h3 className="font-serif text-base font-bold text-[#4A121A] mt-2 group-hover:text-[#722F37]">
                  {plan.title}
                </h3>
                <p className="text-xs text-[#78615A] mt-1 line-clamp-2">
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-[#F0E6DD] flex items-center justify-between text-xs font-semibold text-[#722F37]">
                <span>{plan.dailyCalorieTarget}</span>
                <span>{isUrdu ? 'منتخب کریں →' : 'Select Plan →'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Plan Detail Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-8">
        
        {/* Plan Header & Macro Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-[#F0E6DD] pb-6">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'منتخب شدہ طبی غذائی پروٹوکول' : 'Selected Diet Guide'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A]">
              {currentPlan.title}
            </h2>
            <p className="text-sm text-[#6E5A54] leading-relaxed">
              {currentPlan.overview}
            </p>
          </div>

          {/* Daily Calorie & Macro Target Card */}
          <div className="lg:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DDD2] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5F4B44] uppercase tracking-wider">
                {isUrdu ? 'روزانہ مطلوبہ کیلوریز' : 'Daily Calorie Goal'}
              </span>
              <span className="text-base font-serif font-bold text-[#722F37]">{currentPlan.dailyCalorieTarget}</span>
            </div>

            {/* Visual Macro Split Bars */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold text-[#5F4B44]">
                <span>{isUrdu ? 'کاربز:' : 'Carbs:'} {currentPlan.macronutrientRatio.carbs}%</span>
                <span>{isUrdu ? 'پروٹین:' : 'Protein:'} {currentPlan.macronutrientRatio.protein}%</span>
                <span>{isUrdu ? 'صحت مند چکنائی:' : 'Healthy Fat:'} {currentPlan.macronutrientRatio.fat}%</span>
              </div>
              <div className="h-3 w-full rounded-full flex overflow-hidden border border-[#D9C4B5]">
                <div style={{ width: `${currentPlan.macronutrientRatio.carbs}%` }} className="bg-amber-600" title="Carbohydrates" />
                <div style={{ width: `${currentPlan.macronutrientRatio.protein}%` }} className="bg-[#722F37]" title="Protein" />
                <div style={{ width: `${currentPlan.macronutrientRatio.fat}%` }} className="bg-emerald-600" title="Fats" />
              </div>
            </div>

            <p className="text-[11px] text-[#78615A] italic">
              {isUrdu
                ? 'جنوبی ایشیائی انسولین اور دل و شریانوں کی حفاظت کے مطابق ترتیب دیا گیا۔'
                : 'Balanced especially for Pakistani eating habits, healthy sugar control, and heart care.'}
            </p>
          </div>
        </div>

        {/* 5 Core Doctor-Backed Clinical Rules */}
        <div>
          <h3 className="text-xs font-bold text-[#722F37] uppercase tracking-wider mb-3">
            {isUrdu ? '5 بنیادی طبی اور غذائی اصول' : '5 Simple Daily Rules'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentPlan.keyClinicalRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE3DA] text-xs text-[#5F4B44] leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to Embrace vs Foods to Avoid Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Foods to Embrace */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>{isUrdu ? 'فائدہ مند غذائیں (ضرور استعمال کریں)' : 'Foods to Embrace & Prioritize'}</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950">
              {currentPlan.foodsToEmbrace.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Foods to Strictly Avoid */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-700" />
              <span>{isUrdu ? 'نقصان دہ غذائیں (مکمل پرہیز کریں)' : 'Foods to Strictly Avoid or Eliminate'}</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-950">
              {currentPlan.foodsToAvoid.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daily Meal Schedule */}
        <div className="space-y-4 pt-4 border-t border-[#F0E6DD]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                {isUrdu ? 'ہفتہ وار کھانوں کا چارٹ' : 'Weekly Meal Chart'}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                {isUrdu ? 'روزانہ کا منظم غذائی شیڈول' : '7-Day Meal Plan'}
              </h3>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {currentPlan.weeklySchedule.map((schedule) => (
                <button
                  key={schedule.day}
                  onClick={() => setSelectedDay(schedule.day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDay === schedule.day
                      ? 'bg-[#722F37] text-white shadow-2xs'
                      : 'bg-[#FAF7F2] text-[#6E5A54] border border-[#E8DDD2] hover:bg-white'
                  }`}
                >
                  {isUrdu ? (DAY_URDU[schedule.day] || schedule.day) : schedule.day}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Daily Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMealCard('Breakfast', currentDailySchedule.breakfast, <Coffee className="w-4 h-4" />)}
            {renderMealCard('Morning Snack', currentDailySchedule.snackMorning, <Apple className="w-4 h-4" />)}
            {renderMealCard('Lunch', currentDailySchedule.lunch, <Utensils className="w-4 h-4" />)}
            {renderMealCard('Evening Snack', currentDailySchedule.snackEvening, <Clock className="w-4 h-4" />)}
            {renderMealCard('Dinner', currentDailySchedule.dinner, <Salad className="w-4 h-4" />)}
          </div>
        </div>

        {/* Interactive Personalized Calorie & Macro Calculator */}
        <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E0D2C7] space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#722F37]" />
            <h4 className="font-serif text-lg font-bold text-[#4A121A]">
              {isUrdu ? 'ذاتی کیلوریز اور خوراک کیلکولیٹر' : 'Personalized Calorie & Portion Adjuster'}
            </h4>
          </div>
          <p className="text-xs text-[#78615A]">
            {isUrdu
              ? 'اپنے جسمانی وزن، روزمرہ سرگرمی اور طبی ہدف کے مطابق روزانہ کی کیلوریز معلوم کریں:'
              : 'Fine-tune daily calories based on your body weight and clinical goal:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                {isUrdu ? `موجودہ وزن: ${userWeight} کلوگرام` : `Current Body Weight: ${userWeight} kg`}
              </label>
              <input 
                type="range" 
                min="45" 
                max="130" 
                value={userWeight} 
                onChange={(e) => setUserWeight(Number(e.target.value))}
                className="w-full accent-[#722F37] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                {isUrdu ? 'روزمرہ جسمانی سرگرمی' : 'Daily Physical Activity'}
              </label>
              <select 
                value={activityFactor} 
                onChange={(e) => setActivityFactor(Number(e.target.value))}
                aria-label={isUrdu ? 'روزمرہ جسمانی سرگرمی کی سطح' : 'Daily physical activity level'}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#D9C4B5] text-xs text-[#4A121A]"
              >
                <option value={1.2}>
                  {isUrdu ? 'کم حرکت (زیادہ بیٹھے رہنے والا کام)' : 'Sedentary (Desk work, little exercise)'}
                </option>
                <option value={1.375}>
                  {isUrdu ? 'ہلکی سرگرمی (ہفتے میں 1-3 بار واک)' : 'Lightly Active (1-3 walks per week)'}
                </option>
                <option value={1.55}>
                  {isUrdu ? 'معتدل سرگرمی (روزانہ تیز واک یا ورزش)' : 'Moderately Active (Daily brisk walks or gym)'}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                {isUrdu ? 'طبی ہدف' : 'Your Health Goal'}
              </label>
              <select 
                value={healthGoal} 
                onChange={(e) => setHealthGoal(e.target.value as any)}
                aria-label={isUrdu ? 'طبی صحت کا ہدف' : 'Your health goal'}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#D9C4B5] text-xs text-[#4A121A]"
              >
                <option value="diabetes">
                  {isUrdu ? 'ٹائپ 2 ذیابیطس (شوگر کنٹرول)' : 'Type 2 Diabetes (Sugar Control)'}
                </option>
                <option value="bp">
                  {isUrdu ? 'ہائی بلڈ پریشر (DASH کم نمک)' : 'High Blood Pressure (Less Salt)'}
                </option>
                <option value="cholesterol">
                  {isUrdu ? 'کولیسٹرول (زیادہ فائبر)' : 'Cholesterol (More Fiber)'}
                </option>
                <option value="weightLoss">
                  {isUrdu ? 'وزن میں کمی (-400 کیلوریز)' : 'Healthy Weight Loss (-400 calories)'}
                </option>
              </select>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#D9C4B5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[#8C766F] block">
                {isUrdu ? 'آپ کا روزانہ کیلوری ہدف:' : 'Your Personalized Daily Calorie Target:'}
              </span>
              <strong className="text-xl font-serif text-[#722F37]">
                {targetCalories} {isUrdu ? 'کیلوریز / دن' : 'kcal / day'}
              </strong>
            </div>
            <div className="sm:text-right">
              <span className="text-[#8C766F] block">
                {isUrdu ? 'روزانہ پروٹین کی مقدار:' : 'Protein Allocation:'}
              </span>
              <strong className="text-sm font-serif text-[#4A121A]">
                {Math.round(userWeight * 1.4)}g {isUrdu ? 'پروٹین/دن' : 'protein/day'}
              </strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
