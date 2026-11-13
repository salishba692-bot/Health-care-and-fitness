import type { HealthMetricEntry } from '../types';

// Generate 30 days of realistic trending data leading up to today
export const INITIAL_METRICS_DATA: HealthMetricEntry[] = [
  { id: 'm-1', date: '2026-10-14', weightKg: 81.2, systolicBp: 138, diastolicBp: 88, fastingGlucose: 114, postMealGlucose: 152, restingHeartRate: 78, waterIntakeLiters: 1.8, stepsCount: 5400, notes: 'Felt tired, started new routine' },
  { id: 'm-2', date: '2026-10-16', weightKg: 81.0, systolicBp: 136, diastolicBp: 87, fastingGlucose: 112, postMealGlucose: 148, restingHeartRate: 77, waterIntakeLiters: 2.0, stepsCount: 6200 },
  { id: 'm-3', date: '2026-10-18', weightKg: 80.8, systolicBp: 135, diastolicBp: 86, fastingGlucose: 110, postMealGlucose: 145, restingHeartRate: 76, waterIntakeLiters: 2.2, stepsCount: 7100 },
  { id: 'm-4', date: '2026-10-20', weightKg: 80.6, systolicBp: 134, diastolicBp: 85, fastingGlucose: 108, postMealGlucose: 142, restingHeartRate: 75, waterIntakeLiters: 2.2, stepsCount: 7800 },
  { id: 'm-5', date: '2026-10-22', weightKg: 80.4, systolicBp: 132, diastolicBp: 85, fastingGlucose: 107, postMealGlucose: 139, restingHeartRate: 74, waterIntakeLiters: 2.4, stepsCount: 8400, notes: 'Switched to low-sodium diet' },
  { id: 'm-6', date: '2026-10-24', weightKg: 80.1, systolicBp: 131, diastolicBp: 84, fastingGlucose: 106, postMealGlucose: 138, restingHeartRate: 74, waterIntakeLiters: 2.5, stepsCount: 8900 },
  { id: 'm-7', date: '2026-10-26', weightKg: 79.9, systolicBp: 130, diastolicBp: 83, fastingGlucose: 104, postMealGlucose: 136, restingHeartRate: 73, waterIntakeLiters: 2.6, stepsCount: 9200 },
  { id: 'm-8', date: '2026-10-28', weightKg: 79.7, systolicBp: 129, diastolicBp: 83, fastingGlucose: 103, postMealGlucose: 134, restingHeartRate: 72, waterIntakeLiters: 2.6, stepsCount: 9500 },
  { id: 'm-9', date: '2026-10-30', weightKg: 79.4, systolicBp: 128, diastolicBp: 82, fastingGlucose: 102, postMealGlucose: 132, restingHeartRate: 72, waterIntakeLiters: 2.7, stepsCount: 10100 },
  { id: 'm-10', date: '2026-11-01', weightKg: 79.1, systolicBp: 127, diastolicBp: 82, fastingGlucose: 100, postMealGlucose: 130, restingHeartRate: 71, waterIntakeLiters: 2.8, stepsCount: 10400, notes: 'Feeling much more energetic' },
  { id: 'm-11', date: '2026-11-03', weightKg: 78.8, systolicBp: 126, diastolicBp: 81, fastingGlucose: 99, postMealGlucose: 128, restingHeartRate: 70, waterIntakeLiters: 2.8, stepsCount: 9800 },
  { id: 'm-12', date: '2026-11-05', weightKg: 78.5, systolicBp: 125, diastolicBp: 81, fastingGlucose: 98, postMealGlucose: 127, restingHeartRate: 70, waterIntakeLiters: 2.9, stepsCount: 10800 },
  { id: 'm-13', date: '2026-11-07', weightKg: 78.2, systolicBp: 124, diastolicBp: 80, fastingGlucose: 97, postMealGlucose: 125, restingHeartRate: 69, waterIntakeLiters: 3.0, stepsCount: 11200 },
  { id: 'm-14', date: '2026-11-09', weightKg: 78.0, systolicBp: 123, diastolicBp: 79, fastingGlucose: 96, postMealGlucose: 124, restingHeartRate: 68, waterIntakeLiters: 3.0, stepsCount: 11500 },
  { id: 'm-15', date: '2026-11-11', weightKg: 77.6, systolicBp: 122, diastolicBp: 79, fastingGlucose: 95, postMealGlucose: 122, restingHeartRate: 68, waterIntakeLiters: 3.1, stepsCount: 11800, notes: 'Morning BP consistently in optimal range' }
];

