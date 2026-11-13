import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Flame,
  Wind,
  AlertTriangle,
  Bone,
  Sun,
  Activity,
  Zap,
  Heart,
  UserCheck,
  Search,
  PhoneCall,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  MapPin,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  BriefcaseMedical,
  ShieldAlert,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FirstAidGuidePageProps {
  onBack: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenEmergencyModal: () => void;
}

interface FirstAidItem {
  id: string;
  category: 'critical' | 'home';
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  titleEn: string;
  titleUr: string;
  summaryEn: string;
  summaryUr: string;
  stepsEn: string[];
  stepsUr: string[];
  avoidEn: string[];
  avoidUr: string[];
  call1122En: string;
  call1122Ur: string;
}

const FIRST_AID_ITEMS: FirstAidItem[] = [
  {
    id: 'burns',
    category: 'home',
    icon: Flame,
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100/80',
    titleEn: 'Burns',
    titleUr: 'جلنا (آگ، گرم پانی یا بھاپ سے)',
    summaryEn: 'Cool the skin quickly with clean running water and protect from infection.',
    summaryUr: 'جلی ہوئی جلد کو فوراً صاف بہتے پانی سے ٹھنڈا کریں اور انفیکشن سے بچائیں۔',
    stepsEn: [
      'Cool the burn under cool (not ice-cold) running tap water for 10–20 minutes.',
      'Gently remove jewelry, watches, or tight clothing near the burn before swelling starts.',
      'Cover loosely with a clean non-stick dressing or clean kitchen cling film.',
      'Keep the person warm with a clean blanket away from the burned area.',
      'Give a mild pain reliever like Paracetamol if needed and the person is awake.'
    ],
    stepsUr: [
      'جلی ہوئی جگہ پر 10 سے 20 منٹ تک نارمل ٹھنڈا (برف جیسا نہیں) نل کا پانی بہائیں۔',
      'سوجن آنے سے پہلے آس پاس کی انگوٹھی، گھڑی یا تنگ کپڑے نرمی سے اتار دیں۔',
      'زخم کو صاف نان اسٹک پٹی یا صاف کلنگ فلم سے ہلکا سا ڈھانپ دیں۔',
      'مریض کو ٹھنڈ سے بچانے کے لیے جسم کے باقی حصے پر صاف چادر ڈال دیں۔',
      'اگر مریض ہوش میں ہو تو درد کم کرنے کے لیے سادہ پیراسیٹامول دی جا سکتی ہے۔'
    ],
    avoidEn: [
      'Do NOT apply toothpaste, butter, ghee, oil, haldi, or raw egg.',
      'Do NOT put ice directly on the burn or pop any water blisters.'
    ],
    avoidUr: [
      'جلی ہوئی جگہ پر ٹوتھ پیسٹ، مکھن، گھی، تیل، ہلدی یا انڈا ہرگز نہ لگائیں۔',
      'زخم پر براہِ راست برف نہ رکھیں اور بننے والے آبلے (چھالے) نہ پھوڑیں۔'
    ],
    call1122En: 'Seek medical help if the burn is larger than your palm, is deep/white, or is on the face, hands, feet, joints, or caused by electricity/chemicals.',
    call1122Ur: 'اگر زخم ہتھیلی سے بڑا ہو، چہرے، ہاتھوں، پاؤں یا جوڑوں پر ہو، یا کرنٹ/کیمیکل سے جلا ہو تو فوراً 1122 یا ہسپتال جائیں۔'
  },
  {
    id: 'choking',
    category: 'critical',
    icon: Wind,
    iconColor: 'text-rose-700',
    iconBg: 'bg-rose-100/80',
    titleEn: 'Choking',
    titleUr: 'گلے میں کھانا یا کوئی چیز پھنس جانا',
    summaryEn: 'Help clear a blocked airway fast using back blows and abdominal thrusts.',
    summaryUr: 'سانس کی نالی بند ہونے پر کمر پر تھپکی اور پیٹ کے دباؤ (Heimlich) سے چیز باہر نکالیں۔',
    stepsEn: [
      'Ask loudly: "Are you choking?" If they can cough or speak, encourage them to keep coughing hard.',
      'If they cannot breathe, cough, or speak, stand behind them and lean them forward.',
      'Give up to 5 firm back blows between the shoulder blades using the heel of your hand.',
      'If still blocked, wrap arms around their waist, place a fist just above the belly button, and pull inward & upward 5 times.',
      'Repeat 5 back blows and 5 belly thrusts until the object pops out or help arrives.'
    ],
    stepsUr: [
      'پوچھیں: "کیا گلے میں کچھ پھنس گیا ہے؟" اگر وہ کھانس سکیں تو انہیں زور سے کھانسنے کو کہیں۔',
      'اگر سانس یا آواز بند ہو جائے تو ان کے پیچھے کھڑے ہو کر انہیں آگے کی طرف جھکائیں۔',
      'اپنی ہتھیلی کے نچلے حصے سے دونوں کندھوں کے درمیان کمر پر 5 مضبوط تھپکیاں دیں۔',
      'اگر چیز نہ نکلے تو کمر کے گرد بازو لپیٹ کر ناف کے تھوڑا اوپر مٹھی رکھیں اور اندر و اوپر کی طرف 5 جھٹکے دیں۔',
      'جب تک پھنسی ہوئی چیز نہ نکلے یا ایمبولینس نہ آئے، 5 کمر کی تھپکیاں اور 5 پیٹ کے دباؤ دہراتے رہیں۔'
    ],
    avoidEn: [
      'Do NOT reach blindly into the throat with your fingers—it can push the food deeper.',
      'Do NOT give water or bread to "push it down" when someone cannot breathe.'
    ],
    avoidUr: [
      'بغیر دیکھے منہ میں انگلی ڈال کر چیز نکالنے کی کوشش نہ کریں، اس سے چیز مزید اندر جا سکتی ہے۔',
      'سانس رکنے کی حالت میں پانی یا روٹی کا نوالہ ہرگز نہ کھلائیں۔'
    ],
    call1122En: 'Call Rescue 1122 immediately if choking lasts more than 30 seconds or the person turns pale/unconscious.',
    call1122Ur: 'اگر سانس 30 سیکنڈ سے زیادہ بند رہے یا مریض بے ہوش ہونے لگے تو فوراً ریسکیو 1122 پر کال کریں۔'
  },
  {
    id: 'severe-bleeding',
    category: 'critical',
    icon: AlertTriangle,
    iconColor: 'text-rose-700',
    iconBg: 'bg-rose-100/80',
    titleEn: 'Severe Bleeding',
    titleUr: 'شدید خون بہنا',
    summaryEn: 'Stop blood loss quickly using steady, firm direct pressure on the wound.',
    summaryUr: 'زخم پر صاف کپڑے سے مضبوط اور مسلسل دباؤ ڈال کر خون روکیں۔',
    stepsEn: [
      'Wear clean disposable gloves or use a clean cloth/plastic barrier if available.',
      'Press firmly and directly onto the wound using a clean cloth, gauze pad, or folded bandage.',
      'Keep pressing steadily for at least 10 minutes without lifting the cloth to peek.',
      'If blood soaks through, place a fresh cloth right on top of the first one and press harder.',
      'Lay the injured person flat, keep them calm, and cover them with a light sheet to prevent shock.'
    ],
    stepsUr: [
      'اگر میسر ہو تو صاف دستانے پہن لیں یا صاف کپڑے/پلاسٹک کی تہہ استعمال کریں۔',
      'زخم پر صاف کپڑا یا جراثیم سے پاک پٹی رکھ کر ہاتھ سے سیدھا اور مضبوط دباؤ ڈالیں۔',
      'کم از کم 10 منٹ تک مسلسل دباؤ برقرار رکھیں اور بار بار کپڑا اٹھا کر نہ دیکھیں۔',
      'اگر پہلا کپڑا خون سے بھیگ جائے تو اسے اتاریں نہیں، بلکہ اس کے اوپر نیا صاف کپڑا رکھ کر دبائیں۔',
      'زخمی کو سیدھا لٹا دیں، تسلی دیں اور ٹھنڈ سے بچانے کے لیے ہلکی چادر اوڑھا دیں۔'
    ],
    avoidEn: [
      'Do NOT pull out any knife, glass, or sharp object stuck inside the wound—press around it.',
      'Do NOT put coffee powder, turmeric, clay, or ash on an open bleeding wound.'
    ],
    avoidUr: [
      'اگر زخم میں شیشہ یا کوئی نوکیلی چیز پھنسی ہو تو اسے خود نہ نکالیں، بلکہ اس کے اردگرد دباؤ ڈالیں۔',
      'کُھلے زخم پر کافی، ہلدی، مٹی یا راکھ ہرگز نہ لگائیں۔'
    ],
    call1122En: 'Call 1122 right away if bleeding spurts, will not stop after 10 minutes, or the person feels dizzy.',
    call1122Ur: 'اگر خون فوارے کی طرح نکلے، 10 منٹ دباؤ کے بعد بھی نہ رکے یا چکر آئیں تو فوراً 1122 پر کال کریں۔'
  },
  {
    id: 'fractures',
    category: 'home',
    icon: Bone,
    iconColor: 'text-[#722F37]',
    iconBg: 'bg-[#FAF0E6]',
    titleEn: 'Fractures (Broken Bones)',
    titleUr: 'ہڈی ٹوٹنا یا موچ آنا',
    summaryEn: 'Keep the injured arm or leg completely still until a doctor checks it.',
    summaryUr: 'ٹوٹے ہوئے بازو یا ٹانگ کو بالکل حرکت نہ دیں اور سہارا دے کر ہسپتال لے جائیں۔',
    stepsEn: [
      'Keep the injured limb still—tell the person not to move or put weight on it.',
      'Support the area above and below the break with cushions, rolled towels, or a makeshift splint.',
      'If a bone poked through the skin, cover it gently with a clean moist gauze without pushing it back.',
      'Apply an ice pack wrapped in a cloth for 15 minutes to reduce swelling.',
      'Treat for shock by keeping the person still and calm until ambulance or X-ray care.'
    ],
    stepsUr: [
      'متاثرہ بازو یا ٹانگ کو بالکل ساکت رکھیں اور مریض کو وزن ڈالنے یا ہلانے سے روکیں۔',
      'زخمی حصے کے اوپر اور نیچے تکیہ، لپیٹا ہوا تولیہ یا لکڑی کی کھپچی رکھ کر سہارا دیں۔',
      'اگر ہڈی جلد سے باہر نظر آ رہی ہو تو اسے اندر دھکیلنے کے بجائے صاف نم کپڑے سے ہلکا سا ڈھانپ دیں۔',
      'سوجن کم کرنے کے لیے کپڑے میں لپٹی ہوئی برف 15 منٹ تک ہلکی سی لگائیں۔',
      'ایمبولینس آنے یا ایکسرے کرانے تک مریض کو پرسکون اور لیٹا ہوا رکھیں۔'
    ],
    avoidEn: [
      'Do NOT let anyone pull, massage, or try to "set" a broken bone at home (pehlwan/bonesetter).',
      'Do NOT move someone if you suspect a neck, back, or hip injury—wait for 1122 paramedics.'
    ],
    avoidUr: [
      'ٹوٹے ہوئے جوڑ یا ہڈی کو گھر پر کھینچنے، مالش کرنے یا بٹھانے کی کوشش ہرگز نہ کریں۔',
      'اگر گردن، کمر یا کولہے کی ہڈی میں چوٹ کا شک ہو تو مریض کو بالکل نہ ہلائیں، ریسکیو 1122 کا انتظار کریں۔'
    ],
    call1122En: 'Call 1122 immediately for neck, spine, thigh/hip breaks, open wounds over bone, or numb/blue fingers or toes.',
    call1122Ur: 'گردن، ریڑھ کی ہڈی، ران یا کھلے زخم کی صورت میں یا انگلیاں سن/نیلی ہونے پر فوراً 1122 بلائیں۔'
  },
  {
    id: 'heatstroke',
    category: 'critical',
    icon: Sun,
    iconColor: 'text-orange-700',
    iconBg: 'bg-orange-100/80',
    titleEn: 'Heatstroke (Extreme Heat)',
    titleUr: 'لو لگنا / شدید گرمی (ہیٹ اسٹروک)',
    summaryEn: 'Lower body temperature urgently—Pakistan summer heatstrokes are medical emergencies.',
    summaryUr: 'پاکستان کی شدید گرمی میں لو لگنے پر مریض کے جسم کو فوری طور پر ٹھنڈا کریں۔',
    stepsEn: [
      'Move the person out of the sun immediately into shade or an air-conditioned / fan-cooled room.',
      'Loosen outer clothing and sponge or spray the whole body continuously with cool water while fanning air.',
      'Place wrapped ice packs or wet towels at the neck, armpits, and groin where major blood vessels run.',
      'If fully awake and able to swallow, give small sips of ORS (nimkol) or plain cool water.',
      'Monitor breathing closely until body temperature cools down and hospital care takes over.'
    ],
    stepsUr: [
      'مریض کو فوراً دھوپ سے ہٹا کر سایہ دار، ہوا دار یا ایئر کنڈیشنڈ کمرے میں لے جائیں۔',
      'اوپری کپڑے ڈھیلے کریں، پورے جسم پر ٹھنڈے پانی کا اسپرے یا گیلی پٹیاں کریں اور تیز پنکھا چلائیں۔',
      'گردن، بغلوں اور رانوں کے جوڑوں پر گیلے ٹھنڈے تولیے یا کپڑے میں لپٹی برف رکھیں۔',
      'اگر مریض مکمل ہوش میں ہو تو تھوڑا تھوڑا نمکول (ORS) یا سادہ ٹھنڈا پانی پلائیں۔',
      'سانس پر نظر رکھیں اور جسم کا درجہ حرارت کم ہونے تک مسلسل ٹھنڈک پہنچاتے رہیں۔'
    ],
    avoidEn: [
      'Do NOT force fluids into someone who is confused, drowsy, vomiting, or unconscious.',
      'Do NOT give Panadol/Paracetamol for heatstroke—it does not cool heatstroke and stresses the liver.'
    ],
    avoidUr: [
      'اگر مریض غنودگی میں ہو، قے کر رہا ہو یا بے ہوش ہو تو منہ میں زبردستی پانی نہ ڈالیں۔',
      'ہیٹ اسٹروک میں بخار کی گولیاں (پیناڈول وغیرہ) نہ دیں، یہ گرمی کم نہیں کرتیں بلکہ جگر پر بوجھ ڈالتی ہیں۔'
    ],
    call1122En: 'Call 1122 right away if body is very hot, skin feels dry or flushed, or the person is confused, slurring, or passes out.',
    call1122Ur: 'جسم بہت گرم ہونے، چکر آنے، بہکی باتیں کرنے یا بے ہوش ہونے پر فوراً ریسکیو 1122 پر کال کریں۔'
  },
  {
    id: 'snake-bite',
    category: 'critical',
    icon: Activity,
    iconColor: 'text-emerald-800',
    iconBg: 'bg-emerald-100/80',
    titleEn: 'Snake Bite',
    titleUr: 'سانپ کا ڈسنا',
    summaryEn: 'Keep the patient still and rush to a government/tertiary hospital for Anti-Snake Venom (ASV).',
    summaryUr: 'مریض کو بالکل پرسکون و ساکت رکھیں اور فوراً اینٹی وینم ویکسین کے لیے بڑے ہسپتال لے جائیں۔',
    stepsEn: [
      'Keep the person calm and lying completely still—panic and walking spread venom much faster.',
      'Remove rings, watches, bangles, or tight shoes near the bite before swelling starts.',
      'Gently wash the bite area once with clean water and soap without scrubbing hard.',
      'Keep the bitten arm or leg immobilized with a loose splint at or slightly below heart level.',
      'Note the time of the bite and snake color/pattern from a safe distance, and go directly to the nearest ER with Anti-Snake Venom.'
    ],
    stepsUr: [
      'مریض کو بالکل ساکت لٹا دیں اور گھبرانے یا چلنے سے روکیں (حرکت سے زہر تیزی سے پھیلتا ہے)۔',
      'سوجن سے پہلے متاثرہ ہاتھ یا پاؤں سے انگوٹھی، چوڑیاں، گھڑی اور جوتا فوراً اتار دیں۔',
      'ڈسے ہوئے حصے کو رگڑے بغیر ایک بار صاف پانی اور صابن سے نرمی سے دھو لیں۔',
      'متاثرہ بازو یا ٹانگ کو دل کی سطح کے برابر یا قدرے نیچے رکھ کر ڈھیلی کھپچی سے سہارا دیں۔',
      'کاٹنے کا وقت نوٹ کریں اور فوراً قریبی سرکاری یا بڑے ہسپتال جائیں جہاں اینٹی وینم (ASV) دستیاب ہو۔'
    ],
    avoidEn: [
      'Do NOT cut the wound with a blade, do NOT try to suck out the venom, and do NOT tie a tight rope/tourniquet.',
      'Do NOT waste golden hours on herbal pastes, stones (manaka), or unverified home remedies.'
    ],
    avoidUr: [
      'زخم پر بلیڈ سے کٹ نہ لگائیں، منہ سے زہر چوسنے کی کوشش نہ کریں اور اوپر رسی سے سخت پٹی (ٹورنی کیٹ) ہرگز نہ باندھیں۔',
      'جڑی بوٹیوں، منکے یا دم درود میں قیمتی وقت ضائع نہ کریں۔'
    ],
    call1122En: 'Every snake bite is an emergency—call 1122 or reach Civil / District / Tertiary Hospital ER immediately.',
    call1122Ur: 'سانپ کا ہر کاٹا ایمرجنسی ہے—فوراً 1122 پر کال کریں یا سول/بڑے ہسپتال کی ایمرجنسی پہنچیں۔'
  },
  {
    id: 'electric-shock',
    category: 'critical',
    icon: Zap,
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100/80',
    titleEn: 'Electric Shock',
    titleUr: 'بجلی کا جھٹکا / کرنٹ لگنا',
    summaryEn: 'Turn off the main power first before touching the person to keep yourself safe.',
    summaryUr: 'اپنی جان بچانے کے لیے مریض کو چھونے سے پہلے مین سوئچ یا بریکر فوراً بند کریں۔',
    stepsEn: [
      'Look first—do NOT touch the person until you are 100% sure the electricity is switched OFF.',
      'Switch off the main breaker or unplug the cord. If impossible, use a completely dry wooden broom or plastic stick to push the wire away.',
      'Once safe, check if the person is awake and breathing normally.',
      'If unresponsive and not breathing, call Rescue 1122 immediately and start chest compressions (CPR).',
      'If breathing, place them gently on their side and treat any electrical entry/exit burns with cool water & clean dressing.'
    ],
    stepsUr: [
      'پہلے تسلی کریں—جب تک بجلی کا کنکشن مکمل بند نہ ہو جائے، مریض کو ہاتھ ہرگز نہ لگائیں۔',
      'فوراً مین بریکر یا سوئچ آف کریں۔ اگر ممکن نہ ہو تو بالکل خشک لکڑی یا پلاسٹک کی چھڑی سے تار ہٹائیں۔',
      'محفوظ ہونے کے بعد چیک کریں کہ آیا مریض ہوش میں ہے اور سانس لے رہا ہے یا نہیں۔',
      'اگر سانس یا ہوش نہ ہو تو فوراً 1122 پر کال کریں اور سینے پر دباؤ (CPR) شروع کریں۔',
      'اگر سانس چل رہا ہو تو کروٹ پر لٹا دیں اور جلی ہوئی جگہ پر صاف ٹھنڈی پٹی رکھیں۔'
    ],
    avoidEn: [
      'Do NOT touch the victim with bare hands, wet clothes, or metal rods while power is still on.',
      'Do NOT approach fallen outdoor high-voltage WAPDA/K-Electric wires—stay 10+ meters away and call 1122.'
    ],
    avoidUr: [
      'کرنٹ چالو ہونے کی حالت میں ننگے ہاتھوں، گیلے کپڑوں یا لوہے کی چیز سے مریض کو مت چھوئیں۔',
      'باہر گری ہوئی ہائی وولٹیج تاروں سے کم از کم 10 میٹر دور رہیں اور فوری 1122 کو اطلاع دیں۔'
    ],
    call1122En: 'All electric shocks need hospital ECG monitoring—even if the person looks fine—because shock can upset heart rhythm.',
    call1122Ur: 'کرنٹ لگنے کے بعد اگر مریض ٹھیک بھی لگے تب بھی ہسپتال میں ECG چیک کرانا ضروری ہے کیونکہ یہ دل کی دھڑکن متاثر کر سکتا ہے۔'
  },
  {
    id: 'heart-attack',
    category: 'critical',
    icon: Heart,
    iconColor: 'text-rose-700',
    iconBg: 'bg-rose-100/80',
    titleEn: 'Heart Attack',
    titleUr: 'دل کا دورہ (ہارٹ اٹیک)',
    summaryEn: 'Recognize chest pressure early, call 1122, rest comfortably, and chew Aspirin if safe.',
    summaryUr: 'سینے میں دباؤ پہچانیں، فوری 1122 پر کال کریں، آرام سے بٹھائیں اور اگر الرجی نہ ہو تو ڈسپرین چبائیں۔',
    stepsEn: [
      'Watch for warning signs: heavy chest tightness/pressure spreading to left arm, jaw, neck, or back, cold sweat, or shortness of breath.',
      'Call Rescue 1122 or rush immediately to the nearest Cardiac Emergency (NICVD, PIC, RIC, or Tertiary ER).',
      'Have the person sit upright slightly propped back with knees bent ("W" position) and loosen collar/belt.',
      'If the person is awake, not allergic to aspirin, and a doctor has not forbidden it, let them chew one 300mg Aspirin (Disprin) slowly.',
      'If they collapse and stop breathing normally, start hands-only CPR (100–120 chest pushes/minute) using our CPR timer below.'
    ],
    stepsUr: [
      'علامات پہچانیں: سینے میں بوجھ یا جکڑن جو بائیں بازو، جبڑے، گردن یا کمر تک جائے، ٹھنڈا پسینہ یا سانس پھولنا۔',
      'فوراً ریسکیو 1122 پر کال کریں یا قریبی کارڈیک ایمرجنسی (NICVD، PIC، RIC یا بڑے ہسپتال) پہنچیں۔',
      'مریض کو کمر کے پیچھے تکیہ لگا کر آرام دہ نیم بیٹھی حالت میں بٹھائیں اور کالر یا بیلٹ ڈھیلا کر دیں۔',
      'اگر مریض ہوش میں ہو اور اسپرین سے الرجی نہ ہو تو ایک 300mg اسپرین/ڈسپرین کی گولی آہستہ چبا کر نگلنے دیں۔',
      'اگر مریض بے ہوش ہو جائے اور سانس بند ہو تو نیچے دیے گئے CPR ٹائمر کی مدد سے سینے پر تیز دباؤ شروع کریں۔'
    ],
    avoidEn: [
      'Do NOT let the patient drive themselves or walk upstairs—keep physical effort at zero.',
      'Do NOT dismiss severe chest pressure or upper stomach heaviness as "just gas/acidity" in adults over 35.'
    ],
    avoidUr: [
      'مریض کو خود گاڑی چلانے یا سیڑھیاں چڑھنے ہرگز نہ دیں۔',
      '35 سال سے زائد عمر میں سینے کے دباؤ یا معدے کے اوپری بھاری پن کو محض "گیس یا تیزابیت" سمجھ کر نظرانداز نہ کریں۔'
    ],
    call1122En: 'Call Rescue 1122 immediately—the first 60 minutes ("Golden Hour") saves heart muscle and lives.',
    call1122Ur: 'فوری 1122 پر کال کریں—پہلے 60 منٹ (گولڈن آور) دل کے پٹھوں اور جان بچانے کے لیے سب سے اہم ہیں۔'
  },
  {
    id: 'fainting',
    category: 'home',
    icon: UserCheck,
    iconColor: 'text-blue-800',
    iconBg: 'bg-blue-100/80',
    titleEn: 'Fainting (Passing Out)',
    titleUr: 'بے ہوش ہو جانا / چکر آ کر گرنا',
    summaryEn: 'Lay the person flat and raise their legs to bring blood back to the brain.',
    summaryUr: 'مریض کو سیدھا لٹا کر ٹانگیں تھوڑی اونچی کریں تاکہ دماغ تک خون پہنچ سکے۔',
    stepsEn: [
      'Catch or ease the person safely onto the floor and lay them flat on their back.',
      'If there is no leg or spine injury, raise their legs about 12 inches (30 cm) on a pillow or chair to restore blood flow to the brain.',
      'Loosen tight collars, scarves, dupattas, or belts and ask people standing around to step back for fresh air.',
      'If breathing normally but still sleepy after 1 minute, gently roll them onto their side (Recovery Position).',
      'Once fully awake, let them rest 10 minutes before sitting up slowly and give small sips of water or sweet juice.'
    ],
    stepsUr: [
      'مریض کو محفوظ طریقے سے فرش پر کمر کے بل سیدھا لٹا دیں۔',
      'اگر ٹانگ یا کمر پر چوٹ نہ ہو تو تکیے یا کرسی کی مدد سے ٹانگیں تقریباً 1 فٹ (30 سینٹی میٹر) اونچی کر دیں۔',
      'گلے کا کالر، دوپٹہ یا بیلٹ ڈھیلا کریں اور اردگرد کھڑے ہجوم کو ہٹا کر تازہ ہوا آنے دیں۔',
      'اگر سانس چل رہا ہو مگر 1 منٹ بعد بھی ہوش پورا نہ آئے تو مریض کو نرمی سے ایک کروٹ پر لٹا دیں۔',
      'ہوش آنے پر کم از کم 10 منٹ آرام کرائیں، پھر آہستہ بٹھا کر تھوڑا پانی یا میٹھا مشروب پلائیں۔'
    ],
    avoidEn: [
      'Do NOT splash heavy water on the face or pour water into an unconscious person\'s mouth—they can choke.',
      'Do NOT sit a fainted person upright immediately or slap their face.'
    ],
    avoidUr: [
      'بے ہوش شخص کے منہ میں پانی ڈالنے کی کوشش ہرگز نہ کریں، اس سے سانس کی نالی بند ہو سکتی ہے۔',
      'مریض کو فوراً سیدھا کھڑا یا بیٹھا نہ کریں اور نہ ہی چہرے پر تھپڑ ماریں۔'
    ],
    call1122En: 'Call 1122 if they do not wake up within 2 minutes, have diabetes, chest pain, fits/seizures, or hit their head hard.',
    call1122Ur: 'اگر مریض 2 منٹ میں ہوش میں نہ آئے، شوگر کا مریض ہو، دورے پڑیں یا سر پر چوٹ لگی ہو تو فوراً 1122 بلائیں۔'
  }
];

