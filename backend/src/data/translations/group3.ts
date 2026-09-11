import { QuestionTranslation } from './group1.js';

export const GROUP_3: Record<string, QuestionTranslation[]> = {
  "Diarrhea": [
    {
      qEn: "When did your loose stools or diarrhea first begin?",
      qHi: "आपको पतले दस्त सबसे पहले कब शुरू हुए थे?",
      qTe: "మీకు విరేచనాలు మొదట ఎప్పుడు ప్రారంభమయ్యాయి?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–3 days ago", hi: "1–3 दिन पहले", te: "1–3 రోజుల క్రితం" },
        { en: "4–7 days ago", hi: "4–7 दिन पहले", te: "4–7 రోజుల క్రితం" },
        { en: "More than 1 week ago", hi: "1 सप्ताह से अधिक पहले", te: "1 వారం కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "Approximately how many loose stools have you had in the last 24 hours?",
      qHi: "पिछले 24 घंटों में आपको लगभग कितनी बार पतले दस्त हुए हैं?",
      qTe: "గడిచిన 24 గంటల్లో దాదాపు ఎన్నిసార్లు విరేచనాలు అయ్యాయి?",
      opts: [
        { en: "1–2", hi: "1–2 बार", te: "1–2 సార్లు" },
        { en: "3–5", hi: "3–5 बार", te: "3–5 సార్లు" },
        { en: "6–10", hi: "6–10 बार", te: "6–10 సార్లు" },
        { en: "More than 10", hi: "10 से अधिक बार", te: "10 కంటే ఎక్కువ సార్లు" }
      ]
    },
    {
      qEn: "Are your stools mostly watery?",
      qHi: "क्या दस्त पूरी तरह से पानी जैसे पतले हैं?",
      qTe: "విరేచనాలు పూర్తిగా నీళ్లలా అవుతున్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Have you noticed any blood or mucus in your stool?",
      qHi: "क्या मल में खून या आंव (म्यूकस) दिखाई दिया है?",
      qTe: "మలంలో రక్తం లేదా జిగురు పడటం గమనించారా?",
      opts: [
        { en: "Blood", hi: "खून", te: "రక్తం" },
        { en: "Mucus", hi: "आंव / बलगम", te: "జిగురు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the diarrhea?",
      qHi: "क्या दस्त के साथ बुखार भी आया है?",
      qTe: "విరేచనాలతో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting along with the loose stools?",
      qHi: "क्या दस्त के साथ उल्टी भी हुई है?",
      qTe: "విరేచనాలతో పాటు వాంతులు కూడా అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing abdominal cramps or pain?",
      qHi: "क्या पेट में मरोड़ या दर्द महसूस हो रहा है?",
      qTe: "కడుపులో పిసికినట్లు లేదా నొప్పిగా ఉందా?",
      opts: [
        { en: "Mild cramps", hi: "हल्की मरोड़", te: "స్వల్ప నొప్పులు" },
        { en: "Moderate cramps", hi: "मध्यम मरोड़", te: "మధ్యస్థ నొప్పులు" },
        { en: "Severe cramps", hi: "तेज मरोड़", te: "తీవ్రమైన నొప్పులు" },
        { en: "No pain", hi: "कोई दर्द नहीं", te: "నొప్పి లేదు" }
      ]
    },
    {
      qEn: "Did the diarrhea begin after eating outside food or during/recently after travel?",
      qHi: "क्या बाहर का खाना खाने या यात्रा करने के बाद दस्त शुरू हुए?",
      qTe: "బయటి ఆహారం తిన్న తర్వాత లేదా ప్రయాణం చేసిన తర్వాత విరేచనాలు మొదలయ్యాయా?",
      opts: [
        { en: "After eating outside food", hi: "बाहर का खाना खाने के बाद", te: "బయటి ఆహారం తిన్న తర్వాత" },
        { en: "After travel", hi: "यात्रा के बाद", te: "ప్రయాణం తర్వాత" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed that you are passing much less urine than usual?",
      qHi: "क्या आपको सामान्य से बहुत कम पेशाब आ रहा है?",
      qTe: "సాధారణం కంటే చాలా తక్కువగా మూత్రం వస్తున్నట్లు గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you been drinking oral rehydration solution or other fluids to prevent dehydration?",
      qHi: "क्या आप ओआरएस (ORS) या अन्य तरल पदार्थ पर्याप्त मात्रा में ले रहे हैं?",
      qTe: "డీహైడ్రేషన్ రాకుండా ఓఆర్ఎస్ (ORS) లేదా ద్రవాలు తాగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Only small amounts", hi: "केवल थोड़ी मात्रा में", te: "కొద్ది మొత్తంలో మాత్రమే" }
      ]
    }
  ],

  "Constipation": [
    {
      qEn: "When was your last bowel movement?",
      qHi: "आपने पिछली बार शौच कब किया था?",
      qTe: "చివరిసారి మీరు మలవిసర్జన ఎప్పుడు చేశారు?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–2 days ago", hi: "1–2 दिन पहले", te: "1–2 రోజుల క్రితం" },
        { en: "3–5 days ago", hi: "3–5 दिन पहले", te: "3–5 రోజుల క్రితం" },
        { en: "More than 5 days ago", hi: "5 दिन से अधिक पहले", te: "5 రోజుల కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "Are your stools hard or difficult to pass?",
      qHi: "क्या आपका मल बहुत कड़ा है या त्यागने में कठिनाई होती है?",
      qTe: "మలం గట్టిగా రావడం లేదా విసర్జించడానికి కష్టంగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Do you need to strain when passing stool?",
      qHi: "क्या शौच करते समय बहुत जोर लगाना पड़ता है?",
      qTe: "మలవిసర్జన సమయంలో ఎక్కువగా ముక్కాల్సి వస్తోందా?",
      opts: [
        { en: "Always", hi: "हमेशा", te: "ఎల్లప్పుడూ" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" },
        { en: "No", hi: "नहीं", te: "లేదు" }
      ]
    },
    {
      qEn: "Are you experiencing any abdominal pain along with the constipation?",
      qHi: "क्या कब्ज के साथ पेट में दर्द भी हो रहा है?",
      qTe: "మలబద్ధకంతో పాటు కడుపు నొప్పి కూడా ఉందా?",
      opts: [
        { en: "Mild pain", hi: "हल्का दर्द", te: "స్వల్ప నొప్పి" },
        { en: "Moderate pain", hi: "मध्यम दर्द", te: "మధ్యస్థ నొప్పి" },
        { en: "Severe pain", hi: "तेज दर्द", te: "తీవ్రమైన నొప్పి" },
        { en: "No pain", hi: "कोई दर्द नहीं", te: "నొప్పి లేదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting along with the constipation?",
      qHi: "क्या कब्ज के साथ उल्टी भी हुई है?",
      qTe: "మలబద్ధకంతో పాటు వాంతులు ఏమైనా అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your stool?",
      qHi: "क्या आपने मल में खून देखा है?",
      qTe: "మలంలో ఎప్పుడైనా రక్తం పడటం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Are you experiencing abdominal bloating or a feeling of fullness?",
      qHi: "क्या पेट फूलना या भारीपन महसूस हो रहा है?",
      qTe: "కడుపు ఉబ్బరం లేదా బరువుగా ఉన్నట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you recently made any significant changes to your diet?",
      qHi: "क्या हाल ही में आपके खान-पान में कोई बड़ा बदलाव हुआ है?",
      qTe: "ఇటీవల మీ ఆహారపు అలవాట్లలో ఏదైనా పెద్ద మార్పు జరిగిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you drinking less water than you normally do?",
      qHi: "क्या आप सामान्य से कम पानी पी रहे हैं?",
      qTe: "సాధారణం కంటే తక్కువ నీరు తాగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you taken any laxative or other medicine to relieve the constipation?",
      qHi: "क्या आपने पेट साफ करने के लिए कोई दवा या चूर्ण लिया है?",
      qTe: "మలబద్ధకం నివారణకు ఏదైనా మందు లేదా లేహ్యం వాడారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Food Poisoning": [
    {
      qEn: "How soon after eating the suspected food did your symptoms begin?",
      qHi: "संदिग्ध भोजन करने के कितनी देर बाद आपके लक्षण शुरू हुए?",
      qTe: "అనుమానిత ఆహారం తిన్న ఎంతసేపటికి లక్షణాలు మొదలయ్యాయి?",
      opts: [
        { en: "Within 1 hour", hi: "1 घंटे के भीतर", te: "1 గంట లోపు" },
        { en: "1–6 hours", hi: "1–6 घंटे", te: "1–6 గంటలు" },
        { en: "6–24 hours", hi: "6–24 घंटे", te: "6–24 గంటలు" },
        { en: "More than 24 hours", hi: "24 घंटे से अधिक", te: "24 గంటల కంటే ఎక్కువ" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "How many times have you vomited or had loose stools since the symptoms began?",
      qHi: "लक्षण शुरू होने के बाद से कितनी बार उल्टी या दस्त हुए हैं?",
      qTe: "లక్షణాలు ప్రారంభమైనప్పటి నుండి ఎన్నిసార్లు వాంతులు లేదా విరేచనాలు అయ్యాయి?",
      opts: [
        { en: "1–2 times", hi: "1–2 बार", te: "1–2 సార్లు" },
        { en: "3–5 times", hi: "3–5 बार", te: "3–5 సార్లు" },
        { en: "6–10 times", hi: "6–10 बार", te: "6–10 సార్లు" },
        { en: "More than 10 times", hi: "10 से अधिक बार", te: "10 కంటే ఎక్కువ సార్లు" }
      ]
    },
    {
      qEn: "Are your stools watery?",
      qHi: "क्या दस्त पूरी तरह पानी जैसे पतले हैं?",
      qTe: "విరేచనాలు నీళ్లలాగా అవుతున్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Have you noticed any blood or mucus in your stool?",
      qHi: "क्या मल में खून या आंव देखा है?",
      qTe: "మలంలో రక్తం లేదా జిగురు పడటం గమనించారా?",
      opts: [
        { en: "Blood", hi: "खून", te: "రక్తం" },
        { en: "Mucus", hi: "आंव / बलगम", te: "జిగురు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the vomiting or diarrhea?",
      qHi: "क्या उल्टी या दस्त के साथ बुखार भी आया है?",
      qTe: "వాంతులు లేదా విరేచనాలతో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing abdominal cramps or stomach pain?",
      qHi: "क्या पेट में मरोड़ या तेज दर्द हो रहा है?",
      qTe: "కడుపులో నొప్పులు లేదా తిప్పేసినట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "No pain", hi: "कोई दर्द नहीं", te: "నొప్పి లేదు" }
      ]
    },
    {
      qEn: "Did anyone else who ate the same food become sick?",
      qHi: "क्या वही खाना खाने वाले किसी अन्य व्यक्ति की भी तबीयत खराब हुई?",
      qTe: "అదే ఆహారం తిన్న మీతోటి వారిలో ఎవరికైనా అనారోగ్యం కలిగిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Did you recently eat food from a restaurant, street vendor, or other outside source?",
      qHi: "क्या आपने हाल ही में होटल, स्ट्रीट वेंडर या बाहर का खाना खाया था?",
      qTe: "ఇటీవల హోటల్, రోడ్డు పక్కన బండి వద్ద లేదా బయటి ఆహారం తిన్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you able to keep water and other fluids down without vomiting?",
      qHi: "क्या आप बिना उल्टी किए पानी या तरल पदार्थ पचा पा रहे हैं?",
      qTe: "నీరు లేదా ద్రవాలు తాగితే వాంతి అవ్వకుండా ఉండగలుగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Only small amounts", hi: "केवल थोड़ी मात्रा में", te: "కొద్ది మొత్తంలో మాత్రమే" }
      ]
    },
    {
      qEn: "Are you passing urine normally despite the vomiting or diarrhea?",
      qHi: "क्या उल्टी-दस्त के बावजूद पेशाब सामान्य आ रहा है?",
      qTe: "వాంతులు-విరేచనాలు అవుతున్నప్పటికీ మూత్రం సాధారణంగా వస్తోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Less than usual", hi: "सामान्य से कम", te: "సాధారణం కంటే తక్కువ" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    }
  ],

  "Vomiting": [
    {
      qEn: "When did the vomiting first begin?",
      qHi: "उल्टी होना सबसे पहले कब शुरू हुआ था?",
      qTe: "వాంతులు మొదట ఎప్పుడు ప్రారంభమయ్యాయి?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–3 days ago", hi: "1–3 दिन पहले", te: "1–3 రోజుల క్రితం" },
        { en: "4–7 days ago", hi: "4–7 दिन पहले", te: "4–7 రోజుల క్రితం" },
        { en: "More than 1 week ago", hi: "1 सप्ताह से अधिक पहले", te: "1 వారం కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "Approximately how many times have you vomited since the symptoms began?",
      qHi: "लक्षण शुरू होने के बाद से अब तक लगभग कितनी बार उल्टी हुई है?",
      qTe: "సమస్య మొదలైనప్పటి నుండి ఇప్పటివరకు దాదాపు ఎన్నిసార్లు వాంతి అయింది?",
      opts: [
        { en: "1–2 times", hi: "1–2 बार", te: "1–2 సార్లు" },
        { en: "3–5 times", hi: "3–5 बार", te: "3–5 సార్లు" },
        { en: "6–10 times", hi: "6–10 बार", te: "6–10 సార్లు" },
        { en: "More than 10 times", hi: "10 से अधिक बार", te: "10 కంటే ఎక్కువ సార్లు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your vomit?",
      qHi: "क्या उल्टी में कभी खून दिखाई दिया है?",
      qTe: "వాంతిలో ఎప్పుడైనా రక్తం పడటం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Are you experiencing any abdominal pain along with the vomiting?",
      qHi: "क्या उल्टी के साथ पेट में दर्द भी हो रहा है?",
      qTe: "వాంతులతో పాటు కడుపు నొప్పి కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you also experienced loose stools or diarrhea?",
      qHi: "क्या उल्टी के साथ पतले दस्त भी हुए हैं?",
      qTe: "వాంతులతో పాటు విరేచనాలు కూడా అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the vomiting?",
      qHi: "क्या उल्टी के साथ बुखार भी आया है?",
      qTe: "వాంతులతో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing a headache along with the vomiting?",
      qHi: "क्या उल्टी के साथ सिरदर्द भी है?",
      qTe: "వాంతులతో పాటు తలనొప్పి కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Did the vomiting begin after eating a particular food or taking any medicine?",
      qHi: "क्या किसी खास भोजन या दवा के सेवन के बाद उल्टी शुरू हुई?",
      qTe: "ఏదైనా నిర్దిష్ట ఆహారం తిన్న తర్వాత లేదా మందులు వేసుకున్న తర్వాత వాంతులు మొదలయ్యాయా?",
      opts: [
        { en: "After food", hi: "भोजन के बाद", te: "ఆహారం తర్వాత" },
        { en: "After medicine", hi: "दवा के बाद", te: "మందుల తర్వాత" },
        { en: "After both", hi: "दोनों के बाद", te: "రెండింటి తర్వాత" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Are you able to keep water and other fluids down without vomiting?",
      qHi: "क्या आप पानी या तरल पदार्थ बिना उल्टी किए पचा पा रहे हैं?",
      qTe: "నీరు తాగితే వాంతి అవ్వకుండా ఉండగలుగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Only small amounts", hi: "केवल थोड़ी मात्रा में", te: "కొద్ది మొత్తంలో మాత్రమే" }
      ]
    },
    {
      qEn: "Have you noticed that you are passing less urine than usual?",
      qHi: "क्या आपको सामान्य से कम पेशाब आ रहा है?",
      qTe: "సాధారణం కంటే తక్కువ మూత్రం వస్తున్నట్లు అనిపిస్తోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    }
  ],

  "Abdominal Pain": [
    {
      qEn: "Where exactly is the abdominal pain located?",
      qHi: "पेट में दर्द ठीक किस जगह पर हो रहा है?",
      qTe: "కడుపులో నొప్పి ఖచ్చితంగా ఎక్కడ ఉంది?",
      opts: [
        { en: "Upper abdomen", hi: "ऊपरी पेट", te: "పై కడుపు" },
        { en: "Lower abdomen", hi: "निचला पेट", te: "కింది కడుపు" },
        { en: "Right side", hi: "दाहिनी तरफ", te: "కుడి వైపు" },
        { en: "Left side", hi: "बाईं तरफ", te: "ఎడమ వైపు" },
        { en: "Around the navel", hi: "नाभि के आसपास", te: "బొడ్డు చుట్టూ" },
        { en: "Whole abdomen", hi: "पूरा पेट", te: "కడుపు అంతటా" }
      ]
    },
    {
      qEn: "Did the abdominal pain begin suddenly or gradually?",
      qHi: "क्या पेट का दर्द अचानक शुरू हुआ या धीरे-धीरे बढ़ा?",
      qTe: "కడుపు నొప్పి అకస్మాత్తుగా మొదలైందా లేక క్రమంగా పెరిగిందా?",
      opts: [
        { en: "Suddenly", hi: "अचानक", te: "అకస్మాత్తుగా" },
        { en: "Gradually", hi: "धीरे-धीरे", te: "క్రమంగా" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "How would you describe the pain you are experiencing?",
      qHi: "आप अपने दर्द का वर्णन कैसे करेंगे?",
      qTe: "మీకు వస్తున్న నొప్పి ఎలాంటిది?",
      opts: [
        { en: "Cramping", hi: "मरोड़", te: "కడుపు పిసికినట్లు ఉండటం" },
        { en: "Burning", hi: "जलन", te: "మంట" },
        { en: "Stabbing", hi: "तेज चुभने वाला", te: "పొడిచినట్లు ఉండటం" },
        { en: "Dull/aching", hi: "हल्का/लगातार दर्द", te: "మొద్దుబారిన నొప్పి" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "How severe is your abdominal pain?",
      qHi: "पेट का दर्द कितना गंभीर है?",
      qTe: "కడుపు నొప్పి తీవ్రత ఎంతవరకు ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "Very severe", hi: "बहुत गंभीर", te: "చాలా తీవ్రం" }
      ]
    },
    {
      qEn: "Does eating make the abdominal pain better or worse?",
      qHi: "क्या खाना खाने से दर्द में आराम मिलता है या दर्द बढ़ जाता है?",
      qTe: "ఆహారం తిన్న తర్వాత నొప్పి తగ్గుతోందా లేక ఎక్కువవుతోందా?",
      opts: [
        { en: "Better", hi: "बेहतर", te: "ఉపశమనం" },
        { en: "Worse", hi: "बदतर", te: "మరింత తీవ్రం" },
        { en: "No change", hi: "कोई बदलाव नहीं", te: "మార్పు లేదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you experienced nausea or vomiting along with the abdominal pain?",
      qHi: "क्या पेट दर्द के साथ जी मिचलाना या उल्टी हुई है?",
      qTe: "కడుపు నొప్పితో పాటు వికారం లేదా వాంతులు అయ్యాయా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any recent change in your bowel movements?",
      qHi: "क्या हाल ही में शौच की आदत में कोई बदलाव (दस्त या कब्ज) आया है?",
      qTe: "మలవిసర్జన అలవాట్లలో ఏవైనా మార్పులు (విరేచనాలు లేదా మలబద్ధకం) గమనించారా?",
      opts: [
        { en: "Diarrhea", hi: "दस्त", te: "విరేచనాలు" },
        { en: "Constipation", hi: "कब्ज", te: "మలబద్ధకం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "No change", hi: "कोई बदलाव नहीं", te: "మార్పు లేదు" }
      ]
    },
    {
      qEn: "Do you have a fever along with the abdominal pain?",
      qHi: "क्या पेट दर्द के साथ बुखार भी है?",
      qTe: "కడుపు నొప్పితో పాటు జ్వరం కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your stool or vomit?",
      qHi: "क्या मल या उल्टी में कभी खून दिखाई दिया है?",
      qTe: "మలంలో లేదా వాంతిలో రక్తం పడటం గమనించారా?",
      opts: [
        { en: "Blood in stool", hi: "मल में खून", te: "మలంలో రక్తం" },
        { en: "Blood in vomit", hi: "उल्टी में खून", te: "వాంతిలో రక్తం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Has the abdominal pain been getting worse since it started?",
      qHi: "क्या पेट दर्द शुरू होने के बाद से लगातार बढ़ता जा रहा है?",
      qTe: "కడుపు నొప్పి మొదలైనప్పటి నుండి మరింత ఎక్కువవుతోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    }
  ],

  "Appendicitis": [
    {
      qEn: "Where did your abdominal pain first begin?",
      qHi: "पेट का दर्द सबसे पहले कहां शुरू हुआ था?",
      qTe: "కడుపు నొప్పి మొదట ఎక్కడ ప్రారంభమైంది?",
      opts: [
        { en: "Around the navel", hi: "नाभि के आसपास", te: "బొడ్డు చుట్టూ" },
        { en: "Right lower abdomen", hi: "दाहिने निचले पेट में", te: "కుడి కింది కడుపు" },
        { en: "Upper abdomen", hi: "ऊपरी पेट", te: "పై కడుపు" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "Did the pain move toward the lower-right side of your abdomen?",
      qHi: "क्या दर्द खिसककर पेट के निचले दाहिने हिस्से की ओर चला गया?",
      qTe: "నొప్పి కుడివైపు కింది కడుపులోకి జరిగిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Has the abdominal pain become progressively worse?",
      qHi: "क्या पेट का दर्द धीरे-धीरे और बहुत तेज होता जा रहा है?",
      qTe: "కడుపు నొప్పి క్రమక్రమంగా మరింత తీవ్రమవుతోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    },
    {
      qEn: "Does moving, walking, or coughing make the abdominal pain worse?",
      qHi: "क्या हिलने-डुलने, चलने या खांसने से पेट का दर्द बढ़ जाता है?",
      qTe: "నడవడం, కదలడం లేదా దగ్గినప్పుడు కడుపు నొప్పి ఎక్కువవుతోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed a decrease in your appetite since the pain began?",
      qHi: "क्या दर्द शुरू होने के बाद से भूख बिल्कुल बंद या कम हो गई है?",
      qTe: "నొప్పి మొదలైనప్పటి నుండి ఆకలి పూర్తిగా తగ్గిపోయిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced nausea or vomiting along with the abdominal pain?",
      qHi: "क्या पेट दर्द के साथ जी मिचलाना या उल्टी हुई है?",
      qTe: "కడుపు నొప్పితో పాటు వికారం లేదా వాంతులు అయ్యాయా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the abdominal pain?",
      qHi: "क्या पेट दर्द के साथ हल्का या तेज बुखार आया है?",
      qTe: "కడుపు నొప్పితో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced diarrhea or constipation since the pain began?",
      qHi: "क्या दर्द शुरू होने के बाद दस्त या कब्ज की शिकायत हुई है?",
      qTe: "నొప్పి మొదలైనప్పటి నుండి విరేచనాలు లేదా మలబద్ధకం ఏర్పడిందా?",
      opts: [
        { en: "Diarrhea", hi: "दस्त", te: "విరేచనాలు" },
        { en: "Constipation", hi: "कब्ज", te: "మలబద్ధకం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any swelling or unusual fullness in your abdomen?",
      qHi: "क्या पेट में कोई सूजन या असामान्य भारीपन महसूस हुआ है?",
      qTe: "కడుపులో వాపు లేదా అసాధారణ బరువును గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced similar abdominal pain in the past?",
      qHi: "क्या आपको पहले भी कभी ऐसा ही पेट दर्द हुआ है?",
      qTe: "గతంలో కూడా మీకు ఇలాంటి కడుపు నొప్పి ఎప్పుడైనా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Gallstones": [
    {
      qEn: "Where exactly do you feel the abdominal pain?",
      qHi: "पेट में दर्द ठीक किस जगह पर महसूस हो रहा है?",
      qTe: "కడుపులో ఖచ్చితంగా ఎక్కడ నొప్పి వస్తోంది?",
      opts: [
        { en: "Right upper abdomen", hi: "ऊपरी दाहिने पेट में", te: "కుడి పై కడుపు" },
        { en: "Upper middle abdomen", hi: "ऊपरी मध्य पेट में", te: "పై మధ్య కడుపు" },
        { en: "Left side", hi: "बाईं तरफ", te: "ఎడమ వైపు" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "Does the pain usually occur after eating fatty or oily food?",
      qHi: "क्या दर्द आमतौर पर तैलीय या भारी खाना खाने के बाद होता है?",
      qTe: "నూనె లేదా కొవ్వుతో కూడిన ఆహారం తిన్న తర్వాత నొప్పి వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Does the pain spread toward your right shoulder or back?",
      qHi: "क्या दर्द आपके दाहिने कंधे या पीठ की ओर फैलता है?",
      qTe: "నొప్పి కుడి భుజం లేదా వీపు వైపునకు పాకుతుందా?",
      opts: [
        { en: "Right shoulder", hi: "दायां कंधा", te: "కుడి భుజం" },
        { en: "Back", hi: "पीठ", te: "వీపు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "How long does each episode of pain usually last?",
      qHi: "दर्द का दौरा आमतौर पर कितनी देर तक रहता है?",
      qTe: "నొప్పి వచ్చినప్పుడు సాధారణంగా ఎంతసేపు ఉంటుంది?",
      opts: [
        { en: "Less than 30 minutes", hi: "30 मिनट से कम", te: "30 నిమిషాల కంటే తక్కువ" },
        { en: "30 minutes–6 hours", hi: "30 मिनट–6 घंटे", te: "30 నిమిషాలు–6 గంటలు" },
        { en: "More than 6 hours", hi: "6 घंटे से अधिक", te: "6 గంటల కంటే ఎక్కువ" }
      ]
    },
    {
      qEn: "Do you feel nauseated or vomit when you experience the pain?",
      qHi: "क्या दर्द होने पर जी मिचलाता है या उल्टी होती है?",
      qTe: "నొప్పి వచ్చినప్పుడు వికారం లేదా వాంతులు అవుతున్నాయా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the abdominal pain?",
      qHi: "क्या पेट दर्द के साथ बुखार भी आया है?",
      qTe: "కడుపు నొప్పితో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have your eyes or skin become yellow recently?",
      qHi: "क्या हाल ही में आपकी आंखें या त्वचा पीली दिखाई दे रही हैं (पीलिया)?",
      qTe: "ఇటీవల కళ్ళు లేదా చర్మం పసుపు రంగులోకి మారినట్లు గమనించారా (కామెర్లు)?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has your urine become darker than usual?",
      qHi: "क्या पेशाब का रंग सामान्य से अधिक गहरा पीला या भूरा हो गया है?",
      qTe: "మూత్రం సాధారణం కంటే ముదురు రంగులోకి మారిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you ever been diagnosed with gallstones before?",
      qHi: "क्या पहले कभी आपको पित्त की पथरी (गॉलस्टोन) होने का पता चला है?",
      qTe: "గతంలో మీకు పిత్తాశయంలో రాళ్ళు ఉన్నట్లు నిర్ధారించబడిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you had an ultrasound scan to check for gallstones before?",
      qHi: "क्या पहले कभी पित्त की पथरी की जांच के लिए अल्ट्रासाउंड हुआ है?",
      qTe: "గతంలో పిత్తాశయ రాళ్ల కోసం అల్ట్రాసౌండ్ స్కాన్ చేయించుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Hemorrhoids (Piles)": [
    {
      qEn: "What color is the blood you have noticed during or after passing stool?",
      qHi: "शौच के समय दिखने वाले खून का रंग कैसा है?",
      qTe: "మలవిసర్జన సమయంలో కనిపించే రక్తం రంగు ఏమిటి?",
      opts: [
        { en: "Bright red", hi: "चमकीला लाल", te: "ప్రకాశవంతమైన ఎరుపు" },
        { en: "Dark red", hi: "गहरा लाल", te: "ముదురు ఎరుపు" },
        { en: "Black", hi: "काला", te: "నలుపు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "When do you usually notice the bleeding?",
      qHi: "खून आमतौर पर कब आता है?",
      qTe: "రక్తం సాధారణంగా ఎప్పుడు పడుతోంది?",
      opts: [
        { en: "While passing stool", hi: "शौच करते समय", te: "మలవిసర్జన సమయంలో" },
        { en: "After passing stool", hi: "शौच के बाद", te: "మలవిసర్జన తర్వాత" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Do you experience pain or discomfort around the anus?",
      qHi: "क्या गुदा के आसपास दर्द या जलन महसूस होती है?",
      qTe: "మలద్వారం వద్ద నొప్పి లేదా అసౌకర్యంగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed a lump or swelling near the anus?",
      qHi: "क्या गुदा के पास कोई मस्सा या गांठ महसूस होती है?",
      qTe: "మలద్వారం వద్ద ఏదైనా గడ్డ లేదా వాపు ఉన్నట్లు గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you experience itching or irritation around the anus?",
      qHi: "क्या गुदा के आसपास खुजली या जलन होती है?",
      qTe: "మలద్వారం చుట్టూ దురద లేదా మంటగా ఉంటుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you currently experiencing constipation or hard stools?",
      qHi: "क्या आपको वर्तमान में कब्ज या कड़े मल की समस्या है?",
      qTe: "ప్రస్తుతం మీకు మలబద్ధకం లేదా గట్టి మలం సమస్య ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Do you have to strain while passing stool?",
      qHi: "क्या शौच करते समय बहुत अधिक जोर लगाना पड़ता है?",
      qTe: "మలవిసర్జన సమయంలో ఎక్కువగా ముక్కాల్సి వస్తోందా?",
      opts: [
        { en: "Always", hi: "हमेशा", te: "ఎల్లప్పుడూ" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" },
        { en: "No", hi: "नहीं", te: "లేదు" }
      ]
    },
    {
      qEn: "Have you experienced heavy or continuous bleeding from the anus?",
      qHi: "क्या गुदा से बहुत अधिक या लगातार खून बहने की समस्या हुई है?",
      qTe: "మలద్వారం నుండి విపరీతంగా లేదా ఆగకుండా రక్తం కారిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced hemorrhoids or piles in the past?",
      qHi: "क्या आपको पहले भी बवासीर (पाइल्स) की समस्या रही है?",
      qTe: "గతంలో కూడా మీకు పైల్స్ (మొలలు) సమస్య ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you used any medicine or other treatment for the current problem?",
      qHi: "क्या आपने वर्तमान समस्या के लिए कोई क्रीम या दवा ली है?",
      qTe: "ప్రస్తుత సమస్య కోసం ఏదైనా మందు లేదా క్రీమ్ వాడారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Urinary Tract Infection (UTI)": [
    {
      qEn: "Do you feel burning or pain when you urinate?",
      qHi: "क्या पेशाब करते समय जलन या तेज दर्द होता है?",
      qTe: "మూత్రం పోసేటప్పుడు మంట లేదా నొప్పిగా అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you urinating more frequently than you normally do?",
      qHi: "क्या आपको सामान्य से अधिक बार-बार पेशाब जाना पड़ रहा है?",
      qTe: "సాధారణం కంటే ఎక్కువసార్లు తరచుగా మూత్రానికి వెళ్లాల్సి వస్తోందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you feel a sudden or urgent need to urinate?",
      qHi: "क्या अचानक बहुत तेजी से पेशाब करने की इच्छा महसूस होती है?",
      qTe: "అకస్మాత్తుగా వెంటనే మూత్రం పోయాలనే తొందర అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing pain or discomfort in your lower abdomen?",
      qHi: "क्या पेट के निचले हिस्से (पेड़ू) में दर्द या भारीपन है?",
      qTe: "కింది కడుపులో నొప్పి లేదా అసౌకర్యంగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your urine?",
      qHi: "क्या पेशाब में कभी खून या लाल रंग दिखाई दिया है?",
      qTe: "మూత్రంలో ఎప్పుడైనా రక్తం లేదా ఎరుపు రంగు పడటం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you developed a fever or chills along with your urinary symptoms?",
      qHi: "क्या पेशाब की समस्या के साथ बुखार या ठंड/कंपकंपी लगी है?",
      qTe: "మూత్ర సమస్యతో పాటు జ్వరం లేదా చలిగా అనిపించిందా?",
      opts: [
        { en: "Fever", hi: "बुखार", te: "జ్వరం" },
        { en: "Chills", hi: "कंपकंपी / ठंड", te: "చలి / వణుకు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing pain in your side or lower back?",
      qHi: "क्या कमर के निचले हिस्से या बगल (कोख) में दर्द हो रहा है?",
      qTe: "నడుము కింది భాగంలో లేదా పక్కటెముకల కింద నొప్పిగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced nausea or vomiting along with these symptoms?",
      qHi: "क्या इन लक्षणों के साथ जी मिचलाना या उल्टी हुई है?",
      qTe: "ఈ లక్షణాలతో పాటు వికారం లేదా వాంతులు అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you had a urinary tract infection in the past?",
      qHi: "क्या आपको अतीत में कभी यूटीआई (पेशाब का संक्रमण) हुआ है?",
      qTe: "గతంలో ఎప్పుడైనా మీకు మూత్ర ఇన్ఫెక్షన్ (యూటీఐ) వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any antibiotics for your current urinary symptoms?",
      qHi: "क्या आपने वर्तमान समस्या के लिए कोई एंटीबायोटिक दवा ली है?",
      qTe: "ప్రస్తుత సమస్య కోసం ఏదైనా యాంటీబయాటిక్ మందు వాడారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Kidney Stones": [
    {
      qEn: "Where exactly do you feel the pain that you think may be related to a kidney stone?",
      qHi: "पथरी से जुड़ा दर्द ठीक किस जगह महसूस हो रहा है?",
      qTe: "కిడ్నీలో రాయికి సంబంధించిన నొప్పి ఖచ్చితంగా ఎక్కడ ఉంది?",
      opts: [
        { en: "Side/flank", hi: "कोख / बगल में", te: "పక్కటెముకల కింది భాగం" },
        { en: "Lower abdomen", hi: "निचला पेट", te: "కింది కడుపు" },
        { en: "Groin", hi: "जांघ के जोड़ (ग्रोइन)", te: "గజ్జల్లో" },
        { en: "Back", hi: "पीठ", te: "వీపు" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "How severe is the pain?",
      qHi: "दर्द कितना असहनीय या तेज है?",
      qTe: "ఆ నొప్పి ఎంత తీవ్రంగా ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "Very severe", hi: "बहुत गंभीर", te: "చాలా తీవ్రం" }
      ]
    },
    {
      qEn: "Does the pain come in waves, or does it remain constant?",
      qHi: "क्या दर्द लहरों की तरह घटता-बढ़ता है या लगातार बना रहता है?",
      qTe: "నొప్పి అలల మాదిరిగా వచ్చి పోతుందా లేక నిరంతరం అలాగే ఉంటుందా?",
      opts: [
        { en: "Comes in waves", hi: "लहरों की तरह आता है", te: "తరంగాలు తరంగాలుగా వస్తుంది" },
        { en: "Constant", hi: "लगातार", te: "నిరంతరం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your urine?",
      qHi: "क्या पेशाब में कभी खून या लाल रंग दिखा है?",
      qTe: "మూత్రంలో ఎప్పుడైనా రక్తం పడటం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Do you feel burning or pain when you urinate?",
      qHi: "क्या पेशाब करते समय जलन या दर्द होता है?",
      qTe: "మూత్రం పోసేటప్పుడు మంట లేదా నొప్పి ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced nausea or vomiting along with the pain?",
      qHi: "क्या तेज दर्द के साथ जी मिचलाना या उल्टी हुई है?",
      qTe: "నొప్పితో పాటు వికారం లేదా వాంతులు అయ్యాయా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you developed a fever or chills?",
      qHi: "क्या बुखार या कंपकंपी महसूस हुई है?",
      qTe: "జ్వరం లేదా చలిగా అనిపించిందా?",
      opts: [
        { en: "Fever", hi: "बुखार", te: "జ్వరం" },
        { en: "Chills", hi: "कंपकंपी / ठंड", te: "చలి / వణుకు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed that you are passing less urine than usual?",
      qHi: "क्या सामान्य से कम पेशाब आ रहा है या रुक-रुक कर आ रहा है?",
      qTe: "సాధారణం కంటే తక్కువగా లేదా ఆగి ఆగి మూత్రం వస్తున్నట్లు గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you had a kidney stone in the past?",
      qHi: "क्या पहले भी कभी आपको गुर्दे की पथरी हुई है?",
      qTe: "గతంలో కూడా మీకు కిడ్నీలో రాళ్లు ఉన్నట్లు తేలిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you undergone a scan or other medical test for your current symptoms?",
      qHi: "क्या वर्तमान दर्द के लिए कोई अल्ट्रासाउंड या एक्स-रे कराया है?",
      qTe: "ప్రస్తుత నొప్పి కోసం స్కాన్ లేదా ఏదైనా పరీక్ష చేయించుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Test scheduled", hi: "जांच तय है", te: "పరీక్ష షెడ్యూల్ చేయబడింది" }
      ]
    }
  ]
};
