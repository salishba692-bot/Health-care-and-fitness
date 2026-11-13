import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  TrendingDown, 
  TrendingUp, 
  PlusCircle, 
  Heart, 
  Droplet, 
  Footprints, 
  Scale, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Sparkles,
  Info,
  X,
  Printer
} from 'lucide-react';
import { HealthMetricEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  calculateBmi, 
  getBmiCategory, 
  getBpCategory, 
  getGlucoseCategory 
} from '../data/fitnessMetricsData';

interface HealthDashboardProps {
  metrics: HealthMetricEntry[];
  onAddMetric: (entry: Omit<HealthMetricEntry, 'id'>) => void;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({
  metrics,
  onAddMetric
}) => {
  const { isUrdu } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7D' | '14D' | '30D'>('14D');
  const [selectedChart, setSelectedChart] = useState<'bp' | 'glucose' | 'weight' | 'steps'>('bp');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  
  // BMI Calculator Local State
  const [calcHeight, setCalcHeight] = useState<number>(175);
  const [calcWeight, setCalcWeight] = useState<number>(
    metrics.length > 0 ? metrics[metrics.length - 1].weightKg : 78
  );

  // Form State for Logging New Reading
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formWeight, setFormWeight] = useState<string>('77.5');
  const [formSystolic, setFormSystolic] = useState<string>('122');
  const [formDiastolic, setFormDiastolic] = useState<string>('79');
  const [formFastingGlucose, setFormFastingGlucose] = useState<string>('95');
  const [formPostMealGlucose, setFormPostMealGlucose] = useState<string>('124');
  const [formHeartRate, setFormHeartRate] = useState<string>('68');
  const [formWater, setFormWater] = useState<string>('3.0');
  const [formSteps, setFormSteps] = useState<string>('11500');
  const [formNotes, setFormNotes] = useState<string>('');
  const [logSuccessToast, setLogSuccessToast] = useState(false);

  // Filtered metrics based on selected timeframe
  const filteredMetrics = useMemo(() => {
    const days = timeRange === '7D' ? 7 : timeRange === '14D' ? 14 : 30;
    return metrics.slice(-days);
  }, [metrics, timeRange]);

  const latest = metrics[metrics.length - 1] || {
    weightKg: 78,
    systolicBp: 122,
    diastolicBp: 79,
    fastingGlucose: 95,
    postMealGlucose: 122,
    restingHeartRate: 68,
    waterIntakeLiters: 3.1,
    stepsCount: 11800,
    date: 'Today'
  };

  const initial = metrics[0] || latest;

  const weightDelta = (latest.weightKg - initial.weightKg).toFixed(1);
  const bpDelta = `${latest.systolicBp - initial.systolicBp}/${latest.diastolicBp - initial.diastolicBp}`;
  const glucoseDelta = latest.fastingGlucose - initial.fastingGlucose;

  const currentBmi = calculateBmi(calcWeight, calcHeight);
  const bmiInfo = getBmiCategory(currentBmi, isUrdu);
  const bpStatus = getBpCategory(latest.systolicBp, latest.diastolicBp, isUrdu);
  const glucoseStatus = getGlucoseCategory(latest.fastingGlucose, isUrdu);

  const handleSubmitMetric = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMetric({
      date: formDate,
      weightKg: parseFloat(formWeight),
      systolicBp: parseInt(formSystolic),
      diastolicBp: parseInt(formDiastolic),
      fastingGlucose: parseInt(formFastingGlucose),
      postMealGlucose: formPostMealGlucose ? parseInt(formPostMealGlucose) : undefined,
      restingHeartRate: formHeartRate ? parseInt(formHeartRate) : 70,
      waterIntakeLiters: formWater ? parseFloat(formWater) : 2.5,
      stepsCount: formSteps ? parseInt(formSteps) : 8000,
      notes: formNotes || undefined
    });

