export interface FaqItem {
  id: string;
  category: 'General' | 'Hospitals & Emergency' | 'Diet & Nutrition' | 'Metrics Tracking';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is CareHub Karachi and how does it serve users?',
    answer: 'CareHub Karachi is a comprehensive digital healthcare and wellness portal designed specifically for individuals seeking proactive health tracking, evidence-based disease encyclopedia articles, specialized clinical nutrition plans (for Diabetes, High Blood Pressure, and Cholesterol), and a verified emergency hospital directory covering all 7 major zones of Karachi.'
  },
  {
    id: 'faq-2',
    category: 'Hospitals & Emergency',
    question: 'How do I locate the closest emergency hospital in Karachi?',
    answer: 'Navigate to our "Karachi Hospitals" directory. You can filter hospitals by your specific zone (such as Clifton & Defence, Gulshan-e-Iqbal, North Nazimabad, Saddar, Korangi, Malir, or Federal B Area), toggle the "24/7 Emergency Only" filter, or filter by medical specialty (e.g. Cardiology, Trauma, Pediatrics, Nephrology). Each card provides direct one-touch emergency call buttons and Google Maps navigation.'
  },
  {
    id: 'faq-3',
    category: 'Hospitals & Emergency',
    question: 'Which hospitals in Karachi offer free or charity-supported medical treatments?',
    answer: 'Major charity and trust institutions in Karachi include The Indus Hospital (Korangi Crossing) and Sindh Institute of Urology and Transplantation / SIUT (Civil Lines/Saddar), which provide 100% free, high-standard tertiary medical treatments with complete dignity. Dr. Ruth Pfau Civil Hospital also provides free public healthcare services.'
  },
  {
    id: 'faq-4',
    category: 'Diet & Nutrition',
    question: 'Can the diabetes and hypertension diet plans be customized for traditional South Asian meals?',
    answer: 'Yes! Our clinical nutrition plans are explicitly engineered for local culinary realities. For instance, rather than mandating exotic western ingredients, our diabetes protocol recommends substituting refined white wheat with chana flour (besan) or barley (jau) flatbreads, pairing lentils with salads first, and using cold-pressed oils instead of hydrogenated vanaspati ghee.'
  },
  {
    id: 'faq-5',
    category: 'Metrics Tracking',
    question: 'How does the fitness metrics dashboard visualize health trends over time?',
    answer: 'Our Health Dashboard allows you to log daily systolic and diastolic blood pressure, fasting glucose, body weight, daily step counts, resting heart rate, and water intake. The system calculates your BMI using Asian-specific cutoff criteria, flags health risk thresholds, and renders interactive multi-point trend curves across 7-day, 14-day, and 30-day timelines.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'Is my health metrics data private and secure?',
    answer: 'Absolutely. Your health metrics, logs, and personal profile information are stored safely in your browser session and encrypted storage. CareHub adheres to strict health privacy principles and never sells, monetizes, or shares personal clinical metrics with third parties or insurance agencies.'
  },
  {
    id: 'faq-7',
    category: 'Diet & Nutrition',
    question: 'What is the DASH diet and why is it recommended for high blood pressure?',
    answer: 'DASH stands for Dietary Approaches to Stop Hypertension. It emphasizes sodium restriction (less than 1,500mg daily) while prioritizing foods abundant in potassium, magnesium, and calcium (such as spinach, beetroots, dahi, and seeds). Multiple clinical trials show DASH can drop systolic blood pressure by up to 11-14 mmHg within weeks.'
  }
];