export function calculateBmi(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm) return 0;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(1));
}

export function getBmiCategory(bmi: number, isUrdu = false): { label: string; color: string; advice: string } {
  if (bmi < 18.5) {
    return {
      label: isUrdu ? 'کم وزن (Underweight)' : 'Underweight',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      advice: isUrdu ? 'غذائیت سے بھرپور متوازن کیلوریز بڑھانے کا مشورہ دیا جاتا ہے۔' : 'Consider nutrient-dense caloric increases.'
    };
  } else if (bmi < 23.0) {
    // South Asian modified criteria: 18.5 - 22.9 is optimal
    return {
      label: isUrdu ? 'نارمل / بہترین (ایشیائی معیار)' : 'Normal / Ideal (Asian Range)',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      advice: isUrdu ? 'میٹابولک وزن بہترین اور صحت مند حدود میں ہے۔' : 'Excellent metabolic weight maintenance.'
    };
  } else if (bmi < 27.5) {
    return {
      label: isUrdu ? 'زائد وزن (خطرے کی حد)' : 'Overweight (Increased Risk)',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      advice: isUrdu ? 'صحت کی حفاظت کے لیے 5 سے 7 فیصد وزن کم کرنے کا ہدف رکھیں۔' : 'Recommended to target 5-7% weight reduction.'
    };
  } else {
    return {
      label: isUrdu ? 'موٹاپا (زیادہ خطرہ)' : 'Obese (High Risk)',
      color: 'text-rose-800 bg-rose-50 border-rose-200',
      advice: isUrdu ? 'طبی مشاورت اور منظم طرزِ زندگی کی تبدیلی ضروری ہے۔' : 'Clinical consultation and structured lifestyle modification suggested.'
    };
  }
}

export function getBpCategory(systolic: number, diastolic: number, isUrdu = false): { label: string; color: string; badge: string } {
  if (systolic < 120 && diastolic < 80) {
    return { label: isUrdu ? 'نارمل بلڈ پریشر' : 'Normal Blood Pressure', color: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' };
  } else if (systolic <= 129 && diastolic < 80) {
    return { label: isUrdu ? 'ابتدائی بڑھا ہوا (Prehypertension)' : 'Elevated (Prehypertension)', color: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' };
  } else if (systolic <= 139 || diastolic <= 89) {
    return { label: isUrdu ? 'اسٹیج 1 ہائی بلڈ پریشر' : 'Stage 1 Hypertension', color: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' };
  } else if (systolic <= 179 || diastolic <= 119) {
    return { label: isUrdu ? 'اسٹیج 2 ہائی بلڈ پریشر' : 'Stage 2 Hypertension', color: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' };
  } else {
    return { label: isUrdu ? 'ہنگامی بلڈ پریشر (Crisis)' : 'Hypertensive Crisis', color: 'text-red-700 font-bold', badge: 'bg-red-200 text-red-900 font-bold' };
  }
}

export function getGlucoseCategory(fastingGlucose: number, isUrdu = false): { label: string; color: string; badge: string } {
  if (fastingGlucose < 70) {
    return { label: isUrdu ? 'کم شوگر (Hypoglycemia)' : 'Hypoglycemia (Low)', color: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' };
  } else if (fastingGlucose <= 99) {
    return { label: isUrdu ? 'نارمل فاسٹنگ شوگر' : 'Normal Fasting', color: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' };
  } else if (fastingGlucose <= 125) {
    return { label: isUrdu ? 'پری ذیابیطس کی حد' : 'Impaired Fasting (Prediabetes)', color: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' };
  } else {
    return { label: isUrdu ? 'ذیابیطس کی حد' : 'Diabetes Range', color: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' };
  }
}
