import React, { useState, useEffect } from 'react';
import { Pill, Droplet, Plus, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MedItem {
  id: string;
  name: string;
  timing: 'Morning' | 'Afternoon' | 'Night';
  taken: boolean;
}

const DEFAULT_MEDS: MedItem[] = [
  { id: 'med-1', name: 'Metformin 500mg (with breakfast)', timing: 'Morning', taken: true },
  { id: 'med-2', name: 'Amlodipine 5mg (BP control)', timing: 'Morning', taken: false },
  { id: 'med-3', name: 'Vitamin D3 2000 IU', timing: 'Afternoon', taken: false },
  { id: 'med-4', name: 'Rosuvastatin 10mg (Lipid control)', timing: 'Night', taken: false },
];

export const DailyCareTracker: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [meds, setMeds] = useState<MedItem[]>(() => {
    try {
      const saved = localStorage.getItem('carehub_daily_meds');
      return saved ? JSON.parse(saved) : DEFAULT_MEDS;
    } catch {
      return DEFAULT_MEDS;
    }
  });

  const [glasses, setGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('carehub_water_glasses');
      return saved ? Number(saved) : 4;
    } catch {
      return 4;
    }
  });

  const [newMedName, setNewMedName] = useState('');
  const [newMedTiming, setNewMedTiming] = useState<'Morning' | 'Afternoon' | 'Night'>('Morning');

  useEffect(() => {
    try {
      localStorage.setItem('carehub_daily_meds', JSON.stringify(meds));
    } catch {
      // ignore
    }
  }, [meds]);

  useEffect(() => {
    try {
      localStorage.setItem('carehub_water_glasses', String(glasses));
    } catch {
      // ignore
    }
  }, [glasses]);

  const toggleMed = (id: string) => {
    setMeds(prev => prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  const addMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    setMeds(prev => [
      ...prev,
      { id: `med-${Date.now()}`, name: newMedName.trim(), timing: newMedTiming, taken: false }
    ]);
    setNewMedName('');
  };

  const removeMed = (id: string) => {
    setMeds(prev => prev.filter(m => m.id !== id));
  };

  const takenCount = meds.filter(m => m.taken).length;
  const waterPercent = Math.min(100, Math.round((glasses / 10) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Daily Medication Adherence Checklist */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#E0D2C7] space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0E6DD] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF0E6] text-[#722F37] flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#4A121A]">
                {isUrdu ? 'روزانہ ادویات کا شیڈول' : 'Daily Medicine Schedule'}
              </h3>
              <p className="text-xs text-[#78615A]">
                {isUrdu
                  ? `آج ${takenCount} از ${meds.length} ادویات لی جا چکی ہیں`
                  : `${takenCount} of ${meds.length} doses completed today`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMeds(prev => prev.map(m => ({ ...m, taken: false })))}
            className="text-xs font-semibold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'نیا دن' : 'Reset Day'}</span>
          </button>
        </div>

        {/* Add Med Form */}
        <form onSubmit={addMed} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newMedName}
            onChange={(e) => setNewMedName(e.target.value)}
            placeholder={isUrdu ? 'نئی دوا شامل کریں (مثلاً Glucophage 500mg)' : 'Add medicine (e.g. Glucophage 500mg)'}
            className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs text-[#4A121A] focus:outline-hidden focus:ring-1 focus:ring-[#722F37]"
          />
          <select
            value={newMedTiming}
            onChange={(e) => setNewMedTiming(e.target.value as 'Morning' | 'Afternoon' | 'Night')}
            className="px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C4B5] text-xs font-semibold text-[#4A121A]"
          >
            <option value="Morning">{isUrdu ? 'صبح' : 'Morning'}</option>
            <option value="Afternoon">{isUrdu ? 'دوپہر' : 'Afternoon'}</option>
            <option value="Night">{isUrdu ? 'رات' : 'Night'}</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'شامل کریں' : 'Add'}</span>
          </button>
        </form>

        {/* Checklist */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {meds.map((med) => (
            <div
              key={med.id}
              onClick={() => toggleMed(med.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                med.taken
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-[#FAF7F2] border-[#E8DDD2] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                  med.taken ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-[#C9B7AA]'
                }`}>
                  {med.taken && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <span className={`text-xs sm:text-sm font-semibold block break-words ${med.taken ? 'line-through opacity-75' : 'text-[#4A121A]'}`}>
                    {med.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F37]">
                    {med.timing}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMed(med.id);
                }}
                className="p-1.5 text-[#8C766F] hover:text-rose-700 rounded-lg cursor-pointer shrink-0"
                aria-label="Remove medicine"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: 10-Glass WHO Hydration Tracker */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E0D2C7] flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0E6DD] pb-3 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#4A121A]">
                  {isUrdu ? 'پانی کا روزانہ ٹریکر' : 'Daily Hydration Tracker'}
                </h3>
                <p className="text-xs text-[#78615A]">
                  {isUrdu ? 'ہدف: 10 گلاس (2.5 لیٹر روزانہ)' : 'WHO Target: 10 Glasses (2.5 Liters)'}
                </p>
              </div>
            </div>
            <span className="text-lg sm:text-xl font-serif font-bold text-blue-800 shrink-0">
              {(glasses * 0.25).toFixed(2)}L
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-[#5F4B44]">
              <span>{glasses} / 10 {isUrdu ? 'گلاس (250ml)' : 'glasses (250ml)'}</span>
              <span>{waterPercent}%</span>
            </div>
            <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DDD2]">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          {/* Glass Buttons Grid */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2">
            {Array.from({ length: 10 }).map((_, idx) => {
              const filled = idx < glasses;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setGlasses(idx + 1)}
                  className={`py-2 sm:py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    filled
                      ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-2xs'
                      : 'bg-[#FAF7F2] border-[#E8DDD2] text-[#8C766F] hover:bg-white'
                  }`}
                >
                  <Droplet className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${filled ? 'fill-blue-500 text-blue-600' : ''}`} />
                  <span>{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={() => setGlasses(prev => Math.min(12, prev + 1))}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-xs font-bold cursor-pointer"
          >
            +1 {isUrdu ? 'گلاس پانی شامل کریں' : 'Add 250ml Glass'}
          </button>
          <button
            type="button"
            onClick={() => setGlasses(0)}
            className="px-4 py-2.5 rounded-xl border border-[#D9C4B5] hover:bg-[#FAF7F2] text-xs font-semibold text-[#78615A] cursor-pointer"
          >
            {isUrdu ? 'صفر کریں' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  );
};
