import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  CheckCircle2, 
  XCircle, 
  Droplets, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type SkinType = 'oily' | 'normal' | 'sensitive' | 'dry';

interface RoutineStep {
  stepNumber: number;
  stepTitle: string;
  productType: string;
  action: string;
  recommendedIngredients: string;
  frequency: string;
}

interface SkinTypeData {
  title: string;
  subtitle: string;
  characteristics: string[];
  climateNote: string;
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  goldenIngredients: string[];
  avoidIngredients: string[];
  proTips: string[];
}

export const SKIN_CARE_DATA: Record<SkinType, SkinTypeData> = {
  oily: {
    title: 'Oily & Acne-Prone Skin Routine',
    subtitle: 'Regulates sebum overproduction, unclogs pores, and prevents humidity-induced breakouts.',
    characteristics: [
      'Excess shine within 2 hours of washing',
      'Enlarged visible pores in T-zone (forehead, nose, chin)',
      'Prone to blackheads, whiteheads, and cystic hormonal acne',
      'Prone to sweat and makeup slippage in heat'
    ],
    climateNote: 'Pakistan’s coastal and summer humidity combined with urban atmospheric particulates mixes with excess sebum, causing rapid bacterial clogging. A lightweight, non-comedogenic water-gel routine is essential.',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Gentle Salicylic Acid (BHA) Cleanser',
        productType: 'Foaming Gel Cleanser (0.5% - 2% Salicylic Acid)',
        action: 'Wash face with lukewarm water for 60 seconds, gently massaging T-zone to penetrate oil-filled pores without stripping natural barrier.',
        recommendedIngredients: 'Salicylic Acid, Zinc PCA, Tea Tree extract',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 2,
        stepTitle: 'Pore-Refining & Oil Control Serum',
        productType: 'Niacinamide Serum (5% - 10%)',
        action: 'Apply 3-4 drops onto damp skin. Niacinamide naturally decreases sebum output by up to 30% and strengthens barrier against air pollution.',
        recommendedIngredients: 'Niacinamide, Zinc 1%, Centella Asiatica',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 3,
        stepTitle: 'Ultra-Lightweight Oil-Free Gel Moisturizer',
        productType: 'Oil-Free Water Cream / Hydro-Gel',
        action: 'Even oily skin needs hydration! Dehydrated skin compensates by pumping MORE oil. Use an oil-free hyaluronic moisturizer.',
        recommendedIngredients: 'Hyaluronic Acid, Panthenol, Glycerin, Aloe Vera',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 4,
        stepTitle: 'Broad-Spectrum Matte Sunscreen',
        productType: 'Matte Finish Gel Sunscreen (SPF 50+ PA++++)',
        action: 'Apply two finger lengths. Look for non-comedogenic, dry-touch or silicone-powder finishes that prevent midday shine.',
        recommendedIngredients: 'Zinc Oxide, Tinosorb, Silica (oil absorbers)',
        frequency: 'Daily (Reapply every 3-4 hours outdoors)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Double Cleanse (Micellar Water / Cleansing Oil)',
        productType: 'Non-comedogenic Micellar Water or Light Cleansing Oil',
        action: 'Dissolve waterproof sunscreen, urban dust, and sebum film thoroughly before washing.',
        recommendedIngredients: 'Micellar surfactants, Jojoba oil',
        frequency: 'Nightly'
      },
      {
        stepNumber: 2,
        stepTitle: 'Mild Water-Based Wash',
        productType: 'Gentle Foaming Gel Cleanser',
        action: 'Cleanse residual debris to leave the canvas completely fresh for nighttime skin cell repair.',
        recommendedIngredients: 'Green tea, mild amino-acid surfactants',
        frequency: 'Nightly'
      },
      {
        stepNumber: 3,
        stepTitle: 'Cellular Turnover Treatment (Alternate Nights)',
        productType: 'Retinol / Retinoid (0.2% - 0.5%) or BHA Liquid',
        action: 'Accelerates skin turnover, fades post-acne dark marks (PIH), and tightens pore elasticity.',
        recommendedIngredients: 'Encapsulated Retinol, Granactive Retinoid, BHA',
        frequency: '3-4 nights per week (gradual introduction)'
      },
      {
        stepNumber: 4,
        stepTitle: 'Barrier Restoration Gel-Lotion',
        productType: 'Ceramide Gel Cream',
        action: 'Locks in moisture and repairs the stratum corneum while you sleep in air-conditioned dryness.',
        recommendedIngredients: 'Ceramides NP/AP, Madecassoside, Allantoin',
        frequency: 'Nightly'
      }
    ],
    goldenIngredients: ['Salicylic Acid (BHA)', 'Niacinamide (Vitamin B3)', 'Zinc PCA', 'Hyaluronic Acid', 'Green Tea Extract', 'Centella Asiatica'],
    avoidIngredients: ['Heavy Coconut Oil', 'Cocoa Butter', 'Isopropyl Myristate', 'Alcohol Denat (in high concentrations)', 'Harsh walnut shell scrubs'],
    proTips: [
      'Never wash your face with hot water; lukewarm water prevents reactive rebound sebum surges.',
      'Change your satin/cotton pillowcase twice weekly to prevent bacterial transfer while sleeping.',
      'Carry blotting paper instead of piling compact powder repeatedly over oily sweat.'
    ]
  },
  normal: {
    title: 'Normal / Balanced Skin Maintenance Routine',
    subtitle: 'Preserves optimal hydration, fights oxidative UV damage, and maintains a healthy glow.',
    characteristics: [
      'Balanced sebum and moisture levels (neither dry nor oily)',
      'Smooth, fine skin texture with minimal pore visibility',
      'Rare breakouts or hypersensitive reactions',
      'Radiant, even complexion throughout the day'
    ],
    climateNote: 'While normal skin is naturally resilient, high ultraviolet radiation and heat across Pakistan require robust antioxidant shield and consistent sun protection to prevent photo-aging.',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Gentle Hydrating Cleanser',
        productType: 'Low-pH Hydrating Cream-to-Foam Cleanser',
        action: 'Gently washes off nocturnal sweat without disrupting your naturally balanced acid mantle (pH 5.5).',
        recommendedIngredients: 'Amino Acids, Glycerin, Oat Extract',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 2,
        stepTitle: 'Antioxidant Radiance Serum',
        productType: 'Vitamin C Serum (10% - 15%)',
        action: 'Neutralizes free radicals from sunlight and air pollution, brightens complexion, and stimulates pro-collagen.',
        recommendedIngredients: 'Vitamin C, Ferulic Acid, Vitamin E',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 3,
        stepTitle: 'Daily Nutrient Moisture Barrier Cream',
        productType: 'Lightweight Emulsion / Lotion',
        action: 'Provides all-day hydration cushion and plumps fine skin texture.',
        recommendedIngredients: 'Squalane, Peptides, Hyaluronic Acid',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 4,
        stepTitle: 'Broad-Spectrum UV Defense',
        productType: 'Fluid Sunscreen SPF 50+ PA++++',
        action: 'Shields against both UVA (aging) and UVB (burning) rays. The ultimate anti-aging product.',
        recommendedIngredients: 'Modern photostable chemical or physical filters',
        frequency: 'Daily (Essential 365 days)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Gentle Cleansing Balm or Micellar Water',
        productType: 'Melt-away Cleansing Balm',
        action: 'Melts away sunscreen, atmospheric pollutants, and makeup cleanly.',
        recommendedIngredients: 'Oat oil, sunflower seed oil, chamomile',
        frequency: 'Nightly'
      },
      {
        stepNumber: 2,
        stepTitle: 'Nourishing Hydrating Wash',
        productType: 'Milky Hydrating Cleanser',
        action: 'Leaves the skin thoroughly purified, supple, and prepared for active nourishment.',
        recommendedIngredients: 'Provitamin B5 (Panthenol), thermal water',
        frequency: 'Nightly'
      },
      {
        stepNumber: 3,
        stepTitle: 'Restorative Peptide & Retinol Treatment',
        productType: 'Multi-Peptide + Low-dose Retinol Serum',
        action: 'Fosters collagen density, elastic firmness, and smooth skin texture.',
        recommendedIngredients: 'Matrixyl 3000, Argireline, Retinol 0.3%',
        frequency: '4-5 nights per week'
      },
      {
        stepNumber: 4,
        stepTitle: 'Night Recovery Ceramide Cream',
        productType: 'Lipid-Rich Night Cream',
        action: 'Deeply nourishes cellular lipids while body enters deep restorative REM sleep.',
        recommendedIngredients: 'Triple Ceramides, Shea Butter, Squalane',
        frequency: 'Nightly'
      }
    ],
    goldenIngredients: ['Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid', 'Peptides', 'Squalane', 'Ceramides', 'Niacinamide'],
    avoidIngredients: ['Over-exfoliating scrubs', 'Drying bar soaps', 'Uncertified DIY lemon/baking soda concoctions'],
    proTips: [
      'Apply hyaluronic acid and serums to slightly damp skin to draw maximum water into epidermis.',
      'Exfoliate gently with lactic acid once weekly for effortless smooth luminosity.',
      'Drink 2.5 to 3 liters of water daily to maintain cellular turgor.'
    ]
  },
  sensitive: {
    title: 'Sensitive & Reactive Skin Calming Routine',
    subtitle: 'Soothes redness, repairs broken lipid barrier, and eliminates stinging or flare-ups.',
    characteristics: [
      'Frequent redness, burning, stinging, or tightness',
      'Prone to rosacea, contact dermatitis, or eczema flares',
      'Easily irritated by fragrances, harsh weather, and pollution',
      'Flaking and compromised stratum corneum barrier'
    ],
    climateNote: 'Intense sun exposure and sudden temperature shifts (from humid outdoors into air-conditioned rooms) can trigger severe moisture loss and flushing in reactive skin.',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Ultra-Gentle Non-Foaming Cleanser',
        productType: 'Milk or Jelly Cleanser (Soap-free, Fragrance-free)',
        action: 'Rinse with cool to lukewarm water. Never use abrasive washcloths. Cleanses without stripping protective lipids.',
        recommendedIngredients: 'Colloidal Oatmeal, Allantoin, Glycerin, Thermal Spring Water',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 2,
        stepTitle: 'Soothe & Barrier Recovery Essence / Serum',
        productType: 'Centella (Cica) + Panthenol Serum',
        action: 'Suppresses inflammation, quenches stinging, and delivers soothing relief to reactive skin.',
        recommendedIngredients: 'Madecassoside, Centella Asiatica, Panthenol (B5) 5%, Beta-Glucan',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 3,
        stepTitle: 'Ceramide-Dominant Barrier Repair Cream',
        productType: 'Physiological Lipid Replenishing Cream',
        action: 'Mimics natural skin lipid ratio (Ceramides, Cholesterol, Fatty Acids) to seal microscopic barrier micro-tears.',
        recommendedIngredients: 'Ceramide NP/EOP/AP, Phytosphingosine, Squalane',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 4,
        stepTitle: '100% Mineral Physical Sunscreen',
        productType: 'Pure Zinc Oxide Mineral Sunscreen (SPF 50+)',
        action: 'Mineral filters sit atop the skin and deflect UV rays without chemical absorption heat that can trigger flushing.',
        recommendedIngredients: 'Non-nano Zinc Oxide, Titanium Dioxide, Ectoin',
        frequency: 'Daily (Morning)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Fragrance-Free Micellar Water for Sensitive Skin',
        productType: 'Hypoallergenic Calming Micellar Solution',
        action: 'Soak a soft cotton pad and press gently onto skin—never drag or rub abrasively.',
        recommendedIngredients: 'Poloxamer, cucumber extract, thermal water',
        frequency: 'Nightly'
      },
      {
        stepNumber: 2,
        stepTitle: 'Comfort Calming Cream Wash',
        productType: 'Ultra-mild soothing wash',
        action: 'Gently cleanses away remaining traces with zero lather friction.',
        recommendedIngredients: 'Oat kernel oil, bisabolol',
        frequency: 'Nightly'
      },
      {
        stepNumber: 3,
        stepTitle: 'Anti-Redness Barrier Balm',
        productType: 'Cica Repair Sleeping Balm',
        action: 'Provides a protective cocoon over damaged areas overnight to calm micro-inflammation.',
        recommendedIngredients: 'Zinc Gluconate, Madecassoside, Shea butter',
        frequency: 'Nightly'
      }
    ],
    goldenIngredients: ['Colloidal Oatmeal', 'Centella Asiatica (Cica)', 'Panthenol (Pro-Vitamin B5)', 'Ceramides', 'Allantoin', 'Ectoin', 'Bisabolol'],
    avoidIngredients: ['Synthetic Fragrance & Perfumes', 'Essential Oils', 'Denatured Alcohol', 'High-strength Glycolic Acid', 'Physical Walnut Scrubs'],
    proTips: [
      'Always patch test any new product behind your ear or inside your wrist for 48 hours before applying to face.',
      'Keep your skincare in a cool room; chilled cica serums provide instant anti-inflammatory relief.',
      'Streamline your routine to fewer, cleaner products: less is truly more for sensitive skin.'
    ]
  },
  dry: {
    title: 'Dry & Dehydrated Skin Replenishing Routine',
    subtitle: 'Infuses deep transepidermal moisture, restores lipid deficit, and eliminates dry flaking.',
    characteristics: [
      'Tight, uncomfortable sensation after washing',
      'Dull complexion with fine dehydration lines',
      'Rough, flaky patches on cheeks and around mouth',
      'Needs rich emollient creams to feel comfortable'
    ],
    climateNote: 'Constant indoor air conditioning and dry winter winds pull ambient moisture out of the upper skin layer, creating severe dehydration.',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Hydrating Cream Wash / Water Splash',
        productType: 'Nourishing Lotion Cleanser',
        action: 'Cleanse with a lipid-rich lotion that leaves a protective cushion on the skin surface.',
        recommendedIngredients: 'Glycerin, Hyaluronic Acid, Ceramide complex',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 2,
        stepTitle: 'Multi-Molecular Hyaluronic Acid Essence',
        productType: 'High-Viscosity Hydrating Essence',
        action: 'Pat 2 layers into moist skin to flood deep and superficial skin layers with moisture.',
        recommendedIngredients: 'Sodium Hyaluronate, Polyglutamic Acid, Panthenol',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 3,
        stepTitle: 'Rich Barrier Cream with Fatty Acids',
        productType: 'Emollient Peptide Cream',
        action: 'Replenishes missing intercellular lipid glue to prevent water loss.',
        recommendedIngredients: 'Shea butter, Squalane, Ceramides, Cholesterol',
        frequency: 'Daily (Morning)'
      },
      {
        stepNumber: 4,
        stepTitle: 'Dewy Finish Moisturizing Sunscreen',
        productType: 'Nourishing Cream Sunscreen SPF 50+',
        action: 'Combines broad UV defense with comfortable, glowing, non-greasy moisture.',
        recommendedIngredients: 'Vitamin E, Hyaluronic Acid, Tinosorb',
        frequency: 'Daily (Morning)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'Rich Cleansing Balm / Oil',
        productType: 'Nourishing Camellia or Squalane Cleansing Balm',
        action: 'Melts makeup and impurities without stripping vital sebum.',
        recommendedIngredients: 'Camellia oil, Vitamin E',
        frequency: 'Nightly'
      },
      {
        stepNumber: 2,
        stepTitle: 'Milky Hydrating Cleanser',
        productType: 'Creamy Hydrating Wash',
        action: 'Leaves skin soft, velvety, and deeply conditioned.',
        recommendedIngredients: 'Oat milk, Ceramide NP',
        frequency: 'Nightly'
      },
      {
        stepNumber: 3,
        stepTitle: 'Gentle Lactic Acid / Polyhydroxy (PHA) Hydrating Exfoliant',
        productType: 'Lactic Acid 5% + HA',
        action: 'Gently loosens dead flaky surface cells while simultaneously drawing moisture into the skin.',
        recommendedIngredients: 'Lactic Acid, Gluconolactone, Hyaluronic Acid',
        frequency: '2 nights per week'
      },
      {
        stepNumber: 4,
        stepTitle: 'Intense Overnight Occlusive Cream / Facial Oil',
        productType: 'Ultra-Rich Recovery Night Cream + 2 drops Squalane Oil',
        action: 'Seals active hydration under an occlusive layer so skin wakes up supple and dewy.',
        recommendedIngredients: 'Pure Plant Squalane, Rosehip Oil, Ceramides',
        frequency: 'Nightly'
      }
    ],
    goldenIngredients: ['Hyaluronic Acid', 'Plant Squalane', 'Ceramides 1, 3, 6-II', 'Glycerin', 'Shea Butter', 'Polyglutamic Acid'],
    avoidIngredients: ['Clay/Charcoal masks (excessively stripping)', 'Foaming sulfates (SLS/SLES)', 'Alcohol-heavy astringents'],
    proTips: [
      'Apply your moisturizer within 60 seconds of washing to lock in damp surface water.',
      'Place a small cool-mist humidifier in your bedroom during air-conditioned or dry winter nights.',
      'Incorporate Omega-3 fatty acids and walnuts into your daily diet to fortify skin from within.'
    ]
  }
};