interface KitItem {
  id: string;
  en: string;
  ur: string;
}

const FIRST_AID_KIT_ITEMS: KitItem[] = [
  { id: 'kit-ors', en: 'ORS (Nimkol) Packets (4–6)', ur: 'نمکول (ORS) کے پیکٹ (4 سے 6)' },
  { id: 'kit-gauze', en: 'Sterile Gauze Pads & Cotton Bandages', ur: 'جراثیم سے پاک گوز پیڈ اور پٹیاں' },
  { id: 'kit-antiseptic', en: 'Antiseptic Solution (Pyodine / Dettol)', ur: 'جراثیم کش محلول (پائیوڈین / ڈیٹول)' },
  { id: 'kit-cling', en: 'Clean Non-Stick Cling Film (for Burns)', ur: 'جلنے کے لیے صاف کلنگ فلم / نان اسٹک پٹی' },
  { id: 'kit-crepe', en: 'Elastic Crepe Bandage (Sprains/Splints)', ur: 'گرم لچکدار پٹی (موچ یا سہارا دینے کے لیے)' },
  { id: 'kit-thermo', en: 'Digital Thermometer & Paracetamol', ur: 'ڈیجیٹل تھرمامیٹر اور بخار کی دوا' },
  { id: 'kit-gloves', en: 'Disposable Gloves & Blunt Scissors', ur: 'ڈسپوزایبل دستانے اور قینچی' },
  { id: 'kit-numbers', en: 'Rescue 1122 & Family ICE Contact Card', ur: 'ریسکیو 1122 اور گھر والوں کے ایمرجنسی نمبرز کارڈ' }
];

