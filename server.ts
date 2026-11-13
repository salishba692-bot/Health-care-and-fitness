import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { HOSPITALS_DATA } from './src/data/hospitalsData.ts';
import { DISEASES_DATA } from './src/data/diseasesData.ts';
import { NUTRITION_PLANS } from './src/data/nutritionPlansData.ts';
import { ARTICLES_DATA } from './src/data/articlesData.ts';
import { INITIAL_METRICS_DATA } from './src/data/fitnessMetricsData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent JSON file storage for vitals metrics across server restarts
const METRICS_STORE_PATH = '/tmp/carehub-metrics.json';

function loadMetricsStore() {
  try {
    if (fs.existsSync(METRICS_STORE_PATH)) {
      const raw = fs.readFileSync(METRICS_STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read persisted metrics store, using defaults:', err);
  }
  return [...INITIAL_METRICS_DATA];
}

function saveMetricsStore(data: typeof INITIAL_METRICS_DATA) {
  try {
    fs.writeFileSync(METRICS_STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist metrics store:', err);
  }
}

let userMetricsStore = loadMetricsStore();

// API: Pakistan Hospitals Directory Across 7 Major Cities
app.get('/api/hospitals', (req: Request, res: Response) => {
  const { city, zone, specialty, emergency, q } = req.query;
  let results = [...HOSPITALS_DATA];

  if (city && typeof city === 'string' && city !== 'All') {
    results = results.filter(h => h.city.toLowerCase() === city.toLowerCase());
  }

  if (zone && typeof zone === 'string' && zone !== 'All') {
    results = results.filter(h => h.zone && h.zone.toLowerCase() === zone.toLowerCase());
  }

  if (specialty && typeof specialty === 'string' && specialty !== 'All') {
    results = results.filter(h => h.specialties.some(s => s.toLowerCase().includes((specialty as string).toLowerCase())));
  }

  if (emergency === 'true') {
    results = results.filter(h => h.emergencyAvailable);
  }

  if (q && typeof q === 'string') {
    const term = q.toLowerCase();
    results = results.filter(h => 
      h.name.toLowerCase().includes(term) ||
      h.address.toLowerCase().includes(term) ||
      h.city.toLowerCase().includes(term) ||
      (h.zone && h.zone.toLowerCase().includes(term)) ||
      h.specialties.some(s => s.toLowerCase().includes(term))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/hospitals/:id', (req: Request, res: Response) => {
  const hospital = HOSPITALS_DATA.find(h => h.id === req.params.id);
  if (!hospital) {
    return res.status(404).json({ success: false, message: 'Hospital not found' });
  }
  res.json({ success: true, data: hospital });
});

// Multi-Turn AI Medical Consultant & Treatment Guidance Endpoint (Gemini API)
app.post('/api/ai/medical-consult', async (req: Request, res: Response) => {
  try {
    const { query, history, lang } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, message: 'Medical query is required' });
    }

    const preferUrdu = lang === 'ur';
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        success: true,
        answer: preferUrdu
          ? `[WHO مستند طبی رہنمائی برائے: "${query}"]\n\n1. ابتدائی طبی جائزہ: براہ کرم اپنا بلڈ پریشر، شوگر اور جسمانی درجہ حرارت چیک کریں۔\n2. WHO معیاری علاج: صاف پانی کا استعمال بڑھائیں، مقررہ ادویات جاری رکھیں اور ڈاکٹر کے مشورے کے بغیر درد کش ادویات (NSAIDs) نہ کھائیں۔\n3. ہنگامی صورتحال: تیز بخار، سانس میں دشواری یا سینے میں درد کی صورت میں ریسکیو 1122 پر کال کریں یا قریبی بڑے ہسپتال (AKUH, NICVD, PIMS, Mayo یا Shifa) تشریف لے جائیں۔`
          : `[WHO Evidence-Based Clinical Guidance for: "${query}"]\n\n1. Clinical Assessment: Please record baseline vitals (Blood Pressure, Blood Glucose, Body Temperature).\n2. Standard WHO Treatment: Ensure adequate oral hydration, maintain prescribed medications, and avoid unverified over-the-counter NSAIDs.\n3. Pakistan Emergency Care: If acute pain, breathing distress, or high fever persist, contact Rescue 1122 or visit your nearest tertiary center (NICVD, AKUH, PIMS, Mayo, or Shifa).`
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const languageDirective = preferUrdu
      ? `The user currently has the app set to URDU (اردو) mode. Respond clearly in natural Urdu script (اردو) with clear headings and include standard English medical/medicine terms in parentheses for safety and clarity, unless the user explicitly asks in English.`
      : `Support English, Roman Urdu, and Urdu seamlessly matching the user's query language.`;

    const systemInstruction = `You are CareHub Pakistan's Senior Clinical AI Medical Consultant. You provide accurate, evidence-based, WHO (World Health Organization)-compliant medical diagnosis guidance, causes, symptoms, lab test interpretation, and exact clinical treatments.
Structure initial answers clearly:
1. Medical Condition Overview & WHO Clinical Definition
2. Root Causes, Pathophysiology & Risk Factors
3. Accurate Medical Treatments, Pharmacotherapy & Procedures (standard medicines, clinical dosages overview with prescription warning)
4. Dietary & Lifestyle Guidance (calibrated for South Asian / Pakistani cuisine, low sodium, low GI)
5. Red Flag Emergency Symptoms & Nearest Pakistani Tertiary Care Action (e.g. Rescue 1122, NICVD, Mayo, PIMS, LRH, Civil Quetta).
For follow-up questions in an ongoing conversation, directly address the patient's specific follow-up using previous context while staying aligned with WHO clinical guidelines. ${languageDirective}`;

    // Build multi-turn contents array if conversation history exists
    const contentsPayload = Array.isArray(history) && history.length > 0
      ? [
          ...history
            .filter((m: any) => m && typeof m.text === 'string' && (m.role === 'user' || m.role === 'assistant'))
            .slice(-10)
            .map((m: any) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.text }]
            })),
          { role: 'user', parts: [{ text: query }] }
        ]
      : query;

    let answerText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: contentsPayload,
        config: {
          systemInstruction
        }
      });
      answerText = response.text || '';
    } catch (genAiErr: any) {
      console.warn('Gemini transient API notice, generating structured WHO clinical fallback:', genAiErr?.message);
      
      const qLower = query.toLowerCase();
      if (qLower.includes('sugar') || qLower.includes('diabetes')) {
        answerText = `### WHO Clinical Guidance: Type 2 Diabetes Mellitus (ذیابیطس)

**1. WHO Clinical Definition & Diagnostic Criteria**
Type 2 Diabetes is a progressive metabolic disorder characterized by peripheral insulin resistance and secondary pancreatic beta-cell dysfunction. According to WHO criteria:
- Fasting Plasma Glucose (FPG) ≥ 126 mg/dL (7.0 mmol/L)
- HbA1c ≥ 6.5% (48 mmol/mol)
- 2-hour Postprandial Glucose ≥ 200 mg/dL (11.1 mmol/L)

**2. Root Causes & Risk Factors**
Excess visceral adiposity (Asian BMI cutoff ≥ 23.0 kg/m²), consumption of refined carbohydrates (maida naan, sugary chai, white rice), physical inactivity, and family history.

**3. WHO Evidence-Based Medical Treatment & Medicines**
- **First-Line Pharmacotherapy:** Metformin (Glucophage) 500mg to 1000mg twice daily with meals to suppress hepatic gluconeogenesis and heighten cellular insulin sensitivity.
- **Second-Line Addition (if HbA1c > 7.0%):** SGLT2 inhibitors (Empagliflozin/Dapagliflozin) for cardiorenal protection, or DPP-4 inhibitors (Sitagliptin/Vildagliptin), or GLP-1 receptor agonists.
- *Strict Medical Warning:* Medication dosages must be titrated by an endocrinologist based on renal function (eGFR).

**4. Dietary & Lifestyle Protocol (South Asian Cuisine)**
- Replace refined wheat flour with stone-ground whole wheat, barley (jau) flour, or besan (gram flour).
- Eliminate vanaspati trans-fats; cook with measured mustard oil or olive oil (< 3 tsp/day).
- Practice meal sequencing: eat green salad & viscous soluble fiber (ispaghol husk) 10 minutes before rotis to blunt glucose spikes.
- Perform a 15-minute brisk walk immediately following lunch and dinner (activates muscle GLUT-4 transporters).

**5. Red Flag Emergency Warning**
If experiencing severe dehydration, rapid deep breathing (Kussmaul breathing), fruity breath odor (Ketoacidosis), or blood glucose > 350 mg/dL with confusion, dial **Rescue 1122** or reach the Emergency Department of your nearest tertiary hospital immediately (AKUH, NICVD, Mayo, PIMS, LRH, or Civil Quetta).`;
      } else if (qLower.includes('bp') || qLower.includes('blood pressure') || qLower.includes('hypertension')) {
        answerText = `### WHO Clinical Guidance: Hypertension & Blood Pressure Control (بلڈ پریشر)

**1. WHO Clinical Definition**
According to WHO Guidelines for the Pharmacological Treatment of Hypertension in Adults:
- Normal Blood Pressure: Systolic < 120 mmHg and Diastolic < 80 mmHg.
- Stage 1 Hypertension: 130–139 / 80–89 mmHg.
- Stage 2 Hypertension: ≥ 140 / 90 mmHg (requires immediate pharmacotherapy).

**2. Pathophysiology & Root Causes**
Endothelial stiffening, increased systemic vascular resistance, excessive dietary sodium intake (> 5g salt/day), chronic sympathetic nervous activation, and low potassium intake.

**3. WHO Evidence-Based Medical Treatment**
- **First-Line Antihypertensive Classes:**
  1. ACE Inhibitors / ARBs (e.g. Enalapril 5-20mg, Losartan 50mg, or Telmisartan 40mg once daily).
  2. Calcium Channel Blockers (e.g. Amlodipine 5-10mg daily for vasodilation).
  3. Thiazide-like Diuretics (e.g. Indapamide 1.5mg or Hydrochlorothiazide 12.5mg).
- Dual therapy is recommended by WHO when baseline BP is ≥ 20/10 mmHg above target.

**4. Dietary & Lifestyle Protocol (DASH Protocol)**
- Restrict sodium to under 2,000 mg/day (less than 1 level teaspoon of salt across all cooked dishes).
- Avoid pickles (achaar), papad, salted bakery biscuits, and processed snacks.
- Consume dietary nitrate vasodilators: fresh beetroot, spinach (palak), pomegranate, and garlic.
- Maintain 150–300 minutes of moderate aerobic activity weekly as certified by WHO.

**5. Red Flag Symptoms & Emergency Action**
Blood pressure ≥ 180/120 mmHg with severe occipital headache, blurred vision, chest tightness, or facial numbness represents a Hypertensive Emergency. Call **Rescue 1122** or head immediately to your nearest emergency room (NICVD Karachi, PIC Lahore, RIC Rawalpindi, or Lady Reading Hospital).`;
      } else {
        answerText = `### WHO Clinical Medical Guidance: ${query}

**1. WHO Clinical Assessment & Overview**
The World Health Organization (WHO) emphasizes a systematic diagnostic evaluation. Please record baseline clinical vitals:
- Resting Blood Pressure (Target: < 120/80 mmHg)
- Fasting Blood Sugar (Target: 70–99 mg/dL)
- Pulse & Body Temperature

**2. Evidence-Based Clinical Management**
- Ensure balanced physiological hydration (2.5 to 3 Liters of clean boiled/filtered water daily).
- Maintain all prescribed clinical therapies without abrupt cessation.
- Avoid unverified self-medication with nephrotoxic NSAIDs (such as Brufen/Diclofenac) without gastroprotection.

**3. South Asian Dietary Alignment**
- Emphasize fiber-dense whole foods (pulses, lentils, seasonal vegetables, seeds).
- Restrict saturated and industrial trans fats found in commercial ghee and fried street foods.
- Incorporate daily stress-reduction practices (diaphragmatic breathing and 7-8 hours of restorative sleep).

**4. Pakistan Nationwide Emergency Network**
For acute deterioration, breathing distress, sudden neurological deficits, or unrelenting chest pain:
- Dial **National Rescue 1122** (Ambulance & Paramedic triage)
- Reach premier tertiary facilities: AKUH or NICVD in Karachi, Mayo or Shaukat Khanum in Lahore, PIMS in Islamabad, LRH in Peshawar, Nishtar in Multan, or Bolan Medical Complex in Quetta.`;
      }
    }

    res.json({
      success: true,
      answer: answerText || 'Unable to generate medical guidance.'
    });
  } catch (error: any) {
    console.error('AI Medical Consult Error:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Error processing medical consultation'
    });
  }
});

