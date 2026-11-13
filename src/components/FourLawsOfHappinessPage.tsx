import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Sun, 
  Smile, 
  Flame, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Zap, 
  Users, 
  ShieldCheck, 
  Award,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FourLawsOfHappinessPageProps {
  onBack: () => void;
  onNavigateTab: (tab: string) => void;
}

export const FourLawsOfHappinessPage: React.FC<FourLawsOfHappinessPageProps> = ({
  onBack,
  onNavigateTab
}) => {
  const { isUrdu } = useLanguage();
  const [completedHabits, setCompletedHabits] = useState<string[]>(['h-1']);

  const toggleHabit = (id: string) => {
    setCompletedHabits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const laws = isUrdu
    ? [
        {
          id: 'dopamine',
          lawNumber: 'قانون 1',
          neurochemical: 'ڈوپامین (Dopamine)',
          tagline: 'جذبے، محنت، ہدف اور پیش رفت کا کیمیائی محرک',
          color: 'from-amber-600 to-amber-700',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          icon: Zap,
          coreInsight: 'ڈوپامین اصل میں کامیابی کے حصول کی تڑپ، محنت اور بامقصد منزل کی طرف بڑھنے سے پیدا ہوتا ہے—صرف سکرین دیکھنے یا آرام کرنے سے نہیں۔ حقیقی خوشی بامقصد کوششوں سے ملتی ہے۔',
          scientificMechanism: 'دماغ کے VTA حصے میں بنتا ہے۔ بے مقصد سوشل میڈیا اسکرولنگ اور میٹھے اسنیکس سے عارضی ڈوپامین ملتا ہے مگر قدرتی توانائی گر جاتی ہے، جس سے سستی اور بے چینی جنم لیتی ہے۔',
          dailyPractices: [
            'ہر صبح 3 واضح چھوٹے اہداف طے کریں اور ان کے پورا ہونے پر خود کو شاباش دیں۔',
            'سخت یا ضروری کام مکمل کرنے کے بعد تفریح یا موبائل استعمال کریں۔',
            'ہفتے میں ایک دن چند گھنٹوں کے لیے موبائل اور اسکرین سے دور رہ کر ذہن کو تازہ کریں۔'
          ],
          quote: '”ڈوپامین محنت کی مشقت کا انعام ہے۔ صرف نتیجے کے بجائے سفر اور کوشش سے محبت کریں۔“'
        },
        {
          id: 'serotonin',
          lawNumber: 'قانون 2',
          neurochemical: 'سیروٹونن (Serotonin)',
          tagline: 'ذہنی سکون، وقار، شکر گزاری اور صبح کی دھوپ کا ہارمون',
          color: 'from-[#722F37] to-[#892A3A]',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
          icon: Sun,
          coreInsight: 'سیروٹونن دل میں اطمینان، خود اعتمادی اور سکون پیدا کرتا ہے۔ دلچسپ طبی حقیقت یہ ہے کہ جسم کا 90% سیروٹونن آنتوں کے صحت مند بیکٹیریا بناتے ہیں۔',
          scientificMechanism: 'صبح کی تازہ دھوپ آنکھوں کے ذریعے دماغ کو سگنل دیتی ہے کہ سیروٹونن بنائے، جو رات کو پرسکون نیند لانے والے ہارمون (Melatonin) میں تبدیل ہوتا ہے۔',
          dailyPractices: [
            'بیدار ہونے کے ایک گھنٹے کے اندر 10 سے 15 منٹ صبح کی تازہ دھوپ میں گزاریں۔',
            'معدے اور آنتوں کی صحت کے لیے تازہ دہی، فائبر اور سبزیاں روزانہ کھائیں۔',
            'روزانہ رات کو سونے سے پہلے 3 نعمتوں کا شکر ادا کریں اور تحریر کریں۔'
          ],
          quote: '”سیروٹونن وہ خاموش اندرونی اطمینان ہے کہ آپ کی زندگی باوقار اور بامعنی ہے۔“'
        },
        {
          id: 'oxytocin',
          lawNumber: 'قانون 3',
          neurochemical: 'آکسیٹوسن (Oxytocin)',
          tagline: 'محبت، اعتماد، رشتوں اور سماجی تحفظ کا ہارمون',
          color: 'from-emerald-700 to-emerald-800',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          icon: Users,
          coreInsight: 'انسان سماجی تعلقات کے لیے بنا ہے۔ تنہائی دماغ میں جسمانی درد جیسا دباؤ پیدا کرتی ہے، جبکہ اپنوں کے ساتھ وقت گزارنے سے بلڈ پریشر اور ذہنی گھبراہٹ کم ہوتی ہے۔',
          scientificMechanism: 'یہ ہارمون ذہنی تناؤ کے ہارمون (Cortisol) کو کم کرتا ہے اور دل و دماغ کے اعصابی نظام کو محفوظ ہونے کا احساس دلاتا ہے۔',
          dailyPractices: [
            'روزانہ موبائل فون ایک طرف رکھ کر والدین، شریکِ حیات یا دوست سے بامعنی گفتگو کریں۔',
            'کسی کی خاموشی سے مدد کریں یا کسی عزیز کو حوصلہ افزا پیغام بھیجیں۔',
            'بچوں یا اپنوں سے گلے ملنا اور محبت کا اظہار فوری ذہنی سکون دیتا ہے۔'
          ],
          quote: '”تنہائی صحت کے لیے اتنی ہی نقصان دہ ہے جتنی تمباکو نوشی؛ خلوص اور تعلقات اس کا بہترین علاج ہیں۔“'
        },
        {
          id: 'endorphins',
          lawNumber: 'قانون 4',
          neurochemical: 'اینڈورفنز (Endorphins)',
          tagline: 'جسمانی درد کم کرنے اور فرحت بخشنے والا قدرتی ہارمون',
          color: 'from-blue-700 to-indigo-800',
          badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
          icon: Flame,
          coreInsight: 'اینڈورفنز جسمانی مشقت، تیز واک اور ورزش کے نتیجے میں خارج ہوتے ہیں جو تھکاوٹ اور درد کو دبا کر ذہنی فرحت و تازگی پیدا کرتے ہیں۔',
          scientificMechanism: 'یہ دماغ کے قدرتی رسیپٹرز پر اثر انداز ہو کر پٹھوں کا کھنچاؤ ختم کرتے اور گھبراہٹ والے اعصابی نظام کو پرسکون بناتے ہیں۔',
          dailyPractices: [
            'روزانہ 20 سے 30 منٹ تیز واک یا جسمانی ورزش کریں جس سے ہلکا پسینہ آئے۔',
            'تازہ ہوا میں گہری سانسیں لیں اور ہلکی اسٹریچنگ کریں۔',
            'خاندان اور دوستوں کے ساتھ کھل کر ہنسیں اور مثبت محفل میں بیٹھیں۔'
          ],
          quote: '”جسم کو حرکت دیجیے تاکہ ذہن کو سکون نصیب ہو؛ ورزش قدرتی اینڈورفنز کا خزانہ ہے۔“'
        }
      ]
    : [
        {
          id: 'dopamine',
          lawNumber: 'Law 1',
          neurochemical: 'Dopamine',
          tagline: 'The Chemical of Motivation, Effort & Progress',
          color: 'from-amber-600 to-amber-700',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          icon: Zap,
          coreInsight: 'Dopamine is the brain’s drive and effort chemical—it rises when you work toward a real goal, not just when you sit back and scroll. True happiness comes from meaningful progress.',
          scientificMechanism: 'Made deep in your brain’s reward center. Endless phone scrolling and sugary snacks give a quick spike followed by an energy crash, leaving you tired, bored, and unmotivated.',
          dailyPractices: [
            'Pick 3 small, clear goals every morning and celebrate checking each one off.',
            'Finish one important task BEFORE opening social media, games, or entertainment.',
            'Take a weekly "Screen Break": spend a few hours without your phone to refresh your focus.'
          ],
          quote: '“Dopamine rewards honest effort. Don’t just chase the finish line; enjoy each small step forward.”'
        },
        {
          id: 'serotonin',
          lawNumber: 'Law 2',
          neurochemical: 'Serotonin',
          tagline: 'The Chemical of Calm, Gratitude & Morning Sunlight',
          color: 'from-[#722F37] to-[#892A3A]',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
          icon: Sun,
          coreInsight: 'Serotonin brings quiet confidence, patience, and emotional balance. Surprisingly, about 90% of your body’s serotonin is made in your gut with the help of healthy bacteria.',
          scientificMechanism: 'Stepping into morning sunlight tells your brain to make daytime serotonin, which later turns into melatonin at night to give you deep, restful sleep.',
          dailyPractices: [
            'Spend 10 to 15 minutes outdoors in gentle morning sunlight within an hour of waking up.',
            'Look after your gut: eat fresh yogurt (dahi), vegetables, and high-fiber grains.',
            'Before bed, write or think of 3 specific blessings you are thankful for today.'
          ],
          quote: '“Serotonin is the quiet peace inside that reminds you your life matters and you are enough.”'
        },
        {
          id: 'oxytocin',
          lawNumber: 'Law 3',
          neurochemical: 'Oxytocin',
          tagline: 'The Chemical of Love, Trust & Warm Relationships',
          color: 'from-emerald-700 to-emerald-800',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          icon: Users,
          coreInsight: 'Humans are made to live in caring communities. Loneliness actually feels like pain to the brain, while warm family and friend connections calm fear and help lower blood pressure.',
          scientificMechanism: 'Released by the brain when you bond with loved ones. It lowers the stress hormone cortisol and signals your heart and mind that you are safe and cared for.',
          dailyPractices: [
            'Have 1 real face-to-face chat every day with family or a friend without phones on the table.',
            'Do a small act of kindness: call your parents or send an encouraging message to someone.',
            'Give a warm hug to family members or spend time playing with children or pets.'
          ],
          quote: '“Loneliness harms health as much as heavy smoking. Real love and connection are the natural cure.”'
        },
        {
          id: 'endorphins',
          lawNumber: 'Law 4',
          neurochemical: 'Endorphins',
          tagline: 'The Body’s Natural Pain Reliever & Mood Booster',
          color: 'from-blue-700 to-indigo-800',
          badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
          icon: Flame,
          coreInsight: 'Endorphins are natural feel-good chemicals released when you move your body or laugh heartily. They ease aches and give you a fresh wave of light, positive energy.',
          scientificMechanism: 'They block pain signals in the brain, loosen tight muscles, and help switch off stress and worry after a busy day.',
          dailyPractices: [
            'Do 20–30 minutes of brisk walking, cycling, or simple exercise that makes you sweat lightly.',
            'End your shower with 30 seconds of cool water for a quick burst of freshness.',
            'Laugh out loud with family or friends—real belly laughter lifts mood right away.'
          ],
          quote: '“Move the body so the mind can rest. A brisk daily walk is free natural medicine.”'
        }
      ];

  const dailyChecklist = isUrdu
    ? [
        { id: 'h-1', title: '15 منٹ صبح کی تازہ دھوپ', law: 'سیروٹونن', desc: 'حیاتیاتی گھڑی درست رکھنے کے لیے صبح باہر کھلی ہوا میں نکلیں' },
        { id: 'h-2', title: '1 اہم ہدف مکمل کریں', law: 'ڈوپامین', desc: 'دوپہر سے پہلے دن کا سب سے اہم کام مکمل کریں' },
        { id: 'h-3', title: '30 منٹ تیز واک یا ورزش', law: 'اینڈورفنز', desc: 'دل کی دھڑکن بہتر بنانے کے لیے واک یا ہلکی ورزش' },
        { id: 'h-4', title: 'فون کے بغیر اپنوں سے گفتگو', law: 'آکسیٹوسن', desc: 'کسی عزیز یا دوست کی بات توجہ اور محبت سے سنیں' },
        { id: 'h-5', title: 'رات کو اسکرین سے وقفہ', law: 'نیند و توازن', desc: 'سونے سے 60 منٹ پہلے موبائل کی روشنی بند کریں' }
      ]
    : [
        { id: 'h-1', title: '15 Mins Morning Sunlight', law: 'Serotonin', desc: 'Step outdoors without sunglasses to set circadian clock' },
        { id: 'h-2', title: 'Achieve 1 Hard Micro-Goal', law: 'Dopamine', desc: 'Finish your toughest task before midday distractions' },
        { id: 'h-3', title: '30 Mins Heart-Rate Exertion', law: 'Endorphins', desc: 'Brisk walk, jog, cycling or strength training' },
        { id: 'h-4', title: '1 Phone-Free Deep Conversation', law: 'Oxytocin', desc: 'Listen attentively to a loved one or friend' },
        { id: 'h-5', title: 'Evening Digital Wind-Down', law: 'Rest & Balance', desc: 'Dim screens 60 minutes prior to sleep' }
      ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Navigation Breadcrumb / Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'صحت پورٹل کے مرکزی صفحے پر واپس جائیں' : 'Back to Health Hub Overview'}</span>
      </button>

      {/* Hero Header */}
      <div className="space-y-4 border-b border-[#E8DDD2] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase tracking-wider border border-[#DFCFC2]">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{isUrdu ? 'نیورو سائنس اور ذہنی صحت' : 'Mental Health & Everyday Habits'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A121A] tracking-tight leading-tight">
          {isUrdu ? 'خوشی کے چار سائنسی قوانین (Four Laws of Happiness)' : 'The Four Laws of Happiness'}
        </h1>

        <p className="text-base sm:text-lg text-[#5F4B44] leading-relaxed max-w-3xl">
          {isUrdu ? (
            <>
              خوشی محض اتفاق نہیں بلکہ دماغ کے چار بنیادی ہارمونز کا متوازن نظام ہے: <strong className="text-[#4A121A]">ڈوپامین، سیروٹونن، آکسیٹوسن اور اینڈورفنز</strong> (D.O.S.E. فریم ورک)۔ ان چار سادہ قوانین کو روزمرہ زندگی میں اپنا کر آپ پائیدار خوشی، ذہنی سکون اور جذباتی مضبوطی حاصل کر سکتے ہیں۔
            </>
          ) : (
            <>
              Happiness is not just good luck. Science shows that calm joy comes from keeping four natural feel-good brain chemicals in balance: <strong className="text-[#4A121A]">Dopamine, Serotonin, Oxytocin, and Endorphins</strong> (D.O.S.E.). Follow these four simple laws every day to lift your mood and build lasting peace of mind.
            </>
          )}
        </p>
      </div>

      {/* The 4 Laws Cards */}
      <div className="space-y-8">
        {laws.map((law) => {
          const Icon = law.icon;
          return (
            <div
              key={law.id}
              className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E0D2C7] shadow-sm hover:border-[#722F37] transition-all space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${law.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${law.badgeBg}`}>
                        {law.lawNumber}
                      </span>
                      <span className="text-xs font-bold text-[#8C766F] uppercase tracking-wider">
                        {law.neurochemical}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-0.5">
                      {law.tagline}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Core Insight & Mechanism */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-1.5">
                  <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider block">
                    {isUrdu ? 'بنیادی فلسفیانہ اصول' : 'Main Idea'}
                  </span>
                  <p className="text-xs sm:text-sm text-[#4A121A] leading-relaxed">
                    {law.coreInsight}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-1.5">
                  <span className="text-xs font-bold text-[#5F4B44] uppercase tracking-wider block">
                    {isUrdu ? 'حیاتیاتی اور دماغی نظام' : 'How It Works in Your Body'}
                  </span>
                  <p className="text-xs sm:text-sm text-[#5F4B44] leading-relaxed">
                    {law.scientificMechanism}
                  </p>
                </div>
              </div>

              {/* Daily Actionable Practices */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#4A121A] uppercase tracking-wider">
                  {isUrdu
                    ? `${law.neurochemical} کو روزانہ کیسے فعال کریں:`
                    : `How to Activate ${law.neurochemical} Daily:`}
                </h4>
                <div className="space-y-2">
                  {law.dailyPractices.map((practice, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E0D2C7] text-xs sm:text-sm text-[#3E2D27]">
                      <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
                      <span>{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Footer */}
              <div className="p-4 rounded-2xl bg-[#FAF0E6]/70 border border-[#DFCFC2] italic text-xs sm:text-sm text-[#5F4B44] text-center font-serif">
                {law.quote}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Daily Happiness Neuro-Stack Checklist */}
      <div className="bg-gradient-to-br from-[#FAF0E6] to-[#F5EFEB] rounded-3xl p-6 sm:p-8 border border-[#DFCFC2] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'روزانہ کا عملی شیڈول' : 'Daily Habit Tracker'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-0.5">
              {isUrdu ? 'خوشی کے 15 منٹ روزانہ کی چیک لسٹ' : 'Your Daily 15-Minute Happiness Checklist'}
            </h3>
            <p className="text-xs text-[#78615A] mt-0.5">
              {isUrdu
                ? 'چاروں خوشی کے ہارمونز کو متوازن رکھنے کے لیے روزانہ ان عادات پر نشان لگائیں۔'
                : 'Tick off these small daily actions to keep all 4 happy chemicals in balance.'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#722F37] bg-white px-3.5 py-1.5 rounded-xl border border-[#D9C4B5] self-start sm:self-auto">
            {isUrdu
              ? `${dailyChecklist.length} میں سے ${completedHabits.length} مکمل`
              : `${completedHabits.length} of ${dailyChecklist.length} Completed`}
          </span>
        </div>

        <div className="space-y-2.5">
          {dailyChecklist.map((habit) => {
            const isDone = completedHabits.includes(habit.id);
            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  isDone 
                    ? 'bg-white border-emerald-400 ring-1 ring-emerald-200' 
                    : 'bg-white/70 border-[#D9C4B5] hover:bg-white'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5 sm:mt-0 ${
                    isDone ? 'bg-emerald-600 text-white' : 'border-2 border-[#C9B7AA]'
                  }`}>
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className={`text-xs sm:text-sm ${isDone ? 'line-through text-[#8C766F]' : 'text-[#4A121A]'}`}>
                        {habit.title}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#722F37] border border-[#E8DDD2]">
                        {habit.law}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78615A] mt-0.5">{habit.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#8C766F] shrink-0 self-end sm:self-center">
                  {isDone ? (isUrdu ? 'مکمل' : 'Completed') : (isUrdu ? 'نشان لگائیں' : 'Tap to mark')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Cross Navigation */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD2]">
        <button
          onClick={onBack}
          className="text-xs font-bold text-[#722F37] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'مرکزی صفحے پر واپس جائیں' : 'Return to CareHub Overview'}</span>
        </button>

        <button
          onClick={() => onNavigateTab('stress')}
          className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>{isUrdu ? 'ذہنی دباؤ کم کرنے کے طریقے دیکھیں →' : 'Explore Stress Release Tricks & Tips →'}</span>
        </button>
      </div>

    </div>
  );
};
