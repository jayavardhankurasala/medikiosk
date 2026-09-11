export interface QuestionTranslation {
  qEn: string;
  qHi: string;
  qTe: string;
  opts: Array<{ en: string; hi: string; te: string }>;
}

export const GROUP_1: Record<string, QuestionTranslation[]> = {
  "Fever": [
    {
      qEn: "When did your fever first begin?",
      qHi: "आपका बुखार पहली बार कब शुरू हुआ था?",
      qTe: "మీకు జ్వరం మొదట ఎప్పుడు ప్రారంభమైంది?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–3 days ago", hi: "1–3 दिन पहले", te: "1–3 రోజుల క్రితం" },
        { en: "4–7 days ago", hi: "4–7 दिन पहले", te: "4–7 రోజుల క్రితం" },
        { en: "More than 1 week ago", hi: "1 सप्ताह से अधिक पहले", te: "1 వారం కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "What has been the highest temperature you have measured?",
      qHi: "आपने अधिकतम कितना तापमान मापा है?",
      qTe: "మీరు కొలిచిన అత్యధిక ఉష్ణోగ్రత ఎంత?",
      opts: [
        { en: "Below 100°F", hi: "100°F से कम", te: "100°F కంటే తక్కువ" },
        { en: "100–102°F", hi: "100–102°F", te: "100–102°F" },
        { en: "102–104°F", hi: "102–104°F", te: "102–104°F" },
        { en: "Above 104°F", hi: "104°F से अधिक", te: "104°F కంటే ఎక్కువ" },
        { en: "Not measured", hi: "मापा नहीं गया", te: "కొలవలేదు" }
      ]
    },
    {
      qEn: "Does the fever come and go, or has it remained continuous?",
      qHi: "क्या बुखार आता-जाता रहता है, या लगातार बना रहता है?",
      qTe: "జ్వరం వచ్చి పోతుందా, లేక నిరంతరాయంగా అలాగే ఉంటుందా?",
      opts: [
        { en: "Comes and goes", hi: "आता-जाता रहता है", te: "వచ్చి పోతుంది" },
        { en: "Continuous", hi: "लगातार बना रहता है", te: "నిరంతరం ఉంటుంది" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you experienced chills or shivering along with the fever?",
      qHi: "क्या आपको बुखार के साथ ठंड या कंपकंपी महसूस हुई है?",
      qTe: "జ్వరంతో పాటు మీకు చలి లేదా వణుకు అనిపించిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing body aches or unusual muscle pain along with the fever?",
      qHi: "क्या आपको बुखार के साथ बदन दर्द या मांसपेशियों में दर्द हो रहा है?",
      qTe: "జ్వరంతో పాటు ఒళ్ళు నొప్పులు లేదా కండరాల నొప్పులు ఉన్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a headache along with the fever?",
      qHi: "क्या बुखार के साथ आपको सिरदर्द भी है?",
      qTe: "జ్వరంతో పాటు తలనొప్పి కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you also experiencing a cough or a runny nose?",
      qHi: "क्या आपको खांसी या बहती नाक की समस्या भी है?",
      qTe: "మీకు దగ్గు లేదా ముక్కు కారడం వంటివి కూడా ఉన్నాయా?",
      opts: [
        { en: "Cough", hi: "खांसी", te: "దగ్గు" },
        { en: "Runny nose", hi: "बहती नाक", te: "ముక్కు కారడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting or loose stools along with the fever?",
      qHi: "क्या बुखार के साथ उल्टी या दस्त की समस्या हुई है?",
      qTe: "జ్వరంతో పాటు వాంతులు లేదా విరేచనాలు అయ్యాయా?",
      opts: [
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Loose stools", hi: "पतले दस्त", te: "విరేచనాలు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any new rash or unusual changes on your skin?",
      qHi: "क्या आपकी त्वचा पर कोई नए दाने या असामान्य बदलाव दिखे हैं?",
      qTe: "మీ చర్మంపై ఏవైనా కొత్త దద్దుర్లు లేదా అసాధారణ మార్పులను గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to reduce the fever?",
      qHi: "क्या आपने बुखार कम करने के लिए कोई दवा ली है?",
      qTe: "జ్వరం తగ్గడానికి మీరు ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Common Cold": [
    {
      qEn: "What nasal symptoms are you experiencing?",
      qHi: "नाक से संबंधित आपको क्या लक्षण महसूस हो रहे हैं?",
      qTe: "ముక్కుకు సంబంధించి మీకు ఎలాంటి లక్షణాలు ఉన్నాయి?",
      opts: [
        { en: "Blocked nose", hi: "बंद नाक", te: "ముక్కు దిబ్బడ" },
        { en: "Runny nose", hi: "बहती नाक", te: "ముక్కు కారడం" },
        { en: "Sneezing", hi: "छींक आना", te: "తుమ్ములు" },
        { en: "Multiple", hi: "कई लक्षण", te: "ఒకటి కంటే ఎక్కువ" }
      ]
    },
    {
      qEn: "What does your nasal discharge look like?",
      qHi: "आपकी नाक का स्राव किस तरह का दिखाई देता है?",
      qTe: "మీ ముక్కు నుండి కారే స్రావం ఎలా ఉంది?",
      opts: [
        { en: "Clear", hi: "साफ / पारदर्शी", te: "స్వచ్ఛమైనది" },
        { en: "White", hi: "सफेद", te: "తెలుపు" },
        { en: "Yellow/green", hi: "पीला / हरा", te: "పసుపు / ఆకుపచ్చ" },
        { en: "No discharge", hi: "कोई स्राव नहीं", te: "ఏ స్రావము లేదు" }
      ]
    },
    {
      qEn: "Are you experiencing a sore or irritated throat along with your cold symptoms?",
      qHi: "क्या सर्दी के लक्षणों के साथ गले में खराश या दर्द हो रहा है?",
      qTe: "జలుబు లక్షణాలతో పాటు గొంతు నొప్పి లేదా గొంతులో గరగర ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "What type of cough are you having, if any?",
      qHi: "यदि आपको खांसी है, तो वह किस प्रकार की है?",
      qTe: "మీకు ఎలాంటి దగ్గు వస్తోంది?",
      opts: [
        { en: "Dry cough", hi: "सूखी खांसी", te: "పొడి దగ్గు" },
        { en: "Cough with phlegm", hi: "बलगम वाली खांसी", te: "కఫంతో కూడిన దగ్గు" },
        { en: "No cough", hi: "खांसी नहीं", te: "దగ్గు లేదు" }
      ]
    },
    {
      qEn: "Have you had a fever along with your cold symptoms?",
      qHi: "क्या सर्दी के लक्षणों के साथ आपको बुखार भी आया है?",
      qTe: "జలుబుతో పాటు మీకు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing pressure or pain around your forehead, cheeks, or nose?",
      qHi: "क्या माथे, गालों या नाक के आसपास दबाव या दर्द महसूस हो रहा है?",
      qTe: "నుదురు, చెంపలు లేదా ముక్కు చుట్టూ నొప్పి లేదా ఒత్తిడి అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have any ear blockage, fullness, or ear pain?",
      qHi: "क्या कान बंद, भारीपन या कान में दर्द महसूस हो रहा है?",
      qTe: "చెవులు మూసుకుపోయినట్లు లేదా చెవిలో నొప్పి అనిపిస్తుందా?",
      opts: [
        { en: "Blockage/fullness", hi: "बंद / भारीपन", te: "దిబ్బడ / నిండుగా ఉండటం" },
        { en: "Pain", hi: "दर्द", te: "నొప్పి" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have your cold symptoms become worse since they first started?",
      qHi: "क्या सर्दी के लक्षण शुरू होने के बाद से और बढ़ गए हैं?",
      qTe: "జలుబు ప్రారంభమైనప్పటి నుండి లక్షణాలు మరింత ఎక్కువయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    },
    {
      qEn: "Do your symptoms usually appear after exposure to dust, pollen, or another allergen?",
      qHi: "क्या आपके लक्षण धूल, परागकण या किसी अन्य एलर्जी के संपर्क में आने के बाद होते हैं?",
      qTe: "దుమ్ము, పుప్పొడి లేదా ఏదైనా అలర్జీ కారకాల వల్ల ఈ లక్షణాలు వస్తున్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine for your cold symptoms?",
      qHi: "क्या आपने सर्दी के लक्षणों के लिए कोई दवा ली है?",
      qTe: "జలుబు లక్షణాల కోసం మీరు ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Flu (Influenza)": [
    {
      qEn: "Did your symptoms begin suddenly, or did they develop gradually?",
      qHi: "क्या आपके लक्षण अचानक शुरू हुए, या धीरे-धीरे विकसित हुए?",
      qTe: "మీ లక్షణాలు అకస్మాత్తుగా ప్రారంభమయ్యాయా, లేక నెమ్మదిగా మొదలయ్యాయా?",
      opts: [
        { en: "Suddenly", hi: "अचानक", te: "అకస్మాత్తుగా" },
        { en: "Gradually", hi: "धीरे-धीरे", te: "క్రమంగా" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you had a fever or chills since your symptoms began?",
      qHi: "क्या लक्षण शुरू होने के बाद से बुखार या कंपकंपी महसूस हुई है?",
      qTe: "లక్షణాలు ప్రారంభమైనప్పటి నుండి మీకు జ్వరం లేదా చలిగా అనిపించిందా?",
      opts: [
        { en: "Fever", hi: "बुखार", te: "జ్వరం" },
        { en: "Chills", hi: "कंपकंपी / ठंड", te: "చలి / వణుకు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing body aches or muscle pain?",
      qHi: "क्या आपको बदन दर्द या मांसपेशियों में तेज दर्द हो रहा है?",
      qTe: "మీకు ఒళ్ళు నొప్పులు లేదా కండరాల నొప్పులు ఉన్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a cough along with your other symptoms?",
      qHi: "क्या अन्य लक्षणों के साथ खांसी भी है?",
      qTe: "ఇతర లక్షణాలతో పాటు దగ్గు కూడా ఉందా?",
      opts: [
        { en: "Dry cough", hi: "सूखी खांसी", te: "పొడి దగ్గు" },
        { en: "Cough with phlegm", hi: "बलगम वाली खांसी", te: "కఫంతో కూడిన దగ్గు" },
        { en: "No cough", hi: "खांसी नहीं", te: "దగ్గు లేదు" }
      ]
    },
    {
      qEn: "Are you experiencing a headache?",
      qHi: "क्या आपको सिरदर्द हो रहा है?",
      qTe: "మీకు తలనొప్పిగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you been feeling unusually tired or weak?",
      qHi: "क्या आप असामान्य रूप से अत्यधिक थकान या कमजोरी महसूस कर रहे हैं?",
      qTe: "మీరు విపరీతమైన అలసట లేదా నీరసంగా ఉన్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a sore or irritated throat?",
      qHi: "क्या गले में खराश या दर्द है?",
      qTe: "గొంతు నొప్పి లేదా మంటగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting or loose stools?",
      qHi: "क्या आपको उल्टी या पतले दस्त हुए हैं?",
      qTe: "మీకు వాంతులు లేదా విరేచనాలు అయ్యాయా?",
      opts: [
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Loose stools", hi: "पतले दस्त", te: "విరేచనాలు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing any difficulty or discomfort while breathing?",
      qHi: "क्या सांस लेने में कोई कठिनाई या बेचैनी महसूस हो रही है?",
      qTe: "శ్వాస తీసుకోవడంలో ఏదైనా ఇబ్బంది లేదా అసౌకర్యం ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you able to drink enough water and other fluids?",
      qHi: "क्या आप पर्याप्त पानी और तरल पदार्थ पी पा रहे हैं?",
      qTe: "మీరు తగినంత నీరు మరియు ద్రవాలు తాగగలుగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Only small amounts", hi: "केवल थोड़ी मात्रा में", te: "కొద్ది మొత్తంలో మాత్రమే" }
      ]
    }
  ],

  "COVID-19": [
    {
      qEn: "Have you taken a COVID-19 test for your current symptoms?",
      qHi: "क्या आपने वर्तमान लक्षणों के लिए कोविड-19 टेस्ट कराया है?",
      qTe: "మీ ప్రస్తుత లక్షణాల కోసం మీరు కోవిడ్-19 పరీక్ష చేయించుకున్నారా?",
      opts: [
        { en: "Positive", hi: "पॉजिटिव", te: "పాజిటివ్" },
        { en: "Negative", hi: "नेगेटिव", te: "నెగెటివ్" },
        { en: "Not tested", hi: "जांच नहीं हुई", te: "పరీక్ష చేయించలేదు" },
        { en: "Waiting for result", hi: "रिजल्ट का इंतजार है", te: "ఫలితం కోసం ఎదురుచూస్తున్నాను" }
      ]
    },
    {
      qEn: "When did your symptoms first begin?",
      qHi: "आपके लक्षण सबसे पहले कब शुरू हुए थे?",
      qTe: "మీ లక్షణాలు మొదట ఎప్పుడు ప్రారంభమయ్యాయి?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–3 days ago", hi: "1–3 दिन पहले", te: "1–3 రోజుల క్రితం" },
        { en: "4–7 days ago", hi: "4–7 दिन पहले", te: "4–7 రోజుల క్రితం" },
        { en: "More than 1 week ago", hi: "1 सप्ताह से अधिक पहले", te: "1 వారం కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "Have you had a fever since your symptoms began?",
      qHi: "क्या लक्षण शुरू होने के बाद से आपको बुखार आया है?",
      qTe: "లక్షణాలు ప్రారంభమైనప్పటి నుండి మీకు జ్వరం వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a cough along with your other symptoms?",
      qHi: "क्या अन्य लक्षणों के साथ खांसी भी है?",
      qTe: "ఇతర లక్షణాలతో పాటు దగ్గు కూడా ఉందా?",
      opts: [
        { en: "Dry cough", hi: "सूखी खांसी", te: "పొడి దగ్గు" },
        { en: "Cough with phlegm", hi: "बलगम वाली खांसी", te: "కఫంతో కూడిన దగ్గు" },
        { en: "No cough", hi: "खांसी नहीं", te: "దగ్గు లేదు" }
      ]
    },
    {
      qEn: "Are you experiencing any shortness of breath or difficulty breathing?",
      qHi: "क्या सांस लेने में तकलीफ या सांस फूलने की समस्या हो रही है?",
      qTe: "శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా ఆయాసం అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you having any chest pain or pressure?",
      qHi: "क्या आपको सीने में दर्द या भारीपन महसूस हो रहा है?",
      qTe: "ఛాతీలో నొప్పి లేదా బరువుగా అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any change or loss of your sense of taste or smell?",
      qHi: "क्या आपने स्वाद या सूंघने की क्षमता में कोई कमी महसूस की है?",
      qTe: "రుచి లేదా వాసన చూసే సామర్థ్యం తగ్గిందా లేదా కోల్పోయారా?",
      opts: [
        { en: "Loss of taste", hi: "स्वाद का न आना", te: "రుచి తెలియకపోవడం" },
        { en: "Loss of smell", hi: "गंध का न आना", te: "వాసన తెలియకపోవడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "No change", hi: "कोई बदलाव नहीं", te: "మార్పు లేదు" }
      ]
    },
    {
      qEn: "Are you experiencing a sore or irritated throat?",
      qHi: "क्या गले में खराश या जलन है?",
      qTe: "గొంతు నొప్పి లేదా మంటగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have your symptoms become worse recently?",
      qHi: "क्या हाल ही में आपके लक्षण और गंभीर हो गए हैं?",
      qTe: "ఇటీవల మీ లక్షణాలు మరింత తీవ్రమయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    },
    {
      qEn: "Have you received any treatment or taken any medicines for your current symptoms?",
      qHi: "क्या आपने वर्तमान लक्षणों के लिए कोई इलाज या दवा ली है?",
      qTe: "మీ ప్రస్తుత లక్షణాల కోసం ఏవైనా మందులు లేదా చికిత్స తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Cough": [
    {
      qEn: "How long have you been experiencing the cough?",
      qHi: "आपको कितने समय से खांसी हो रही है?",
      qTe: "మీకు ఎంతకాలంగా దగ్గు వస్తోంది?",
      opts: [
        { en: "Less than 1 week", hi: "1 सप्ताह से कम", te: "1 వారం కంటే తక్కువ" },
        { en: "1–3 weeks", hi: "1–3 सप्ताह", te: "1–3 వారాలు" },
        { en: "3–8 weeks", hi: "3–8 सप्ताह", te: "3–8 వారాలు" },
        { en: "More than 8 weeks", hi: "8 सप्ताह से अधिक", te: "8 వారాల కంటే ఎక్కువ" }
      ]
    },
    {
      qEn: "Is your cough dry, or are you bringing up phlegm?",
      qHi: "क्या आपकी खांसी सूखी है, या बलगम आ रहा है?",
      qTe: "మీకు పొడి దగ్గు వస్తుందా, లేక కఫం పడుతుందా?",
      opts: [
        { en: "Dry cough", hi: "सूखी खांसी", te: "పొడి దగ్గు" },
        { en: "Cough with phlegm", hi: "बलगम वाली खांसी", te: "కఫంతో కూడిన దగ్గు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" }
      ]
    },
    {
      qEn: "If you are bringing up phlegm, what color is it?",
      qHi: "यदि बलगम आ रहा है, तो उसका रंग कैसा है?",
      qTe: "ఒకవేళ కఫం వస్తుంటే, దాని రంగు ఏమిటి?",
      opts: [
        { en: "Clear/white", hi: "साफ / सफेद", te: "స్వచ్ఛమైనది / తెలుపు" },
        { en: "Yellow", hi: "पीला", te: "పసుపు" },
        { en: "Green", hi: "हरा", te: "ఆకుపచ్చ" },
        { en: "Blood-stained", hi: "खून लगा हुआ", te: "రక్తం కలిసినది" },
        { en: "No phlegm", hi: "बलगम नहीं", te: "కఫం లేదు" }
      ]
    },
    {
      qEn: "Is your cough worse at a particular time of the day or night?",
      qHi: "क्या आपकी खांसी दिन या रात के किसी खास समय अधिक बढ़ जाती है?",
      qTe: "పగలు లేదా రాత్రి వేళల్లో ఏదైనా నిర్దిష్ట సమయంలో దగ్గు ఎక్కువగా ఉందా?",
      opts: [
        { en: "Morning", hi: "सुबह", te: "ఉదయం" },
        { en: "Daytime", hi: "दिन के समय", te: "పగటిపూట" },
        { en: "Night", hi: "रात", te: "రాత్రి" },
        { en: "Throughout the day", hi: "पूरे दिन", te: "రోజంతా" }
      ]
    },
    {
      qEn: "Have you had a fever along with the cough?",
      qHi: "क्या खांसी के साथ बुखार भी आया है?",
      qTe: "దగ్గుతో పాటు మీకు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you hear a wheezing or whistling sound when you breathe?",
      qHi: "क्या सांस लेते समय सीटी जैसी आवाज या घरघराहट सुनाई देती है?",
      qTe: "శ్వాస తీసుకునేటప్పుడు పిల్లికూతలు లేదా ఈల వేసినట్లు శబ్దం వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing shortness of breath along with the cough?",
      qHi: "क्या खांसी के साथ सांस फूलने की समस्या हो रही है?",
      qTe: "దగ్గుతో పాటు శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా ఆయాసం ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you having any chest pain when you cough or breathe?",
      qHi: "क्या खांसते या सांस लेते समय सीने में दर्द होता है?",
      qTe: "దగ్గినప్పుడు లేదా ఊపిరి పీల్చుకున్నప్పుడు ఛాతీలో నొప్పి వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced unexplained weight loss or night sweats recently?",
      qHi: "क्या हाल ही में बिना कारण वजन कम हुआ है या रात में पसीना आया है?",
      qTe: "ఇటీవల బరువు తగ్గడం లేదా రాత్రి వేళల్లో చెమటలు పట్టడం జరిగిందా?",
      opts: [
        { en: "Weight loss", hi: "वजन घटना", te: "బరువు తగ్గడం" },
        { en: "Night sweats", hi: "रात में पसीना आना", te: "రాత్రి చెమటలు పట్టడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Do you currently smoke or use any tobacco products?",
      qHi: "क्या आप धूम्रपान करते हैं या तंबाकू का सेवन करते हैं?",
      qTe: "మీరు ధూమపానం లేదా పొగాకు ఉత్పత్తులను ఉపయోగిస్తున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Previously used but stopped", hi: "पहले इस्तेमाल करते थे पर छोड़ दिया", te: "గతంలో వాడేవాడిని కానీ మానేశాను" }
      ]
    }
  ],

  "Sore Throat": [
    {
      qEn: "When did your sore throat first begin?",
      qHi: "आपके गले में खराश या दर्द सबसे पहले कब शुरू हुआ था?",
      qTe: "మీ గొంతు నొప్పి లేదా మంట మొదట ఎప్పుడు ప్రారంభమైంది?",
      opts: [
        { en: "Today", hi: "आज", te: "ఈరోజు" },
        { en: "1–3 days ago", hi: "1–3 दिन पहले", te: "1–3 రోజుల క్రితం" },
        { en: "4–7 days ago", hi: "4–7 दिन पहले", te: "4–7 రోజుల క్రితం" },
        { en: "More than 1 week ago", hi: "1 सप्ताह से अधिक पहले", te: "1 వారం కంటే ఎక్కువ క్రితం" }
      ]
    },
    {
      qEn: "How severe is your throat pain?",
      qHi: "आपके गले का दर्द कितना गंभीर है?",
      qTe: "మీ గొంతు నొప్పి ఎంత తీవ్రంగా ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" }
      ]
    },
    {
      qEn: "Does swallowing food, water, or saliva cause pain?",
      qHi: "क्या खाना, पानी या लार निगलने में दर्द होता है?",
      qTe: "ఆహారం, నీరు లేదా లాలాజలం మింగేటప్పుడు నొప్పిగా ఉందా?",
      opts: [
        { en: "Food", hi: "भोजन", te: "ఆహారం" },
        { en: "Water", hi: "पानी", te: "నీరు" },
        { en: "Saliva", hi: "लार", te: "లాలాజలం" },
        { en: "All of these", hi: "ये सभी", te: "ఇవన్నీ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Have you had a fever along with the sore throat?",
      qHi: "क्या गले में दर्द के साथ बुखार भी आया है?",
      qTe: "గొంతు నొప్పితో పాటు జ్వరం కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you also experiencing a cough or runny nose?",
      qHi: "क्या आपको खांसी या बहती नाक की समस्या भी है?",
      qTe: "మీకు దగ్గు లేదా ముక్కు కారడం కూడా ఉందా?",
      opts: [
        { en: "Cough", hi: "खांसी", te: "దగ్గు" },
        { en: "Runny nose", hi: "बहती नाक", te: "ముక్కు కారడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any swelling in your neck?",
      qHi: "क्या आपने अपनी गर्दन में कोई सूजन महसूस की है?",
      qTe: "మీ మెడ భాగంలో ఏవైనా వాపులు గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has your voice become hoarse or changed recently?",
      qHi: "क्या हाल ही में आपकी आवाज भारी या बदल गई है?",
      qTe: "ఇటీవల మీ గొంతు బొంగురుపోయిందా లేదా స్వరం మారిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you having any difficulty breathing?",
      qHi: "क्या आपको सांस लेने में कोई कठिनाई हो रही है?",
      qTe: "శ్వాస తీసుకోవడంలో ఏదైనా ఇబ్బందిగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you having difficulty swallowing your own saliva?",
      qHi: "क्या आपको अपनी लार निगलने में भी कठिनाई हो रही है?",
      qTe: "లాలాజలం మింగడం కూడా కష్టంగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine for your throat pain or infection?",
      qHi: "क्या आपने गले के दर्द या संक्रमण के लिए कोई दवा ली है?",
      qTe: "గొంతు నొప్పి లేదా ఇన్ఫెక్షన్ కోసం ఏదైనా మందు వాడారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Asthma": [
    {
      qEn: "Are you feeling short of breath right now?",
      qHi: "क्या आपको इस समय सांस लेने में तकलीफ या सांस फूल रही है?",
      qTe: "ప్రస్తుతం మీకు ఊపిరి ఆడకపోవడం లేదా ఆయాసంగా అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you experience wheezing or a whistling sound when you breathe?",
      qHi: "क्या सांस लेते समय घरघराहट या सीटी जैसी आवाज आती है?",
      qTe: "శ్వాస తీసుకునేటప్పుడు పిల్లికూతలు లేదా ఈల వేసినట్లు శబ్దం వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you previously been diagnosed with asthma?",
      qHi: "क्या आपको पहले कभी अस्थमा या दमा होने का पता चला है?",
      qTe: "గతంలో మీకు ఆస్తమా లేదా ఉబ్బసం ఉన్నట్లు నిర్ధారించబడిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Do your breathing symptoms appear after exposure to a particular trigger?",
      qHi: "क्या सांस की तकलीफ किसी खास कारण के संपर्क में आने से शुरू होती है?",
      qTe: "ఏదైనా నిర్దిష్ట కారణాల వల్ల ఈ ఆయాసం పెరుగుతుందా?",
      opts: [
        { en: "Dust", hi: "धूल", te: "దుమ్ము" },
        { en: "Smoke", hi: "धुआं", te: "పొగ" },
        { en: "Cold air", hi: "ठंडी हवा", te: "చల్లని గాలి" },
        { en: "Exercise", hi: "व्यायाम", te: "వ్యాయామం" },
        { en: "Other", hi: "अन्य", te: "ఇతర" },
        { en: "No known trigger", hi: "कोई निश्चित कारण नहीं", te: "ఎలాంటి స్పష్టమైన కారణం లేదు" }
      ]
    },
    {
      qEn: "Do your breathing symptoms become worse or wake you up at night?",
      qHi: "क्या सांस की समस्या रात में बढ़ जाती है या नींद खुल जाती है?",
      qTe: "రాత్రి వేళల్లో శ్వాస సమస్య ఎక్కువై మెలకువ వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a prescribed inhaler for your breathing problems?",
      qHi: "क्या आपके पास सांस की समस्या के लिए डॉक्टर द्वारा दिया गया इनहेलर है?",
      qTe: "శ్వాస సమస్య కోసం డాక్టర్ సూచించిన ఇన్హేలర్ మీ వద్ద ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you used your inhaler during the current episode?",
      qHi: "क्या आपने वर्तमान समस्या के दौरान अपने इनहेलर का उपयोग किया है?",
      qTe: "ప్రస్తుత ఆయాసం సమయంలో మీరు ఇన్హేలర్ ఉపయోగించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not applicable", hi: "लागू नहीं होता", te: "వర్తించదు" }
      ]
    },
    {
      qEn: "Does using your inhaler usually provide relief from your breathing symptoms?",
      qHi: "क्या इनहेलर लेने से सांस की समस्या में आराम मिलता है?",
      qTe: "ఇన్హేలర్ వాడినప్పుడు శ్వాస సమస్య నుండి ఉపశమనం లభిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" },
        { en: "Not applicable", hi: "लागू नहीं होता", te: "వర్తించదు" }
      ]
    },
    {
      qEn: "Have you ever needed emergency treatment because of a severe asthma attack?",
      qHi: "क्या आपको गंभीर अस्थमा अटैक के कारण कभी आपातकालीन इलाज की आवश्यकता पड़ी है?",
      qTe: "తీవ్రమైన ఆస్తమా ఎటాక్ వల్ల ఎప్పుడైనా ఎమర్జెన్సీ చికిత్స తీసుకోవాల్సి వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you able to speak in complete sentences without stopping because of breathlessness?",
      qHi: "क्या आप बिना रुके पूरे वाक्य बोल पा रहे हैं?",
      qTe: "ఆయాసం వల్ల ఆగకుండా పూర్తి వాక్యాలు మాట్లాడగలుగుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Pneumonia": [
    {
      qEn: "Have you had a fever along with your current symptoms?",
      qHi: "क्या वर्तमान लक्षणों के साथ आपको बुखार भी आया है?",
      qTe: "ప్రస్తుత లక్షణాలతో పాటు మీకు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Is your cough dry, or are you producing phlegm?",
      qHi: "क्या आपकी खांसी सूखी है या बलगम वाली है?",
      qTe: "మీకు పొడి దగ్గు వస్తుందా లేక కఫం పడుతుందా?",
      opts: [
        { en: "Dry cough", hi: "सूखी खांसी", te: "పొడి దగ్గు" },
        { en: "Cough with phlegm", hi: "बलगम वाली खांसी", te: "కఫంతో కూడిన దగ్గు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" }
      ]
    },
    {
      qEn: "If you are producing phlegm, what color is it?",
      qHi: "यदि बलगम आ रहा है, तो उसका रंग क्या है?",
      qTe: "కఫం వస్తుంటే దాని రంగు ఏమిటి?",
      opts: [
        { en: "Clear/white", hi: "साफ / सफेद", te: "స్వచ్ఛమైనది / తెలుపు" },
        { en: "Yellow", hi: "पीला", te: "పసుపు" },
        { en: "Green", hi: "हरा", te: "ఆకుపచ్చ" },
        { en: "Blood-stained", hi: "खून लगा हुआ", te: "రక్తం కలిసినది" },
        { en: "Not applicable", hi: "लागू नहीं होता", te: "వర్తించదు" }
      ]
    },
    {
      qEn: "Are you experiencing shortness of breath or difficulty breathing?",
      qHi: "क्या आपको सांस लेने में तकलीफ या सांस फूलने की समस्या हो रही है?",
      qTe: "ఊపిరి ఆడకపోవడం లేదా శ్వాస తీసుకోవడంలో ఇబ్బందిగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Does your chest pain become worse when you take a deep breath or cough?",
      qHi: "क्या गहरी सांस लेने या खांसने पर सीने का दर्द बढ़ जाता है?",
      qTe: "లోతుగా ఊపిరి పీల్చుకున్నప్పుడు లేదా దగ్గినప్పుడు ఛాతీ నొప్పి ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "No chest pain", hi: "सीने में दर्द नहीं", te: "ఛాతీ నొప్పి లేదు" }
      ]
    },
    {
      qEn: "Have you experienced chills or shivering along with the fever or cough?",
      qHi: "क्या बुखार या खांसी के साथ कंपकंपी या ठंड महसूस हुई है?",
      qTe: "జ్వరం లేదా దగ్గుతో పాటు చలి లేదా వణుకు అనిపించిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you feeling unusually weak or exhausted?",
      qHi: "क्या आप अत्यधिक कमजोरी या थकान महसूस कर रहे हैं?",
      qTe: "మీరు విపరీతమైన నీరసం లేదా అలసటగా ఉన్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you measured your oxygen level using a pulse oximeter?",
      qHi: "क्या आपने पल्स ऑक्सीमीटर से अपने ऑक्सीजन स्तर की जांच की है?",
      qTe: "పల్స్ ఆక్సిమీటర్ ఉపయోగించి మీ ఆక్సిజన్ స్థాయిని కొలిచారా?",
      opts: [
        { en: "Below 90%", hi: "90% से कम", te: "90% కంటే తక్కువ" },
        { en: "90–94%", hi: "90–94%", te: "90–94%" },
        { en: "95% or above", hi: "95% या अधिक", te: "95% లేదా అంతకంటే ఎక్కువ" },
        { en: "Not measured", hi: "मापा नहीं गया", te: "కొలవలేదు" }
      ]
    },
    {
      qEn: "Have your breathing or other symptoms become worse recently?",
      qHi: "क्या हाल ही में सांस लेने या अन्य लक्षण और बदतर हो गए हैं?",
      qTe: "ఇటీవల శ్వాస లేదా ఇతర లక్షణాలు మరింత తీవ్రమయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    },
    {
      qEn: "Did these symptoms begin after a recent cold, flu, or other respiratory infection?",
      qHi: "क्या ये लक्षण हाल ही में हुई सर्दी, फ्लू या सांस के संक्रमण के बाद शुरू हुए?",
      qTe: "ఇటీవల జలుబు, ఫ్లూ లేదా శ్వాసకోశ ఇన్ఫెక్షన్ తర్వాత ఈ లక్షణాలు మొదలయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    }
  ],

  "Tuberculosis (TB)": [
    {
      qEn: "How long have you been experiencing the cough?",
      qHi: "आपको कितने समय से खांसी हो रही है?",
      qTe: "మీకు ఎంతకాలంగా దగ్గు వస్తోంది?",
      opts: [
        { en: "Less than 2 weeks", hi: "2 सप्ताह से कम", te: "2 వారాల కంటే తక్కువ" },
        { en: "2–4 weeks", hi: "2–4 सप्ताह", te: "2–4 వారాలు" },
        { en: "1–3 months", hi: "1–3 महीने", te: "1–3 నెలలు" },
        { en: "More than 3 months", hi: "3 महीने से अधिक", te: "3 నెలల కంటే ఎక్కువ" }
      ]
    },
    {
      qEn: "Are you bringing up phlegm when you cough?",
      qHi: "क्या खांसते समय बलगम निकलता है?",
      qTe: "దగ్గినప్పుడు కఫం పడుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any blood in your phlegm?",
      qHi: "क्या आपने बलगम में कभी खून देखा है?",
      qTe: "కఫంలో ఎప్పుడైనా రక్తం పడటం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have a fever that is more noticeable at a particular time of day?",
      qHi: "क्या बुखार दिन के किसी खास समय अधिक महसूस होता है?",
      qTe: "రోజులో ఏదైనా నిర్దిష్ట సమయంలో జ్వరం ఎక్కువగా ఉంటుందా?",
      opts: [
        { en: "Mostly in the evening", hi: "मुख्य रूप से शाम को", te: "ప్రధానంగా సాయంత్రం వేళల్లో" },
        { en: "Throughout the day", hi: "पूरे दिन", te: "రోజంతా" },
        { en: "Comes and goes", hi: "आता-जाता रहता है", te: "వచ్చి పోతుంది" },
        { en: "No fever", hi: "बुखार नहीं", te: "జ్వరం లేదు" }
      ]
    },
    {
      qEn: "Have you been experiencing night sweats recently?",
      qHi: "क्या हाल ही में रात को सोते समय पसीना आता है?",
      qTe: "ఇటీవల రాత్రి వేళల్లో విపరీతంగా చెమటలు పడుతున్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced unexplained weight loss recently?",
      qHi: "क्या हाल ही में बिना कारण आपका वजन कम हुआ है?",
      qTe: "ఇటీవల స్పష్టమైన కారణం లేకుండా బరువు తగ్గారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has your appetite decreased recently?",
      qHi: "क्या हाल ही में आपकी भूख कम हो गई है?",
      qTe: "ఇటీవల మీకు ఆకలి తగ్గిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you been in close contact with anyone who has had tuberculosis?",
      qHi: "क्या आप टीबी (क्षय रोग) से पीड़ित किसी व्यक्ति के करीबी संपर्क में रहे हैं?",
      qTe: "టీబీ (క్షయవ్యాధి) ఉన్న ఎవరితోనైనా మీరు సన్నిహితంగా గడిపారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you ever been treated for tuberculosis in the past?",
      qHi: "क्या अतीत में कभी आपका टीबी का इलाज हुआ है?",
      qTe: "గతంలో ఎప్పుడైనా మీరు టీబీకి చికిత్స తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Are you currently experiencing any difficulty breathing?",
      qHi: "क्या आपको इस समय सांस लेने में कोई कठिनाई हो रही है?",
      qTe: "ప్రస్తుతం మీకు శ్వాస తీసుకోవడంలో ఏదైనా ఇబ్బందిగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Allergic Rhinitis": [
    {
      qEn: "What is the main nasal symptom that is bothering you?",
      qHi: "नाक से जुड़ी कौन सी मुख्य समस्या आपको सबसे ज्यादा परेशान कर रही है?",
      qTe: "ముక్కుకు సంబంధించి మీకు ఎక్కువగా ఇబ్బంది కలిగిస్తున్న ప్రధాన సమస్య ఏమిటి?",
      opts: [
        { en: "Sneezing", hi: "छींक आना", te: "తుమ్ములు" },
        { en: "Runny nose", hi: "बहती नाक", te: "ముక్కు కారడం" },
        { en: "Blocked nose", hi: "बंद नाक", te: "ముక్కు దిబ్బడ" },
        { en: "Itching", hi: "खुजली", te: "దురద" }
      ]
    },
    {
      qEn: "Do you have a watery or blocked nose?",
      qHi: "क्या आपकी नाक से पानी बह रहा है या नाक बंद है?",
      qTe: "ముక్కు కారుతుందా లేక ముక్కు బిగుసుకుపోయిందా?",
      opts: [
        { en: "Watery/runny nose", hi: "पानी बहना", te: "ముక్కు కారడం" },
        { en: "Blocked nose", hi: "बंद नाक", te: "ముక్కు దిబ్బడ" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Are your eyes itchy, watery, or red along with your nasal symptoms?",
      qHi: "क्या नाक के लक्षणों के साथ आंखों में खुजली, पानी या लाली भी है?",
      qTe: "ముక్కు లక్షణాలతో పాటు కళ్ళలో దురద, నీరు కారడం లేదా ఎర్రబడటం ఉందా?",
      opts: [
        { en: "Itchy eyes", hi: "आंखों में खुजली", te: "కళ్ళలో దురద" },
        { en: "Watery eyes", hi: "आंखों से पानी आना", te: "కళ్ళలో నీరు కారడం" },
        { en: "Red eyes", hi: "आंखें लाल होना", te: "కళ్ళు ఎర్రబడటం" },
        { en: "Multiple", hi: "कई लक्षण", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Do your symptoms appear after exposure to a particular trigger?",
      qHi: "क्या आपके लक्षण किसी खास एलर्जी कारक के संपर्क में आने से होते हैं?",
      qTe: "ఏదైనా నిర్దిష్ట కారణాల వల్ల ఈ లక్షణాలు వస్తున్నాయా?",
      opts: [
        { en: "Dust", hi: "धूल", te: "దుమ్ము" },
        { en: "Pollen", hi: "परागकण", te: "పుప్పొడి" },
        { en: "Smoke", hi: "धुआं", te: "పొగ" },
        { en: "Pets", hi: "पालतू जानवर", te: "పెంపుడు జంతువులు" },
        { en: "Other", hi: "अन्य", te: "ఇతర" },
        { en: "No known trigger", hi: "कोई निश्चित कारण नहीं", te: "ఎలాంటి స్పష్టమైన కారణం లేదు" }
      ]
    },
    {
      qEn: "Do these symptoms become worse during a particular season?",
      qHi: "क्या ये लक्षण किसी खास मौसम में अधिक बढ़ जाते हैं?",
      qTe: "ఏదైనా ప్రత్యేక సీజన్‌లో ఈ లక్షణాలు ఎక్కువగా ఉంటాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you had a fever along with your nasal symptoms?",
      qHi: "क्या नाक के लक्षणों के साथ बुखार भी आया है?",
      qTe: "ముక్కు లక్షణాలతో పాటు మీకు జ్వరం వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you experience wheezing or difficulty breathing along with these symptoms?",
      qHi: "क्या इन लक्षणों के साथ घरघराहट या सांस लेने में तकलीफ होती है?",
      qTe: "ఈ లక్షణాలతో పాటు పిల్లికూతలు లేదా శ్వాస తీసుకోవడంలో ఇబ్బంది అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "How long have you been experiencing these symptoms?",
      qHi: "आप कितने समय से इन लक्षणों का अनुभव कर रहे हैं?",
      qTe: "ఎంతకాలంగా ఈ లక్షణాలు మీకు ఉన్నాయి?",
      opts: [
        { en: "Less than 1 week", hi: "1 सप्ताह से कम", te: "1 వారం కంటే తక్కువ" },
        { en: "1–4 weeks", hi: "1–4 सप्ताह", te: "1–4 వారాలు" },
        { en: "1–6 months", hi: "1–6 महीने", te: "1–6 నెలలు" },
        { en: "More than 6 months", hi: "6 महीने से अधिक", te: "6 నెలల కంటే ఎక్కువ" }
      ]
    },
    {
      qEn: "Have you experienced similar allergy symptoms in the past?",
      qHi: "क्या आपने अतीत में भी इसी तरह के एलर्जी के लक्षण महसूस किए हैं?",
      qTe: "గతంలో కూడా ఇలాంటి అలర్జీ లక్షణాలు మీకు వచ్చాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to relieve your allergy symptoms?",
      qHi: "क्या आपने एलर्जी के लक्षणों से राहत के लिए कोई दवा ली है?",
      qTe: "అలర్జీ లక్షణాల ఉపశమనం కోసం ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ]
};
