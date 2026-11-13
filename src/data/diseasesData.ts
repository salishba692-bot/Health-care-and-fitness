import type { Disease } from '../types';

export const DISEASES_DATA: Disease[] = [
  {
    id: 'type-2-diabetes',
    name: 'Type 2 Diabetes Mellitus',
    scientificName: 'Non-Insulin-Dependent Diabetes Mellitus (NIDDM)',
    category: 'Metabolic & Endocrine',
    severity: 'Critical / Chronic',
    definition: 'A chronic metabolic disorder characterized by hyperglycemia (elevated blood glucose levels) resulting from progressive pancreatic beta-cell dysfunction combined with peripheral insulin resistance in liver, muscle, and adipose tissue.',
    causes: [
      'Insulin resistance aggravated by physical inactivity and visceral abdominal adiposity',
      'Genetic predisposition and family history of metabolic syndromes',
      'High glycemic diet rich in refined carbohydrates, sugary beverages, and saturated fats',
      'Metabolic syndrome (hypertension, elevated triglycerides, low HDL cholesterol)',
      'Chronic sleep apnea and persistent neuroendocrine stress (elevated cortisol)'
    ],
    symptoms: {
      early: [
        'Polyuria (frequent urination, especially at night)',
        'Polydipsia (persistent, unquenchable excessive thirst)',
        'Polyphagia (constant intense hunger despite regular meals)',
        'Chronic unexplained fatigue and mid-day energy crashes',
        'Blurred vision due to fluid shifting in ocular lens'
      ],
      acute: [
        'Slow-healing cutaneous cuts, ulcers, or recurrent foot infections',
        'Acanthosis nigricans (velvety dark skin patches on neck and axilla)',
        'Peripheral neuropathy (tingling, numbness, or burning sensations in feet)',
        'Hyperosmolar Hyperglycemic State (extreme dehydration, confusion, lethargy)',
        'Rapid unintentional weight loss due to catabolic muscle breakdown'
      ]
    },
    treatment: {
      medical: [
        'Continuous or frequent Self-Monitoring of Blood Glucose (SMBG) and HbA1c testing every 90 days',
        'Structured Medical Nutrition Therapy (MNT) and carbohydrate counting',
        'Cardiovascular risk factor modification (lipid and blood pressure control)'
      ],
      medications: [
        'Metformin (Biguanide) as frontline insulin-sensitizing therapy',
        'SGLT-2 inhibitors (Empagliflozin, Dapagliflozin) for cardiorenal protection',
        'GLP-1 receptor agonists (Semaglutide, Liraglutide) for glycemic and weight control',
        'DPP-4 inhibitors (Sitagliptin) and Sulfonylureas (Glimepiride)',
        'Exogenous basal and bolus Insulin therapy when oral agents fail'
      ],
      procedures: [
        'Bariatric/Metabolic surgery for patients with severe obesity and refractory diabetes',
        'Routine annual dilated retinal eye exam and comprehensive diabetic foot evaluation'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'While not conventionally curable in the viral sense, Type 2 Diabetes is clinically REVERSIBLE into complete long-term remission (HbA1c < 6.5% without medications for >3 months) via targeted caloric restriction, significant visceral fat loss, structured resistance training, and low-glycemic dietary interventions.',
      prevention: [
        'Maintain a healthy waist circumference (<90 cm for South Asian men, <80 cm for women)',
        'Engage in at least 150 minutes of moderate aerobic exercise plus 2 resistance training sessions weekly',
        'Eliminate sugar-sweetened beverages, commercial baked snacks, and deep-fried foods',
        'Prioritize high-fiber complex carbohydrates (whole grains, lentils, legumes, green vegetables)'
      ]
    },
    emergencyWarningSigns: [
      'Blood glucose reading exceeding 350 mg/dL with nausea, abdominal pain, or shortness of breath',
      'Signs of severe hypoglycemia (blood glucose < 60 mg/dL): tremors, cold sweating, confusion, seizure, or loss of consciousness',
      'Non-healing foot ulcer with spreading redness, warmth, or foul-smelling discharge'
    ],
    dietaryRecommendations: {
      recommended: [
        'High-fiber legumes (chickpeas, lentils, black beans)',
        'Non-starchy cruciferous vegetables (spinach, cauliflower, bitter gourd/karela, cucumbers)',
        'Whole grains with intact hulls (barley, quinoa, steel-cut oats)',
        'Healthy unsaturated fats (extra virgin olive oil, almonds, walnuts, chia seeds)',
        'Lean clean protein (skinless chicken breast, eggs, grilled fish, tofu)'
      ],
      avoid: [
        'White polished basmati rice in large portions and refined white flour (maida)',
        'Deep-fried South Asian snacks (samosas, pakoras, parathas)',
        'Refined sugar, traditional sweets (gulab jamun, jalebi), carbonated sodas, and packaged fruit juices',
        'Trans fats found in commercial shortening (vanaspati ghee) and processed margarine'
      ]
    },
    lifestyleGuidance: [
      'Perform a 10-15 minute post-meal brisk walk to accelerate muscular glucose uptake without insulin',
      'Prioritize 7-8 hours of sound restorative sleep to optimize nocturnal insulin sensitivity',
      'Inspect feet daily under bright light for blistered skin, calluses, or cuts'
    ],
    karachiContext: 'South Asian populations in Karachi face up to 3x higher genetic vulnerability to early-onset beta-cell exhaustion and central visceral adiposity. Regular screening after age 25 is strongly urged.'
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    scientificName: 'Essential & Secondary Arterial Hypertension',
    category: 'Cardiovascular',
    severity: 'Critical / Chronic',
    definition: 'A persistent elevation of systemic arterial blood pressure where systolic pressure equals or exceeds 130 mmHg and/or diastolic pressure equals or exceeds 80 mmHg, compelling the heart to pump against abnormal vascular resistance.',
    causes: [
      'Excessive dietary sodium consumption (>2,300 mg daily) causing fluid volume overload',
      'Arterial stiffness and endothelial dysfunction associated with age and vascular calcification',
      'Chronic hyper-activation of the sympathetic nervous system and renin-angiotensin-aldosterone axis',
      'Obesity, sedentary lifestyle, and lack of cardiovascular conditioning',
      'Secondary causes: Obstructive sleep apnea, renal artery stenosis, and hyperaldosteronism'
    ],
    symptoms: {
      early: [
        'Often completely asymptomatic—fittingly termed "The Silent Killer"',
        'Occasional morning occipital headache (back of head throbbing)',
        'Subtle dizziness, lightheadedness, or mild unsteady gait',
        'Mild tinnitus (buzzing or ringing sound in ears)'
      ],
      acute: [
        'Hypertensive Crisis (Systolic > 180 mmHg or Diastolic > 120 mmHg)',
        'Severe acute headache with visual disturbances or scotomas',
        'Substernal chest tightness, palpitation, or acute dyspnea (shortness of breath)',
        'Spontaneous recurrent epistaxis (nosebleeds)'
      ]
    },
    treatment: {
      medical: [
        'Strict sodium-restricted Dietary Approaches to Stop Hypertension (DASH) protocol',
        'Regular home blood pressure logging using an automated, calibrated upper-arm cuff',
        'Cardiovascular risk calculation and target goal of < 120/80 mmHg'
      ],
      medications: [
        'ACE Inhibitors (Lisinopril, Ramipril) or ARBs (Losartan, Valsartan, Telmisartan)',
        'Calcium Channel Blockers (Amlodipine, Diltiazem) for peripheral vasodilation',
        'Thiazide-like Diuretics (Chlorthalidone, Hydrochlorothiazide) to manage volume load',
        'Beta-Blockers (Bisoprolol, Carvedilol) for co-existing coronary artery disease or arrhythmia'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'Essential hypertension is not permanently curable, but is completely controllable. Mild to stage-1 hypertension can frequently be normalized without lifelong pharmacology through a 10 kg weight loss, rigid sodium restriction (<1,500 mg/day), potassium optimization, and sustained aerobic activity.',
      prevention: [
        'Limit table salt and hidden preservatives in restaurant food to under 1 level teaspoon daily',
        'Increase potassium-rich vegetables and fruits (bananas, spinach, coconut water, sweet potatoes)',
        'Avoid smoking and secondhand shisha smoke',
        'Practice stress mitigation: breathwork, prayer, or mindfulness'
      ]
    },
    emergencyWarningSigns: [
      'Blood pressure reading above 180/120 mmHg accompanied by chest pain, shortness of breath, numbness/weakness, or confusion (Malignant Hypertension)',
      'Sudden loss of speech, facial drooping, or unilateral arm weakness (Stroke Alert)'
    ],
    dietaryRecommendations: {
      recommended: [
        'Potassium-rich greens (spinach, mustard leaves/sarson, kale)',
        'Nitrate-dense foods that naturally stimulate nitric oxide (beetroots, pomegranate, garlic)',
        'Unsalted raw seeds and nuts (flaxseeds, pumpkin seeds, walnuts)',
        'Low-fat probiotic yogurt and curd (dahi) providing bioavailable calcium'
      ],
      avoid: [
        'High-sodium pickles (achaar), processed chutneys, and soy sauce',
        'Cured meats, canned soups, processed commercial bouillon cubes',
        'Excessive caffeine energy drinks and salty South Asian street snacks (nimko, papri)'
      ]
    },
    lifestyleGuidance: [
      'Take blood pressure at the same time each morning after sitting quietly for 5 minutes without talking',
      'Perform isometric handgrip exercises or 30 minutes of brisk walking 5 days a week'
    ]
  },
  {
    id: 'coronary-artery-disease',
    name: 'Coronary Artery Disease & Heart Attack',
    scientificName: 'Atherosclerotic CAD & Acute Myocardial Infarction (AMI)',
    category: 'Cardiovascular',
    severity: 'Critical / Chronic',
    definition: 'Narrowing or complete thrombotic occlusion of the coronary arteries due to atherosclerotic plaque rupture, starving myocardium of oxygen and triggering acute myocardial tissue necrosis (heart attack).',
    causes: [
      'Atherosclerosis initiated by endothelial injury from elevated LDL-C, ApoB particles, and smoking',
      'Uncontrolled hypertension damaging the intima of coronary vasculature',
      'Systemic arterial inflammation signaled by elevated high-sensitivity C-reactive protein (hs-CRP)',
      'Familial hypercholesterolemia and genetic elevation of Lipoprotein(a)'
    ],
    symptoms: {
      early: [
        'Angina pectoris: Substernal chest pressure, squeezing, or heaviness upon physical exertion',
        'Pain radiating into left shoulder, arm, neck, jaw, or epigastrium that subsides with rest',
        'Disproportionate shortness of breath during routine climbing of stairs'
      ],
      acute: [
        'Crushing retrosternal chest pain lasting > 15 minutes that does NOT resolve with rest',
        'Diaphoresis (profuse cold sweating), nausea, vomiting, and impending doom',
        'Atypical presentations (especially in women and diabetics): isolated profound fatigue, jaw ache, or indigestion'
      ]
    },
    treatment: {
      medical: [
        'Emergency Percutaneous Coronary Intervention (PCI / Primary Angioplasty with drug-eluting stent)',
        'Coronary Artery Bypass Grafting (CABG) for multivessel or left main disease',
        'Thrombolytic therapy (Streptokinase, Tenecteplase) if primary catheterization is unavailable within 90 minutes'
      ],
      medications: [
        'Dual Antiplatelet Therapy (Aspirin + Clopidogrel or Ticagrelor)',
        'High-intensity Statins (Atorvastatin 80mg, Rosuvastatin 40mg) and Ezetimibe',
        'Beta-Blockers (Metoprolol, Bisoprolol) to reduce myocardial oxygen demand',
        'Sublingual Nitroglycerin spray/tablets for acute angina relief'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'CAD is a progressive vascular disease, but aggressive lipid-lowering (LDL < 55 mg/dL), blood pressure normalization, smoking cessation, and plant-forward nutrition can induce plaque stabilization and partial plaque regression.',
      prevention: [
        'Know your cardiovascular numbers: ApoB, LDL-C, Lp(a), HbA1c, and Coronary Calcium Score (CAC)',
        'Adopt the Mediterranean/DASH cardio-protective diet',
        'Never smoke or use smokeless tobacco (gutka, paan, naswar)'
      ]
    },
    emergencyWarningSigns: [
      'Crushing chest pressure radiating to the left arm or jaw with cold sweats — CALL 1122 / 911 / NICVD EMERGENCY IMMEDIATELY. Chew 300 mg of non-coated Aspirin.'
    ],
    dietaryRecommendations: {
      recommended: ['Wild salmon, mackerel, sardines (Omega-3 fatty acids)', 'Extra virgin olive oil', 'Oats, barley (beta-glucan soluble fiber)', 'Walnuts, almonds, chia seeds'],
      avoid: ['Saturated animal tallow and hydrogenated palm oil / vanaspati', 'Organ meats (liver, brain/maghaz, kidney)', 'Processed meats and deep-fried fast food']
    },
    lifestyleGuidance: ['Undergo supervised Cardiac Rehabilitation after any acute coronary event', 'Engage in heart-rate monitored low-impact aerobic activity']
  },
  {
    id: 'hypercholesterolemia',
    name: 'High Cholesterol (Hypercholesterolemia)',
    scientificName: 'Dyslipidemia & Elevated Low-Density Lipoprotein Cholesterol',
    category: 'Cardiovascular',
    severity: 'Moderate',
    definition: 'An abnormal concentration of blood lipids characterized by elevated total cholesterol, high levels of atherogenic low-density lipoprotein (LDL-C), elevated triglycerides, and reduced protective high-density lipoprotein (HDL-C).',
    causes: [
      'High intake of dietary saturated fats and trans fats altering hepatic LDL receptor clearance',
      'Familial genetic variants (LDLR, APOB, or PCSK9 gene mutations)',
      'Insulin resistance and hepatic steatosis stimulating excessive VLDL synthesis',
      'Hypothyroidism reducing hepatic clearance of circulating lipids'
    ],
    symptoms: {
      early: [
        'Completely silent and invisible until plaque builds up in vascular beds',
        'Only detectable via a comprehensive fasting lipid panel'
      ],
      acute: [
        'Xanthelasma (yellowish cholesterol deposits around inner corners of eyelids)',
        'Arcus senilis (white or gray ring around the corneal margin)',
        'Tendon xanthomas (firm nodules on Achilles tendons or knuckles in familial forms)'
      ]
    },
    treatment: {
      medical: ['Therapeutic Lifestyle Changes (TLC) diet', 'Cardiovascular risk stratification based on 10-year ASCVD score'],
      medications: [
        'Statins (Rosuvastatin, Atorvastatin) inhibiting HMG-CoA reductase',
        'Ezetimibe blocking Niemann-Pick C1-Like 1 intestinal cholesterol absorption',
        'PCSK9 inhibitors (Evolocumab, Alirocumab) for extreme genetic hypercholesterolemia',
        'Bempedoic Acid and Icosapent ethyl for elevated triglycerides'
      ]
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Diet-induced mild-to-moderate hypercholesterolemia can be normalized in 8-12 weeks through high soluble fiber intake, elimination of trans fats, daily aerobic conditioning, and caloric reduction.',
      prevention: ['Consume 10-15g of soluble fiber daily', 'Replace saturated butter and ghee with cold-pressed olive or avocado oil', 'Maintain ideal BMI']
    },
    emergencyWarningSigns: ['Sudden angina chest pain, shortness of breath, or transient ischemic attack (TIA) visual loss'],
    dietaryRecommendations: {
      recommended: ['Oat bran, psyllium husk (ispaghol)', 'Beans, lentils, chickpeas', 'Fatty fish high in EPA/DHA', 'Sterol/stanol fortified foods'],
      avoid: ['Ghee, butter, palm oil', 'Fatty cuts of mutton/beef, organ meats', 'Commercial fried samosas, pastries, puff pastries']
    },
    lifestyleGuidance: ['Retest lipid profile every 6 to 12 months after starting dietary or statin therapy']
  },
  {
    id: 'dengue-fever',
    name: 'Dengue Hemorrhagic Fever',
    scientificName: 'Dengue Virus (DENV 1-4) Arboviral Infection',
    category: 'Infectious & Vector-Borne',
    severity: 'Critical / Chronic',
    definition: 'A mosquito-borne viral disease caused by any of four related dengue viruses transmitted by female Aedes aegypti and Aedes albopictus mosquitoes, capable of evolving into life-threatening plasma leakage, severe thrombocytopenia, and shock.',
    causes: [
      'Bite of infected day-biting female Aedes aegypti mosquito',
      'Stagnant urban freshwater containers (uncovered water tanks, discarded tires, plant saucers common in Karachi monsoon)',
      'Secondary infection with a heterologous viral serotype triggering antibody-dependent enhancement (ADE)'
    ],
    symptoms: {
      early: [
        'Sudden explosive high-grade fever (104°F / 40°C)',
        'Retro-orbital pain (excruciating pain behind the eyeballs)',
        'Severe myalgia, arthralgia, and bone pain ("Breakbone Fever")',
        'Flushed face, maculopapular cutaneous rash, severe frontal headache'
      ],
      acute: [
        'Critical Phase (Day 3-7 when fever begins to subside): Severe abdominal pain and persistent vomiting',
        'Mucosal bleeding (bleeding gums, epistaxis, black tarry stools / melena)',
        'Rapid platelet drop (< 50,000 / μL) and hemoconcentration (rising hematocrit > 20%)',
        'Dengue Shock Syndrome (cold clammy extremities, weak thready pulse, precipitous hypotension)'
      ]
    },
    treatment: {
      medical: [
        'Strict isotonic fluid balance management (Normal Saline / Ringer Lactate titrated to hematocrit)',
        'Daily or twice-daily Complete Blood Count (CBC) monitoring for hematocrit and platelets',
        'Platelet or packed red blood cell transfusion indicated ONLY in cases of severe active internal bleeding'
      ],
      medications: [
        'Paracetamol (Acetaminophen) for fever and pain — NEVER exceed 3,000 mg/day in adults',
        'Oral Rehydration Salts (ORS) and coconut water to prevent hypovolemic shock',
        'ABSOLUTELY CONTRAINDICATED: Aspirin, Ibuprofen, Diclofenac, or any NSAIDs (they trigger catastrophic internal bleeding)'
      ]
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Dengue is self-limiting viral illness. Over 98% of patients recover completely within 10 to 14 days when plasma leakage and hydration are vigilantly managed during the critical defervescent phase.',
      prevention: [
        'Eliminate all standing urban water reservoirs in homes and surroundings',
        'Apply DEET or Picaridin mosquito repellents on exposed skin, especially during dawn and dusk',
        'Use fine mosquito mesh screens on windows and sleep under insecticide-treated bed nets'
      ]
    },
    emergencyWarningSigns: [
      'Persistent vomiting, intense unyielding abdominal pain, lethargy/restlessness, mucosal bleeding, and rapid breathing — REQUIRE IMMEDIATE EMERGENCY ICU ADMISSION.'
    ],
    dietaryRecommendations: {
      recommended: ['Oral Rehydration Salts (ORS)', 'Fresh green coconut water, clear broth, pomegranate juice', 'Papaya leaf extract (consult treating physician for standardized formulation)', 'Soft bland foods (khichdi, mashed potatoes)'],
      avoid: ['Dark-colored foods (red gelatin, cola) that can mimic melena in vomitus', 'Oily, spicy, hard foods that irritate gastric mucosa', 'Unpasteurized street juices']
    },
    lifestyleGuidance: ['Absolute physical bed rest during the febrile and critical phases', 'Track hourly urine output: must remain > 0.5 mL/kg/hour'],
    karachiContext: 'Karachi undergoes major annual dengue surges post-monsoon (August through November). All major tertiary hospitals (AKUH, Civil, Indus) run designated Dengue Triage Wards.'
  },
  {
    id: 'malaria',
    name: 'Malaria',
    scientificName: 'Plasmodium vivax & Plasmodium falciparum Infection',
    category: 'Infectious & Vector-Borne',
    severity: 'Severe',
    definition: 'A life-threatening parasitic infection transmitted by female Anopheles mosquitoes that invades hepatic parenchymal cells and red blood cells, causing cyclical hemolytic fevers, anemia, and potentially cerebral or renal failure.',
    causes: [
      'Inoculation of Plasmodium sporozoites during an Anopheles mosquito blood meal',
      'Parasite proliferation in hepatic schizonts and cyclical rupture of erythrocytic merozoites',
      'P. falciparum cytoadherence causing microvascular sequestration and cerebral ischemia'
    ],
    symptoms: {
      early: [
        'Classical Malarial Paroxysm: Cold stage (uncontrollable shivering rigors lasting 30-60 min)',
        'Hot stage (spiking fever up to 105°F with intense burning sensation lasting 2-6 hours)',
        'Sweating stage (drenching diaphoresis as fever defervesces, leaving profound exhaustion)'
      ],
      acute: [
        'Cerebral Malaria (altered sensorium, convulsions, delirium, coma)',
        'Severe hemolytic anemia and clinical jaundice (icterus)',
        'Blackwater Fever (dark hemoglobinuria resulting from massive intravascular hemolysis)',
        'Acute kidney injury, metabolic acidosis, and pulmonary edema'
      ]
    },
    treatment: {
      medical: ['Microscopic examination of Giemsa-stained thick and thin blood films or Rapid Diagnostic Test (RDT)'],
      medications: [
        'Artemisinin-based Combination Therapies (ACT) such as Artemether-Lumefantrine for P. falciparum',
        'Chloroquine for uncomplicated chloroquine-sensitive P. vivax',
        'Primaquine therapy to eradicate latent hypnozoites in liver (must test for G6PD deficiency first to prevent hemolysis)',
        'Intravenous Artesunate for severe, complicated malaria'
      ]
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Malaria is 100% curable when treated promptly with full-course artemisinin or anti-malarial therapies. Radical liver clearance with Primaquine is mandatory for P. vivax to prevent relapses months later.',
      prevention: ['Insecticide treated bed nets (ITNs)', 'Indoor residual spraying (IRS)', 'Chemoprophylaxis for high-risk travelers']
    },
    emergencyWarningSigns: ['Inability to tolerate oral fluids, confusion, seizures, deep laboured breathing, or golden-yellow skin/eyes'],
    dietaryRecommendations: {
      recommended: ['High-calorie, easily digestible carbohydrate liquids', 'Iron-rich cooked lentils and spinach after parasitemia clearance', 'Frequent electrolytes'],
      avoid: ['Heavy greasy gravies', 'Alcohol', 'Unboiled tap water']
    },
    lifestyleGuidance: ['Complete the entire anti-malarial medication course even if fever abates within 48 hours']
  },
  {
    id: 'typhoid-fever',
    name: 'Typhoid (Enteric Fever) & XDR Typhoid',
    scientificName: 'Salmonella enterica serovar Typhi',
    category: 'Infectious & Vector-Borne',
    severity: 'Severe',
    definition: 'A systemic invasive bacterial infection contracted through ingestion of food or water contaminated with Salmonella Typhi, characterized by continuous step-ladder fever, intestinal lymphoid hypertrophy, and bacteremia.',
    causes: [
      'Fecal-oral transmission through contaminated municipal tap water or unhygienic street vendors',
      'Ingestion of raw unwashed vegetables irrigated with untreated sewage runoff',
      'Asymptomatic chronic biliary carriers handling food without proper hand washing'
    ],
    symptoms: {
      early: [
        'Step-ladder pattern fever rising incrementally over 5-7 days',
        'Severe frontal headache, malaise, body aches, and dry cough',
        'Relative bradycardia (Faget sign: heart rate slower than expected for high body temperature)',
        'Coated tongue with red margins ("Typhoid Tongue")'
      ],
      acute: [
        'Rose spots (faint salmon-colored macules on chest and abdomen)',
        '"Pea soup" diarrhea or refractory constipation',
        'Hepatosplenomegaly and marked abdominal distention',
        'Complications in week 3: Terminal ileal ulceration, catastrophic intestinal perforation, and peritonitis'
      ]
    },
    treatment: {
      medical: [
        'Blood culture (gold standard in week 1) and bone marrow culture',
        'Widal test has limited specificity in endemic Karachi regions and should be interpreted with caution'
      ],
      medications: [
        'For Extensively Drug-Resistant (XDR) Typhoid (endemic in Karachi): Azithromycin or IV Meropenem',
        'Ceftriaxone (for non-XDR ceftriaxone-sensitive strains)',
        'Antipyretics and IV hydration'
      ],
      procedures: ['Emergency laparotomy for acute intestinal perforation']
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Typhoid is fully curable with 10-14 days of targeted culture-sensitive antibiotic therapy. Incomplete dosing risks inducing chronic gallbladder carrier states and dangerous antibiotic resistance.',
      prevention: [
        'Typhoid Conjugate Vaccine (TCV - Typbar-TCV) recommended for all children and adults in endemic zones',
        'Strictly drink boiled (for at least 3 minutes) or certified reverse-osmosis filtered water',
        'Avoid consuming raw street salads, pre-cut fruits, and roadside crushed ice'
      ]
    },
    emergencyWarningSigns: ['Sudden excruciating localized abdominal pain, rigid board-like abdomen, vomiting blood, or shock indicate bowel perforation.'],
    dietaryRecommendations: {
      recommended: ['Well-cooked soft rice, chicken broth, boiled eggs, peeled boiled potatoes', 'Sterilized fluids, clean bottled/boiled water', 'Probiotic curd'],
      avoid: ['High-insoluble roughage, raw vegetables, whole nuts during acute intestinal inflammation', 'Spicy chili dishes', 'Roadside ice and drinks']
    },
    lifestyleGuidance: ['Vigorous hand washing with soap for 20 seconds before eating and after using the restroom']
  },
  {
    id: 'hepatitis-b-and-c',
    name: 'Viral Hepatitis (B & C)',
    scientificName: 'Hepatitis B Virus (HBV) & Hepatitis C Virus (HCV)',
    category: 'Hepatic & Renal',
    severity: 'Critical / Chronic',
    definition: 'Blood-borne viral infections that attack hepatocyte architecture, causing chronic necroinflammatory liver disease that inexorably progresses to hepatic fibrosis, cirrhosis, and hepatocellular carcinoma (liver cancer).',
    causes: [
      'Reuse of contaminated medical syringes, intravenous cannulas, and therapeutic injections',
      'Unsterilized dental instruments, surgical tools, and barber razors/blades',
      'Unscreened blood and plasma transfusions',
      'Perinatal transmission from mother to infant during childbirth (primarily HBV)'
    ],
    symptoms: {
      early: [
        'Often 100% asymptomatic for decades ("Silent Epidemic")',
        'Vague constitutional fatigue and low-grade right upper quadrant abdominal discomfort',
        'Loss of appetite, mild nausea, joint pains'
      ],
      acute: [
        'Jaundice (scleral icterus and yellowing of the skin)',
        'Dark tea-colored urine and pale clay-colored stools',
        'Decompensated Cirrhosis: Ascites (abdominal fluid swelling), spider angiomas, palmar erythema',
        'Hepatic Encephalopathy (confusion, flapping hand tremor/asterixis, reversed day-night sleep)'
      ]
    },
    treatment: {
      medical: ['Quantitative HCV-RNA PCR or HBV-DNA viral load testing', 'Liver transient elastography (FibroScan) to quantify fibrosis stage'],
      medications: [
        'Hepatitis C: Direct-Acting Antivirals (DAAs) such as Sofosbuvir + Daclatasvir or Velpatasvir taken for 12 weeks',
        'Hepatitis B: Lifelong oral nucleoside reverse transcriptase inhibitors (Entecavir or Tenofovir) to suppress viral replication'
      ]
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Hepatitis C is now over 95-98% completely CURABLE with a 12-week oral DAA regimen (Sustained Virologic Response / SVR12). Hepatitis B is not curable but is completely suppressible and preventable with vaccination.',
      prevention: [
        'Receive the 3-dose Hepatitis B vaccine series',
        'Insist on new, single-use sealed syringes opened in your direct view',
        'Ensure barbers always use a fresh disposable razor blade for shaving',
        'Never receive blood without verifiable nucleic acid testing (NAT) screening'
      ]
    },
    emergencyWarningSigns: ['Vomiting blood (hematemesis from ruptured esophageal varices) or extreme acute disorientation'],
    dietaryRecommendations: {
      recommended: ['Clean plant proteins, tofu, legumes', 'Cruciferous vegetables supporting hepatic phase-II detox', 'Black coffee (shown in clinical trials to reduce liver fibrosis)'],
      avoid: ['Zero alcohol consumption', 'Moldy grains containing aflatoxins', 'Excessive iron supplements without clinical guidance']
    },
    lifestyleGuidance: ['Annual ultrasound and alpha-fetoprotein (AFP) screening for all cirrhotic patients to detect early nodules']
  },
  {
    id: 'asthma-and-copd',
    name: 'Bronchial Asthma & COPD',
    scientificName: 'Reversible Airway Hyperresponsiveness & Chronic Obstructive Pulmonary Disease',
    category: 'Respiratory',
    severity: 'Moderate',
    definition: 'Chronic inflammatory pulmonary disorders characterized by bronchial hyperresponsiveness, smooth muscle bronchospasm, mucus hypersecretion, and expiratory airflow obstruction.',
    causes: [
      'Inhalation of urban airborne particulates (PM2.5), vehicular traffic exhaust, and industrial emissions',
      'Allergenic triggers: dust mites, cockroach feces, molds, and animal dander',
      'Active tobacco smoking, secondhand smoke, and indoor biomass fuel combustion',
      'Respiratory viral infections (Rhinovirus, RSV) triggering acute exacerbations'
    ],
    symptoms: {
      early: [
        'Episodic nocturnal or early-morning dry coughing',
        'Expiratory musical wheezing during exertion or laughing',
        'Chest tightness and inability to take a complete, satisfying breath'
      ],
      acute: [
        'Status Asthmaticus / Severe Acute Exacerbation: Inability to speak in full sentences without gasping',
        'Intercostal and supraclavicular retractions (use of accessory muscles of respiration)',
        'Cyanosis (bluish tint around lips, tongue, or fingertips)',
        'Silent Chest: Paradoxical absence of wheezing indicating near-total airway occlusion and respiratory failure'
      ]
    },
    treatment: {
      medical: ['Spirometry with bronchodilator reversibility testing', 'Personalized Asthma/COPD Action Plan with Peak Flow monitoring'],
      medications: [
        'Inhaled Corticosteroids (ICS: Budesonide, Fluticasone) as essential anti-inflammatory controller therapy',
        'Long-Acting Beta-2 Agonists (LABA: Formoterol, Salmeterol) and LAMA (Tiotropium)',
        'Short-Acting Beta-2 Agonist (SABA: Salbutamol / Albuterol) inhaler with spacer as immediate rescue bronchodilator',
        'Short-course oral corticosteroids (Prednisolone) for acute exacerbations'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'Asthma and COPD are chronic conditions that cannot be cured, but with appropriate low-dose inhaled corticosteroid therapy, the vast majority of asthmatics lead completely symptom-free lives with normal lung function and zero hospitalizations.',
      prevention: [
        'Use an air-purifier with true HEPA filtration in bedrooms',
        'Wear an N95 respirator mask when commuting in congested Karachi city traffic',
        'Receive annual influenza and pneumococcal conjugate vaccines'
      ]
    },
    emergencyWarningSigns: ['Severe breathlessness, inability to speak, peak flow reading < 50% of personal best, blue lips — seek emergency ER immediately.'],
    dietaryRecommendations: {
      recommended: ['Antioxidant-rich berries and citrus fruits (Vitamin C)', 'Magnesium-rich foods (pumpkin seeds, spinach) helping bronchial relaxation', 'Omega-3 fatty acids'],
      avoid: ['Sulfites found in preserved dried fruits and wine', 'Known personal IgE food allergens']
    },
    lifestyleGuidance: ['Always use a valved spacer device with metered-dose inhalers (MDIs) to maximize pulmonary drug deposition']
  },
  {
    id: 'chronic-kidney-disease',
    name: 'Chronic Kidney Disease (CKD)',
    scientificName: 'Chronic Renal Insufficiency & End-Stage Renal Disease (ESRD)',
    category: 'Hepatic & Renal',
    severity: 'Critical / Chronic',
    definition: 'Gradual, progressive structural or functional loss of renal nephrons over months to years, leading to decreased Estimated Glomerular Filtration Rate (eGFR < 60 mL/min/1.73m²) and accumulation of toxic uremic waste products.',
    causes: [
      'Diabetic nephropathy: microvascular glomerulosclerosis from chronic hyperglycemia',
      'Hypertensive nephrosclerosis: arteriolar hyalinosis from high systemic pressure',
      'Chronic indiscriminate use of over-the-counter NSAID analgesics (Brufen, Diclofenac)',
      'Chronic glomerulonephritis and untreated recurrent urinary tract infections'
    ],
    symptoms: {
      early: [
        'Asymptomatic in Stage 1-3',
        'Microalbuminuria / Frothy or foamy urine',
        'Nocturia (waking up multiple times to pass urine)',
        'Periorbital edema (puffy eyes in the morning)'
      ],
      acute: [
        'Peripheral bilateral pitting pedal edema (swollen ankles and feet)',
        'Severe normocytic anemia causing fatigue and pallor due to erythropoietin deficiency',
        'Uremic pruritus (intractable generalized skin itching)',
        'Uremic frost, metallic taste in mouth, ammonia breath odor, and nausea'
      ]
    },
    treatment: {
      medical: [
        'Blood pressure target < 120/80 mmHg',
        'Renal replacement therapy: Hemodialysis (3 sessions weekly) or Peritoneal Dialysis',
        'Renal Transplantation (definitive treatment for Stage 5 ESRD)'
      ],
      medications: [
        'SGLT-2 inhibitors (Dapagliflozin) proven to slow renal function decline',
        'ACE-inhibitors or ARBs to reduce intraglomerular pressure and proteinuria',
        'Phosphate binders (Sevelamer, Calcium acetate) to manage bone-mineral disorder',
        'Erythropoiesis-stimulating agents (EPO injections) and IV Iron'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'Lost nephrons cannot regenerate. However, early-stage CKD can be arrested and delayed for decades with strict glucose control, blood pressure regulation, and nephroprotective drugs. Kidney transplantation cures uremia.',
      prevention: [
        'Screen urine albumin-to-creatinine ratio (uACR) and serum creatinine annually if diabetic or hypertensive',
        'Never abuse over-the-counter painkilling NSAIDs for routine headaches or backaches',
        'Maintain optimal daily water hydration'
      ]
    },
    emergencyWarningSigns: ['Severe shortness of breath when lying flat (pulmonary edema) or dangerously high potassium (>6.0 mEq/L causing arrhythmias)'],
    dietaryRecommendations: {
      recommended: ['Prescribed low-protein diet (0.6 - 0.8g/kg/day under nephrology guidance)', 'Controlled water and fluid allowance based on 24-hr urine output', 'Low potassium and low phosphorus customized meals'],
      avoid: ['Star fruit (contains dangerous neurotoxin that accumulates in renal failure)', 'High-potassium bananas, oranges, dates, and tomatoes in advanced stages', 'Commercial salt substitutes containing potassium chloride']
    },
    lifestyleGuidance: ['Avoid all iodinated radiographic contrast dye scans unless essential and pre-hydrated']
  },
  {
    id: 'stroke',
    name: 'Stroke (Cerebrovascular Accident)',
    scientificName: 'Ischemic Infarction & Intracranial Hemorrhage',
    category: 'Neurological',
    severity: 'Critical / Chronic',
    definition: 'Acute focal neurological injury caused by an abrupt interruption of cerebral arterial blood supply (ischemic stroke, 87%) or rupture of a cerebral blood vessel (hemorrhagic stroke, 13%), leading to rapid neuronal necrosis.',
    causes: [
      'Cardioembolism due to Atrial Fibrillation or patent foramen ovale',
      'Carotid artery atherothrombosis and small-vessel lacunar infarcts from chronic hypertension',
      'Ruptured cerebral berry aneurysm or arteriovenous malformation (AVM)',
      'Uncontrolled hyperlipidemia, diabetes, and cigarette smoking'
    ],
    symptoms: {
      early: [
        'BE-FAST Protocol: Balance loss, Eyesight blurriness or loss',
        'Face drooping (unilateral smile asymmetry)',
        'Arm weakness (pronator drift, inability to raise one arm)',
        'Speech difficulty (slurred speech or aphasia / garbled words)',
        'Time: Time to call emergency services instantly'
      ],
      acute: [
        'Sudden explosive "thunderclap" headache ("the worst headache of my life" indicating subarachnoid hemorrhage)',
        'Complete hemiplegia (paralysis of one side of the body)',
        'Loss of consciousness or acute stupor'
      ]
    },
    treatment: {
      medical: [
        'Emergency non-contrast Head CT or brain MRI within 20 minutes of arrival',
        'Intravenous tissue Plasminogen Activator (Alteplase / Tenecteplase thrombolysis) within 4.5 hours of symptom onset',
        'Mechanical Thrombectomy for large-vessel occlusions up to 24 hours in selected patients'
      ],
      medications: [
        'Antiplatelet therapy (Aspirin + Clopidogrel)',
        'Anticoagulants (Apixaban, Rivaroxaban) for cardioembolic stroke from atrial fibrillation',
        'Intense Statin therapy to stabilize carotid plaques'
      ]
    },
    cure: {
      isCurable: false,
      curabilityDetails: 'Dead brain tissue does not regrow, but neuroplasticity combined with aggressive early physiotherapy, occupational therapy, and speech rehabilitation allows remarkable recovery of motor and cognitive functions.',
      prevention: [
        'Strict control of hypertension is the single most powerful preventative measure against stroke',
        'Screen and treat cardiac arrhythmias like atrial fibrillation',
        'Stop smoking immediately'
      ]
    },
    emergencyWarningSigns: ['Any sign of BE-FAST: Face droop, arm weakness, or speech impairment. Every minute delayed destroys 1.9 million brain neurons.'],
    dietaryRecommendations: {
      recommended: ['Mediterranean diet rich in leafy greens, olive oil, and berries', 'Low sodium foods', 'Antioxidant-dense plant foods'],
      avoid: ['High-sodium processed snacks', 'Trans fats', 'Excessive animal fat']
    },
    lifestyleGuidance: ['Initiate passive and active physiotherapy within 24 to 48 hours of stroke stabilization']
  },
  {
    id: 'acute-gastroenteritis',
    name: 'Acute Gastroenteritis & Food Poisoning',
    scientificName: 'Infectious Enterocolitis & Dysentery',
    category: 'Gastrointestinal',
    severity: 'Moderate',
    definition: 'Acute inflammation of the mucous membranes of the stomach and intestines caused by viral (Rotavirus, Norovirus), bacterial (E. coli, Shigella, Campylobacter), or parasitic pathogens, resulting in watery diarrhea and dehydration.',
    causes: [
      'Ingestion of food or water contaminated with pathogenic enteric microbes',
      'Improper food refrigeration or consuming reheated buffet food containing pre-formed toxins (Staphylococcus aureus, Bacillus cereus)',
      'Contaminated street food water and unwashed hands'
    ],
    symptoms: {
      early: [
        'Watery loose diarrhea (> 3 times per day)',
        'Colicky cramping abdominal pain and hyperactive bowel sounds',
        'Nausea, recurrent vomiting, and low-grade fever'
      ],
      acute: [
        'Dysentery: Blood, mucus, and tenesmus (painful straining with little stool)',
        'Severe hypovolemic dehydration: sunken eyes, dry tongue, loss of skin turgor (tenting), oliguria (no urination)',
        'Postural orthostatic hypotension and tachycardia'
      ]
    },
    treatment: {
      medical: ['Stool examination and culture if dysenteric or persisting > 7 days', 'Clinical dehydration assessment'],
      medications: [
        'Oral Rehydration Therapy (WHO-ORS) taken in frequent small sips',
        'Zinc supplementation (proven to shorten duration and severity in pediatric & adult populations)',
        'Empirical antibiotics (Ciprofloxacin or Azithromycin) indicated ONLY for severe bacterial dysentery or cholera',
        'Avoid Loperamide in bloody diarrhea or high fever as it can provoke toxic megacolon'
      ]
    },
    cure: {
      isCurable: true,
      curabilityDetails: 'Virtually 100% curable. Most acute episodes resolve spontaneously within 48 to 72 hours provided fluid and electrolyte balance are maintained.',
      prevention: [
        'Practice "Boil it, cook it, peel it, or forget it" rule when dining out',
        'Thoroughly sanitize chopping boards and raw meat prep areas',
        'Keep drinking water vessels covered and clean'
      ]
    },
    emergencyWarningSigns: ['Inability to keep any liquids down for > 12 hours, high fever > 102°F, or frank blood in stools.'],
    dietaryRecommendations: {
      recommended: ['BRAT Diet: Bananas, Rice (soft khichdi), Applesauce, Toast', 'ORS solution and clear broths', 'Plain probiotic yogurt (dahi) with a pinch of cumin'],
      avoid: ['Milk, dairy, and fatty creamy foods during mucosal injury', 'Caffeine, carbonated sodas, and fruit juices with high fructose', 'Spicy chillies and fried street appetizers']
    },
    lifestyleGuidance: ['Sip ORS after every loose stool: 200-400 mL per episode for adults']
  }
];