export const SKIN_CARE_DATA_UR: Record<SkinType, SkinTypeData> = {
  oily: {
    title: 'چکنی اور دانوں والی جلد (Oily Skin) کی روٹین',
    subtitle: 'اضافی چکنائی کو کنٹرول کرتی ہے، مسام صاف رکھتی ہے اور گرمی میں دانوں سے بچاتی ہے۔',
    characteristics: [
      'منہ دھونے کے 2 گھنٹے بعد چہرے پر تیل اور چمک آنا',
      'پیشانی، ناک اور ٹھوڑی (T-zone) پر کھلے مسام',
      'بلیک ہیڈز، وائٹ ہیڈز اور کیل مہاسوں کا رجحان'
    ],
    climateNote: 'پاکستان کے گرم اور مرطوب موسم میں گردوغبار جلد کی چکنائی کے ساتھ مل کر مسام بند کر دیتا ہے، اس لیے ہلکی اور آئل فری (Non-comedogenic) جیل بیسڈ روٹین ضروری ہے۔',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'سیلیسلک ایسڈ (BHA) فیس واش',
        productType: 'فومنگ جیل کلینزر (0.5% - 2% Salicylic Acid)',
        action: 'نیم گرم پانی سے 60 سیکنڈ تک نرمی سے چہرہ دھوئیں تاکہ مساموں کے اندر سے فالتو چکنائی صاف ہو۔',
        recommendedIngredients: 'Salicylic Acid, Zinc PCA, Tea Tree',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 2,
        stepTitle: 'آئل کنٹرول نیاسینامائیڈ سیرم',
        productType: 'Niacinamide Serum (5% - 10%)',
        action: 'ہلکی نم جلد پر 3-4 قطرے لگائیں؛ یہ تیل کی پیداوار 30% تک کم کرتا اور مسام سکیڑتا ہے۔',
        recommendedIngredients: 'Niacinamide, Zinc 1%, Centella',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 3,
        stepTitle: 'ہلکا آئل فری جیل موئسچرائزر',
        productType: 'Oil-Free Water Gel Cream',
        action: 'چکنی جلد کو بھی نمی کی ضرورت ہوتی ہے! پانی کی کمی سے جلد مزید تیل بناتی ہے، اس لیے آئل فری جیل لگائیں۔',
        recommendedIngredients: 'Hyaluronic Acid, Panthenol, Aloe Vera',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 4,
        stepTitle: 'میٹ فنش سن اسکرین (SPF 50+)',
        productType: 'Matte Finish Gel Sunscreen',
        action: 'باہر نکلنے سے 15 منٹ پہلے دو انگلیوں کی مقدار میں لگائیں تاکہ دھوپ اور چکنائی دونوں سے بچاؤ ہو۔',
        recommendedIngredients: 'Zinc Oxide, Tinosorb, Silica',
        frequency: 'روزانہ (ہر 3-4 گھنٹے بعد)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'ڈبل کلینزنگ (مائسیلر واٹر)',
        productType: 'Non-comedogenic Micellar Water',
        action: 'فیس واش سے پہلے سن بلاک اور دن بھر کی دھول مٹی صاف کریں۔',
        recommendedIngredients: 'Micellar surfactants, Green Tea',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 2,
        stepTitle: 'ہلکا جیل فیس واش',
        productType: 'Gentle Foaming Gel Cleanser',
        action: 'باقی ماندہ میل کچیل صاف کر کے جلد کو رات کی مرمت کے لیے تیار کریں۔',
        recommendedIngredients: 'Amino-acid surfactants, Green tea',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 3,
        stepTitle: 'ریٹینول یا BHA ٹریٹمنٹ',
        productType: 'Retinol (0.2% - 0.5%) یا BHA لیکوئڈ',
        action: 'نئے خلیات بناتا ہے، دانوں کے پرانے داغ دھبے ہلکے کرتا اور جلد کو صاف رکھتا ہے۔',
        recommendedIngredients: 'Encapsulated Retinol, BHA',
        frequency: 'ہفتے میں 3-4 راتیں'
      },
      {
        stepNumber: 4,
        stepTitle: 'سیرامائیڈ جیل لوشن',
        productType: 'Ceramide Barrier Gel Cream',
        action: 'رات بھر جلد کے قدرتی حفاظتی غلاف کو مضبوط اور متوازن رکھتا ہے۔',
        recommendedIngredients: 'Ceramides NP/AP, Madecassoside',
        frequency: 'ہر رات'
      }
    ],
    goldenIngredients: ['Salicylic Acid (BHA)', 'Niacinamide (B3)', 'Zinc PCA', 'Hyaluronic Acid', 'Green Tea', 'Centella Asiatica'],
    avoidIngredients: ['گاڑھا ناریل تیل (چہرے پر)', 'کوکو بٹر', 'سخت اخروٹ والے اسکرب', 'تیز الکوحل والے ٹونر'],
    proTips: [
      'چہرہ کبھی تیز گرم پانی سے نہ دھوئیں؛ اس سے جلد ردعمل میں مزید تیل پیدا کرتی ہے۔',
      'تکیے کا غلاف ہفتے میں دو بار ضرور بدلیں تاکہ بیکٹیریا منتقل نہ ہوں۔',
      'اضافی تیل صاف کرنے کے لیے بار بار پاؤڈر تھوپنے کے بجائے بلاٹنگ پیپر استعمال کریں۔'
    ]
  },
  normal: {
    title: 'نارمل / متوازن جلد (Normal Skin) کی روٹین',
    subtitle: 'قدرتی نمی برقرار رکھتی ہے، دھوپ کے نقصان سے بچاتی اور تروتازہ چمک قائم رکھتی ہے۔',
    characteristics: [
      'نہ زیادہ چکنائی اور نہ زیادہ خشکی',
      'ہموار جلد اور نہایت باریک مسام',
      'شاذ و نادر ہی دانے یا الرجی ہونا'
    ],
    climateNote: 'اگرچہ نارمل جلد مضبوط ہوتی ہے، لیکن پاکستان کی تیز دھوپ اور فضائی آلودگی سے قبل از وقت جھریاں اور رنگت خراب ہونے سے بچانے کے لیے وٹامن سی اور سن اسکرین ضروری ہے۔',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'ہلکا ہائیڈریٹنگ کلینزر',
        productType: 'Low-pH Hydrating Cleanser',
        action: 'قدرتی توازن (pH 5.5) خراب کیے بغیر رات کا پسینہ اور ہلکی میل صاف کریں۔',
        recommendedIngredients: 'Amino Acids, Glycerin, Oat Extract',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 2,
        stepTitle: 'وٹامن سی ریڈیئنس سیرم',
        productType: 'Vitamin C Serum (10% - 15%)',
        action: 'دھوپ اور آلودگی کے مضر اثرات ختم کر کے رنگت نکھارتا اور کولیجن بڑھاتا ہے۔',
        recommendedIngredients: 'Vitamin C, Ferulic Acid, Vitamin E',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 3,
        stepTitle: 'متوازن موئسچرائزنگ لوشن',
        productType: 'Lightweight Emulsion / Lotion',
        action: 'دن بھر جلد میں نمی اور لچک برقرار رکھتا ہے۔',
        recommendedIngredients: 'Squalane, Peptides, Hyaluronic Acid',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 4,
        stepTitle: 'فلوئڈ سن اسکرین (SPF 50+ PA++++)',
        productType: 'Broad-Spectrum UV Defense',
        action: 'UVA اور UVB شعاعوں سے مکمل حفاظت — بڑھتی عمر کے اثرات روکنے کا بہترین طریقہ۔',
        recommendedIngredients: 'Photostable UV Filters',
        frequency: 'روزانہ (سال کے 365 دن)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'کلینزنگ بام یا مائسیلر واٹر',
        productType: 'Gentle Cleansing Balm',
        action: 'میک اپ، سن بلاک اور آلودگی نرمی سے صاف کریں۔',
        recommendedIngredients: 'Oat oil, Chamomile',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 2,
        stepTitle: 'ملکی ہائیڈریٹنگ فیس واش',
        productType: 'Milky Hydrating Cleanser',
        action: 'جلد کو نرم و ملائم رکھتے ہوئے مکمل صفائی کریں۔',
        recommendedIngredients: 'Panthenol (B5), Thermal Water',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 3,
        stepTitle: 'پیپٹائیڈ اور ہلکا ریٹینول سیرم',
        productType: 'Multi-Peptide + Retinol 0.3%',
        action: 'جلد کی مضبوطی اور قدرتی چمک میں اضافہ کرتا ہے۔',
        recommendedIngredients: 'Peptides, Retinol 0.3%',
        frequency: 'ہفتے میں 4-5 راتیں'
      },
      {
        stepNumber: 4,
        stepTitle: 'نائٹ ریکوری سیرامائیڈ کریم',
        productType: 'Lipid-Rich Night Cream',
        action: 'پرسکون نیند کے دوران جلد کے خلیات کی مرمت کرتی ہے۔',
        recommendedIngredients: 'Triple Ceramides, Squalane',
        frequency: 'ہر رات'
      }
    ],
    goldenIngredients: ['Vitamin C', 'Hyaluronic Acid', 'Peptides', 'Squalane', 'Ceramides', 'Niacinamide'],
    avoidIngredients: ['روزانہ سخت اسکرب', 'تیز خوشبو والے عام صابن', 'چہرے پر براہِ راست لیموں یا میٹھا سوڈا لگانا'],
    proTips: [
      'ہائیالورونک ایسڈ سیرم ہمیشہ ہلکی گیلی جلد پر لگائیں۔',
      'ہفتے میں ایک بار ہلکا لیکٹک ایسڈ استعمال کر کے مردہ خلیات صاف کریں۔',
      'اندرونی تروتازگی کے لیے روزانہ 2.5 سے 3 لیٹر پانی پئیں۔'
    ]
  },
  sensitive: {
    title: 'حساس جلد (Sensitive Skin) کو سکون دینے والی روٹین',
    subtitle: 'سرخی اور جلن کم کرتی ہے، حفاظتی غلاف مرمت کرتی اور الرجی سے بچاتی ہے۔',
    characteristics: [
      'جلد پر بار بار سرخی، جلن، چبھن یا کھنچاؤ محسوس ہونا',
      'نئی کریم، خوشبو یا موسم کی تبدیلی سے فوری الرجی',
      'خشک چھلکے یا کمزور اسکن بیریئر'
    ],
    climateNote: 'سخت دھوپ اور گرم موسم سے اچانک ٹھنڈے اے سی (AC) کمرے میں جانے سے حساس جلد میں پانی تیزی سے کم ہوتا ہے اور سرخی بڑھ جاتی ہے۔',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'خوشبو اور صابن سے پاک ملکی کلینزر',
        productType: 'Ultra-Gentle Non-Foaming Cleanser',
        action: 'ٹھنڈے یا سادے پانی سے دھوئیں، رگڑنے سے پرہیز کریں۔',
        recommendedIngredients: 'Colloidal Oatmeal, Allantoin, Glycerin',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 2,
        stepTitle: 'سیکا (Centella) اور پینتھینول سیرم',
        productType: 'Cica + Vitamin B5 Calming Serum',
        action: 'جلد کی سرخی، جلن اور اندرونی سوجن کو فوری ٹھنڈک و سکون دیتا ہے۔',
        recommendedIngredients: 'Centella Asiatica, Panthenol 5%, Beta-Glucan',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 3,
        stepTitle: 'سیرامائیڈ بیریئر ریپیئر کریم',
        productType: 'Fragrance-Free Ceramide Cream',
        action: 'جلد کی قدرتی حفاظتی تہہ (Ceramides + Cholesterol) کو دوبارہ جوڑتی ہے۔',
        recommendedIngredients: 'Ceramides NP/EOP/AP, Squalane',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 4,
        stepTitle: '100% منرل سن اسکرین (زنک آکسائیڈ)',
        productType: 'Pure Zinc Oxide Mineral Sunscreen SPF 50+',
        action: 'کیمیائی جلن کے بغیر دھوپ کی شعاعوں کو جلد کی سطح سے منعکس کرتی ہے۔',
        recommendedIngredients: 'Non-nano Zinc Oxide, Ectoin',
        frequency: 'روزانہ (صبح)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'خوشبو سے پاک حساس مائسیلر واٹر',
        productType: 'Hypoallergenic Calming Micellar',
        action: 'روئی بھگو کر نرمی سے تھپتھپائیں، جلد کو ہرگز نہ رگڑیں۔',
        recommendedIngredients: 'Cucumber extract, Thermal water',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 2,
        stepTitle: 'کولنگ کلینزنگ لوشن',
        productType: 'Ultra-Mild Comfort Wash',
        action: 'بغیر جھاگ بنائے نرمی سے صفائی کریں۔',
        recommendedIngredients: 'Oat kernel oil, Bisabolol',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 3,
        stepTitle: 'اینٹی ریڈنیس سی کا ریکوری بام',
        productType: 'Cica Repair Sleeping Balm',
        action: 'رات بھر متاثرہ حصوں پر حفاظتی تہہ بنا کر سوجن ختم کرتا ہے۔',
        recommendedIngredients: 'Zinc Gluconate, Madecassoside, Shea butter',
        frequency: 'ہر رات'
      }
    ],
    goldenIngredients: ['Colloidal Oatmeal', 'Centella Asiatica (Cica)', 'Panthenol (B5)', 'Ceramides', 'Allantoin', 'Bisabolol'],
    avoidIngredients: ['مصنوعی خوشبو (Fragrance/Perfume)', 'تیز ایسنشل آئلز', 'ڈینیچرڈ الکوحل', 'تیز گلائیکولک ایسڈ', 'دانے دار اسکرب'],
    proTips: [
      'کوئی بھی نئی پروڈکٹ چہرے پر لگانے سے پہلے کان کے پیچھے 48 گھنٹے ٹیسٹ (Patch Test) ضرور کریں۔',
      'اپنے سیکا سیرم کو ٹھنڈی جگہ رکھیں تاکہ لگاتے ہی جلد کو ٹھنڈک ملے۔',
      'حساس جلد کے لیے کم سے کم اور سادہ پروڈکٹس استعمال کرنا سب سے بہتر ہے۔'
    ]
  },
  dry: {
    title: 'خشک جلد (Dry Skin) کی نمی بحالی روٹین',
    subtitle: 'جلد کی گہرائی میں نمی پہنچاتی ہے، خشکی اور کھردرا پن ختم کرتی ہے۔',
    characteristics: [
      'منہ دھونے کے بعد جلد میں کھنچاؤ اور خشکی',
      'بے رونق رنگت اور خشکی کی باریک لکیریں',
      'گالوں اور منہ کے گرد چھلکے اترنا'
    ],
    climateNote: 'مسلسل اے سی (AC) میں رہنا اور سردیوں کی خشک ہوائیں جلد کی اوپری سطح سے نمی چوس لیتی ہیں، جس کے لیے گہری چکنائی اور ہائیڈریشن ضروری ہے۔',
    morningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'کریم بیسڈ ہائیڈریٹنگ کلینزر',
        productType: 'Nourishing Lotion Cleanser',
        action: 'نمی سے بھرپور لوشن فیس واش استعمال کریں جو جلد کی چکنائی نہ چھینے۔',
        recommendedIngredients: 'Glycerin, Hyaluronic Acid, Ceramides',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 2,
        stepTitle: 'ہائیالورونک ایسڈ ہائیڈریٹنگ ایسنس',
        productType: 'High-Viscosity Hyaluronic Serum',
        action: 'گیلی جلد پر 2 تہیں تھپتھپا کر لگائیں تاکہ اندر تک پانی جذب ہو۔',
        recommendedIngredients: 'Sodium Hyaluronate, Polyglutamic Acid',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 3,
        stepTitle: 'غذائیت سے بھرپور بیریئر کریم',
        productType: 'Emollient Shea & Ceramide Cream',
        action: 'پانی کو جلد کے اندر بند (Lock) کرنے کے لیے گاڑھی کریم لگائیں۔',
        recommendedIngredients: 'Shea butter, Squalane, Ceramides',
        frequency: 'روزانہ (صبح)'
      },
      {
        stepNumber: 4,
        stepTitle: 'موئسچرائزنگ کریم سن اسکرین (SPF 50+)',
        productType: 'Nourishing Cream Sunscreen',
        action: 'دھوپ سے بچاؤ کے ساتھ جلد کو نرم و چمکدار رکھتی ہے۔',
        recommendedIngredients: 'Vitamin E, Hyaluronic Acid',
        frequency: 'روزانہ (صبح)'
      }
    ],
    eveningRoutine: [
      {
        stepNumber: 1,
        stepTitle: 'نریشنگ کلینزنگ آئل یا بام',
        productType: 'Squalane / Camellia Cleansing Balm',
        action: 'جلد کو خشک کیے بغیر سن بلاک اور مٹی صاف کریں۔',
        recommendedIngredients: 'Camellia oil, Vitamin E',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 2,
        stepTitle: 'کریمی ملکی واش',
        productType: 'Creamy Hydrating Wash',
        action: 'جلد کو مخملی اور نرم بناتا ہے۔',
        recommendedIngredients: 'Oat milk, Ceramide NP',
        frequency: 'ہر رات'
      },
      {
        stepNumber: 3,
        stepTitle: 'ہلکا لیکٹک ایسڈ یا PHA سیرم',
        productType: 'Lactic Acid 5% + HA',
        action: 'خشک مردہ چھلکے ہٹا کر نمی جذب کرنے کی صلاحیت بڑھاتا ہے۔',
        recommendedIngredients: 'Lactic Acid, Hyaluronic Acid',
        frequency: 'ہفتے میں 2 راتیں'
      },
      {
        stepNumber: 4,
        stepTitle: 'نائٹ ریکوری کریم + اسکوالین آئل',
        productType: 'Rich Night Cream + 2 drops Facial Oil',
        action: 'ساری رات نمی کو جلد میں قید رکھتا ہے تاکہ صبح جلد تروتازہ اٹھے۔',
        recommendedIngredients: 'Plant Squalane, Rosehip Oil, Ceramides',
        frequency: 'ہر رات'
      }
    ],
    goldenIngredients: ['Hyaluronic Acid', 'Plant Squalane', 'Ceramides', 'Glycerin', 'Shea Butter', 'Omega-3'],
    avoidIngredients: ['مٹی اور چارکول ماسک (زیادہ خشک کرنے والے)', 'جھاگ والے سلفیٹ فیس واش (SLS)', 'الکوحل والے ٹونرز'],
    proTips: [
      'چہرہ دھونے کے 60 سیکنڈ کے اندر موئسچرائزر لگائیں تاکہ نمی جلد میں بند ہو جائے۔',
      'سردیوں یا اے سی والے کمرے میں ہیومیڈیفائر کا استعمال مفید ہے۔',
      'غذا میں اخروٹ، بادام اور مچھلی (Omega-3) شامل کریں تاکہ جلد اندر سے تروتازہ رہے۔'
    ]
  }
};

