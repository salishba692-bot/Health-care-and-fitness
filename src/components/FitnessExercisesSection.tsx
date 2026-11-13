import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { ExerciseItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const FITNESS_EXERCISES_DATA: ExerciseItem[] = [
  {
    id: 'ex-brisk-walk',
    title: 'Post-Meal Glycemic Brisk Walking',
    category: 'Cardio & Heart Health',
    difficulty: 'Beginner',
    targetMuscles: 'Quadriceps, Hamstrings, Calves, Gluteal complex, Heart muscle',
    durationOrReps: '15 - 20 minutes',
    caloriesBurnedEst: '85 - 120 kcal',
    whoClinicalBenefit: 'WHO Physical Activity Guidelines confirm that a 15-minute brisk walk taken within 30 minutes after major meals stimulates non-insulin dependent skeletal muscle GLUT-4 glucose transporters, blunting postprandial glucose surges by up to 40% and lowering resting systolic blood pressure by 6-9 mmHg.',
    steps: [
      'Begin within 20-30 minutes of completing lunch or dinner.',
      'Maintain an upright posture with shoulders drawn slightly back and relaxed.',
      'Walk at a pace where you can converse in sentences, but cannot sing (moderate aerobic zone).',
      'Pump arms naturally to promote venous return from lower extremities.'
    ],
    tips: [
      'Wear supportive sneakers with cushioned arches.',
      'Do not sprint or strain; steady rhythmic cadence is optimal for glycemic control.'
    ]
  },
  {
    id: 'ex-squats',
    title: 'Bodyweight Chair Squats (Insulin Sensitivity Booster)',
    category: 'Metabolic & Insulin Control',
    difficulty: 'Beginner',
    targetMuscles: 'Quadriceps, Glutes, Hamstrings, Adductors, Core stabilizers',
    durationOrReps: '3 sets × 12 - 15 reps',
    caloriesBurnedEst: '70 - 95 kcal',
    whoClinicalBenefit: 'The quadriceps and glutes are the body’s largest glycogen storage reservoirs. Activating these major muscle groups depletes intramuscular glycogen, triggering intense cellular insulin receptivity for up to 24 hours post-workout.',
    steps: [
      'Stand in front of a sturdy chair with feet shoulder-width apart, toes pointed slightly outward.',
      'Hinge at your hips and bend your knees as if sitting back into the chair.',
      'Gently tap your buttocks on the chair edge (do not collapse weight) while keeping chest proud.',
      'Drive through your heels to return to a standing position and squeeze glutes at the top.'
    ],
    tips: [
      'Keep knees in line with your second toe; do not let knees buckle inward (valgus collapse).',
      'Inhale on the downward descent, exhale powerfully on the upward drive.'
    ]
  },
  {
    id: 'ex-pushups',
    title: 'Incline Wall or Countertop Push-Ups',
    category: 'Metabolic & Insulin Control',
    difficulty: 'Beginner',
    targetMuscles: 'Pectoralis major, Anterior Deltoids, Triceps brachii, Serratus anterior',
    durationOrReps: '3 sets × 10 - 12 reps',
    caloriesBurnedEst: '50 - 75 kcal',
    whoClinicalBenefit: 'WHO muscle-strengthening guidelines recommend training upper-body pushing mechanics twice weekly. Incline pushups build bone mineral density in wrists and forearms without joint strain.',
    steps: [
      'Place palms flat against a sturdy wall or high countertop, slightly wider than shoulder-width.',
      'Step feet back until your body forms a straight 45-degree diagonal line from head to heels.',
      'Slowly lower your chest towards the wall by bending elbows at a 45-degree angle.',
      'Press firmly through your palms to return to the starting plank position.'
    ],
    tips: [
      'Engage glutes and brace your core so your hips do not sag.',
      'Progress to a lower countertop or bench as upper-body strength advances.'
    ]
  },
  {
    id: 'ex-cat-cow',
    title: 'Spinal Decompression & Cat-Cow Mobility Flow',
    category: 'Joint Mobility & Spine',
    difficulty: 'Beginner',
    targetMuscles: 'Erector spinae, Rectus abdominis, Thoracic cage, Pelvic floor',
    durationOrReps: '2 sets × 10 smooth cycles',
    caloriesBurnedEst: '30 - 45 kcal',
    whoClinicalBenefit: 'Mobilizes intervertebral spinal discs and lubricates synovial fluid in facet joints, counteracting sedentary computer and desk-sitting posture while reducing morning back stiffness.',
    steps: [
      'Begin on hands and knees (tabletop position) with wrists under shoulders and knees under hips.',
      'Cow Pose (Inhale): Drop your belly gently towards the floor, lift your chest and gaze upwards.',
      'Cat Pose (Exhale): Tuck chin to chest, round your spine upwards toward the ceiling, and pull navel to spine.',
      'Flow smoothly between both positions in rhythm with deep diaphragmatic respiration.'
    ],
    tips: [
      'Perform on a soft yoga mat or carpeted surface to cushion knees.',
      'Do not force extreme spinal hyperextension; keep motion fluid and pain-free.'
    ]
  },
  {
    id: 'ex-glute-bridge',
    title: 'Isometric Glute Bridges (Pelvic & Lumbar Stability)',
    category: 'Metabolic & Insulin Control',
    difficulty: 'Beginner',
    targetMuscles: 'Gluteus maximus, Biceps femoris, Transverse abdominis',
    durationOrReps: '3 sets × 12 reps (with 3-sec peak hold)',
    caloriesBurnedEst: '60 - 80 kcal',
    whoClinicalBenefit: 'Restores neuromuscular gluteal activation ("glute amnesia" caused by prolonged sitting), stabilizes sacroiliac joints, and helps normalize pelvic tilt to alleviate chronic lower back pain.',
    steps: [
      'Lie on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Arms resting by your sides with palms pressing lightly into the floor for balance.',
      'Engage your abdominal core, drive through your heels, and lift your hips toward the ceiling.',
      'Hold the top position for 3 seconds, forming a straight line from knees to shoulders, then lower slowly.'
    ],
    tips: [
      'Do not hyperextend your lower back at the top; focus on glute contraction.',
      'Keep feet flat and avoid pushing off your toes.'
    ]
  },
  {
    id: 'ex-deadbug',
    title: 'Dead Bug Core Anti-Extension Stability',
    category: 'Core & Postural Strength',
    difficulty: 'Intermediate',
    targetMuscles: 'Transverse abdominis, Multifidus, Internal Obliques',
    durationOrReps: '3 sets × 8 reps per side',
    caloriesBurnedEst: '45 - 65 kcal',
    whoClinicalBenefit: 'Strengthens deep local spinal stabilizers without exerting compressive cervical shear stress (unlike conventional sit-ups or crunches), protecting against disc herniation.',
    steps: [
      'Lie flat on your back with arms extended straight up toward the ceiling and knees bent at 90 degrees.',
      'Flatten your lower back firmly into the floor (zero gap under lumbar spine).',
      'Slowly lower your right arm overhead while simultaneously extending your left leg straight out hovering above floor.',
      'Return to starting position and alternate with left arm and right leg in controlled cadence.'
    ],
    tips: [
      'If your lower back arches off the floor, shorten your leg extension range.',
      'Breathe out forcefully as limbs extend to maintain deep intra-abdominal pressure.'
    ]
  }
];

const EXERCISE_CATEGORY_UR: Record<string, string> = {
  All: 'تمام ورزشیں',
  'Cardio & Heart Health': 'دل اور سانس (Cardio)',
  'Metabolic & Insulin Control': 'شوگر اور میٹابولزم کنٹرول',
  'Joint Mobility & Spine': 'جوڑوں اور کمر کی لچک',
  'Core & Postural Strength': 'پیٹ اور ریڑھ کی ہڈی کی مضبوطی',
};

const EXERCISE_DIFFICULTY_UR: Record<string, string> = {
  Beginner: 'ابتدائی (آسان)',
  Intermediate: 'درمیانی',
  Advanced: 'ماہرانہ',
};

const EXERCISE_UR_MAP: Record<string, Partial<ExerciseItem>> = {
  'ex-brisk-walk': {
    title: 'کھانے کے بعد تیز چہل قدمی (بلڈ شوگر کنٹرول)',
    targetMuscles: 'رانوں، پنڈلیوں کے پٹھے اور دل کے عضلات',
    durationOrReps: '15 سے 20 منٹ',
    caloriesBurnedEst: '85 - 120 کیلوریز',
    whoClinicalBenefit: 'عالمی ادارہ صحت (WHO) کی گائیڈلائنز کے مطابق کھانے کے 30 منٹ کے اندر صرف 15 منٹ کی تیز واک پٹھوں کو شوگر جذب کرنے کے قابل بناتی ہے، جس سے کھانے کے بعد شوگر کا اضافہ 40% تک کم اور سسٹولک بلڈ پریشر 6-9 پوائنٹس تک کم ہوتا ہے۔',
    steps: [
      'دوپہر یا رات کے کھانے کے 20 سے 30 منٹ بعد چہل قدمی شروع کریں۔',
      'کمر سیدھی رکھیں اور کندھے ڈھیلے چھوڑ دیں۔',
      'اتنی تیز رفتار سے چلیں کہ آپ بات کر سکیں مگر گانا نہ گا سکیں۔',
      'بازوؤں کو قدرتی انداز میں حرکت دیں تاکہ دورانِ خون بہتر ہو۔'
    ],
    tips: [
      'آرام دہ اور نرم سول والے جوگرز (جوتے) پہنیں۔',
      'بہت تیز دوڑنے کے بجائے مستقل اور متوازن رفتار برقرار رکھیں۔'
    ]
  },
  'ex-squats': {
    title: 'کرسی کے سہارے اسکواٹس (انسولین کی کارکردگی بڑھانے کے لیے)',
    targetMuscles: 'رانوں اور کولہوں کے بڑے پٹھے، کمر کا نچلا حصہ',
    durationOrReps: '3 سیٹ × 12 سے 15 بار',
    caloriesBurnedEst: '70 - 95 کیلوریز',
    whoClinicalBenefit: 'ٹانگوں اور رانوں کے پٹھے جسم میں گلوکوز ذخیرہ کرنے کا سب سے بڑا مرکز ہیں۔ انہیں حرکت دینے سے جسم میں انسولین کی حساسیت اگلے 24 گھنٹوں کے لیے نمایاں طور پر بہتر ہو جاتی ہے۔',
    steps: [
      'مضبوط کرسی کے سامنے کھڑے ہو جائیں، پاؤں کندھوں کے برابر کھلے رکھیں۔',
      'ایسے بیٹھیں جیسے کرسی پر بیٹھ رہے ہوں، سینہ اوپر اور کمر سیدھی رکھیں۔',
      'کرسی کو ہلکا سا چھو کر فوراً ایڑیوں کے زور سے اوپر اٹھ کھڑے ہوں۔'
    ],
    tips: [
      'گھٹنوں کو اندر کی طرف نہ جھکنے دیں؛ پاؤں کی سیدھ میں رکھیں۔',
      'نیچے جاتے وقت سانس اندر لیں اور اوپر اٹھتے وقت باہر نکالیں۔'
    ]
  },
  'ex-pushups': {
    title: 'دیوار یا کاؤنٹر کے سہارے پُش اپس (Incline Push-Ups)',
    targetMuscles: 'سینے، کندھوں اور بازوؤں کے پٹھے',
    durationOrReps: '3 سیٹ × 10 سے 12 بار',
    caloriesBurnedEst: '50 - 75 کیلوریز',
    whoClinicalBenefit: 'WHO کے مطابق ہفتے میں کم از کم 2 دن پٹھوں کو مضبوط کرنے والی ورزش ضروری ہے۔ دیوار پُش اپس جوڑوں پر بوجھ ڈالے بغیر ہڈیوں اور بازوؤں کو مضبوط بناتی ہے۔',
    steps: [
      'ہتھیلیاں مضبوط دیوار یا کچن کاؤنٹر پر کندھوں سے ذرا زیادہ فاصلے پر رکھیں۔',
      'پاؤں پیچھے کر کے جسم کو 45 ڈگری کے زاویے پر سیدھا رکھیں۔',
      'آہستہ سے کہنیاں موڑ کر سینے کو دیوار کے قریب لائیں، پھر واپس دھکیلیں۔'
    ],
    tips: [
      'پیٹ اور کمر کو سیدھا رکھیں تاکہ کمر نیچے نہ لٹکے۔',
      'طاقت بڑھنے پر آہستہ آہستہ نیچے والے بینچ پر منتقل ہوں۔'
    ]
  },
  'ex-cat-cow': {
    title: 'ریڑھ کی ہڈی کا کھنچاؤ (Cat-Cow اسٹریچ)',
    targetMuscles: 'کمر، گردن اور پیٹ کے پٹھے',
    durationOrReps: '2 سیٹ × 10 آرام دہ چکر',
    caloriesBurnedEst: '30 - 45 کیلوریز',
    whoClinicalBenefit: 'دفتری کام یا زیادہ دیر بیٹھنے سے پیدا ہونے والی کمر کی اکڑن اور درد کو دور کر کے ریڑھ کی ہڈی کے مہروں میں لچک پیدا کرتی ہے۔',
    steps: [
      'چٹائی پر گھٹنوں اور ہاتھوں کے بل آ جائیں (ٹیبل پوزیشن)۔',
      'سانس اندر لیتے ہوئے پیٹ نیچے جھکائیں اور سینہ و نظر اوپر اٹھائیں (Cow Pose)۔',
      'سانس باہر نکالتے ہوئے کمر کو اوپر گول کریں اور ٹھوڑی سینے سے لگائیں (Cat Pose)۔'
    ],
    tips: [
      'گھٹنوں کے نیچے نرم یوگا میٹ یا قالین بچھائیں۔',
      'جھٹکے سے حرکت نہ کریں؛ سانس کے ساتھ آہستہ حرکت کریں۔'
    ]
  },
  'ex-glute-bridge': {
    title: 'آئسومیٹرک گلوٹ برج (کمر اور کولہوں کا استحکام)',
    targetMuscles: 'کولہوں، رانوں اور نچلی کمر کے پٹھے',
    durationOrReps: '3 سیٹ × 12 بار (3 سیکنڈ ہولڈ)',
    caloriesBurnedEst: '60 - 80 کیلوریز',
    whoClinicalBenefit: 'مسلسل کرسی پر بیٹھنے سے کمزور ہونے والے کمر اور کولہوں کے پٹھوں کو دوبارہ فعال کر کے کمر کے پرانے درد میں آرام دیتی ہے۔',
    steps: [
      'کمر کے بل سیدھا لیٹ جائیں، گھٹنے موڑ کر پاؤں زمین پر رکھیں۔',
      'ایڑیوں پر دباؤ ڈال کر کولہوں کو اوپر اٹھائیں یہاں تک کہ جسم سیدھی لکیر بن جائے۔',
      'اوپر 3 سیکنڈ رکیں اور آہستہ سے نیچے آئیں۔'
    ],
    tips: [
      'اوپر جا کر کمر کو ضرورت سے زیادہ نہ موڑیں۔',
      'پورا پاؤں زمین پر جمائے رکھیں۔'
    ]
  },
  'ex-deadbug': {
    title: 'ڈیڈ بگ (Dead Bug) کور اور کمر کی مضبوطی',
    targetMuscles: 'پیٹ کے اندرونی پٹھے اور ریڑھ کی ہڈی کا سہارا',
    durationOrReps: '3 سیٹ × ہر طرف 8 بار',
    caloriesBurnedEst: '45 - 65 کیلوریز',
    whoClinicalBenefit: 'گردن یا مہروں پر دباؤ ڈالے بغیر پیٹ اور کمر کے اندرونی پٹھوں کو مضبوط کر کے ڈسک سلپ سے بچاتی ہے۔',
    steps: [
      'کمر کے بل لیٹیں، دونوں بازو چھت کی طرف سیدھے اور ٹانگیں 90 ڈگری پر اٹھائیں۔',
      'نچلی کمر کو زمین کے ساتھ چپکائے رکھیں۔',
      'آہستہ سے دایاں بازو پیچھے اور بائیں ٹانگ آگے پھیلائیں، پھر واپس آ کر دوسری طرف دہرائیں۔'
    ],
    tips: [
      'اگر نچلی کمر زمین سے اٹھنے لگے تو ٹانگ کو زیادہ نیچے نہ لے جائیں۔',
      'ٹانگ پھیلاتے وقت سانس باہر خارج کریں۔'
    ]
  }
};

export const FitnessExercisesSection: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(FITNESS_EXERCISES_DATA[0].id);

  const categories = [
    'All',
    'Cardio & Heart Health',
    'Metabolic & Insulin Control',
    'Joint Mobility & Spine',
    'Core & Postural Strength'
  ];

  const getLocalizedExercise = (ex: ExerciseItem): ExerciseItem => {
    if (!isUrdu) return ex;
    const ur = EXERCISE_UR_MAP[ex.id];
    if (!ur) return ex;
    return { ...ex, ...ur };
  };

  const filteredExercises = selectedCategory === 'All'
    ? FITNESS_EXERCISES_DATA
    : FITNESS_EXERCISES_DATA.filter(ex => ex.category === selectedCategory);

  const selectedRawExercise =
    FITNESS_EXERCISES_DATA.find(ex => ex.id === selectedExerciseId) || FITNESS_EXERCISES_DATA[0];
  const selectedExercise = getLocalizedExercise(selectedRawExercise);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D2C7] shadow-sm space-y-8 animate-in fade-in duration-200">
      
      {/* Header with WHO Standards Highlight */}
      <div className="space-y-3 border-b border-[#F0E6DD] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isUrdu
                ? 'عالمی ادارہ صحت (WHO) کی مستند ورزشی ہدایات'
                : 'WHO (World Health Organization) Clinical Guidelines'}
            </span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold">
            {isUrdu ? 'ہدف: ہفتے میں 150 تا 300 منٹ' : '150 - 300 Mins / Week Target'}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A121A] tracking-tight">
          {isUrdu ? 'صحت اور تندرستی کی مستند ورزشیں' : 'Evidence-Based Health & Fitness Exercises'}
        </h2>

        {/* WHO Guidelines Paragraph */}
        <p className="text-sm sm:text-base text-[#5F4B44] leading-relaxed max-w-4xl">
          {isUrdu ? (
            <>
              <strong className="text-[#4A121A]">عالمی ادارہ صحت (WHO) کی جسمانی سرگرمی کی گائیڈلائنز</strong> کے مطابق ہر بالغ فرد کو ہفتے میں کم از کم <strong>150 سے 300 منٹ درمیانی شدت کی ورزش</strong> (جیسے تیز واک) اور ہفتے میں 2 دن پٹھوں کو مضبوط کرنے والی ورزش کرنی چاہیے۔ یہ سائنسی ورزشیں دل کی صحت، بلڈ شوگر (انسولین) کنٹرول اور جوڑوں کی لچک کے لیے تیار کی گئی ہیں۔
            </>
          ) : (
            <>
              According to the <strong className="text-[#4A121A]">World Health Organization (WHO) Global Guidelines on Physical Activity & Health</strong>, every adult should engage in at least <strong>150 to 300 minutes of moderate-intensity aerobic exercise</strong> (or 75–150 minutes of vigorous aerobic activity) weekly, complemented by muscle-strengthening resistance work on 2 or more days. Below are clinically calibrated exercises designed to improve cardiovascular elasticity, increase non-insulin glucose uptake, and maintain joint mobility for chronic disease prevention.
            </>
          )}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-[#722F37] text-white shadow-xs scale-[1.02]'
                  : 'bg-[#FAF7F2] text-[#5A453F] border border-[#D9C4B5] hover:bg-white'
              }`}
            >
              {isUrdu ? (EXERCISE_CATEGORY_UR[cat] || cat) : cat}
            </button>
          );
        })}
      </div>

      {/* Exercises Grid & Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Exercises Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredExercises.map((rawEx) => {
            const exercise = getLocalizedExercise(rawEx);
            const isSelected = selectedExerciseId === rawEx.id;
            return (
              <div
                key={rawEx.id}
                onClick={() => setSelectedExerciseId(rawEx.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#FAF0E6] border-[#722F37] ring-2 ring-[#722F37]/15 shadow-sm'
                    : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#722F37] border border-[#DFCFC2]">
                      {isUrdu
                        ? (EXERCISE_CATEGORY_UR[rawEx.category] || rawEx.category)
                        : rawEx.category.split('&')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8C766F]">
                      {isUrdu ? (EXERCISE_DIFFICULTY_UR[rawEx.difficulty] || rawEx.difficulty) : rawEx.difficulty}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#4A121A] group-hover:text-[#722F37]">
                    {exercise.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#78615A]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#722F37]" />
                      {exercise.durationOrReps}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      {exercise.caloriesBurnedEst}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-5 h-5 text-[#722F37] transition-transform ${
                  isSelected ? 'translate-x-1 text-[#722F37]' : 'text-[#A8968F]'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Exercise Interactive Breakdown */}
        {selectedExercise && (
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] space-y-6">
            <div className="border-b border-[#E8DDD2] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#722F37]">
                  {isUrdu ? (EXERCISE_CATEGORY_UR[selectedRawExercise.category] || selectedRawExercise.category) : selectedRawExercise.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200">
                  ⚡ {isUrdu ? `${EXERCISE_DIFFICULTY_UR[selectedRawExercise.difficulty] || selectedRawExercise.difficulty} سطح` : `${selectedRawExercise.difficulty} Level`}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A] mt-1.5">
                {selectedExercise.title}
              </h3>
              <p className="text-xs text-[#78615A] mt-1">
                <strong>{isUrdu ? 'متاثرہ پٹھے:' : 'Target Muscle Anatomy:'}</strong> {selectedExercise.targetMuscles}
              </p>
            </div>

            {/* WHO Clinical Benefit Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{isUrdu ? 'عالمی ادارہ صحت (WHO) طبی ثبوت' : 'WHO Clinical & Metabolic Evidence'}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                {selectedExercise.whoClinicalBenefit}
              </p>
            </div>

            {/* Quick Metrics (Cadence & Energy) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-[#D9C4B5]">
                <span className="text-[#8C766F] block">
                  {isUrdu ? 'تجویز کردہ دورانیہ / سیٹس:' : 'Recommended Cadence:'}
                </span>
                <strong className="text-sm font-serif text-[#4A121A]">{selectedExercise.durationOrReps}</strong>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#D9C4B5]">
                <span className="text-[#8C766F] block">
                  {isUrdu ? 'تخمینی کیلوریز کا اخراج:' : 'Energy Expenditure:'}
                </span>
                <strong className="text-sm font-serif text-[#722F37]">{selectedExercise.caloriesBurnedEst}</strong>
              </div>
            </div>

            {/* Step-by-Step Execution */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#4A121A] uppercase tracking-wider">
                {isUrdu ? 'ورزش کرنے کا صحیح مرحلہ وار طریقہ:' : 'Step-by-Step Proper Form Execution:'}
              </h4>
              <div className="space-y-2">
                {selectedExercise.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8DDD2] text-xs sm:text-sm text-[#4A121A]">
                    <span className="w-5 h-5 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Form Precautions */}
            <div className="p-4 rounded-2xl bg-white border border-[#E0D2C7] space-y-1.5">
              <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider block">
                {isUrdu ? 'حفاظتی احتیاطی تدابیر:' : 'Safety & Alignment Cues:'}
              </span>
              <ul className="text-xs text-[#5F4B44] space-y-1">
                {selectedExercise.tips.map((tip, idx) => (
                  <li key={idx}>✓ {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
