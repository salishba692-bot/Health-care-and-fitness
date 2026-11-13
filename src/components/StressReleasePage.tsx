import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wind, 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldAlert, 
  PhoneCall, 
  Coffee, 
  Moon,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StressReleasePageProps {
  onBack: () => void;
  onNavigateTab: (tab: string) => void;
}

type BreathingTechnique = 'sigh' | '478' | 'box';

export const StressReleasePage: React.FC<StressReleasePageProps> = ({
  onBack,
  onNavigateTab
}) => {
  const { isUrdu } = useLanguage();
  const [technique, setTechnique] = useState<BreathingTechnique>('sigh');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'Inhale' | 'Second Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Breathing pacer timing loop
  useEffect(() => {
    let timer: any = null;

    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Advance phase
          if (technique === 'sigh') {
            if (phase === 'Inhale') {
              setPhase('Second Inhale');
              return 1;
            } else if (phase === 'Second Inhale') {
              setPhase('Exhale');
              return 6;
            } else {
              setPhase('Inhale');
              setCompletedCycles((c) => c + 1);
              return 3;
            }
          } else if (technique === '478') {
            if (phase === 'Inhale') {
              setPhase('Hold');
              return 7;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return 8;
            } else {
              setPhase('Inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          } else {
            // Box Breathing (4-4-4-4)
            if (phase === 'Inhale') {
              setPhase('Hold');
              return 4;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return 4;
            } else {
              setPhase('Inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, technique]);

  const handleSelectTechnique = (t: BreathingTechnique) => {
    setIsActive(false);
    setTechnique(t);
    setPhase('Inhale');
    setCountdown(t === 'sigh' ? 3 : 4);
    setCompletedCycles(0);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCountdown(technique === 'sigh' ? 3 : 4);
    setCompletedCycles(0);
  };

  const phaseLabelMap: Record<'Inhale' | 'Second Inhale' | 'Hold' | 'Exhale', string> = {
    Inhale: 'سانس اندر لیں',
    'Second Inhale': 'مزید سانس بھریں',
    Hold: 'سانس روکیں',
    Exhale: 'آہستہ باہر نکالیں',
  };

  const rapidTricks = isUrdu
    ? [
        {
          title: 'فزیولوجیکل سائی (دل کی تیز دھڑکن فوری کم کرنے کا طریقہ)',
          duration: '30 - 60 سیکنڈ',
          description: 'ناک سے مسلسل دو سانسیں اندر لیں: ایک گہری سانس، اور اس کے فوراً بعد پھیپھڑے بھرنے کے لیے ایک چھوٹی سانس۔ پھر منہ سے لمبی اور آہستہ سانس باہر چھوڑیں۔',
          whyItWorks: 'دوہری سانس پھیپھڑوں کی باریک تھیلیوں کو کھول کر فالتو کاربن ڈائی آکسائیڈ خارج کرتی ہے اور چند سیکنڈ میں دل کی دھڑکن کو پرسکون کر دیتی ہے۔',
          tag: 'اسٹینفورڈ نیورو سائنس'
        },
        {
          title: 'ٹھنڈے پانی کا فوری اعصابی ری سیٹ (Dive Reflex)',
          duration: '45 سیکنڈ',
          description: 'ٹھنڈے پانی یا برف میں بھگویا ہوا تولیہ 15 سے 20 سیکنڈ تک پیشانی، آنکھوں اور گالوں پر رکھیں اور چند لمحے سانس روکیں۔',
          whyItWorks: 'چہرے کے اعصاب دماغ کو فوراً پرسکون ہونے کا پیغام دیتے ہیں جس سے گھبراہٹ اور ایڈرینالین کی زیادتی فوری کم ہو جاتی ہے۔',
          tag: 'ویگس نرو تھراپی'
        },
        {
          title: '5-4-3-2-1 حسی توجہ کی مشق (Sensory Grounding)',
          duration: '2 منٹ',
          description: 'اپنے اردگرد دیکھیں اور دل میں شمار کریں: 5 چیزیں جو نظر آ رہی ہیں، 4 چیزیں جنہیں چھو سکتے ہیں، 3 آوازیں جو سن رہے ہیں، 2 خوشبوئیں اور 1 ذائقہ۔',
          whyItWorks: 'یہ مشق ذہن کو پریشان کن خیالات سے ہٹا کر فوری طور پر موجودہ لمحے اور حقیقت میں واپس لے آتی ہے۔',
          tag: 'علمی و نفسیاتی طریقہ'
        },
        {
          title: 'وسیع بصری توجہ (Panoramic Vision)',
          duration: '60 سیکنڈ',
          description: 'تناؤ کے وقت ہماری نظر ایک نقطے پر جم جاتی ہے۔ سر ہلائے بغیر اپنی نظر کو کمرے کے دائیں، بائیں اور چاروں کونوں پر پھیلائیں۔',
          whyItWorks: 'بصری دائرہ وسیع کرنے سے اعصابی نظام خوف کی کیفیت سے نکل کر قدرتی سکون میں آ جاتا ہے۔',
          tag: 'اعصابی سائنس'
        },
        {
          title: 'پٹھوں کو سخت کر کے ڈھیلا چھوڑنا (PMR)',
          duration: '3 منٹ',
          description: '5 سیکنڈ کے لیے مٹھیاں، کندھے اور پاؤں سختی سے بھینچیں، پھر گہری سانس خارج کرتے ہوئے تمام پٹھوں کو بالکل ڈھیلا چھوڑ دیں۔',
          whyItWorks: 'جسم میں جمع شدہ ذہنی و عضلاتی کھنچاؤ کو باہر نکال کر خون کی روانی بہتر بناتا ہے۔',
          tag: 'فزیوتھراپی'
        }
      ]
    : [
        {
          title: 'The Double Breath Sigh (Fastest Way to Calm Heart Rate)',
          duration: '30 - 60 Seconds',
          description: 'Take two breaths in through your nose: first one deep breath in, then a quick extra sip of air right on top. Next, let it all out in one long, slow sigh through your mouth.',
          whyItWorks: 'That second little breath opens up tiny air spaces in your lungs and clears built-up tension, signaling your heart to slow down within seconds.',
          tag: 'Proven Fast Calm'
        },
        {
          title: 'Cold Water Face Reset',
          duration: '45 Seconds',
          description: 'Press a cold wet towel or splash cold water across your forehead, eyes, and cheeks for 15–20 seconds while pausing your breath gently.',
          whyItWorks: 'Cool temperature on your face sends a direct "calm down" signal to your brain, quickly lowering sudden panic and racing heartbeat.',
          tag: 'Body Reset'
        },
        {
          title: '5-4-3-2-1 Present Moment Trick',
          duration: '2 Minutes',
          description: 'Look around the room and quietly name: 5 things you can SEE, 4 things you can TOUCH, 3 sounds you can HEAR, 2 things you can SMELL, and 1 good taste or comforting thought.',
          whyItWorks: 'Shifts your mind away from racing worries and brings your attention back to the calm room around you.',
          tag: 'Mind Grounding'
        },
        {
          title: 'Wide-Angle Vision Trick',
          duration: '60 Seconds',
          description: 'When we feel worried, our eyes stare tightly at one spot. Without moving your head, widen your focus so you notice the walls on your left, right, ceiling, and floor all at once.',
          whyItWorks: 'Widening what your eyes take in tells your nervous system that you are safe and not in danger.',
          tag: 'Eye Relaxation'
        },
        {
          title: 'Tense & Release Muscle Exercise',
          duration: '3 Minutes',
          description: 'Tightly squeeze your fists, curl your toes, and shrug your shoulders up for 5 slow seconds. Then breathe out fully and let every muscle go completely loose and heavy. Repeat twice.',
          whyItWorks: 'Squeezing and then letting go helps shake off tight stress stored inside your neck, back, and hands.',
          tag: 'Muscle Relief'
        }
      ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Navigation Breadcrumb */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'صحت پورٹل کے مرکزی صفحے پر واپس جائیں' : 'Back to Health Hub Overview'}</span>
      </button>

      {/* Header */}
      <div className="space-y-4 border-b border-[#E8DDD2] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase tracking-wider border border-[#DFCFC2]">
          <Wind className="w-3.5 h-3.5 text-amber-600" />
          <span>{isUrdu ? 'اعصابی نظام کا توازن اور سکون' : 'Natural Calm & Nerve Relief'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A121A] tracking-tight leading-tight">
          {isUrdu ? 'ذہنی تناؤ (اسٹریس) ختم کرنے کے فوری سائنسی طریقے' : 'Simple Ways to Release Stress & Calm Down Fast'}
        </h1>

        <p className="text-base sm:text-lg text-[#5F4B44] leading-relaxed max-w-3xl">
          {isUrdu
            ? 'مسلسل ذہنی دباؤ خون میں کورٹیسول ہارمون اور بلڈ پریشر بڑھا کر دل و دماغ کو نقصان پہنچاتا ہے۔ گھبراہٹ یا ٹینشن کے وقت اس انٹرایکٹو سانس ٹائمر اور فوری سائنسی تراکیب سے اپنے اعصابی نظام کو چند منٹ میں پرسکون کریں۔'
            : 'Daily worry and stress keep blood pressure high and make sleep hard. Whenever you feel tense or overwhelmed, use the guided breathing circle below and these simple 1-minute tricks to calm your mind and body fast.'}
        </p>
      </div>

      {/* Interactive Guided Breathing Pacer Tool */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E0D2C7] shadow-sm space-y-7">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-5">
          <div>
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'انٹرایکٹو بریتھنگ ٹائمر' : 'Interactive Breathing Helper'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-0.5">
              {isUrdu ? 'سانس کی مشق کا رہنما ٹائمر' : 'Guided Breathing Timer'}
            </h3>
            <p className="text-xs text-[#78615A] mt-0.5">
              {isUrdu
                ? 'دل کی دھڑکن اور بلڈ پریشر کو متوازن کرنے کے لیے دائرے کے ساتھ سانس لیں۔'
                : 'Follow the gentle circle in and out to steady your breathing and calm a racing heart.'}
            </p>
          </div>

          {/* Technique Selector */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => handleSelectTechnique('sigh')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                technique === 'sigh'
                  ? 'bg-[#722F37] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5]'
              }`}
            >
              {isUrdu ? 'فزیولوجیکل سائی' : 'Physiological Sigh'}
            </button>
            <button
              onClick={() => handleSelectTechnique('478')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                technique === '478'
                  ? 'bg-[#722F37] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5]'
              }`}
            >
              {isUrdu ? '4-7-8 پرسکون نیند سانس' : '4-7-8 Sleep Breath'}
            </button>
            <button
              onClick={() => handleSelectTechnique('box')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                technique === 'box'
                  ? 'bg-[#722F37] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5]'
              }`}
            >
              {isUrdu ? 'باکس بریتھنگ (4-4-4)' : 'Box Breathing'}
            </button>
          </div>
        </div>

        {/* Animated Breathing Circle Visualization */}
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            
            {/* Outer Pulsing Glow */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                phase.includes('Inhale')
                  ? 'scale-110 bg-[#722F37]/15'
                  : phase === 'Hold'
                  ? 'scale-105 bg-amber-400/20'
                  : 'scale-90 bg-emerald-500/10'
              }`}
            />

            {/* Inner Interactive Circle */}
            <div 
              className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 shadow-xl ${
                phase.includes('Inhale')
                  ? 'border-[#722F37] bg-gradient-to-br from-[#FAF0E6] to-[#F5EFEB] scale-105'
                  : phase === 'Hold'
                  ? 'border-amber-500 bg-amber-50 scale-100'
                  : 'border-emerald-600 bg-emerald-50 scale-95'
              }`}
            >
              <Wind className={`w-6 h-6 mb-1 transition-colors ${
                phase.includes('Inhale') ? 'text-[#722F37]' : phase === 'Hold' ? 'text-amber-600' : 'text-emerald-700'
              }`} />
              
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#4A121A]">
                {isUrdu ? phaseLabelMap[phase] : phase}
              </span>
              
              <span className="text-3xl font-serif font-extrabold text-[#722F37] mt-1">
                {countdown}s
              </span>

              <span className="text-[10px] text-[#78615A] mt-1 font-semibold uppercase tracking-wider">
                {technique === 'sigh' && phase === 'Inhale' && (isUrdu ? 'گہرا سانس اندر' : 'Deep Inhale')}
                {technique === 'sigh' && phase === 'Second Inhale' && (isUrdu ? 'فوری پھیپھڑے بھریں' : 'Quick Top-Off Inhale')}
                {technique === 'sigh' && phase === 'Exhale' && (isUrdu ? 'لمبا سانس باہر' : 'Long Slow Sigh Out')}
                {technique === '478' && phase === 'Inhale' && (isUrdu ? 'خاموشی سے اندر لیں' : 'Inhale Quietly')}
                {technique === '478' && phase === 'Hold' && (isUrdu ? 'آرام سے روکے رکھیں' : 'Hold Breath Gently')}
                {technique === '478' && phase === 'Exhale' && (isUrdu ? 'مکمل باہر چھوڑیں' : 'Whoosh Exhale')}
                {technique === 'box' && (isUrdu ? '4 سیکنڈ کا متوازن وقفہ' : '4-Count Cadence')}
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#722F37] text-white hover:bg-[#58111A] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>
                {isActive
                  ? (isUrdu ? 'ٹائمر روکیں' : 'Pause Pacer')
                  : (isUrdu ? 'سانس کی مشق شروع کریں' : 'Begin Breathing Session')}
              </span>
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#EDE4DC] border border-[#D9C4B5] text-[#5F4B44] transition-colors cursor-pointer"
              title={isUrdu ? 'دوبارہ شروع کریں' : 'Reset Pacer'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-[#78615A]">
            {isUrdu ? (
              <>مکمل چکر: <strong className="text-[#4A121A]">{completedCycles}</strong> (ہدف: 3 سے 5 مکمل چکر)</>
            ) : (
              <>Cycles Completed: <strong className="text-[#4A121A]">{completedCycles}</strong> (Target: 3 to 5 full rounds)</>
            )}
          </div>
        </div>
      </div>

      {/* 5 Rapid 60-Second Stress Resets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'فوری ذہنی سکون کے ہتھیار' : 'Quick Calming Tools'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-0.5">
              {isUrdu ? 'ذہنی دباؤ کم کرنے کے 5 تیز ترین سائنسی طریقے' : '5 Fast Ways to Calm Down in Under 2 Minutes'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rapidTricks.map((trick, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E0D2C7] shadow-xs hover:border-[#722F37] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] border border-[#DFCFC2]">
                    ⏱ {trick.duration}
                  </span>
                  <span className="text-[11px] text-[#8C766F] font-semibold">{trick.tag}</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-[#4A121A]">
                  {trick.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#4A121A] leading-relaxed">
                  {trick.description}
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE3DA] text-[11px] text-[#5F4B44] leading-relaxed">
                <strong className="text-[#722F37]">{isUrdu ? 'سائنسی وجہ: ' : 'Why It Works: '}</strong>
                {trick.whyItWorks}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cortisol Lowering Nutrition & Lifestyle Protocol */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] space-y-5">
        <div>
          <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
            {isUrdu ? 'حیاتیاتی و غذائی سکون' : 'Food & Sleep Habits'}
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-0.5">
            {isUrdu ? 'کورٹیسول کم کرنے والی غذا اور پرسکون نیند کے اصول' : 'Foods & Daily Habits for Better Sleep & Less Stress'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-2">
            <strong className="text-sm font-serif text-[#4A121A] block">
              {isUrdu ? 'میگنیشیم اور سبز چائے (L-Theanine)' : 'Nuts, Seeds & Green Tea'}
            </strong>
            <p className="text-[#6E5A54] leading-relaxed">
              {isUrdu
                ? 'کدو کے بیج، بادام، پالک اور بغیر کیفین سبز چائے دماغ کے پرسکون خلیات کو فعال کر کے رات کو سوچوں کا طوفان کم کرتے ہیں۔'
                : 'Almonds, pumpkin seeds, spinach, and warm green tea help quiet overthinking before bedtime.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-2">
            <strong className="text-sm font-serif text-[#4A121A] block">
              {isUrdu ? 'دوپہر 2 بجے کے بعد چائے/کافی بند' : 'Skip Late-Day Chai or Coffee'}
            </strong>
            <p className="text-[#6E5A54] leading-relaxed">
              {isUrdu
                ? 'کیفین کا اثر جسم میں 6 سے 8 گھنٹے رہتا ہے۔ شام کو کالی چائے یا کافی پینے سے رات کی گہری نیند متاثر ہوتی ہے۔'
                : 'Tea and coffee stay in your body for 6 to 8 hours. Avoid strong tea, coffee, or colas after 2:00 PM so you fall asleep easier.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] space-y-2">
            <strong className="text-sm font-serif text-[#4A121A] block">
              {isUrdu ? 'ٹھنڈا اور تاریک کمرہ' : 'Cool & Dark Bedroom'}
            </strong>
            <p className="text-[#6E5A54] leading-relaxed">
              {isUrdu
                ? 'گہری نیند میں جانے کے لیے کمرے کا ہلکا ٹھنڈا اور مکمل تاریک ہونا جسم میں میلاٹونن کی پیداوار تیز کرتا ہے۔'
                : 'A slightly cool, quiet, and dark bedroom helps your body switch into deep restful sleep naturally.'}
            </p>
          </div>
        </div>
      </div>

      {/* Pakistan Mental Health & Crisis Hotline */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#58111A] to-[#722F37] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-200 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>{isUrdu ? 'پاکستان خفیہ ذہنی صحت ہیلپ لائن' : 'Pakistan Confidential Mental Health Support'}</span>
          </div>
          <h4 className="font-serif text-xl font-bold mt-1">
            {isUrdu ? 'امنگ پاکستان (Umang) ذہنی صحت ہیلپ لائن' : 'Umang Pakistan Mental Health Helpline'}
          </h4>
          <p className="text-xs text-rose-100 mt-0.5">
            {isUrdu
              ? 'شدید گھبراہٹ، ڈپریشن یا ذہنی بحران کی صورت میں مستند ماہرینِ نفسیات سے 24/7 مفت اور رازدارانہ مشورہ۔'
              : 'Free, confidential 24/7 tele-counseling by licensed clinical psychologists for severe acute panic or crisis.'}
          </p>
        </div>

        <a
          href="tel:03117786264"
          className="px-5 py-3 rounded-xl bg-white text-[#58111A] hover:bg-amber-100 font-bold text-xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 text-rose-700" />
          <span>{isUrdu ? 'کال کریں: 0311-7786264' : 'Call 0311-7786264'}</span>
        </a>
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
          onClick={() => onNavigateTab('happiness')}
          className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>{isUrdu ? 'خوشی کے چار قوانین پڑھیں →' : 'Explore The Four Laws of Happiness →'}</span>
        </button>
      </div>

    </div>
  );
};