    setIsLogModalOpen(false);
    setLogSuccessToast(true);
    setTimeout(() => setLogSuccessToast(false), 4000);
  };

  // Helper for SVG Chart Coordinates
  const chartHeight = 230;
  const chartWidth = 700;
  const paddingLeft = 44;
  const paddingRight = 64;
  const paddingY = 30;

  // Render SVG Trend Path
  const renderChartData = () => {
    if (filteredMetrics.length === 0) return null;

    let values: { label: string; primary: number; secondary?: number }[] = [];
    let minY = 0;
    let maxY = 100;

    if (selectedChart === 'bp') {
      values = filteredMetrics.map(m => ({
        label: m.date.slice(5),
        primary: m.systolicBp,
        secondary: m.diastolicBp
      }));
      minY = 65;
      maxY = 150;
    } else if (selectedChart === 'glucose') {
      values = filteredMetrics.map(m => ({
        label: m.date.slice(5),
        primary: m.fastingGlucose,
        secondary: m.postMealGlucose
      }));
      minY = 70;
      maxY = 170;
    } else if (selectedChart === 'weight') {
      values = filteredMetrics.map(m => ({
        label: m.date.slice(5),
        primary: m.weightKg
      }));
      const allWeights = filteredMetrics.map(m => m.weightKg);
      minY = Math.floor(Math.min(...allWeights) - 2);
      maxY = Math.ceil(Math.max(...allWeights) + 2);
    } else {
      values = filteredMetrics.map(m => ({
        label: m.date.slice(5),
        primary: m.stepsCount
      }));
      minY = 4000;
      maxY = 14000;
    }

    const getX = (index: number) => {
      if (values.length <= 1) return (paddingLeft + (chartWidth - paddingRight)) / 2;
      return paddingLeft + (index / (values.length - 1)) * (chartWidth - paddingLeft - paddingRight);
    };

    const getY = (val: number) => {
      const clamped = Math.max(minY, Math.min(maxY, val));
      const ratio = (clamped - minY) / (maxY - minY);
      return chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
    };

    const primaryPoints = values.map((v, i) => `${getX(i)},${getY(v.primary)}`).join(' ');
    const secondaryPoints = values[0]?.secondary !== undefined 
      ? values.map((v, i) => `${getX(i)},${getY(v.secondary || minY)}`).join(' ')
      : null;

    return (
      <div className="relative w-full overflow-x-auto pb-1">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[460px] h-56 sm:h-64">
          <defs>
            <linearGradient id="maroonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#722F37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#722F37" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingY + ratio * (chartHeight - paddingY * 2);
            const val = Math.round(maxY - ratio * (maxY - minY));
            return (
              <g key={idx}>
                <line x1={paddingLeft} y1={y} x2={chartWidth - paddingRight} y2={y} stroke="#EFE7DF" strokeDasharray="4 4" />
                <text x={paddingLeft - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-[#9B8881]">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Clinical Reference Thresholds */}
          {selectedChart === 'bp' && (
            <>
              {/* 120 Systolic Threshold */}
              <line 
                x1={paddingLeft} 
                y1={getY(120)} 
                x2={chartWidth - paddingRight} 
                y2={getY(120)} 
                stroke="#059669" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
              <text x={chartWidth - paddingRight + 6} y={getY(120) + 3} className="text-[9px] fill-emerald-800 font-bold">
                120 Norm
              </text>
              {/* 80 Diastolic Threshold */}
              <line 
                x1={paddingLeft} 
                y1={getY(80)} 
                x2={chartWidth - paddingRight} 
                y2={getY(80)} 
                stroke="#059669" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
              <text x={chartWidth - paddingRight + 6} y={getY(80) + 3} className="text-[9px] fill-emerald-800 font-bold">
                80 Norm
              </text>
            </>
          )}

          {selectedChart === 'glucose' && (
            <>
              {/* 100 Fasting Cutoff */}
              <line 
                x1={paddingLeft} 
                y1={getY(100)} 
                x2={chartWidth - paddingRight} 
                y2={getY(100)} 
                stroke="#059669" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
              <text x={chartWidth - paddingRight + 6} y={getY(100) + 3} className="text-[9px] fill-emerald-800 font-bold">
                100 Fasting
              </text>
            </>
          )}

          {/* Area fill under primary */}
          <polygon
            points={`${paddingLeft},${chartHeight - paddingY} ${primaryPoints} ${chartWidth - paddingRight},${chartHeight - paddingY}`}
            fill={selectedChart === 'glucose' ? 'url(#amberGrad)' : 'url(#maroonGrad)'}
          />

          {/* Secondary Line (e.g. Diastolic BP or Post-meal) */}
          {secondaryPoints && (
            <polyline
              fill="none"
              stroke="#B45309"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={secondaryPoints}
            />
          )}

          {/* Primary Line */}
          <polyline
            fill="none"
            stroke="#722F37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={primaryPoints}
          />

          {/* Data Points */}
          {values.map((v, i) => {
            const x = getX(i);
            const y1 = getY(v.primary);
            const y2 = v.secondary !== undefined ? getY(v.secondary) : null;
            const showLabel = values.length <= 10 || i % 2 === 0 || i === values.length - 1;
            return (
              <g key={i} className="group cursor-pointer">
                <circle cx={x} cy={y1} r="4" fill="#722F37" stroke="#FFFFFF" strokeWidth="2" className="transition-transform group-hover:scale-150" />
                {y2 !== null && (
                  <circle cx={x} cy={y2} r="4" fill="#B45309" stroke="#FFFFFF" strokeWidth="2" className="transition-transform group-hover:scale-150" />
                )}
                {/* X Axis Date Label */}
                {showLabel && (
                  <text x={x} y={chartHeight - 8} textAnchor="middle" className="text-[10px] fill-[#7E6A64] font-medium">
                    {v.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 text-[#4A121A] font-semibold">
            <span className="w-3 h-3 rounded-full bg-[#722F37]"></span>
            <span>
              {selectedChart === 'bp' && (isUrdu ? 'سسٹولک بی پی (ہدف < 120)' : 'Systolic BP (Target < 120)')}
              {selectedChart === 'glucose' && (isUrdu ? 'فاسٹنگ شوگر (ہدف < 100)' : 'Fasting Glucose (Target < 100)')}
              {selectedChart === 'weight' && (isUrdu ? 'جسمانی وزن (کلوگرام)' : 'Body Weight (kg)')}
              {selectedChart === 'steps' && (isUrdu ? 'روزانہ قدموں کی تعداد' : 'Daily Steps Count')}
            </span>
          </div>

          {(selectedChart === 'bp' || selectedChart === 'glucose') && (
            <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
              <span className="w-3 h-3 rounded-full bg-[#B45309]"></span>
              <span>
                {selectedChart === 'bp'
                  ? (isUrdu ? 'ڈائیسٹولک بی پی (ہدف < 80)' : 'Diastolic BP (Target < 80)')
                  : (isUrdu ? 'کھانے کے بعد شوگر' : 'Post-Meal Glucose')}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-600"></span>
            <span>{isUrdu ? 'طبی ہدف' : 'Healthy Target'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast Notification on metric logged */}
      {logSuccessToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 bg-[#58111A] text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-300 flex items-center space-x-3 animate-in slide-in-from-bottom-5 print:hidden">
          <CheckCircle className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-medium">
            {isUrdu ? 'صحت کی ریڈنگز کامیابی سے محفوظ ہو گئیں!' : 'Your health reading has been saved!'}
          </span>
        </div>
      )}

      {/* Header with Title, Print Report & Log New Reading Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DDD2] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider">
              {isUrdu ? 'ڈبلیو ایچ او ہیلتھ ٹریکنگ' : 'WHO Health Tracker'}
            </span>
            <span className="text-xs text-[#78615A] font-medium">
              {isUrdu ? 'کیئر ہب پاکستان سے منسلک' : 'CareHub Pakistan'}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A121A] mt-1.5">
            {isUrdu ? 'صحت کے رجحانات اور بائیو مارکرز' : 'Your Health Trends & Daily Numbers'}
          </h1>
          <p className="text-sm text-[#6E5A54] mt-1 max-w-2xl">
            {isUrdu
              ? 'وقت کے ساتھ اپنے بلڈ پریشر، شوگر، وزن اور دل کی دھڑکن کے رجحانات دیکھیں اور ڈاکٹر کے لیے PDF رپورٹ پرنٹ کریں۔'
              : 'Track your blood pressure, blood sugar, body weight, and heart rate over time, and print a clean report for your doctor.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-[#D9C4B5] text-[#4A121A] hover:border-[#722F37] hover:bg-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#722F37]" />
            <span>{isUrdu ? 'PDF رپورٹ پرنٹ کریں' : 'Print / Save PDF Report'}</span>
          </button>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#722F37] text-white hover:bg-[#58111A] font-semibold text-xs sm:text-sm shadow-md shadow-[#722F37]/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-200" />
            <span>{isUrdu ? 'نئی ریڈنگ درج کریں' : 'Log Daily Reading'}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Biomarker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Blood Pressure Card */}
        <div 
          onClick={() => setSelectedChart('bp')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedChart === 'bp' 
              ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-md' 
              : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'بلڈ پریشر' : 'Blood Pressure'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-[#722F37]">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#4A121A]">
              {latest.systolicBp}/{latest.diastolicBp}
            </span>
            <span className="text-xs text-[#8C766F]">mmHg</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${bpStatus.badge}`}>
              {bpStatus.label}
            </span>
            <div className="flex items-center text-xs text-emerald-800 font-semibold">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              <span>{bpDelta}</span>
            </div>
          </div>
        </div>

        {/* Fasting Glucose Card */}
        <div 
          onClick={() => setSelectedChart('glucose')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedChart === 'glucose' 
              ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-md' 
              : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              {isUrdu ? 'فاسٹنگ شوگر' : 'Fasting Glucose'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#4A121A]">
              {latest.fastingGlucose}
            </span>
            <span className="text-xs text-[#8C766F]">mg/dL</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${glucoseStatus.badge}`}>
              {glucoseStatus.label}
            </span>
            <div className="flex items-center text-xs text-emerald-800 font-semibold">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              <span>{glucoseDelta} mg/dL</span>
            </div>
          </div>
        </div>

        {/* Body Weight Card */}
        <div 
          onClick={() => setSelectedChart('weight')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedChart === 'weight' 
              ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-md' 
              : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
              {isUrdu ? 'جسمانی وزن' : 'Body Weight'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EDE4DC] flex items-center justify-center text-[#722F37]">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#4A121A]">
              {latest.weightKg}
            </span>
            <span className="text-xs text-[#8C766F]">kg</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#78615A]">
              BMI: {currentBmi} ({bmiInfo.label.split(' ')[0]})
            </span>
            <div className="flex items-center text-xs text-emerald-800 font-semibold">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              <span>{weightDelta} kg</span>
            </div>
          </div>
        </div>

        {/* Daily Steps / Activity Card */}
        <div 
          onClick={() => setSelectedChart('steps')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedChart === 'steps' 
              ? 'bg-white border-[#722F37] ring-2 ring-[#722F37]/15 shadow-md' 
              : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white hover:border-[#D9C4B5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              {isUrdu ? 'روزانہ کے قدم' : 'Daily Steps'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800">
              <Footprints className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#4A121A]">
              {latest.stepsCount.toLocaleString()}
            </span>
            <span className="text-xs text-[#8C766F]">{isUrdu ? 'قدم/دن' : 'steps/day'}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800">
              {isUrdu ? 'ہدف: 10,000+' : 'Target: 10,000+'}
            </span>
            <div className="flex items-center text-xs text-emerald-800 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              <span>{isUrdu ? 'متحرک' : 'Active'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Interactive Trend Chart Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D2C7] shadow-sm space-y-6">
        
        {/* Chart Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#4A121A]">
              {selectedChart === 'bp' && (isUrdu ? 'شریانوں کا بلڈ پریشر گراف (سسٹولک اور ڈائیسٹولک)' : 'Blood Pressure Graph (Upper & Lower)')}
              {selectedChart === 'glucose' && (isUrdu ? 'فاسٹنگ بمقابلہ کھانے کے بعد شوگر کا گراف' : 'Empty-Stomach vs. After-Meal Blood Sugar')}
              {selectedChart === 'weight' && (isUrdu ? 'جسمانی وزن اور توازن کا گراف' : 'Body Weight Trend Over Time')}
              {selectedChart === 'steps' && (isUrdu ? 'روزانہ قدم اور جسمانی سرگرمی کا گراف' : 'Daily Walking Steps Graph')}
            </h3>
            <p className="text-xs text-[#78615A] mt-0.5">
              {isUrdu
                ? 'WHO کے مقرر کردہ اہداف کے مطابق اپنی روزانہ کی ریڈنگز کا جائزہ لیں۔'
                : 'Compare your daily readings against healthy WHO targets.'}
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E8DDD2] self-start sm:self-auto text-xs font-semibold print:hidden">
            {(['7D', '14D', '30D'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#722F37] text-white shadow-2xs'
                    : 'text-[#6E5A54] hover:text-[#722F37]'
                }`}
              >
                {range === '7D'
                  ? (isUrdu ? 'آخری 7 دن' : 'Last 7 Days')
                  : range === '14D'
                  ? (isUrdu ? 'آخری 14 دن' : 'Last 14 Days')
                  : (isUrdu ? 'آخری 30 دن' : 'Last 30 Days')}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Chart Visualization */}
        {renderChartData()}

        {/* Insights Strip */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DDD2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#4A121A]">
                {isUrdu ? 'صحت میں بہتری کا خلاصہ: ' : 'Your Health Progress: '}
              </span>
              <span className="text-[#6E5A54]">
                {isUrdu
                  ? <>کم نمک والی DASH غذا پر عمل کرنے سے پچھلے 30 دنوں میں آپ کا اوپری بلڈ پریشر <strong className="text-emerald-800">16 mmHg</strong> کم ہوا ہے اور فاسٹنگ شوگر نارمل (&lt;100 mg/dL) رینج میں ہے۔</>
                  : <>Your upper blood pressure dropped by <strong className="text-emerald-800">16 mmHg</strong> over the last 30 days by cutting down on salt. Your fasting blood sugar is also in a healthy range (&lt;100 mg/dL).</>}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="text-[#722F37] font-bold hover:underline shrink-0 text-xs print:hidden"
          >
            {isUrdu ? '+ آج کی ریڈنگ شامل کریں' : "+ Add Today's Reading"}
          </button>
        </div>
      </div>

      {/* Asian-Specific BMI & Metabolic Risk Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D2C7] shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                {isUrdu ? 'میٹابولک خطرے کا جائزہ' : 'Weight & Heart Risk Check'}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                {isUrdu ? 'ایشیائی معیار کے مطابق BMI کیلکولیٹر' : 'Healthy Weight (Asian BMI) Calculator'}
              </h3>
            </div>
            <span className="p-2 bg-[#FAF7F2] rounded-xl text-[#722F37]">
              <Scale className="w-5 h-5" />
            </span>
          </div>

          <p className="text-xs text-[#78615A] leading-relaxed">
            {isUrdu
              ? 'عالمی ادارہ صحت (WHO) نے پاکستانی اور جنوبی ایشیائی بالغ افراد کے لیے BMI کی حدود کم مقرر کی ہیں کیونکہ ہمارے خطے میں کم وزن پر بھی دل اور شوگر کا خطرہ زیادہ ہوتا ہے۔'
              : 'The World Health Organization (WHO) sets lower weight limits for Pakistani and South Asian adults because extra belly fat increases diabetes and heart risk earlier in our region.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5F4B44] mb-1.5">
                {isUrdu ? 'قد (سینٹی میٹر):' : 'Height (cm):'} <span className="text-[#722F37] font-bold">{calcHeight} cm</span> ({Math.floor(calcHeight/30.48)}' {Math.round((calcHeight%30.48)/2.54)}")
              </label>
              <input 
                type="range" 
                min="140" 
                max="210" 
                value={calcHeight} 
                onChange={(e) => setCalcHeight(Number(e.target.value))}
                className="w-full accent-[#722F37] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5F4B44] mb-1.5">
                {isUrdu ? 'وزن (کلوگرام):' : 'Weight (kg):'} <span className="text-[#722F37] font-bold">{calcWeight} kg</span>
              </label>
              <input 
                type="range" 
                min="40" 
                max="140" 
                step="0.5"
                value={calcWeight} 
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full accent-[#722F37] cursor-pointer"
              />
            </div>
          </div>

          {/* BMI Output Card */}
          <div className={`p-4 rounded-2xl border ${bmiInfo.color} flex items-center justify-between gap-2 flex-wrap`}>
            <div>
              <span className="text-xs uppercase font-bold tracking-wide">
                {isUrdu ? 'آپ کا BMI اسکور' : 'Calculated BMI Score'}
              </span>
              <div className="text-3xl font-serif font-bold mt-0.5">{currentBmi} <span className="text-sm font-sans font-normal">kg/m²</span></div>
              <p className="text-xs mt-1 font-medium">{bmiInfo.advice}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/70 border">
                {bmiInfo.label}
              </span>
            </div>
          </div>

          {/* Reference thresholds */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 text-[#78615A]">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
              <strong className="block text-emerald-800">18.5 - 22.9</strong>
              <span>{isUrdu ? 'مثالی ایشیائی BMI' : 'Ideal Asian BMI'}</span>
            </div>
            <div className="p-2 rounded-xl bg-orange-50 border border-orange-200">
              <strong className="block text-orange-800">23.0 - 27.4</strong>
              <span>{isUrdu ? 'زائد وزن کا خطرہ' : 'Overweight Risk'}</span>
            </div>
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
              <strong className="block text-rose-800">≥ 27.5</strong>
              <span>{isUrdu ? 'موٹاپے کی حد' : 'Obese Threshold'}</span>
            </div>
          </div>
        </div>

        {/* Daily Hydration & Vitals Helper */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D2C7] shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  {isUrdu ? 'پانی اور بحالی' : 'Hydration & Recovery'}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                  {isUrdu ? 'روزانہ پانی اور دل کی دھڑکن' : 'Daily Water & Resting Vitals'}
                </h3>
              </div>
              <span className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <Droplet className="w-5 h-5" />
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#5F4B44]">{isUrdu ? 'آج کا پانی کا استعمال' : 'Water Intake (Today)'}</span>
                  <span className="text-blue-700 font-bold">{latest.waterIntakeLiters} / 3.0 {isUrdu ? 'لیٹر' : 'Liters'}</span>
                </div>
                <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DDD2]">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (latest.waterIntakeLiters / 3.0) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#78615A] mt-1 block">
                  {isUrdu
                    ? 'پاکستان کے گرم موسم میں گردوں کی پتھری سے بچاؤ اور خون کی روانی کے لیے نہایت ضروری ہے۔'
                    : 'Drinking enough water helps prevent kidney stones and keeps your energy up in warm Pakistani weather.'}
                </span>
              </div>

              <div className="pt-2 border-t border-[#F0E6DD] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#5F4B44] block">
                    {isUrdu ? 'دل کی دھڑکن (آرام کی حالت)' : 'Resting Heart Rate'}
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#4A121A]">{latest.restingHeartRate} <span className="text-xs font-sans font-normal text-[#8C766F]">bpm</span></span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {isUrdu ? 'صحت مند دل' : 'Healthy Heart'}
                </span>
              </div>

              <div className="pt-2 border-t border-[#F0E6DD] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#5F4B44] block">
                    {isUrdu ? 'مسلسل اندراج کا تسلسل' : 'Active Streak'}
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#722F37]">{isUrdu ? '15 دن' : '15 Days'}</span>
                </div>
                <span className="text-xs text-[#78615A]">
                  {isUrdu ? 'روزانہ باقاعدہ ریکارڈنگ' : 'Daily check-ins'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="w-full py-2.5 rounded-xl border border-[#D9C4B5] hover:bg-[#FAF7F2] text-xs font-bold text-[#4A121A] transition-colors cursor-pointer print:hidden"
          >
            {isUrdu ? 'پانی یا وائٹلز ریکارڈ کریں' : 'Update Water or Health Numbers'}
          </button>
        </div>
      </div>

      {/* Log New Reading Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in print:hidden">
          <div 
            className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D9C4B5] overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-white border-b border-[#E8DDD2] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4A121A]">
                  {isUrdu ? 'نئی صحت کی ریڈنگ درج کریں' : 'Add New Health Reading'}
                </h3>
                <p className="text-xs text-[#78615A]">
                  {isUrdu ? 'اپنی صحت کا گراف اپ ڈیٹ کرنے کے لیے آج کی ریڈنگ محفوظ کریں' : 'Save today’s numbers to keep track of your progress over time'}
                </p>
              </div>
              <button 
                onClick={() => setIsLogModalOpen(false)}
                className="p-1.5 text-[#78615A] hover:bg-[#F2EAE2] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMetric} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                  {isUrdu ? 'تاریخ' : 'Reading Date'}
                </label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'وزن (کلوگرام)' : 'Weight (kg)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="78.2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'دل کی دھڑکن (bpm)' : 'Resting Heart Rate (bpm)'}
                  </label>
                  <input
                    type="number"
                    value={formHeartRate}
                    onChange={(e) => setFormHeartRate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="72"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'سسٹولک بی پی (اوپر والا)' : 'Systolic BP (mmHg)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formSystolic}
                    onChange={(e) => setFormSystolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'ڈائیسٹولک بی پی (نیچے والا)' : 'Diastolic BP (mmHg)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formDiastolic}
                    onChange={(e) => setFormDiastolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'فاسٹنگ شوگر (mg/dL)' : 'Fasting Glucose (mg/dL)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formFastingGlucose}
                    onChange={(e) => setFormFastingGlucose(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="95"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'کھانے کے بعد شوگر' : 'Post-Meal Glucose (mg/dL)'}
                  </label>
                  <input
                    type="number"
                    value={formPostMealGlucose}
                    onChange={(e) => setFormPostMealGlucose(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="130"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'پانی کی مقدار (لیٹر)' : 'Water Intake (Liters)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formWater}
                    onChange={(e) => setFormWater(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="2.8"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                    {isUrdu ? 'قدموں کی تعداد' : 'Steps Count'}
                  </label>
                  <input
                    type="number"
                    value={formSteps}
                    onChange={(e) => setFormSteps(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                    placeholder="9500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5F4B44] mb-1">
                  {isUrdu ? 'روزانہ نوٹس یا علامات' : 'Daily Notes / Symptoms'}
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C4B5] text-sm text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
                  placeholder={isUrdu ? 'مثلاً: رات کے کھانے کے بعد 30 منٹ چہل قدمی کی' : 'e.g. Walked 30 mins after dinner, low salt meals'}
                />
              </div>

              <div className="pt-4 border-t border-[#E8DDD2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#D9C4B5] text-xs font-semibold text-[#78615A] hover:bg-[#F2EAE2]"
                >
                  {isUrdu ? 'منسوخ کریں' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-bold hover:bg-[#58111A] shadow-md transition-colors cursor-pointer"
                >
                  {isUrdu ? 'ریڈنگ محفوظ کریں' : 'Save & Update Trends'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
