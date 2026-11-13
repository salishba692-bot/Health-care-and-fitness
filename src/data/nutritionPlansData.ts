import type { NutritionPlan } from '../types';

export const NUTRITION_PLANS: NutritionPlan[] = [
  {
    id: 'diabetes-glycemic-mastery',
    title: 'Type 2 Diabetes Glycemic Stabilization Plan',
    targetCondition: 'Diabetes',
    tagline: 'Clinically calibrated low-glycemic, fiber-dense nutrition designed to flatten glucose spikes and lower HbA1c.',
    dailyCalorieTarget: '1,500 - 1,750 kcal',
    overview: 'This medical nutrition protocol emphasizes low-glycemic load carbohydrates, sustained fiber matrixing, and protein-paired meals. By preventing postprandial glycemic excursions, it preserves pancreatic beta-cell reserve and promotes visceral fat loss.',
    macronutrientRatio: {
      carbs: 40,
      protein: 30,
      fat: 30
    },
    keyClinicalRules: [
      'Never consume carbohydrates in isolation — always pair with dietary fiber and lean protein or healthy fats.',
      'Swap all refined white flours (maida) for multi-grain or barley/chana flour (besan) rotis.',
      'Eat salads or non-starchy vegetables FIRST in every meal to slow enzymatic gastric emptying.',
      'Limit net carbohydrates per main meal to under 45 grams.',
      'Take a gentle 15-minute post-meal walk to activate GLUT-4 glucose transporters without demanding insulin.'
    ],
    foodsToEmbrace: [
      'Bitter gourd (Karela), fenugreek (Methi) seeds, and fresh spinach',
      'Lentils (Moong, Masoor, Chana Dal) and chickpeas',
      'Whole barley (Jau), steel-cut oats, and quinoa',
      'Skinless chicken breast, omega-3 rich fish, eggs, and paneer',
      'Almonds, walnuts, flaxseeds, and chia seeds',
      'Avocado and cold-pressed extra virgin olive oil'
    ],
    foodsToAvoid: [
      'White basmati rice in excess, naan, and parathas fried in dalda/ghee',
      'Refined sugars, gur (jaggery), honey, and conventional desserts',
      'Sweetened milk chai, packaged fruit juices, and carbonated sodas',
      'Deep-fried samosas, pakoras, and commercial bakery biscuits',
      'High-glycemic dried fruits (dates in excess, raisins) without portion control'
    ],
    weeklySchedule: [
      {
        day: 'Monday',
        breakfast: {
          name: 'Steel-Cut Oats with Chia Seeds & Cinnamon',
          portion: '1 bowl (40g dry oats) with unsweetened almond/skim milk + 6 crushed almonds',
          calories: 320,
          protein: 14,
          carbs: 38,
          fats: 12,
          clinicalBenefits: 'Cinnamon enhances insulin sensitivity; soluble beta-glucan blunts glucose absorption.'
        },
        snackMorning: {
          name: 'Roasted Chana (Chickpeas) & Green Tea',
          portion: '1 small palmful (30g) + 1 cup unsweetened green tea',
          calories: 110,
          protein: 6,
          carbs: 16,
          fats: 2,
          clinicalBenefits: 'Slow-release complex carbs prevent mid-morning hypoglycemia.'
        },
        lunch: {
          name: 'Barley-Chana Roti with Palak Paneer & Cucumber Salad',
          portion: '1 medium multi-grain roti + 1 cup spinach paneer cooked in olive oil + 1 bowl cucumber',
          calories: 450,
          protein: 24,
          carbs: 42,
          fats: 18,
          clinicalBenefits: 'High magnesium in spinach improves glucose homeostasis.'
        },
        snackEvening: {
          name: 'Handful of Walnuts & Flaxseed Crackers',
          portion: '5 walnut halves + 1 tbsp roasted flaxseeds',
          calories: 140,
          protein: 4,
          carbs: 5,
          fats: 12,
          clinicalBenefits: 'Alpha-linolenic acid (ALA) combats systemic diabetic vascular inflammation.'
        },
        dinner: {
          name: 'Grilled Herb Chicken Breast with Steamed Cauliflower & Moong Dal Soup',
          portion: '150g grilled chicken + 1 cup steamed florets + 1/2 cup yellow lentil soup',
          calories: 460,
          protein: 42,
          carbs: 26,
          fats: 14,
          clinicalBenefits: 'High protein supports nocturnal muscle protein synthesis without sugar swings.'
        }
      },
      {
        day: 'Tuesday',
        breakfast: {
          name: '2-Egg Vegetable Omelet with Avocado & Tomato Slices',
          portion: '2 whole eggs + sauteed bell peppers, onions, tomatoes + 1/4 sliced avocado',
          calories: 310,
          protein: 16,
          carbs: 8,
          fats: 22,
          clinicalBenefits: 'Virtually zero glycemic response; stabilizes dawn phenomenon.'
        },
        snackMorning: {
          name: 'Greek Yogurt with Ground Flaxseed',
          portion: '100g plain low-fat Greek yogurt + 1 tsp ground flax',
          calories: 120,
          protein: 11,
          carbs: 7,
          fats: 4,
          clinicalBenefits: 'Probiotics improve gut microbiome diversity and metabolic markers.'
        },
        lunch: {
          name: 'Grilled Fish Tikka with Mint Raita & Brown Rice Pilaf',
          portion: '140g grilled fish fillet + 1/2 cup cooked brown basmati + cucumber mint raita',
          calories: 440,
          protein: 34,
          carbs: 36,
          fats: 12,
          clinicalBenefits: 'Marine Omega-3 fatty acids lower atherogenic triglyceride levels.'
        },
        snackEvening: {
          name: 'Sliced Cucumbers & Carrots with Hummus',
          portion: '1 cup raw veggie crudites + 2 tbsp authentic tahini hummus',
          calories: 130,
          protein: 5,
          carbs: 14,
          fats: 6,
          clinicalBenefits: 'Plant sterols and low GI fiber support endothelial health.'
        },
        dinner: {
          name: 'Tofu & Broccoli Stir-Fry with Quinoa',
          portion: '150g firm tofu + 1 cup broccoli & mushrooms in sesame olive drizzle + 1/2 cup cooked quinoa',
          calories: 430,
          protein: 26,
          carbs: 38,
          fats: 16,
          clinicalBenefits: 'Isoflavones and sulforaphane reduce cellular oxidative stress.'
        }
      },
      {
        day: 'Wednesday',
        breakfast: {
          name: 'Besan Chila (Chickpea Flour Crepe) with Mint Chutney',
          portion: '2 small chilas cooked with grated zucchini and coriander + 2 tbsp yogurt mint dip',
          calories: 330,
          protein: 15,
          carbs: 34,
          fats: 11,
          clinicalBenefits: 'High resistant starch in chickpea flour fosters slow digestion.'
        },
        snackMorning: {
          name: 'Green Apple Slices with 1 tsp Peanut Butter',
          portion: '1 small green tart apple + 1 tsp unsweetened peanut butter',
          calories: 135,
          protein: 4,
          carbs: 18,
          fats: 6,
          clinicalBenefits: 'Pectin fiber curbs appetite and moderates carbohydrate breakdown.'
        },
        lunch: {
          name: 'Chicken and Vegetable Stew with Barley Bread',
          portion: '1 generous bowl chicken bone broth with carrots, celery, zucchini + 1 barley flatbread',
          calories: 460,
          protein: 36,
          carbs: 35,
          fats: 14,
          clinicalBenefits: 'Electrolytes and collagen support joint and arterial elasticity.'
        },
        snackEvening: {
          name: 'Handful of Roasted Pumpkin Seeds',
          portion: '25g unsalted raw pumpkin seeds',
          calories: 140,
          protein: 7,
          carbs: 4,
          fats: 12,
          clinicalBenefits: 'High zinc and magnesium content assist cellular insulin receptivity.'
        },
        dinner: {
          name: 'Spiced Black Bean Bowl with Salsa & Cottage Cheese',
          portion: '1 cup seasoned black beans + fresh tomato salsa + 50g low-fat paneer cubes',
          calories: 420,
          protein: 22,
          carbs: 42,
          fats: 12,
          clinicalBenefits: 'Extremely high fermentable fiber feeds butyrate-producing intestinal flora.'
        }
      }
    ]
  },
  {
    id: 'hypertension-dash-protocol',
    title: 'Hypertension DASH Cardiovascular Protocol',
    targetCondition: 'Hypertension (High BP)',
    tagline: 'Sodium-restricted (<1,500mg), potassium-dense culinary blueprint for natural blood pressure lowering.',
    dailyCalorieTarget: '1,600 - 1,850 kcal',
    overview: 'The DASH (Dietary Approaches to Stop Hypertension) protocol is backed by dozens of randomized clinical trials demonstrating an average 8-14 mmHg drop in systolic blood pressure. It maximizes vascular-relaxing potassium, calcium, and dietary nitrates.',
    macronutrientRatio: {
      carbs: 45,
      protein: 25,
      fat: 30
    },
    keyClinicalRules: [
      'Cap total elemental sodium at 1,500 mg per day (approximately 2/3 teaspoon of total salt across all dishes).',
      'Never add salt at the dining table; replace saltiness with lemon juice, sumac, garlic, and herbs.',
      'Achieve 4,000+ mg of daily potassium through fresh whole foods.',
      'Avoid effervescent analgesic tablets and baking sodas that contain hidden sodium bicarbonate.',
      'Limit caffeine intake to 1 cup daily, avoiding spikes in peripheral vascular resistance.'
    ],
    foodsToEmbrace: [
      'Beetroots and pomegranate (natural nitric oxide vasodilators)',
      'Spinach, Swiss chard, fenugreek, and celery',
      'Fresh bananas, papayas, and oranges',
      'Unsweetened dahi / probiotic yogurt (calcium and bioactive peptides)',
      'Flaxseed oil, extra virgin olive oil, and raw walnuts',
      'Skinless poultry, wild fish, and lentils'
    ],
    foodsToAvoid: [
      'Pickles (Achaar), processed chutneys, and papadams',
      'Cured cold cuts, sausages, and processed kebab mixtures containing curing salts',
      'Commercial canned soups and instant ramen noodles',
      'Salty namkeen, nimko, salted chips, and commercial salted nuts',
      'Bouillon broth cubes and monosodium glutamate (MSG)'
    ],
    weeklySchedule: [
      {
        day: 'Monday',
        breakfast: {
          name: 'Potassium-Boost Oatmeal with Sliced Banana & Flaxseed',
          portion: '1 bowl rolled oats (45g) cooked in skim milk + 1/2 banana + 1 tbsp ground flaxseeds',
          calories: 340,
          protein: 13,
          carbs: 56,
          fats: 8,
          clinicalBenefits: 'High potassium counteracts renal sodium reabsorption to relax vascular walls.'
        },
        snackMorning: {
          name: 'Fresh Celery Sticks with Yogurt Herb Dip',
          portion: '4 celery stalks + 3 tbsp homemade low-sodium yogurt dip with fresh dill and garlic',
          calories: 85,
          protein: 5,
          carbs: 8,
          fats: 2,
          clinicalBenefits: 'Phthalides in celery relax arterial wall tissues to allow blood flow.'
        },
        lunch: {
          name: 'Baked Lemon Salmon with Steamed Asparagus & Garlic Brown Rice',
          portion: '130g salmon + 1 cup tender asparagus + 1/2 cup fragrant brown rice (salt-free garlic seasoning)',
          calories: 470,
          protein: 32,
          carbs: 38,
          fats: 16,
          clinicalBenefits: 'Omega-3 fatty acids lower vascular endothelial stiffness and pulse wave velocity.'
        },
        snackEvening: {
          name: 'Fresh Pomegranate Cup & Raw Almonds',
          portion: '1/2 cup fresh pomegranate arils + 8 raw unsalted almonds',
          calories: 140,
          protein: 4,
          carbs: 18,
          fats: 8,
          clinicalBenefits: 'Punicalagins protect endothelial nitric oxide from oxidative destruction.'
        },
        dinner: {
          name: 'Beetroot & Lentil Warm Salad with Grilled Chicken',
          portion: '1 cup roasted beets + 1/2 cup cooked brown lentils + 120g grilled chicken strips with lemon vinaigrette',
          calories: 450,
          protein: 38,
          carbs: 44,
          fats: 11,
          clinicalBenefits: 'Dietary inorganic nitrate converts to nitric oxide, causing rapid vasodilation.'
        }
      },
      {
        day: 'Tuesday',
        breakfast: {
          name: 'Spinach & Tomato Egg White Scramble with Whole Wheat Toast',
          portion: '3 egg whites + 1 whole egg + 1 cup fresh spinach sauteed in olive oil + 1 slice whole wheat bread (low sodium)',
          calories: 290,
          protein: 22,
          carbs: 22,
          fats: 10,
          clinicalBenefits: 'Rich in lutein and folate, supporting healthy homocysteine metabolism.'
        },
        snackMorning: {
          name: 'Fresh Papaya Bowl',
          portion: '1 cup diced ripe papaya with a squeeze of fresh lime',
          calories: 90,
          protein: 2,
          carbs: 22,
          fats: 0,
          clinicalBenefits: 'Potassium and papain support gentle digestion and electrolyte balance.'
        },
        lunch: {
          name: 'Chicken Daal Gosht (Low Sodium) with Jau (Barley) Flatbread',
          portion: '1 medium bowl lean chicken cooked with yellow split peas, tomato and ginger + 1 barley roti',
          calories: 480,
          protein: 36,
          carbs: 48,
          fats: 12,
          clinicalBenefits: 'High fiber with zero added saturated fat cushions systemic blood pressure.'
        },
        snackEvening: {
          name: 'Raw Pumpkin Seeds & Chamomile Tea',
          portion: '20g raw pumpkin seeds + 1 cup soothing chamomile tea',
          calories: 110,
          protein: 5,
          carbs: 3,
          fats: 9,
          clinicalBenefits: 'Magnesium acts as an intracellular calcium channel blocker to relax vessels.'
        },
        dinner: {
          name: 'Pan-Seared White Fish with Roasted Sweet Potato & Steamed Green Beans',
          portion: '140g white fish (Red Snapper) + 1 small baked sweet potato + 1 cup steamed green beans',
          calories: 430,
          protein: 30,
          carbs: 45,
          fats: 9,
          clinicalBenefits: 'Nutrient-rich complex carbohydrates promote restful sleep and lower nocturnal BP.'
        }
      }
    ]
  },
  {
    id: 'cholesterol-lipid-protocol',
    title: 'Lipid Shield & Anti-Atherosclerosis Diet',
    targetCondition: 'Cholesterol (Hyperlipidemia)',
    tagline: 'Targets LDL-C and triglycerides with viscous soluble fibers, plant sterols, and clean monounsaturated fats.',
    dailyCalorieTarget: '1,550 - 1,800 kcal',
    overview: 'Engineered based on the National Cholesterol Education Program (NCEP) Therapeutic Lifestyle Changes protocol. Incorporates 10-25g of daily viscous soluble fiber to bind bile acids in the intestinal lumen, forcing the liver to clear circulating LDL from the bloodstream.',
    macronutrientRatio: {
      carbs: 45,
      protein: 25,
      fat: 30
    },
    keyClinicalRules: [
      'Eliminate 100% of hydrogenated vegetable fats (banaspati ghee) and commercial shortening.',
      'Target at least 15 grams of viscous soluble fiber per day (from oat bran, psyllium, and legumes).',
      'Replace all saturated dairy fats (butter, malai, cream) with extra virgin olive oil or avocado.',
      'Consume cold-water fatty fish (sardines, mackerel, salmon) twice a week.',
      'Maintain dietary cholesterol intake below 200 mg/day for hyper-responders.'
    ],
    foodsToEmbrace: [
      'Psyllium husk (Ispaghol) and steel-cut oat bran',
      'Kidney beans (Rajma), chickpeas (Chana), and split peas',
      'Garlic and onions (containing allicin which inhibits hepatic cholesterol synthesis)',
      'Walnuts and almonds (rich in phytosterols)',
      'Extra virgin olive oil (rich in oleic acid and polyphenols)'
    ],
    foodsToAvoid: [
      'Desi ghee, dalda, butter, and heavy cream (malai)',
      'Organ meats: Brain (maghaz), Liver (kaleji), Kidneys (gurda)',
      'Fatty mutton chops, beef nihari cooked in tallow, and beef paya',
      'Bakery pastries, cream cakes, and deep-fried patties',
      'Coconut oil and palm oil used in commercial frying'
    ],
    weeklySchedule: [
      {
        day: 'Monday',
        breakfast: {
          name: 'Oat Bran Porridge with Walnuts & Ground Ispaghol',
          portion: '1 bowl oat bran (40g) + 1 tsp psyllium husk + 4 walnut halves + unsweetened soy/almond milk',
          calories: 310,
          protein: 12,
          carbs: 42,
          fats: 11,
          clinicalBenefits: 'Viscous fiber traps bile salts in digestive tract, draining LDL from serum.'
        },
        snackMorning: {
          name: 'Green Tea with Fresh Pear Slices',
          portion: '1 cup Japanese green tea + 1 medium crisp pear with skin intact',
          calories: 100,
          protein: 1,
          carbs: 26,
          fats: 0,
          clinicalBenefits: 'Catechins inhibit micellar cholesterol solubility in the duodenum.'
        },
        lunch: {
          name: 'Warm Rajma (Red Kidney Beans) Curry with Quinoa & Tossed Salad',
          portion: '1 cup tender red kidney beans cooked in tomato garlic gravy + 1/2 cup quinoa + arugula salad',
          calories: 460,
          protein: 22,
          carbs: 64,
          fats: 8,
          clinicalBenefits: 'Fermentation of resistant starch produces short-chain fatty acids that suppress HMG-CoA.'
        },
        snackEvening: {
          name: 'Raw Almonds & Dark Chocolate (85%+)',
          portion: '10 raw unsalted almonds + 1 small square 85% cocoa dark chocolate',
          calories: 135,
          protein: 4,
          carbs: 7,
          fats: 11,
          clinicalBenefits: 'Plant phytosterols displace dietary cholesterol at brush-border transport sites.'
        },
        dinner: {
          name: 'Pan-Grilled Mackerel with Steamed Vegetables & Garlic Olive Drizzle',
          portion: '130g mackerel fillet + 1.5 cups steamed broccoli and carrots tossed in 1 tsp olive oil',
          calories: 440,
          protein: 32,
          carbs: 18,
          fats: 22,
          clinicalBenefits: 'Potent EPA/DHA fatty acids lower hepatic synthesis of VLDL triglycerides.'
        }
      }
    ]
  },
  {
    id: 'metabolic-weight-fitness',
    title: 'Metabolic Reset & Active Fitness Diet',
    targetCondition: 'Weight & Metabolic Balance',
    tagline: 'High-protein, satiety-engineered whole foods designed to maximize fat oxidation while preserving lean muscle.',
    dailyCalorieTarget: '1,700 - 1,950 kcal',
    overview: 'Tailored for individuals seeking body recomposition, visceral fat reduction, and enhanced athletic endurance. Emphasizes clean protein distribution (1.6-2.0g per kg of bodyweight) and whole food thermogenesis.',
    macronutrientRatio: {
      carbs: 35,
      protein: 35,
      fat: 30
    },
    keyClinicalRules: [
      'Distribute 25-40 grams of high-biological-value protein across every main meal.',
      'Drink 35-40 mL of clean water per kg of bodyweight daily.',
      'Restrict caloric intake to an intentional 300-500 kcal deficit under Maintenance Caloric Expenditure.',
      'Time the largest carbohydrate intake around physical workout windows.',
      'Prioritize sleep hygiene to prevent nocturnal ghrelin elevation and daytime cravings.'
    ],
    foodsToEmbrace: [
      'Skinless chicken, egg whites, whey protein isolate, lean fish',
      'Quinoa, sweet potatoes, brown basmati, sprouted grains',
      'Kale, bell peppers, asparagus, cucumbers, tomatoes',
      'Chia seeds, hemp hearts, peanut butter, extra virgin olive oil'
    ],
    foodsToAvoid: [
      'Sugary post-workout energy drinks and candy bars',
      'Fried fast foods, burgers with refined buns, and heavy mayo dressings',
      'Alcohol and late-night snacking'
    ],
    weeklySchedule: [
      {
        day: 'Monday',
        breakfast: {
          name: 'Muscle Recovery Scramble with Avocado & Sprouted Toast',
          portion: '3 egg whites + 1 whole egg + 1 slice sprouted grain toast + 1/4 avocado',
          calories: 340,
          protein: 26,
          carbs: 22,
          fats: 14,
          clinicalBenefits: 'Complete amino acid profile supports muscle tissue repair without sluggishness.'
        },
        snackMorning: {
          name: 'Protein Shake with Blueberries',
          portion: '1 scoop whey isolate + 1/2 cup blueberries blended in water',
          calories: 160,
          protein: 25,
          carbs: 12,
          fats: 1,
          clinicalBenefits: 'Rapid leucine spike triggers muscle protein synthesis pathways.'
        },
        lunch: {
          name: 'Chicken Shawarma Bowl with Brown Rice & Tahini Drizzle',
          portion: '150g grilled spiced chicken breast + 1/2 cup brown rice + shredded lettuce, pickles, 1 tbsp tahini',
          calories: 490,
          protein: 42,
          carbs: 40,
          fats: 14,
          clinicalBenefits: 'High satiety index keeps ghrelin hunger hormone suppressed for 4-5 hours.'
        },
        snackEvening: {
          name: 'Low-Fat Cottage Cheese with Cucumber Slices',
          portion: '120g cottage cheese (paneer) + 1 cup sliced English cucumbers',
          calories: 140,
          protein: 16,
          carbs: 6,
          fats: 4,
          clinicalBenefits: 'Slow-digesting micellar casein maintains steady blood amino acid levels.'
        },
        dinner: {
          name: 'Grilled Beef Steak Strips with Roasted Sweet Potato & Green Beans',
          portion: '130g lean beef tenderloin + 1 small baked sweet potato + 1 cup sauteed green beans in olive oil',
          calories: 480,
          protein: 38,
          carbs: 38,
          fats: 16,
          clinicalBenefits: 'Heme iron and bioavailable creatine replenish cellular muscle stores.'
        }
      }
    ]
  }
];
