import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  RefreshCw, 
  CheckCircle2, 
  Copy,
  Check,
  Trash2,
  MapPin,
  Salad,
  Bot,
  User
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AiMedicalConsultantProps {
  onNavigateToHospitals?: (city?: string) => void;
  onNavigateToDiseases?: () => void;
  onNavigateToNutrition?: () => void;
  initialPrompt?: string;
  onConsumeInitialPrompt?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiMedicalConsultant: React.FC<AiMedicalConsultantProps> = ({
  onNavigateToHospitals,
  onNavigateToNutrition,
  initialPrompt,
  onConsumeInitialPrompt
}) => {
  const { lang, isUrdu } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const lastAutoPromptRef = useRef<string | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && initialPrompt !== lastAutoPromptRef.current) {
      lastAutoPromptRef.current = initialPrompt;
      handleConsult(initialPrompt);
      onConsumeInitialPrompt?.();
    }
  }, [initialPrompt]);

  const sampleQueries = isUrdu
    ? [
        { text: 'WHO کی ہدایات کے مطابق ٹائپ 2 ذیابیطس کا مکمل علاج اور دوائی', label: 'ذیابیطس (WHO علاج)' },
        { text: 'ہائی بلڈ پریشر کا گھریلو کنٹرول، پرہیز اور مستند ادویات', label: 'بلڈ پریشر کنٹرول' },
        { text: 'ڈینگی بخار کی خطرناک علامات اور پلیٹ لیٹس بڑھانے کا طریقہ', label: 'ڈینگی بخار پروٹوکول' },
        { text: 'ہائی کولیسٹرول اور دل کی شریانوں کی تنگی سے بچاؤ کی غذا', label: 'کولیسٹرول اور دل' },
        { text: 'شوگر اور بلڈ پریشر کے مریض کے لیے روزانہ کا دیسی ڈائٹ پلان', label: 'اردو: دیسی ڈائٹ پلان' },
        { text: 'شدید ذہنی دباؤ، گھبراہٹ اور اینگزائٹی کم کرنے کے طریقے', label: 'ذہنی سکون / اینگزائٹی' }
      ]
    : [
        { text: 'Type 2 Diabetes treatment according to WHO guidelines', label: 'Diabetes WHO Care' },
        { text: 'High blood pressure (Hypertension) home control and medicines', label: 'Hypertension Management' },
        { text: 'Dengue fever warning signs and platelet recovery protocol', label: 'Dengue Fever Protocol' },
        { text: 'High cholesterol and heart blockage prevention diet', label: 'Cholesterol & Heart' },
        { text: 'Sugar or BP ke mareez ke lie rozana ki diet plan in Urdu', label: 'Urdu: Diet Plan' },
        { text: 'Depression and severe anxiety somatic release techniques', label: 'Mental Calm / Anxiety' }
      ];

  const followUpPrompts = isUrdu
    ? [
        'اس کی احتیاطی تدابیر اور سائیڈ ایفیکٹس کیا ہیں؟',
        'پاکستانی گھریلو پرہیز اور مناسب غذا بتائیں',
        'اس کے لیے کون سے خون کے ٹیسٹ کروانے چاہئیں؟',
        'کب ایمرجنسی ہسپتال (1122) جانا ضروری ہے؟'
      ]
    : [
        'Is ke side effects aur precautions kya hain?',
        'Pakistani gharelu parhez aur diet batayein',
        'Kaunse blood tests karwane chahiye?',
        'Kab emergency hospital (1122) jana zaroori hai?'
      ];

  const handleConsult = async (queryText?: string) => {
    const textToSubmit = (queryText ?? query).trim();
    if (!textToSubmit || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      role: 'user',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages];
    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setQuery('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/medical-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSubmit,
          lang,
          history: updatedHistory.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const aiMsg: ChatMessage = {
          id: `msg-a-${Date.now()}`,
          role: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        setError(data.message || 'Unable to complete medical consultation. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error communicating with AI Medical Consultant.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([]);
    setError(null);
    setQuery('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#58111A] via-[#722F37] to-[#8C3A44] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-300 text-[#4A121A] text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#4A121A]" />
              {isUrdu ? 'WHO مصدقہ کلینیکل فریم ورک' : 'Follows WHO Health Guidelines'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium border border-white/20">
              {isUrdu ? 'مسلسل گفتگو • اردو • رومن اردو • انگریزی' : 'Easy Chat • English • Roman Urdu • اردو'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#FAF7F2]">
            {isUrdu
              ? 'کیئر ہب اے آئی میڈیکل کنسلٹنٹ (WHO رہنمائی)'
              : 'CareHub AI Health Assistant'}
          </h1>
          
          <p className="text-sm sm:text-base text-rose-100 max-w-3xl leading-relaxed">
            {isUrdu
              ? 'ورلڈ ہیلتھ آرگنائزیشن (WHO) کے معیارات کے مطابق بیماریوں کی تعریف، وجوہات، مستند علاج، لیب رپورٹس کی تفصیل اور پاکستانی غذائی پلان حاصل کرنے کے لیے مسلسل سوالات پوچھیں۔'
              : <>Ask simple questions and follow-ups to learn what a disease means, what causes it, standard doctor-used medicines, lab report explanations, and Pakistani diet tips based on <strong>World Health Organization (WHO)</strong> standards.</>}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-200/90 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isUrdu ? 'مسلسل طبی مشاورت' : 'Ask Follow-Up Questions'}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isUrdu ? 'مستند ادویات اور خوراک کی رہنمائی' : 'Common Medicines & Diet Help'}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isUrdu ? 'پاکستان کے 7 شہروں کے ایمرجنسی ہسپتال' : 'Hospitals in 7 Pakistani Cities'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Conversational Thread + Input Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#E0D2C7] shadow-sm space-y-6">
        
        {/* Top Bar when conversation active */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0E6DD] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-200 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#4A121A]">
                {isUrdu ? 'طبی مشاورت سیشن' : 'Health Consultation Chat'}
              </h2>
              <p className="text-[11px] text-[#78615A]">
                {messages.length === 0
                  ? (isUrdu
                      ? 'مشورہ شروع کرنے کے لیے نیچے دیے گئے موضوعات منتخب کریں یا اپنی علامات لکھیں'
                      : 'Tap a quick topic below or type your symptoms to begin')
                  : (isUrdu
                      ? `موجودہ سیشن میں ${Math.ceil(messages.length / 2)} طبی جوابات`
                      : `${Math.ceil(messages.length / 2)} answer${messages.length > 2 ? 's' : ''} in this chat`)}
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleResetChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-rose-50 text-[#722F37] border border-[#D9C4B5] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'نئی مشاورت' : 'New Consultation'}</span>
            </button>
          )}
        </div>

        {/* Starter Quick Prompts (when empty) */}
        {messages.length === 0 && (
          <div>
            <label className="text-xs font-bold text-[#722F37] uppercase tracking-wider block mb-2.5">
              {isUrdu ? 'فوری طبی سوالات (WHO معیارات):' : 'Popular Questions (WHO Standards):'}
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleConsult(item.text)}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F2EAE2] text-[#4A121A] text-xs font-medium border border-[#E4D7CC] hover:border-[#722F37] transition-all cursor-pointer disabled:opacity-50 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Thread */}
        {messages.length > 0 && (
          <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-200 flex items-center justify-center shrink-0 mt-1 font-bold text-[10px]">
                    WHO
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-[#722F37] text-white rounded-tr-xs shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E8DDD2] text-[#2D1810] rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] opacity-80">
                    <span className="font-bold flex items-center gap-1">
                      {msg.role === 'user' ? (
                        <>
                          <User className="w-3 h-3" /> {isUrdu ? 'مریض کا سوال' : 'Patient Inquiry'}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-[#722F37]" /> {isUrdu ? 'WHO طبی رہنمائی' : 'WHO Clinical Guidance'}
                        </>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1 rounded-md hover:bg-[#EDE4DC] text-[#722F37] cursor-pointer"
                          title={isUrdu ? 'طبی جواب کاپی کریں' : 'Copy clinical answer'}
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                    msg.role === 'user' ? 'text-white' : 'text-[#2D1810]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-200 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  WHO
                </div>
                <div className="bg-[#FAF7F2] border border-[#E8DDD2] rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-[#722F37] flex items-center gap-2 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{isUrdu ? 'WHO طبی رہنمائی تیار کی جا رہی ہے...' : 'Analyzing clinical history against WHO protocols...'}</span>
                </div>
              </div>
            )}
            <div ref={threadEndRef} />
          </div>
        )}

        {/* Follow-up Suggestions & Quick Referral Bar when assistant has replied */}
        {messages.length > 0 && !loading && (
          <div className="space-y-3 pt-2 border-t border-[#F0E6DD]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#78615A] mr-1">
                {isUrdu ? 'مزید سوالات:' : 'Follow-up questions:'}
              </span>
              {followUpPrompts.map((fp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleConsult(fp)}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF0E6] hover:bg-[#EDE0D2] text-[#722F37] text-[11px] font-semibold border border-[#DFCFC2] transition-colors cursor-pointer"
                >
                  + {fp}
                </button>
              ))}
            </div>

            <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {isUrdu
                    ? <><strong>طبی انتباہ:</strong> کوئی بھی دوا شروع کرنے سے پہلے PMDC رجسٹرڈ ڈاکٹر سے خوراک کی تصدیق ضرور کروائیں۔</>
                    : <><strong>Medical Disclaimer:</strong> Verify prescribed dosages with a PMDC-registered physician before starting medication.</>}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {onNavigateToNutrition && (
                  <button
                    type="button"
                    onClick={onNavigateToNutrition}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-[#4A121A] font-bold hover:bg-amber-100 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Salad className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>{isUrdu ? 'ڈائٹ پلانز' : 'Diet Plans'}</span>
                  </button>
                )}
                {onNavigateToHospitals && (
                  <button
                    type="button"
                    onClick={() => onNavigateToHospitals()}
                    className="px-3 py-1.5 rounded-lg bg-[#722F37] text-white font-bold hover:bg-[#58111A] transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-200" />
                    <span>{isUrdu ? '7 شہروں کے ہسپتال' : '7-City Hospitals'}</span>
                  </button>
                )}
                <a
                  href="tel:1122"
                  className="px-3 py-1.5 rounded-lg bg-rose-700 text-white font-bold hover:bg-rose-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3 text-amber-200" />
                  <span>{isUrdu ? 'ریسکیو 1122' : 'Rescue 1122'}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="flex-1">
              <span className="font-bold">Notice: </span>
              {error}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleConsult();
          }}
          className="space-y-3"
        >
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleConsult();
                }
              }}
              placeholder={messages.length === 0
                ? (isUrdu
                    ? 'کسی بھی بیماری، علامات، دوا یا خوراک کے بارے میں سوال پوچھیں (مثلاً: شوگر یا ہائی بلڈ پریشر کا WHO کے مطابق علاج)...'
                    : "Ask about any disease, diagnosis, symptoms, exact treatment, medicines, or diet (e.g. 'WHO guidelines for Type 2 Diabetes' ya 'High BP ka sahi ilaj aur parhez')...")
                : (isUrdu
                    ? 'اسی مشاورت میں مزید سوال پوچھیں (بھیجنے کے لیے Enter دبائیں)...'
                    : "Ask a follow-up question in the same consultation (Press Enter to send)...")
              }
              rows={3}
              className="w-full p-4 rounded-2xl bg-[#FAF7F2] border border-[#D9C4B5] text-sm text-[#3E1B15] placeholder:text-[#9B8881] focus:outline-hidden focus:ring-2 focus:ring-[#722F37] focus:bg-white resize-y transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#78615A]">
              <ShieldCheck className="w-4 h-4 text-[#722F37]" />
              <span>
                {isUrdu
                  ? 'ورلڈ ہیلتھ آرگنائزیشن (WHO) اور پاکستان ہیلتھ گائیڈلائنز کے عین مطابق'
                  : 'Follows WHO & Pakistan Health Guidelines'}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 rounded-xl bg-[#722F37] hover:bg-[#58111A] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isUrdu ? 'WHO ڈیٹا بیس سے مشورہ جاری ہے...' : 'Checking WHO Health Guide...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {messages.length === 0
                      ? (isUrdu ? 'طبی علاج اور رہنمائی حاصل کریں' : 'Get Treatment Advice')
                      : (isUrdu ? 'مزید سوال بھیجیں' : 'Send Follow-Up')}
                  </span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* WHO Guidelines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            BP
          </div>
          <h4 className="font-serif font-bold text-[#4A121A] text-sm">
            {isUrdu ? 'WHO بلڈ پریشر کے معیارات' : 'WHO Blood Pressure Targets'}
          </h4>
          <p className="text-xs text-[#6E5A54] leading-relaxed">
            {isUrdu
              ? 'مثالی بلڈ پریشر 120/80 mmHg سے کم ہے۔ اسٹیج 1 ہائی بلڈ پریشر 130/80 سے شروع ہوتا ہے۔ روزانہ نمک 2,000 ملی گرام (1 چمچ) سے کم رکھیں۔'
              : 'Normal resting BP is under 120/80 mmHg. High BP starts around 130/80 mmHg. Keep daily salt under 1 level teaspoon (2,000 mg).'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            GLU
          </div>
          <h4 className="font-serif font-bold text-[#4A121A] text-sm">
            {isUrdu ? 'WHO ذیابیطس تشخیصی معیار' : 'WHO Diabetes Numbers'}
          </h4>
          <p className="text-xs text-[#6E5A54] leading-relaxed">
            {isUrdu
              ? 'فاسٹنگ شوگر ≥ 126 mg/dL یا HbA1c ≥ 6.5% ذیابیطس کی علامت ہے۔ بروقت پرہیز اور ڈاکٹر کی تجویز کردہ میٹفارمین سے پیچیدگیوں سے بچا جا سکتا ہے۔'
              : 'Empty-stomach sugar of 126 mg/dL or higher (or HbA1c 6.5%+) points to diabetes. Early diet control and doctor-prescribed medicine protect your organs.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E0D2C7] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
            BMI
          </div>
          <h4 className="font-serif font-bold text-[#4A121A] text-sm">
            {isUrdu ? 'WHO ایشیائی BMI حدود' : 'WHO Asian Healthy Weight'}
          </h4>
          <p className="text-xs text-[#6E5A54] leading-relaxed">
            {isUrdu
              ? 'جنوبی ایشیائی افراد کے لیے زائد وزن کی حد ≥ 23.0 اور موٹاپے کی حد ≥ 25.0 مقرر ہے کیونکہ پیٹ کی چربی دل اور شوگر کا خطرہ جلد بڑھاتی ہے۔'
              : 'For South Asians, overweight starts at BMI 23.0 and obesity at 25.0 because extra belly fat raises sugar and heart risk sooner.'}
          </p>
        </div>
      </div>
    </div>
  );
};