export const FirstAidGuidePage: React.FC<FirstAidGuidePageProps> = ({
  onBack,
  onNavigateTab,
  onOpenEmergencyModal
}) => {
  const { isUrdu } = useLanguage();
  const [openId, setOpenId] = useState<string>('burns');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'critical' | 'home'>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Additional Feature: Interactive CPR 110 BPM Pacer
  const [cprActive, setCprActive] = useState<boolean>(false);
  const [cprCount, setCprCount] = useState<number>(0);
  const [cprPulse, setCprPulse] = useState<boolean>(false);
  const [cprAudioEnabled, setCprAudioEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Additional Feature: Home First Aid Kit Checklist persisted in localStorage
  const [checkedKit, setCheckedKit] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('carehub_firstaid_kit');
      return saved ? JSON.parse(saved) : ['kit-ors', 'kit-gauze', 'kit-thermo'];
    } catch {
      return ['kit-ors', 'kit-gauze', 'kit-thermo'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carehub_firstaid_kit', JSON.stringify(checkedKit));
    } catch {
      /* ignore storage errors */
    }
  }, [checkedKit]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // CPR Metronome Interval (110 BPM -> ~545ms per compression)
  useEffect(() => {
    if (!cprActive) {
      setCprPulse(false);
      return;
    }

    const interval = setInterval(() => {
      setCprCount((prev) => (prev >= 30 ? 1 : prev + 1));
      setCprPulse(true);
      setTimeout(() => setCprPulse(false), 180);

      if (cprAudioEnabled && typeof window !== 'undefined') {
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            if (!audioCtxRef.current) {
              audioCtxRef.current = new AudioContextClass();
            }
            const ctx = audioCtxRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 660;
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.09);
          }
        } catch {
          /* ignore audio block */
        }
      }
    }, 545);

    return () => clearInterval(interval);
  }, [cprActive, cprAudioEnabled]);

  const handleToggleSpeech = (item: FirstAidItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === item.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const stepsText = isUrdu
      ? `${item.titleUr}. ${item.stepsUr.map((s, i) => `قدم ${i + 1}: ${s}`).join('. ')}`
      : `${item.titleEn} first aid steps. ${item.stepsEn.map((s, i) => `Step ${i + 1}: ${s}`).join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(stepsText);
    utterance.lang = isUrdu ? 'ur-PK' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleKitItem = (id: string) => {
    setCheckedKit((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const filteredItems = FIRST_AID_ITEMS.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.titleEn.toLowerCase().includes(q) ||
        item.titleUr.toLowerCase().includes(q) ||
        item.summaryEn.toLowerCase().includes(q) ||
        item.stepsEn.some((s) => s.toLowerCase().includes(q)) ||
        item.stepsUr.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-200">

      {/* Top Navigation & Emergency Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#722F37] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'ہوم پیج پر واپس جائیں' : 'Back to Home Overview'}</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href="tel:1122"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-200" />
            <span>{isUrdu ? 'فوری کال: ریسکیو 1122' : 'Emergency Call: 1122'}</span>
          </a>
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] hover:border-[#722F37] text-[#4A121A] text-xs font-semibold transition-colors cursor-pointer"
          >
            {isUrdu ? 'شہری ہیلپ لائنز' : 'City Hotlines'}
          </button>
        </div>
      </div>

      {/* Centered Editorial Hero Header (Inspired by Screenshot + CareHub Theme) */}
      <div className="text-center space-y-3 pb-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#722F37] to-[#4A121A] text-amber-200 flex items-center justify-center mx-auto shadow-md">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A121A] tracking-tight">
          {isUrdu ? 'ابتدائی طبی امداد گائیڈ (First Aid)' : 'First Aid Guide'}
        </h1>
        <p className="text-sm sm:text-base text-[#5F4B44] max-w-2xl mx-auto">
          {isUrdu
            ? '9 عام ہنگامی صورتحال کے لیے آسان، قدم بہ قدم رہنمائی — پلس آواز میں سننے کی سہولت، CPR ٹائمر اور گھر کی فرسٹ ایڈ کٹ چیک لسٹ۔'
            : 'Simple step-by-step instructions for 9 common emergencies — plus hands-free voice read-aloud, a CPR timer, and home First Aid kit checklist.'}
        </p>
      </div>

      {/* Quick Filter & Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-[#E0D2C7] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'ہنگامی حالت تلاش کریں (مثلاً جلنا، سانپ، دل کا دورہ، گلا بند ہونا)...'
                : 'Search emergency (e.g. burns, choking, snake, heart attack)...'
            }
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs sm:text-sm text-[#4A121A] placeholder:text-[#9B8881] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C766F] hover:text-[#4A121A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 text-xs font-semibold">
          {([
            { id: 'all' as const, en: 'All 9 Emergencies', ur: 'تمام 9 ایمرجنسیز' },
            { id: 'critical' as const, en: 'Life-Threatening', ur: 'فوری خطرناک' },
            { id: 'home' as const, en: 'Home & Outdoor', ur: 'گھریلو و بیرونی چوٹ' }
          ]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-[#722F37] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#E8DDD2] hover:bg-[#F2EAE2]'
              }`}
            >
              {isUrdu ? tab.ur : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* Main 9 Emergency Accordions Container Card (Matching Screenshot Card Layout in CareHub Theme) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E0D2C7] shadow-sm space-y-3">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openId === item.id;
          const steps = isUrdu ? item.stepsUr : item.stepsEn;
          const avoids = isUrdu ? item.avoidUr : item.avoidEn;
          const isSpeaking = speakingId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-[#FAF7F2]/60 border-[#722F37] shadow-xs'
                  : 'bg-[#FAF7F2]/40 border-[#E8DDD2] hover:border-[#D9C4B5] hover:bg-white'
              }`}
            >
              {/* Accordion Header Row */}
              <div className="w-full p-3.5 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-base sm:text-lg font-bold text-[#4A121A] leading-snug">
                        {isUrdu ? item.titleUr : item.titleEn}
                      </h2>
                      <p className="text-xs text-[#78615A] line-clamp-2 sm:line-clamp-1">
                        {isUrdu ? item.summaryUr : item.summaryEn}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#722F37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleToggleSpeech(item, e)}
                  title={isUrdu ? 'آواز میں قدم بہ قدم سنیں' : 'Listen to steps aloud'}
                  className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer shrink-0 ${
                    isSpeaking
                      ? 'bg-[#722F37] text-white border-[#722F37]'
                      : 'bg-white text-[#722F37] border-[#D9C4B5] hover:bg-[#FAF0E6]'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? (isUrdu ? 'روکیں' : 'Stop') : (isUrdu ? 'سنیں' : 'Listen')}</span>
                </button>
              </div>

              {/* Expanded Step-by-Step Instructions */}
              {isOpen && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#E8DDD2] space-y-5 animate-in fade-in duration-150">

                  {/* Mobile Read-Aloud Button */}
                  <div className="sm:hidden">
                    <button
                      type="button"
                      onClick={(e) => handleToggleSpeech(item, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                        isSpeaking
                          ? 'bg-[#722F37] text-white border-[#722F37]'
                          : 'bg-white text-[#722F37] border-[#D9C4B5]'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? (isUrdu ? 'آواز بند کریں' : 'Stop Voice') : (isUrdu ? 'آواز میں ہدایات سنیں' : 'Read Steps Aloud')}</span>
                    </button>
                  </div>

                  {/* Numbered 1-5 Steps (Matching Screenshot Numbered Circles in CareHub Maroon) */}
                  <div className="space-y-2.5">
                    {steps.map((stepText, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#3E2D27] leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 tabular-nums">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{stepText}</span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Feature: Do NOT Do This + When to Call 1122 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                        <XCircle className="w-4 h-4 text-rose-700 shrink-0" />
                        <span>{isUrdu ? 'یہ غلطی ہرگز نہ کریں:' : 'What NOT to Do:'}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-rose-950">
                        {avoids.map((a, idx) => (
                          <li key={idx} className="leading-relaxed">• {a}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>{isUrdu ? 'کب 1122 یا ہسپتال جانا ضروری ہے؟' : 'When to Call 1122 or Go to ER:'}</span>
                        </div>
                        <p className="text-xs text-amber-950 leading-relaxed">
                          {isUrdu ? item.call1122Ur : item.call1122En}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href="tel:1122"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-bold"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{isUrdu ? '1122 ملائیں' : 'Call 1122'}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => onNavigateTab('hospitals')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#D9C4B5] hover:border-[#722F37] text-[#4A121A] text-[11px] font-bold cursor-pointer"
                        >
                          <MapPin className="w-3 h-3 text-[#722F37]" />
                          <span>{isUrdu ? 'قریبی 24/7 ہسپتال' : 'Find 24/7 ER Hospital'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm font-semibold text-[#4A121A]">
              {isUrdu ? 'اس لفظ سے کوئی فرسٹ ایڈ گائیڈ نہیں ملی۔' : 'No First Aid topic matched your search.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
            >
              {isUrdu ? 'تمام 9 ایمرجنسیز دکھائیں' : 'Show all 9 emergencies'}
            </button>
          </div>
        )}
      </div>

      {/* Additional Interactive Tools Grid: CPR 110 BPM Helper + Home First Aid Kit Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Interactive CPR Rhythm Pacer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E0D2C7] shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'اضافی ایمرجنسی ٹول' : 'Life-Saving Emergency Helper'}
            </span>
            <h3 className="font-serif text-xl font-bold text-[#4A121A]">
              {isUrdu ? 'CPR چیسٹ کمپریشن ٹائمر (110 BPM)' : 'Hands-Only CPR Beat Helper (110 BPM)'}
            </h3>
            <p className="text-xs text-[#6E5A54] leading-relaxed">
              {isUrdu
                ? 'اگر کوئی اچانک گر جائے اور سانس نہ لے رہا ہو، تو 1122 کو کال کر کے اس تیز نبض کے ساتھ سینے کے درمیان سخت اور تیز دباؤ ڈالیں۔'
                : 'If someone collapses and is not breathing, call 1122 and push hard & fast in the center of the chest in time with this beat.'}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-4 space-y-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DDD2]">
            <div
              className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-transform duration-150 ${
                cprPulse
                  ? 'scale-110 bg-[#722F37] border-amber-300 text-white shadow-lg'
                  : 'scale-100 bg-white border-[#722F37] text-[#4A121A]'
              }`}
            >
              <Heart className={`w-6 h-6 mb-0.5 ${cprPulse ? 'text-amber-200 fill-amber-200' : 'text-[#722F37]'}`} />
              <span className="text-2xl font-serif font-extrabold tabular-nums">
                {cprCount}/30
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {cprActive ? (isUrdu ? 'دبائیں!' : 'PUSH!') : '110 BPM'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!cprActive && cprCount === 0) setCprCount(1);
                  setCprActive((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {cprActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{cprActive ? (isUrdu ? 'روکیں' : 'Pause Beat') : (isUrdu ? 'CPR تال شروع کریں' : 'Start CPR Beat')}</span>
              </button>

              <button
                type="button"
                onClick={() => setCprAudioEnabled((p) => !p)}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                  cprAudioEnabled
                    ? 'bg-amber-100 border-amber-300 text-amber-950'
                    : 'bg-white border-[#D9C4B5] text-[#5F4B44]'
                }`}
              >
                {cprAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isUrdu ? 'آواز' : 'Beep'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCprActive(false);
                  setCprCount(0);
                }}
                className="p-2 rounded-xl bg-white border border-[#D9C4B5] text-[#5F4B44] hover:bg-[#F2EAE2] cursor-pointer"
                title={isUrdu ? 'ری سیٹ' : 'Reset'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Home & Travel First Aid Kit Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E0D2C7] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E6DD] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF0E6] text-[#722F37] flex items-center justify-center shrink-0">
                <BriefcaseMedical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                  {isUrdu ? 'گھر اور گاڑی کی فرسٹ ایڈ کٹ چیک لسٹ' : 'Home & Car First Aid Kit Checklist'}
                </h3>
                <p className="text-xs text-[#78615A]">
                  {isUrdu
                    ? 'ضروری اشیاء چیک کریں تاکہ ہنگامی وقت میں سب کچھ گھر پر موجود ہو۔'
                    : 'Tick items you already keep ready at home or in your car.'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#722F37] bg-[#FAF0E6] px-3 py-1 rounded-xl border border-[#DFCFC2] self-start sm:self-auto tabular-nums">
              {checkedKit.length}/{FIRST_AID_KIT_ITEMS.length} {isUrdu ? 'تیار' : 'Ready'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {FIRST_AID_KIT_ITEMS.map((kItem) => {
              const isChecked = checkedKit.includes(kItem.id);
              return (
                <button
                  key={kItem.id}
                  type="button"
                  onClick={() => toggleKitItem(kItem.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-[#FAF7F2] border-[#E8DDD2] text-[#4A121A] hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-emerald-700 text-white' : 'border-2 border-[#C9B7AA] bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-medium leading-snug">
                    {isUrdu ? kItem.ur : kItem.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom AI Consult & Hospitals Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#58111A] to-[#722F37] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h4 className="font-serif text-lg sm:text-xl font-bold">
            {isUrdu ? 'مزید فوری طبی رہنمائی یا ہسپتال کی تلاش درکار ہے؟' : 'Need Immediate Guidance or Nearest Hospital?'}
          </h4>
          <p className="text-xs text-rose-100">
            {isUrdu
              ? 'ہمارے WHO اے آئی میڈیکل کنسلٹنٹ سے سوال پوچھیں یا پاکستان کے 7 شہروں کے 24/7 ایمرجنسی ہسپتال دیکھیں۔'
              : 'Ask our AI Medical Consultant in simple English or Urdu, or check 24/7 emergency hospitals in 7 Pakistani cities.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('ai-consult')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-[#4A121A] text-xs font-bold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'AI طبی مشیر' : 'Ask AI Doctor'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('hospitals')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#58111A] text-xs font-bold cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#722F37]" />
            <span>{isUrdu ? 'ہسپتال تلاش کریں' : 'Find Hospitals'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
