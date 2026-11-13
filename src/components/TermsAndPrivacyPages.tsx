import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TermsAndPrivacyProps {
  type: 'terms' | 'privacy';
  onBack: () => void;
}

export const TermsAndPrivacyPages: React.FC<TermsAndPrivacyProps> = ({ type, onBack }) => {
  const { isUrdu } = useLanguage();

  if (type === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'کیئر ہب ہوم پیج پر واپس جائیں' : 'Back to CareHub Overview'}</span>
        </button>

        <div className="space-y-3 border-b border-[#E8DDD2] pb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase">
              {isUrdu ? 'قانونی شرائط و ضوابط' : 'Legal Governance'}
            </span>
            <span className="text-xs text-[#78615A]">
              {isUrdu ? 'نفاذ کی تاریخ: اکتوبر 2026' : 'Effective Date: October 2026'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A121A]">
            {isUrdu ? 'شرائطِ استعمال (Terms of Service)' : 'Terms of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed">
            {isUrdu
              ? 'براہِ کرم کیئر ہب پاکستان پلیٹ فارم، ہیلتھ ڈیش بورڈ، 7 شہروں کی ہسپتال ڈائریکٹری یا طبی غذائی پلانز استعمال کرنے سے پہلے ان شرائط کو غور سے پڑھیں۔'
              : 'Please read these terms carefully before utilizing the CareHub Pakistan platform, its metrics dashboard, hospital directory, or clinical nutrition protocols.'}
          </p>
        </div>

        {/* Emergency Medical Disclaimer Callout */}
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            <span>{isUrdu ? 'اہم طبی دستبرداری (Medical Disclaimer)' : 'Important Medical Disclaimer'}</span>
          </div>
          <p className="text-xs leading-relaxed">
            {isUrdu ? (
              <>
                کیئر ہب ایک تعلیمی اور ڈیجیٹل ہیلتھ ٹریکنگ پلیٹ فارم ہے۔ یہ براہِ راست ڈاکٹر اور مریض کے تعلق، ایمرجنسی ڈسپیچ یا ذاتی کلینیکل تشخیص کا متبادل نہیں ہے۔ اگر آپ کو سینے میں درد، سانس لینے میں دشواری، فالج کی علامات یا اچانک تیز بخار ہو تو فوراً <strong>1122 یا 115</strong> پر کال کریں یا قریبی ایمرجنسی ہسپتال تشریف لے جائیں۔
              </>
            ) : (
              <>
                CareHub is an educational and digital health-tracking interface. It does NOT constitute direct doctor-patient relationship, emergency dispatch, or personalized clinical diagnosis. If you are experiencing chest pain, difficulty breathing, neurological numbness, or sudden high fever, dial <strong>1122, 115</strong> or proceed immediately to the nearest emergency room.
              </>
            )}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#4A121A] leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D2C7]">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#4A121A]">
              {isUrdu ? '1. شرائط کی منظوری' : '1. Acceptance of Terms'}
            </h3>
            <p className="text-[#6E5A54]">
              {isUrdu
                ? 'کیئر ہب ویب سائٹ، موبائل انٹرفیس یا طبی ٹولز تک رسائی حاصل کر کے آپ ان شرائطِ استعمال کے پابند ہونے سے اتفاق کرتے ہیں۔ اگر آپ ان شرائط سے متفق نہیں ہیں تو براہِ کرم پلیٹ فارم استعمال نہ کریں۔'
                : 'By accessing or using the CareHub website, mobile interfaces, or application programming interfaces, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the platform.'}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#4A121A]">
              {isUrdu ? '2. تعلیمی مقصد اور غذائی پلانز' : '2. Educational Purpose & Nutrition Plans'}
            </h3>
            <p className="text-[#6E5A54]">
              {isUrdu
                ? 'تمام غذائی پلانز (بشمول ذیابیطس اور DASH ڈائٹ)، بیماریوں کی تفصیل اور علامات کی رہنمائی WHO اور مستند طبی تحقیق کے مطابق تیار کی گئی ہے۔ تاہم ہر مریض کے گردوں، الیکٹرولائٹس اور ادویات کے لحاظ سے ضروریات مختلف ہو سکتی ہیں۔ دواؤں میں تبدیلی سے پہلے اپنے معالج سے ضرور مشورہ کریں۔'
                : 'All nutrition plans (including Diabetic and DASH diets), disease descriptions, and symptom guidelines are compiled from published medical literature and WHO standards. However, individual clinical requirements vary based on renal function, electrolyte panels, and medications. Always consult your attending physician prior to altering prescription therapies.'}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#4A121A]">
              {isUrdu ? '3. پاکستان 7 شہروں کی ہسپتال ڈائریکٹری' : '3. Pakistan 7-City Hospital Directory Listings'}
            </h3>
            <p className="text-[#6E5A54]">
              {isUrdu
                ? 'ہسپتالوں کے بستروں کی گنجائش، ہیلپ لائن نمبرز، او پی ڈی اوقات اور فیس کی تفصیلات عوامی صحت کے ریکارڈ اور مسلسل تصدیق سے مرتب کی گئی ہیں۔ کیئر ہب ان ہسپتالوں کا مالک یا آپریٹر نہیں ہے اور نہ ہی فیس یا علاج کے نتائج کا ذمہ دار ہے۔'
                : 'Information regarding hospital bed capacities, telephone hotlines, OPD timings, and fee ranges is compiled through public health registries and ongoing verification. CareHub does not own, operate, or directly endorse the listed hospitals, and holds no liability for hospital wait times, fee variations, or clinical outcomes.'}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#4A121A]">
              {isUrdu ? '4. صارف کا ہیلتھ ڈیٹا اور ریکارڈ' : '4. User Fitness Data & Metric Logging'}
            </h3>
            <p className="text-[#6E5A54]">
              {isUrdu
                ? 'بلڈ پریشر، شوگر اور وزن کے اندراجات کی درستگی صارف کی اپنی ذمہ داری ہے۔ آپ اپنے تمام محفوظ کردہ ریکارڈ کے مکمل مالک ہیں اور کسی بھی وقت اپنا ڈیٹا حذف یا برآمد کر سکتے ہیں۔'
                : 'Users are responsible for ensuring the accuracy of logged blood pressure, blood glucose, and weight metrics. You retain full ownership of your logged data and may export or erase your records at any time.'}
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722F37] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'کیئر ہب ہوم پیج پر واپس جائیں' : 'Back to CareHub Overview'}</span>
      </button>

      <div className="space-y-3 border-b border-[#E8DDD2] pb-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#722F37] text-xs font-bold uppercase">
            {isUrdu ? 'ڈیٹا پرائیویسی اور رازداری' : 'Data Privacy & Confidentiality'}
          </span>
          <span className="text-xs text-[#78615A]">
            {isUrdu ? 'HIPAA اور GDPR معیار کے مطابق' : 'HIPAA & GDPR Aligned Protocol'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A121A]">
          {isUrdu ? 'رازداری کی پالیسی (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5A54] leading-relaxed">
          {isUrdu
            ? 'کیئر ہب پاکستان میں آپ کی صحت کے اعداد و شمار، بلڈ شوگر ریکارڈ اور طبی سوالات مکمل طور پر خفیہ رہتے ہیں۔ جانیں کہ ہم آپ کے ڈیٹا کی حفاظت کیسے کرتے ہیں۔'
            : 'At CareHub Pakistan, your health metrics, blood glucose logs, and medical queries are confidential. Discover how we protect your health data.'}
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#4A121A] leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D2C7]">
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>
              {isUrdu ? 'تیسرے فریق کو ڈیٹا فروخت نہ کرنے کی مکمل ضمانت' : 'Zero Third-Party Data Monetization Guarantee'}
            </span>
          </div>
          <p className="text-[#6E5A54]">
            {isUrdu
              ? 'کیئر ہب آپ کی ذاتی صحت کی پیمائش، بلڈ پریشر ریڈنگز یا رابطے کی تفصیلات کسی فارما کمپنی، انشورنس ادارے یا اشتہاری کمپنی کو ہرگز فروخت، کرایہ یا منتقل نہیں کرتا۔'
              : 'CareHub does NOT sell, rent, or trade your personal health measurements, blood pressure readings, or contact details to pharmaceutical companies, insurance aggregators, or third-party advertisers.'}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#4A121A]">
            {isUrdu ? '1. معلومات جو ہم محفوظ کرتے ہیں' : '1. Information We Collect'}
          </h3>
          <p className="text-[#6E5A54]">
            {isUrdu ? 'ہم صرف وہی معلومات محفوظ کرتے ہیں جو آپ خود فراہم کرتے ہیں:' : 'We collect information you explicitly provide:'}
          </p>
          <ul className="list-disc pl-5 text-[#6E5A54] space-y-1">
            <li>
              {isUrdu
                ? 'پروفائل کی تفصیلات: پورا نام، ای میل، عمر، قد، ہدف وزن اور شہر۔'
                : 'Profile Details: Full Name, Email, Age, Height, Target Weight.'}
            </li>
            <li>
              {isUrdu
                ? 'بائیو مارکر لاگز: سسٹولک و ڈائیسٹولک بلڈ پریشر، فاسٹنگ بلڈ شوگر، روزانہ پانی اور قدموں کی تعداد۔'
                : 'Biomarker Logs: Systolic & Diastolic Blood Pressure, Fasting Blood Glucose, Daily Water Intake, Step Counts.'}
            </li>
            <li>
              {isUrdu
                ? 'استعمال کی معلومات: گمنام سرچ رجحانات تاکہ طبی رہنمائی کو مزید بہتر بنایا جا سکے۔'
                : 'Usage Analytics: Aggregated, anonymized search queries (e.g. disease guide clicks) to optimize healthcare content.'}
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#4A121A]">
            {isUrdu ? '2. مقامی اسٹوریج اور صارف کا کنٹرول' : '2. Local Storage & Client-Side Encryption'}
          </h3>
          <p className="text-[#6E5A54]">
            {isUrdu
              ? 'آپ کے ذاتی ٹریکنگ ریکارڈ بنیادی طور پر آپ کے اپنے براؤزر اسٹوریج (Local Storage) میں محفوظ رہتے ہیں، تاکہ آپ کو اپنے روزانہ کے ڈیٹا پر مکمل اختیار حاصل رہے۔'
              : 'Your personal tracking records are encrypted and primarily stored directly on your client browser storage (Local Storage), ensuring that you remain in sovereign control of your daily measurements.'}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#4A121A]">
            {isUrdu ? '3. کوکیز اور ٹریکنگ' : '3. Cookies & Tracking'}
          </h3>
          <p className="text-[#6E5A54]">
            {isUrdu
              ? 'ہم صرف ضروری سیشن سیٹنگز استعمال کرتے ہیں تاکہ آپ کی زبان اور پروفائل کی ترجیحات محفوظ رہیں۔ ہم کوئی غیر ضروری اشتہاری ٹریکرز استعمال نہیں کرتے۔'
              : 'We only use essential functional session storage to remember your authenticated profile and UI preferences. We do not deploy intrusive third-party cross-site trackers.'}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#4A121A]">
            {isUrdu ? '4. آپ کے حقوق' : '4. Your Rights'}
          </h3>
          <p className="text-[#6E5A54]">
            {isUrdu
              ? 'آپ کو اپنے تمام صحت کے ریکارڈ برآمد کرنے، غلط معلومات درست کرنے یا بغیر کسی باقی ریکارڈ کے مکمل حذف کرنے کا پورا حق حاصل ہے۔'
              : 'You have the right to request a complete export of your health metric logs, correct any inaccurate profile information, or trigger a full deletion of your record with zero retention.'}
          </p>
        </section>
      </div>
    </div>
  );
};

