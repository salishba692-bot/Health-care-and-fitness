export type PakistanCity = 
  | 'Karachi'
  | 'Lahore'
  | 'Islamabad & Rawalpindi'
  | 'Faisalabad'
  | 'Peshawar'
  | 'Multan'
  | 'Quetta';

export type KarachiZone = 
  | 'Clifton & Defence'
  | 'Gulshan-e-Iqbal & PECHS'
  | 'North Nazimabad & Nazimabad'
  | 'Saddar & Civil Lines'
  | 'Korangi & Landhi'
  | 'Malir & Airport'
  | 'Federal B Area & Gulberg';

export interface Hospital {
  id: string;
  name: string;
  city: PakistanCity;
  province?: string;
  zone?: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  emergencyAvailable: boolean;
  bedCapacity: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  opdTimings: string;
  feeRange: string;
  type: 'Private' | 'Public / Semi-Govt' | 'Trust / Charity';
  googleMapsUrl: string;
  facilities: string[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  category: 'Cardio & Heart Health' | 'Metabolic & Insulin Control' | 'Joint Mobility & Spine' | 'Core & Postural Strength';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string;
  durationOrReps: string;
  caloriesBurnedEst: string;
  whoClinicalBenefit: string;
  steps: string[];
  tips: string[];
}

export type DiseaseCategory = 
  | 'Cardiovascular'
  | 'Metabolic & Endocrine'
  | 'Infectious & Vector-Borne'
  | 'Respiratory'
  | 'Hepatic & Renal'
  | 'Neurological'
  | 'Gastrointestinal'
  | 'Musculoskeletal';

export interface Disease {
  id: string;
  name: string;
  scientificName?: string;
  category: DiseaseCategory;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical / Chronic';
  definition: string;
  causes: string[];
  symptoms: {
    early: string[];
    acute: string[];
  };
  treatment: {
    medical: string[];
    medications: string[];
    procedures?: string[];
  };
  cure: {
    isCurable: boolean;
    curabilityDetails: string;
    prevention: string[];
  };
  emergencyWarningSigns: string[];
  dietaryRecommendations: {
    recommended: string[];
    avoid: string[];
  };
  lifestyleGuidance: string[];
  karachiContext?: string;
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
  clinicalBenefits: string;
}

export interface DailyMealPlan {
  day: string;
  breakfast: MealItem;
  snackMorning: MealItem;
  lunch: MealItem;
  snackEvening: MealItem;
  dinner: MealItem;
}

export interface NutritionPlan {
  id: string;
  title: string;
  targetCondition: 'Diabetes' | 'Hypertension (High BP)' | 'Cholesterol (Hyperlipidemia)' | 'Cardiovascular Health' | 'Weight & Metabolic Balance';
  tagline: string;
  overview: string;
  dailyCalorieTarget: string;
  macronutrientRatio: {
    carbs: number; // percentage
    protein: number;
    fat: number;
  };
  keyClinicalRules: string[];
  foodsToEmbrace: string[];
  foodsToAvoid: string[];
  weeklySchedule: DailyMealPlan[];
}

export interface HealthMetricEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  systolicBp: number;
  diastolicBp: number;
  fastingGlucose: number; // mg/dL
  postMealGlucose?: number;
  restingHeartRate: number; // bpm
  waterIntakeLiters: number;
  stepsCount: number;
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  publishDate: string;
  summary: string;
  contentParagraphs: string[];
  keyTakeaways: string[];
  tags: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  targetWeightKg: number;
  conditions: string[];
  isLoggedIn: boolean;
}
