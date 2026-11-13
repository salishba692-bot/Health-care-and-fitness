import React, { useState } from 'react';
import { FlaskConical, Calculator, Pill, Baby, Sparkles } from 'lucide-react';
import { LabReportChecker } from './LabReportChecker';
import { WhoCalculatorsSuite } from './WhoCalculatorsSuite';
import { DailyCareTracker } from './DailyCareTracker';
import { VaccinationScheduleSection } from './VaccinationScheduleSection';
import { useLanguage } from '../context/LanguageContext';

interface ClinicalToolsHubProps {
  onAskAiWithLabReport?: (summaryPrompt: string) => void;
  initialSubTab?: 'labs' | 'calculators' | 'tracker' | 'epi';
}

export const ClinicalToolsHub: React.FC<ClinicalToolsHubProps> = ({
  onAskAiWithLabReport,
  initialSubTab = 'labs'
}) => {
  const { isUrdu } = useLanguage();
  const [subTab, setSubTab] = useState<'labs' | 'calculators' | 'tracker' | 'epi'>(initialSubTab);

  const tabs = [
    { id: 'labs' as const, labelEn: 'Lab Report Checker', labelUr: 'لیب رپورٹ چیکر', icon: FlaskConical },
    { id: 'calculators' as const, labelEn: 'WHO Calculators', labelUr: 'ڈبلیو ایچ او کیلکولیٹر', icon: Calculator },
    { id: 'tracker' as const, labelEn: 'Medicine & Water', labelUr: 'دوا اور پانی ٹریکر', icon: Pill },
    { id: 'epi' as const, labelEn: 'Child Vaccination (EPI)', labelUr: 'بچوں کے حفاظتی ٹیکے', icon: Baby },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0E6DD] pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722F37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isUrdu ? 'ڈبلیو ایچ او کلینیکل ٹولز سوٹ' : 'WHO Interactive Clinical Suite'}</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A121A] mt-1">
            {isUrdu ? 'لیب ٹیسٹ چیکر، کیلکولیٹرز اور روزمرہ ہیلتھ ٹریکرز' : 'Lab Report Checker, WHO Calculators & Daily Trackers'}
          </h2>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#722F37] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#5F4B44] border border-[#D9C4B5] hover:bg-[#F2EAE2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isUrdu ? tab.labelUr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab Content */}
      <div>
        {subTab === 'labs' && <LabReportChecker onAskAiWithLabReport={onAskAiWithLabReport} />}
        {subTab === 'calculators' && <WhoCalculatorsSuite />}
        {subTab === 'tracker' && <DailyCareTracker />}
        {subTab === 'epi' && <VaccinationScheduleSection />}
      </div>
    </div>
  );
};