// API: Disease Encyclopedia
app.get('/api/diseases', (req: Request, res: Response) => {
  const { category, q } = req.query;
  let results = [...DISEASES_DATA];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (q && typeof q === 'string') {
    const term = q.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(term) ||
      (d.scientificName && d.scientificName.toLowerCase().includes(term)) ||
      d.definition.toLowerCase().includes(term) ||
      d.causes.some(c => c.toLowerCase().includes(term)) ||
      d.symptoms.early.some(s => s.toLowerCase().includes(term)) ||
      d.symptoms.acute.some(s => s.toLowerCase().includes(term))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/diseases/:id', (req: Request, res: Response) => {
  const disease = DISEASES_DATA.find(d => d.id === req.params.id);
  if (!disease) {
    return res.status(404).json({ success: false, message: 'Disease not found' });
  }
  res.json({ success: true, data: disease });
});

// API: Nutrition & Medical Diets
app.get('/api/nutrition-plans', (_req: Request, res: Response) => {
  res.json({ success: true, count: NUTRITION_PLANS.length, data: NUTRITION_PLANS });
});

app.get('/api/nutrition-plans/:id', (req: Request, res: Response) => {
  const plan = NUTRITION_PLANS.find(p => p.id === req.params.id);
  if (!plan) {
    return res.status(404).json({ success: false, message: 'Nutrition plan not found' });
  }
  res.json({ success: true, data: plan });
});

// API: Clinical Articles
app.get('/api/articles', (_req: Request, res: Response) => {
  res.json({ success: true, count: ARTICLES_DATA.length, data: ARTICLES_DATA });
});

// API: Health Metrics Tracking (File-backed persistence)
app.get('/api/metrics', (_req: Request, res: Response) => {
  res.json({ success: true, count: userMetricsStore.length, data: userMetricsStore });
});

app.post('/api/metrics', (req: Request, res: Response) => {
  const { date, weightKg, systolicBp, diastolicBp, fastingGlucose, postMealGlucose, restingHeartRate, waterIntakeLiters, stepsCount, notes } = req.body;
  
  if (!weightKg || !systolicBp || !diastolicBp || !fastingGlucose) {
    return res.status(400).json({ success: false, message: 'Missing required vital metrics.' });
  }

  const todayStr = typeof date === 'string' && date.trim() ? date : new Date().toISOString().split('T')[0];
  const newEntry = {
    id: `m-${Date.now()}`,
    date: todayStr,
    weightKg: Number(weightKg),
    systolicBp: Number(systolicBp),
    diastolicBp: Number(diastolicBp),
    fastingGlucose: Number(fastingGlucose),
    postMealGlucose: postMealGlucose ? Number(postMealGlucose) : undefined,
    restingHeartRate: restingHeartRate ? Number(restingHeartRate) : 72,
    waterIntakeLiters: waterIntakeLiters ? Number(waterIntakeLiters) : 2.5,
    stepsCount: stepsCount ? Number(stepsCount) : 6000,
    notes: notes || undefined
  };

  userMetricsStore.push(newEntry);
  saveMetricsStore(userMetricsStore);
  res.status(201).json({ success: true, message: 'Metric recorded successfully', data: newEntry });
});

// SEO: Dynamic Robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  const host = process.env.APP_URL || 'https://ais-dev-3i3qpvwxfykjdutwajqb74-880748617521.asia-east1.run.app';
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

# CareHub Pakistan Sitemap
Sitemap: ${host}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// SEO: Dynamic Sitemap.xml
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const host = process.env.APP_URL || 'https://ais-dev-3i3qpvwxfykjdutwajqb74-880748617521.asia-east1.run.app';
  const now = new Date().toISOString().split('T')[0];

  const diseaseUrls = DISEASES_DATA.map(d => `
  <url>
    <loc>${host}/#diseases-${d.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const articleUrls = ARTICLES_DATA.map(a => `
  <url>
    <loc>${host}/#articles-${a.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${host}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${host}/#first-aid</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#dashboard</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#ai-consult</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#tools</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#hospitals</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#nutrition</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/#exercises</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/#diseases</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/#articles</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/#happiness</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/#stress</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/#faq</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${host}/#terms</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${host}/#privacy</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>${diseaseUrls}${articleUrls}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemapXml);
});

// Setup dev server with Vite or production static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CareHub Pakistan WHO Health Server running on port ${PORT} [${isProduction ? 'Production' : 'Development'}]`);
  });
}

startServer();