export const SkinCareRoutineSection: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [selectedType, setSelectedType] = useState<SkinType>('oily');
  const [activeSubTab, setActiveSubTab] = useState<'morning' | 'evening'>('morning');

  const currentData = isUrdu ? SKIN_CARE_DATA_UR[selectedType] : SKIN_CARE_DATA[selectedType];

  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EFEB] rounded-3xl p-6 sm:p-10 border border-[#DFCFC2] shadow-xs space-y-8">
      
      {/* Section Header with Intro Paragraph */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase tracking-wider border border-[#DFCFC2]">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {isUrdu
              ? 'ماہرِ امراضِ جلد (ڈرماٹولوجی) اور موسمی دیکھ بھال'
              : 'Dermatological Skin Barrier & Climate Care'}
          </span>
        </div>
        
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A121A] tracking-tight">
          {isUrdu ? 'ڈاکٹروں کی تجویز کردہ روزانہ اسکن کیئر روٹین' : 'Doctor-Formulated Daily Skin Care Routines'}
        </h2>

        {/* Informative introductory paragraph */}
        <p className="text-sm sm:text-base text-[#5F4B44] leading-relaxed max-w-4xl font-normal">
          {isUrdu ? (
            <>
              آپ کی جلد جسم کی پہلی حفاظتی ڈھال ہے۔ <strong className="text-[#4A121A]">پاکستان</strong> کے گرم، مرطوب اور گردآلود شہروں میں تیز دھوپ اور فضائی آلودگی جلد کو متاثر کرتی ہے۔ اپنی جلد کی قسم (چکنی، نارمل، حساس یا خشک) کے مطابق صبح اور شام کی سائنسی روٹین اپنانے سے مسام صاف، رنگت تروتازہ اور جلد صحت مند رہتی ہے۔
            </>
          ) : (
            <>
              Your skin is your body’s primary immunological shield. Across <strong className="text-[#4A121A]">Pakistan</strong>—where humidity, intense ultraviolet exposure, and airborne particulate pollution collide—adapting your skin regimen to your specific skin type is crucial. Following a calibrated AM/PM routine protects your natural microbiome, balances lipid synthesis, and preserves cellular elasticity for lifelong skin health.
            </>
          )}
        </p>
      </div>

      {/* Skin Type Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
          {isUrdu ? 'اپنی جلد کی قسم منتخب کریں:' : 'Select Your Skin Type:'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(['oily', 'normal', 'sensitive', 'dry'] as const).map((type) => {
            const isSelected = selectedType === type;
            const labels: Record<SkinType, string> = isUrdu
              ? {
                  oily: '✨ چکنی جلد (Oily)',
                  normal: '🌿 نارمل جلد (Normal)',
                  sensitive: '🌸 حساس جلد (Sensitive)',
                  dry: '💧 خشک جلد (Dry)'
                }
              : {
                  oily: '✨ Oily Skin',
                  normal: '🌿 Normal Skin',
                  sensitive: '🌸 Sensitive Skin',
                  dry: '💧 Dry Skin'
                };
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#722F37] text-white ring-2 ring-[#722F37]/20 shadow-md scale-[1.02]'
                    : 'bg-white text-[#5A453F] border border-[#D9C4B5] hover:bg-[#FAF7F2]'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Skin Type Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-6">
        
        {/* Title & Subtitle */}
        <div className="border-b border-[#F0E6DD] pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                {isUrdu ? 'مخصوص کلینیکل اسکن کیئر پروٹوکول' : 'Targeted Clinical Regimen'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A121A] mt-1">{currentData.title}</h3>
              <p className="text-xs sm:text-sm text-[#6E5A54] mt-1">{currentData.subtitle}</p>
            </div>

            {/* AM / PM Toggle */}
            <div className="flex bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#E8DDD2] self-start sm:self-auto text-xs font-bold">
              <button
                onClick={() => setActiveSubTab('morning')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSubTab === 'morning'
                    ? 'bg-[#722F37] text-white shadow-2xs'
                    : 'text-[#6E5A54] hover:text-[#722F37]'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-300" />
                <span>{isUrdu ? 'صبح (AM)' : 'Morning (AM)'}</span>
              </button>
              <button
                onClick={() => setActiveSubTab('evening')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSubTab === 'evening'
                    ? 'bg-[#722F37] text-white shadow-2xs'
                    : 'text-[#6E5A54] hover:text-[#722F37]'
                }`}
              >
                <Moon className="w-4 h-4 text-blue-200" />
                <span>{isUrdu ? 'رات / شام (PM)' : 'Evening (PM)'}</span>
              </button>
            </div>
          </div>

          {/* Climate & Characteristics Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF0E6]/80 border border-[#DFCFC2] text-xs text-[#5F4B44] leading-relaxed">
            <strong className="text-[#722F37] block mb-1">
              {isUrdu ? 'پاکستان کے موسم اور ماحول کا اثر:' : 'Pakistan Climate & Environmental Impact:'}
            </strong>
            {currentData.climateNote}
          </div>
        </div>

        {/* Step-by-Step Routine Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#4A121A] uppercase tracking-wider">
            <span>
              {activeSubTab === 'morning'
                ? (isUrdu ? 'صبح کی مرحلہ وار روٹین (حفاظت اور تازگی)' : 'Morning Step-by-Step Protocol (Defend & Protect)')
                : (isUrdu ? 'رات کی مرحلہ وار روٹین (صفائی اور مرمت)' : 'Evening Step-by-Step Protocol (Purify & Repair)')}
            </span>
            <span className="text-[#8C766F] font-normal">
              {isUrdu
                ? `${(activeSubTab === 'morning' ? currentData.morningRoutine : currentData.eveningRoutine).length} مراحل`
                : `${(activeSubTab === 'morning' ? currentData.morningRoutine : currentData.eveningRoutine).length} Steps`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(activeSubTab === 'morning' ? currentData.morningRoutine : currentData.eveningRoutine).map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD2] hover:border-[#722F37] transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-[#EDE4DC] text-[#722F37]">
                      {isUrdu ? `مرحلہ ${step.stepNumber}` : `Step ${step.stepNumber}`}
                    </span>
                    <span className="text-[11px] text-[#8C766F] font-medium">{step.frequency}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#4A121A]">
                    {step.stepTitle}
                  </h4>
                  <div className="text-[11px] font-semibold text-[#892A3A] mt-0.5">
                    {step.productType}
                  </div>
                  <p className="text-xs text-[#6E5A54] mt-2 leading-relaxed">
                    {step.action}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8DDD2] text-[11px] text-[#78615A]">
                  <strong className="text-[#4A121A]">{isUrdu ? 'اہم اجزاء: ' : 'Look For: '}</strong>
                  {step.recommendedIngredients}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Ingredients vs Avoid Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#F0E6DD]">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'جلد کے لیے بہترین اور مفید اجزاء' : 'Recommended Active Ingredients'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentData.goldenIngredients.map((ing, i) => (
                <span key={i} className="text-xs bg-white text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-900">
              <XCircle className="w-4 h-4 text-rose-700" />
              <span>{isUrdu ? 'جن اجزاء اور عادات سے سخت پرہیز کریں' : 'Ingredients & Habits to Strictly Avoid'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentData.avoidIngredients.map((ing, i) => (
                <span key={i} className="text-xs bg-white text-rose-900 px-2.5 py-1 rounded-lg border border-rose-200 font-medium">
                  ✕ {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Dermatologist Tips */}
        <div className="p-5 rounded-2xl bg-[#FAF0E6] border border-[#DFCFC2] space-y-2">
          <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider block">
            {isUrdu ? 'ماہرِ امراضِ جلد کے سنہری مشورے:' : 'Clinical Dermatologist Advice:'}
          </span>
          <ul className="text-xs text-[#5F4B44] space-y-1.5">
            {currentData.proTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#722F37] font-bold">★</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
