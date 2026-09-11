import { QuestionTranslation } from './group1.js';

export const GROUP_2: Record<string, QuestionTranslation[]> = {
  "Migraine": [
    {
      qEn: "Where on your head do you usually feel the migraine pain?",
      qHi: "सिर में आमतौर पर माइग्रेन का दर्द किस जगह महसूस होता है?",
      qTe: "సాధారణంగా తలలో మైగ్రేన్ నొప్పి ఎక్కడ అనిపిస్తుంది?",
      opts: [
        { en: "One side", hi: "एक तरफ", te: "ఒకవైపు" },
        { en: "Both sides", hi: "दोनों तरफ", te: "రెండు వైపులా" },
        { en: "Forehead", hi: "माथा", te: "నుదురు" },
        { en: "Back of head", hi: "सिर का पिछला हिस्सा", te: "తల వెనుక భాగం" },
        { en: "Around the eyes", hi: "आंखों के आसपास", te: "కళ్ళ చుట్టూ" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "How severe is your headache when it occurs?",
      qHi: "जब सिरदर्द होता है, तो वह कितना गंभीर होता है?",
      qTe: "తలనొప్పి వచ్చినప్పుడు అది ఎంత తీవ్రంగా ఉంటుంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "Very severe", hi: "बहुत गंभीर", te: "చాలా తీవ్రం" }
      ]
    },
    {
      qEn: "Does the pain feel throbbing or pulsating?",
      qHi: "क्या दर्द टीस मारने वाला या धड़कता हुआ महसूस होता है?",
      qTe: "నొప్పి పోటులా లేదా కొట్టుకుంటున్నట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Does bright light make your headache worse?",
      qHi: "क्या तेज रोशनी से आपका सिरदर्द बढ़ जाता है?",
      qTe: "తీవ్రమైన కాంతి వల్ల తలనొప్పి మరింత ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Does loud sound make your headache worse?",
      qHi: "क्या तेज आवाज से सिरदर्द बढ़ जाता है?",
      qTe: "గట్టి శబ్దాల వల్ల తలనొప్పి ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you feel nauseated or vomit when you have the headache?",
      qHi: "क्या सिरदर्द के समय जी मिचलाता है या उल्टी होती है?",
      qTe: "తలనొప్పి ఉన్నప్పుడు వికారంగా లేదా వాంతి వచ్చినట్లు ఉంటుందా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Do you experience any visual changes or other warning symptoms before the headache begins?",
      qHi: "क्या सिरदर्द शुरू होने से पहले आंखों के आगे रोशनी चमकना या धुंधलापन दिखता है?",
      qTe: "తలనొప్పి మొదలయ్యే ముందు చూపులో మార్పులు లేదా హెచ్చరిక సంకేతాలు ఏవైనా కనిపిస్తాయా?",
      opts: [
        { en: "Blurred vision", hi: "धुंधला दिखना", te: "మసక చూపు" },
        { en: "Flashing lights", hi: "रोशनी चमकना", te: "మెరుపులు కనిపించడం" },
        { en: "Blind spots", hi: "अंधे धब्बे", te: "కనిపించని మచ్చలు" },
        { en: "Other", hi: "अन्य", te: "ఇతర" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Have you noticed any specific trigger that tends to bring on your migraine?",
      qHi: "क्या किसी खास कारण (तनाव, नींद की कमी, धूप आदि) से माइग्रेन शुरू होता है?",
      qTe: "ఏదైనా నిర్దిష్ట కారణం వల్ల మైగ్రేన్ మొదలవుతోందా?",
      opts: [
        { en: "Stress", hi: "तनाव", te: "ఒత్తిడి" },
        { en: "Lack of sleep", hi: "नींद की कमी", te: "నిద్రలేమి" },
        { en: "Certain foods", hi: "विशेष खाद्य पदार्थ", te: "కొన్ని రకాల ఆహారాలు" },
        { en: "Bright light", hi: "तेज रोशनी", te: "తీవ్రమైన కాంతి" },
        { en: "Menstrual period", hi: "मासिक धर्म", te: "పీరియడ్స్" },
        { en: "Other", hi: "अन्य", te: "ఇతర" },
        { en: "No known trigger", hi: "कोई निश्चित कारण नहीं", te: "ఎలాంటి స్పష్టమైన కారణం లేదు" }
      ]
    },
    {
      qEn: "Have you experienced similar migraine attacks in the past?",
      qHi: "क्या आपको पहले भी ऐसे माइग्रेन के दौरे पड़ चुके हैं?",
      qTe: "గతంలో కూడా మీకు ఇలాంటి మైగ్రేన్ నొప్పులు వచ్చాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to relieve your headache?",
      qHi: "क्या आपने सिरदर्द कम करने के लिए कोई दवा ली है?",
      qTe: "తలనొప్పి తగ్గడానికి ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Headache": [
    {
      qEn: "Did your headache begin suddenly, or did it develop gradually?",
      qHi: "क्या आपका सिरदर्द अचानक शुरू हुआ या धीरे-धीरे बढ़ा?",
      qTe: "తలనొప్పి అకస్మాత్తుగా మొదలైందా లేక క్రమంగా పెరిగిందా?",
      opts: [
        { en: "Suddenly", hi: "अचानक", te: "అకస్మాత్తుగా" },
        { en: "Gradually", hi: "धीरे-धीरे", te: "క్రమంగా" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Where exactly do you feel the headache?",
      qHi: "सिर में ठीक किस जगह दर्द महसूस हो रहा है?",
      qTe: "తలలో ఖచ్చితంగా ఎక్కడ నొప్పిగా ఉంది?",
      opts: [
        { en: "Forehead", hi: "माथा", te: "నుదురు" },
        { en: "One side", hi: "एक तरफ", te: "ఒకవైపు" },
        { en: "Both sides", hi: "दोनों तरफ", te: "రెండు వైపులా" },
        { en: "Back of head", hi: "सिर का पिछला हिस्सा", te: "తల వెనుక భాగం" },
        { en: "Around the eyes", hi: "आंखों के आसपास", te: "కళ్ళ చుట్టూ" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "How severe is your headache?",
      qHi: "सिरदर्द कितना तेज है?",
      qTe: "తలనొప్పి తీవ్రత ఎంతవరకు ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "Very severe", hi: "बहुत गंभीर", te: "చాలా తీవ్రం" }
      ]
    },
    {
      qEn: "Do you have a fever along with the headache?",
      qHi: "क्या सिरदर्द के साथ बुखार भी है?",
      qTe: "తలనొప్పితో పాటు జ్వరం కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting along with the headache?",
      qHi: "क्या सिरदर्द के साथ उल्टी हुई है?",
      qTe: "తలనొప్పితో పాటు వాంతులు అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any change or loss of vision during the headache?",
      qHi: "क्या सिरदर्द के दौरान नजर में कोई बदलाव या धुंधलापन आया है?",
      qTe: "తలనొప్పి సమయంలో దృష్టిలో మార్పు లేదా మసకబారడం గమనించారా?",
      opts: [
        { en: "Blurred vision", hi: "धुंधला दिखना", te: "మసక చూపు" },
        { en: "Reduced vision", hi: "दृष्टि कम होना", te: "చూపు తగ్గడం" },
        { en: "Loss of vision", hi: "दृष्टि चली जाना", te: "చూపు కోల్పోవడం" },
        { en: "No change", hi: "कोई बदलाव नहीं", te: "మార్పు లేదు" }
      ]
    },
    {
      qEn: "Do you have stiffness or difficulty moving your neck?",
      qHi: "क्या आपकी गर्दन में अकड़न है या गर्दन हिलाने में दर्द हो रहा है?",
      qTe: "మెడ పట్టేసినట్లు లేదా మెడ తిప్పడానికి కష్టంగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing weakness or numbness in any part of your body?",
      qHi: "क्या शरीर के किसी भी हिस्से में कमजोरी या सुन्नपन महसूस हो रहा है?",
      qTe: "శరీరంలో ఎక్కడైనా బలహీనత లేదా తిమ్మిరిగా అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you recently had a head injury or accident?",
      qHi: "क्या हाल ही में सिर में कोई चोट या दुर्घटना हुई है?",
      qTe: "ఇటీవల తలకు ఏదైనా దెబ్బ తగలడం లేదా ప్రమాదం జరిగిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced a similar type of headache before?",
      qHi: "क्या आपको पहले भी कभी ऐसा सिरदर्द हुआ है?",
      qTe: "గతంలో కూడా మీకు ఇలాంటి తలనొప్పి వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Dizziness": [
    {
      qEn: "When you feel dizzy, does the room seem to spin, or do you mainly feel light-headed?",
      qHi: "क्या कमरा घूमता हुआ लगता है, या केवल सिर में हल्कापन / चक्कर महसूस होता है?",
      qTe: "గది మొత్తం తిరుగుతున్నట్లు అనిపిస్తుందా, లేక తల తేలికగా మైకంగా ఉంటుందా?",
      opts: [
        { en: "Room spinning", hi: "कमरा घूमता हुआ लगना", te: "గది తిరుగుతున్నట్లు అనిపించడం" },
        { en: "Light-headedness", hi: "सिर चकराना / हल्कापन", te: "తల తేలికగా అనిపించడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Does the dizziness occur or become worse when you stand up?",
      qHi: "क्या खड़े होने पर चक्कर आते हैं या बढ़ जाते हैं?",
      qTe: "నిలబడినప్పుడు తల తిరగడం ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Does moving your head make the dizziness worse?",
      qHi: "क्या सिर हिलाने से चक्कर बढ़ जाते हैं?",
      qTe: "తల అటూ ఇటూ తిప్పినప్పుడు కళ్ళు తిరగడం ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "How long does each episode of dizziness usually last?",
      qHi: "चक्कर का दौरा आमतौर पर कितनी देर तक रहता है?",
      qTe: "తలతిరుగుడు ఒక్కోసారి ఎంతసేపు ఉంటుంది?",
      opts: [
        { en: "A few seconds", hi: "कुछ सेकंड", te: "కొన్ని సెకన్లు" },
        { en: "Several minutes", hi: "कई मिनट", te: "కొన్ని నిమిషాలు" },
        { en: "Several hours", hi: "कई घंटे", te: "కొన్ని గంటలు" },
        { en: "Almost continuously", hi: "लगभग लगातार", te: "దాదాపు నిరంతరం" }
      ]
    },
    {
      qEn: "Have you noticed any hearing loss, ringing, or fullness in your ears along with the dizziness?",
      qHi: "क्या चक्कर के साथ कम सुनाई देना, कान बजना या भारीपन महसूस हुआ है?",
      qTe: "తలతిరుగుడుతో పాటు చెవుల్లో రింగింగ్ శబ్దం లేదా చెవి నిండినట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Hearing loss", hi: "कम सुनाई देना", te: "వినికిడి లోపం" },
        { en: "Ringing", hi: "कान बजना", te: "చెవుల్లో రింగింగ్ శబ్దం" },
        { en: "Fullness", hi: "भारीपन", te: "చెవి నిండినట్లు ఉండటం" },
        { en: "More than one", hi: "एक से अधिक", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Do you feel nauseated or feel like vomiting when you become dizzy?",
      qHi: "क्या चक्कर आने पर जी मिचलाता है या उल्टी जैसा महसूस होता है?",
      qTe: "కళ్ళు తిరిగినప్పుడు వికారం లేదా వాంతి వచ్చేలా అనిపిస్తుందా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you ever fainted or completely lost consciousness during an episode of dizziness?",
      qHi: "क्या चक्कर आने के दौरान आप कभी बेहोश हुए हैं?",
      qTe: "కళ్ళు తిరిగినప్పుడు ఎప్పుడైనా స్పృహ తప్పి పడిపోయారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing any weakness or numbness along with the dizziness?",
      qHi: "क्या चक्कर के साथ कोई कमजोरी या सुन्नपन महसूस हो रहा है?",
      qTe: "తలతిరుగుడుతో పాటు కాళ్లు చేతుల్లో బలహీనత లేదా తిమ్మిరి ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any difficulty with your vision or speech during an episode?",
      qHi: "क्या चक्कर आने पर देखने या बोलने में कोई कठिनाई हुई है?",
      qTe: "ఆ సమయంలో చూపులో లేదా మాట్లాడటంలో ఏదైనా ఇబ్బంది తలెత్తిందా?",
      opts: [
        { en: "Vision difficulty", hi: "देखने में परेशानी", te: "చూపులో ఇబ్బంది" },
        { en: "Speech difficulty", hi: "बोलने में परेशानी", te: "మాట్లాడటంలో ఇబ్బంది" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you recently started taking any new medicine before these symptoms began?",
      qHi: "क्या इन लक्षणों से पहले आपने कोई नई दवा लेना शुरू किया है?",
      qTe: "ఈ సమస్య మొదలయ్యే ముందు మీరు ఏదైనా కొత్త మందు వాడటం ప్రారంభించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    }
  ],

  "Fainting": [
    {
      qEn: "Did you completely lose consciousness during the episode?",
      qHi: "क्या उस दौरान आप पूरी तरह से बेहोश हो गए थे?",
      qTe: "ఆ సమయంలో మీరు పూర్తిగా స్పృహ కోల్పోయారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Approximately how long were you unconscious?",
      qHi: "आप लगभग कितनी देर तक बेहोश रहे?",
      qTe: "దాదాపు ఎంతసేపు స్పృహ లేకుండా ఉన్నారు?",
      opts: [
        { en: "A few seconds", hi: "कुछ सेकंड", te: "కొన్ని సెకన్లు" },
        { en: "Less than 1 minute", hi: "1 मिनट से कम", te: "1 నిమిషం కంటే తక్కువ" },
        { en: "More than 1 minute", hi: "1 मिनट से अधिक", te: "1 నిమిషం కంటే ఎక్కువ" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Did you feel dizzy, sweaty, weak, or otherwise unwell before you fainted?",
      qHi: "क्या बेहोश होने से पहले चक्कर, पसीना, कमजोरी या घबराहट महसूस हुई थी?",
      qTe: "స్పృహ తప్పే ముందు తలతిరగడం, చెమటలు, నీరసం లేదా అసౌకర్యంగా అనిపించిందా?",
      opts: [
        { en: "Dizziness", hi: "चक्कर आना", te: "తలతిరుగుడు" },
        { en: "Sweating", hi: "पसीना आना", te: "చెమటలు పట్టడం" },
        { en: "Weakness", hi: "कमजोरी", te: "బలహీనత" },
        { en: "More than one", hi: "एक से अधिक", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Did anyone notice shaking or unusual movements while you were unconscious?",
      qHi: "क्या बेहोशी के दौरान किसी ने झटके या असामान्य हरकतें देखीं?",
      qTe: "స్పృహ లేనప్పుడు శరీరంలో వణుకు లేదా ఫిట్స్ లాంటి కదలికలు ఉన్నట్లు ఎవరైనా గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Did you injure yourself when you fainted or fell?",
      qHi: "क्या गिरने या बेहोश होने से आपको कोई चोट लगी?",
      qTe: "కింద పడిపోయినప్పుడు మీకు ఏదైనా గాయమైందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "How quickly did you return to your normal state after regaining consciousness?",
      qHi: "होश आने के बाद आप कितनी जल्दी सामान्य महसूस करने लगे?",
      qTe: "స్పృహ వచ్చిన తర్వాత ఎంత త్వరగా సాధారణ స్థితికి వచ్చారు?",
      opts: [
        { en: "Immediately", hi: "तुरंत", te: "వెంటనే" },
        { en: "Within a few minutes", hi: "कुछ ही मिनटों में", te: "కొన్ని నిమిషాల్లో" },
        { en: "Took longer", hi: "अधिक समय लगा", te: "ఎక్కువ సమయం పట్టింది" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Were you having a fever or another illness around the time you fainted?",
      qHi: "क्या बेहोश होने के समय आपको बुखार या कोई अन्य बीमारी थी?",
      qTe: "స్పృహ తప్పిన సమయంలో మీకు జ్వరం లేదా ఏదైనా ఇతర అనారోగ్యం ఉందా?",
      opts: [
        { en: "Fever", hi: "बुखार", te: "జ్వరం" },
        { en: "Other illness", hi: "अन्य बीमारी", te: "ఇతర అనారోగ్యం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you ever been diagnosed with any heart disease or heart-related condition?",
      qHi: "क्या आपको पहले कभी दिल की कोई बीमारी होने का पता चला है?",
      qTe: "గతంలో మీకు గుండె జబ్బు లేదా గుండె సంబంధిత సమస్యలు ఏవైనా ఉన్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you experienced a similar fainting episode in the past?",
      qHi: "क्या अतीत में भी आप कभी इस तरह बेहोश हुए हैं?",
      qTe: "గతంలో కూడా ఎప్పుడైనా ఇలా స్పృహ తప్పి పడిపోయారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you currently taking any medicines that can lower your blood pressure?",
      qHi: "क्या आप ब्लड प्रेशर कम करने की कोई दवा ले रहे हैं?",
      qTe: "రక్తపోటు (బీపీ) తగ్గించే మందులు ఏవైనా ప్రస్తుతం వాడుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    }
  ],

  "Ear Infection": [
    {
      qEn: "Which ear is causing you pain or discomfort?",
      qHi: "किस कान में दर्द या परेशानी हो रही है?",
      qTe: "ఏ చెవిలో నొప్పి లేదా అసౌకర్యంగా ఉంది?",
      opts: [
        { en: "Left ear", hi: "बायां कान", te: "ఎడమ చెవి" },
        { en: "Right ear", hi: "दायां कान", te: "కుడి చెవి" },
        { en: "Both ears", hi: "दोनों कान", te: "రెండు చెవులు" }
      ]
    },
    {
      qEn: "How severe is the ear pain?",
      qHi: "कान का दर्द कितना तेज है?",
      qTe: "చెవి నొప్పి ఎంత తీవ్రంగా ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" }
      ]
    },
    {
      qEn: "Have you had a fever along with the ear symptoms?",
      qHi: "क्या कान के दर्द के साथ बुखार भी आया है?",
      qTe: "చెవి నొప్పితో పాటు జ్వరం కూడా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any fluid or discharge coming from your ear?",
      qHi: "क्या कान से कोई पानी, मवाद या स्राव बह रहा है?",
      qTe: "చెవి నుండి చీము లేదా నీరు వంటి స్రావాలు కారుతున్నాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has your hearing become reduced or blocked in the affected ear?",
      qHi: "क्या प्रभावित कान से कम सुनाई दे रहा है या कान बंद लग रहा है?",
      qTe: "ఆ చెవిలో వినికిడి తగ్గడం లేదా చెవి మూసుకుపోయినట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Did the ear symptoms begin after you recently had a cold or other respiratory infection?",
      qHi: "क्या हाल ही में सर्दी या जुकाम के बाद यह कान दर्द शुरू हुआ?",
      qTe: "ఇటీవల జలుబు లేదా శ్వాసకోశ ఇన్ఫెక్షన్ వచ్చిన తర్వాత చెవి నొప్పి మొదలైందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Does your ear feel blocked, full, or under pressure?",
      qHi: "क्या कान बंद, भारी या दबाव में महसूस हो रहा है?",
      qTe: "చెవి మూసుకుపోయినట్లు లేదా ఒత్తిడితో నిండినట్లు అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced dizziness or a spinning sensation along with the ear problem?",
      qHi: "क्या कान की समस्या के साथ चक्कर या सिर घूमने जैसा महसूस हुआ है?",
      qTe: "చెవి నొప్పితో పాటు కళ్ళు తిరగడం లేదా తలతిరుగుడు అనిపించిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has water or a foreign object recently entered your ear?",
      qHi: "क्या हाल ही में कान में पानी गया है या कोई बाहरी वस्तु घुसी है?",
      qTe: "ఇటీవల చెవిలోకి నీరు వెళ్లడం లేదా ఏదైనా వస్తువు చొచ్చుకుపోవడం జరిగిందా?",
      opts: [
        { en: "Water", hi: "पानी", te: "నీరు" },
        { en: "Foreign object", hi: "बाहरी वस्तु", te: "ఏదైనా వస్తువు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you used any medicine or ear drops for this problem?",
      qHi: "क्या आपने कान के लिए कोई दवा या ईयर ड्रॉप्स का इस्तेमाल किया है?",
      qTe: "ఈ సమస్య కోసం ఏదైనా మందు లేదా చెవి డ్రాప్స్ ఉపయోగించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Conjunctivitis (Eye Infection)": [
    {
      qEn: "Is the redness affecting one eye or both of your eyes?",
      qHi: "क्या लाली एक आंख में है या दोनों आंखों में?",
      qTe: "కన్ను ఎర్రబడటం ఒక కంటికే ఉందా లేక రెండు కళ్ళకు ఉందా?",
      opts: [
        { en: "Left eye", hi: "बाईं आंख", te: "ఎడమ కన్ను" },
        { en: "Right eye", hi: "दाईं आंख", te: "కుడి కన్ను" },
        { en: "Both eyes", hi: "दोनों आंखें", te: "రెండు కళ్ళు" }
      ]
    },
    {
      qEn: "How severe is the redness in your eye?",
      qHi: "आंख में लाली कितनी अधिक है?",
      qTe: "కన్ను ఎంత తీవ్రంగా ఎర్రబడింది?",
      opts: [
        { en: "Mild", hi: "हल्की", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" }
      ]
    },
    {
      qEn: "Are you noticing any discharge coming from your eye?",
      qHi: "क्या आंख से कीचड़, पानी या मवाद जैसा स्राव निकल रहा है?",
      qTe: "కంటి నుండి పుసులు లేదా నీరు కారడం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do your eyes feel itchy or irritated?",
      qHi: "क्या आंखों में खुजली या जलन महसूस हो रही है?",
      qTe: "కళ్ళలో దురద లేదా మంటగా ఉందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing any pain in your eye?",
      qHi: "क्या आपको आंख में दर्द हो रहा है?",
      qTe: "కంటిలో నొప్పి అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has your vision become blurred or changed since the eye problem began?",
      qHi: "क्या आंख की समस्या के बाद से धुंधला दिख रहा है या नजर में बदलाव आया है?",
      qTe: "సమస్య మొదలైనప్పటి నుండి చూపు మసకబారడం లేదా మారడం జరిగిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Does bright light make your eye discomfort or pain worse?",
      qHi: "क्या तेज रोशनी में आंख में दर्द या चुभन बढ़ जाती है?",
      qTe: "తీవ్రమైన కాంతిని చూసినప్పుడు కంటి నొప్పి లేదా అసౌకర్యం ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has anyone close to you recently had similar eye symptoms?",
      qHi: "क्या आपके आसपास या परिवार में किसी को हाल ही में आंख आने की समस्या हुई है?",
      qTe: "మీ కుటుంబంలో లేదా సన్నిహితుల్లో ఎవరికైనా ఇటీవల కండ్లకలక వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Do you currently wear contact lenses?",
      qHi: "क्या आप कॉन्टैक्ट लेंस पहनते हैं?",
      qTe: "మీరు కాంటాక్ట్ లెన్సులు వాడుతున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you used any eye drops or other treatment for this problem?",
      qHi: "क्या आपने आंखों के लिए कोई आई ड्रॉप या दवा का उपयोग किया है?",
      qTe: "కంటి చుక్కల మందు లేదా ఏదైనా చికిత్స తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Toothache": [
    {
      qEn: "Which tooth or area of your mouth is causing the pain?",
      qHi: "मुंह के किस दांत या हिस्से में दर्द हो रहा है?",
      qTe: "నోటిలో ఏ దంతం లేదా ఏ భాగంలో నొప్పి వస్తోంది?",
      opts: [
        { en: "Upper teeth", hi: "ऊपरी दांत", te: "పై దంతాలు" },
        { en: "Lower teeth", hi: "निचले दांत", te: "కింది దంతాలు" },
        { en: "Front teeth", hi: "सामने के दांत", te: "ముందు దంతాలు" },
        { en: "Back teeth", hi: "पीछे के दांत (दाढ़)", te: "వెనుక దంతాలు (దవడ పళ్ళు)" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "How severe is your tooth pain?",
      qHi: "दांत का दर्द कितना तेज है?",
      qTe: "పంటి నొప్పి ఎంత తీవ్రంగా ఉంది?",
      opts: [
        { en: "Mild", hi: "हल्का", te: "స్వల్పం" },
        { en: "Moderate", hi: "मध्यम", te: "మధ్యస్థం" },
        { en: "Severe", hi: "गंभीर", te: "తీవ్రం" },
        { en: "Very severe", hi: "बहुत गंभीर", te: "చాలా తీవ్రం" }
      ]
    },
    {
      qEn: "Does eating or drinking something hot or cold trigger your tooth pain?",
      qHi: "क्या गर्म या ठंडा खाने-पीने से दांत में झनझनाहट या दर्द बढ़ता है?",
      qTe: "వేడి లేదా చల్లని పదార్థాలు తిన్నప్పుడు/తాగినప్పుడు పంటి నొప్పి పెరుగుతుందా?",
      opts: [
        { en: "Hot food/drinks", hi: "गर्म खाना/पेय", te: "వేడి ఆహారం/పానీయాలు" },
        { en: "Cold food/drinks", hi: "ठंडा खाना/पेय", te: "చల్లని ఆహారం/పానీయాలు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Does chewing or biting make the tooth pain worse?",
      qHi: "क्या चबाने या काटने पर दर्द बढ़ जाता है?",
      qTe: "నమిలినప్పుడు లేదా కొరికినప్పుడు పంటి నొప్పి ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed any swelling of your gums, face, or jaw?",
      qHi: "क्या मसूड़ों, चेहरे या जबड़े में कोई सूजन आई है?",
      qTe: "చిగుళ్ళు, ముఖం లేదా దవడ వద్ద ఏవైనా వాపులు గమనించారా?",
      opts: [
        { en: "Gums", hi: "मसूड़े", te: "చిగుళ్ళు" },
        { en: "Face", hi: "चेहरा", te: "ముఖం" },
        { en: "Jaw", hi: "जबड़ा", te: "దవడ" },
        { en: "More than one", hi: "एक से अधिक", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "No swelling", hi: "कोई सूजन नहीं", te: "వాపు లేదు" }
      ]
    },
    {
      qEn: "Have you developed a fever along with the tooth pain?",
      qHi: "क्या दांत दर्द के साथ बुखार भी आया है?",
      qTe: "పంటి నొప్పితో పాటు జ్వరం కూడా వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you noticed a bad taste in your mouth or any pus around the affected tooth?",
      qHi: "क्या मुंह में खराब स्वाद आ रहा है या दांत के पास मवाद दिख रहा है?",
      qTe: "నోట్లో చెడు రుచి లేదా ఆ పంటి వద్ద చీము కారడం గమనించారా?",
      opts: [
        { en: "Bad taste", hi: "खराब स्वाद", te: "నోటి రుచి చెడిపోవడం" },
        { en: "Pus", hi: "मवाद", te: "చీము" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you recently undergone any dental treatment on the affected tooth?",
      qHi: "क्या हाल ही में उस दांत पर कोई डेंटल इलाज कराया गया है?",
      qTe: "ఇటీవల ఆ పంటికి సంబంధించి ఏదైనా దంత చికిత్స చేయించుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to relieve the tooth pain?",
      qHi: "क्या आपने दांत दर्द कम करने के लिए कोई दर्द निवारक दवा ली है?",
      qTe: "పంటి నొప్పి తగ్గడానికి ఏదైనా నొప్పి నివారణ మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Has the tooth pain been getting worse since it first started?",
      qHi: "क्या दांत का दर्द शुरू होने के बाद से लगातार बढ़ता जा रहा है?",
      qTe: "పంటి నొప్పి మొదలైనప్పటి నుండి మరింత ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "About the same", hi: "लगभग वैसा ही", te: "దాదాపు అలాగే ఉంది" }
      ]
    }
  ],

  "GERD (Acid Reflux)": [
    {
      qEn: "What is the main symptom you experience, such as heartburn or acid coming back into your mouth?",
      qHi: "आपको मुख्य रूप से क्या समस्या होती है, जैसे सीने में जलन या खट्टा पानी मुंह में आना?",
      qTe: "గుండెల్లో మంట లేదా పుల్లటి నీరు నోట్లోకి రావడం వంటి వాటిలో ఏది ఎక్కువగా ఉంది?",
      opts: [
        { en: "Heartburn", hi: "सीने में जलन", te: "గుండెల్లో మంట" },
        { en: "Acid reflux", hi: "एसिड रिफ्लक्स", te: "ఆమ్లం పైకి రావడం" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "Do your symptoms usually occur after eating a meal?",
      qHi: "क्या आपके लक्षण आमतौर पर खाना खाने के बाद होते हैं?",
      qTe: "ఆహారం తిన్న తర్వాత ఈ లక్షణాలు సాధారణంగా మొదలవుతాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Do your symptoms become worse when you lie down?",
      qHi: "क्या लेटने या झुकने पर जलन या एसिडिटी बढ़ जाती है?",
      qTe: "పడుకున్నప్పుడు లేదా వంగినప్పుడు ఈ మంట ఎక్కువవుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Sometimes", hi: "कभी-कभी", te: "కొన్నిసార్లు" }
      ]
    },
    {
      qEn: "Do your symptoms disturb or wake you up during the night?",
      qHi: "क्या रात के समय इन लक्षणों की वजह से आपकी नींद खुल जाती है?",
      qTe: "రాత్రి వేళల్లో ఈ సమస్య వల్ల నిద్రకు భంగం కలుగుతుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do you have difficulty swallowing food or liquids?",
      qHi: "क्या खाना या पानी निगलने में कोई कठिनाई होती है?",
      qTe: "ఆహారం లేదా నీరు మింగడంలో ఏదైనా ఇబ్బంది ఉందా?",
      opts: [
        { en: "Food", hi: "भोजन", te: "ఆహారం" },
        { en: "Liquids", hi: "तरल पदार्थ", te: "ద్రవాలు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "No difficulty", hi: "कोई कठिनाई नहीं", te: "ఎలాంటి ఇబ్బంది లేదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting along with your acid reflux symptoms?",
      qHi: "क्या एसिडिटी के लक्षणों के साथ उल्टी भी हुई है?",
      qTe: "ఎసిడిటీతో పాటు వాంతులు ఏమైనా అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced any unexplained weight loss recently?",
      qHi: "क्या हाल ही में बिना कारण वजन कम हुआ है?",
      qTe: "ఇటీవల అనుకోకుండా బరువు తగ్గారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Are you experiencing chest pain or a burning sensation in your chest?",
      qHi: "क्या आपको सीने में दर्द या तेज जलन महसूस हो रही है?",
      qTe: "ఛాతీలో నొప్పి లేదా తీవ్రమైన మంటగా అనిపిస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Do particular foods or drinks make your symptoms worse?",
      qHi: "क्या कुछ खास खाने या पीने की चीजों से परेशानी बढ़ जाती है?",
      qTe: "కొన్ని ప్రత్యేక ఆహారాలు లేదా పానీయాల వల్ల ఈ సమస్య ఎక్కువవుతోందా?",
      opts: [
        { en: "Spicy food", hi: "मसालेदार खाना", te: "కారంగా ఉండే ఆహారం" },
        { en: "Oily/fatty food", hi: "तैलीय/चिकना खाना", te: "నూనె/కొవ్వుతో కూడిన ఆహారం" },
        { en: "Tea/coffee", hi: "चाय/कॉफी", te: "టీ/కాఫీ" },
        { en: "Carbonated drinks", hi: "कोल्ड ड्रिंक/सोडा", te: "కూల్ డ్రింక్స్/సోడా" },
        { en: "Other", hi: "अन्य", te: "ఇతర" },
        { en: "No specific trigger", hi: "कोई विशेष कारण नहीं", te: "ప్రత్యేక కారణం లేదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to relieve acidity or acid reflux?",
      qHi: "क्या आपने एसिडिटी या गैस से राहत के लिए कोई एंटासिड दवा ली है?",
      qTe: "ఎసిడిటీ లేదా గ్యాస్ ఉపశమనం కోసం ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Gastritis": [
    {
      qEn: "Where in your upper abdomen do you feel the discomfort or pain?",
      qHi: "ऊपरी पेट के किस हिस्से में आपको दर्द या बेचैनी महसूस हो रही है?",
      qTe: "పై కడుపులో ఏ భాగంలో మీకు నొప్పి లేదా అసౌకర్యంగా ఉంది?",
      opts: [
        { en: "Upper middle", hi: "ऊपरी मध्य भाग", te: "పై మధ్య భాగం" },
        { en: "Upper left", hi: "ऊपरी बायां भाग", te: "పై ఎడమ భాగం" },
        { en: "Upper right", hi: "ऊपरी दायां भाग", te: "పై కుడి భాగం" },
        { en: "Around the whole upper abdomen", hi: "पूरे ऊपरी पेट में", te: "పై కడుపు అంతటా" }
      ]
    },
    {
      qEn: "What does your stomach pain feel like?",
      qHi: "पेट का दर्द किस तरह का महसूस होता है?",
      qTe: "కడుపు నొప్పి ఏ రకంగా అనిపిస్తుంది?",
      opts: [
        { en: "Burning", hi: "जलन", te: "మంట" },
        { en: "Dull/aching", hi: "हल्का/लगातार दर्द", te: "మొద్దుబారిన నొప్పి" },
        { en: "Cramping", hi: "मरोड़", te: "కడుపు పిసికినట్లు ఉండటం" },
        { en: "Sharp", hi: "तेज चुभने वाला", te: "తీవ్రమైన సూదిపోటు నొప్పి" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "Does the pain become better or worse after eating?",
      qHi: "क्या खाना खाने के बाद दर्द में आराम मिलता है या बढ़ जाता है?",
      qTe: "ఆహారం తిన్న తర్వాత నొప్పి తగ్గుతోందా లేక ఎక్కువవుతోందా?",
      opts: [
        { en: "Better after eating", hi: "खाने के बाद आराम", te: "ఆహారం తిన్న తర్వాత ఉపశమనం" },
        { en: "Worse after eating", hi: "खाने के बाद दर्द बढ़ना", te: "ఆహారం తిన్న తర్వాత ఎక్కువ కావడం" },
        { en: "No change", hi: "कोई बदलाव नहीं", te: "మార్పు లేదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you been experiencing nausea or vomiting along with the stomach discomfort?",
      qHi: "क्या पेट की तकलीफ के साथ जी मिचलाना या उल्टी हो रही है?",
      qTe: "కడుపు సమస్యతో పాటు వికారం లేదా వాంతులు అవుతున్నాయా?",
      opts: [
        { en: "Nausea", hi: "जी मिचलाना", te: "వికారం" },
        { en: "Vomiting", hi: "उल्टी", te: "వాంతులు" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "Neither", hi: "कोई नहीं", te: "ఏదీ కాదు" }
      ]
    },
    {
      qEn: "Have you noticed black stools or any blood in your vomit or stool?",
      qHi: "क्या उल्टी या मल में खून आया है या काले रंग का मल हुआ है?",
      qTe: "వాంతిలో లేదా మలంలో రక్తం పడటం, లేదా నల్లటి మలం రావడం గమనించారా?",
      opts: [
        { en: "Black stools", hi: "काला मल", te: "నల్లటి మలం" },
        { en: "Blood in vomit", hi: "उल्टी में खून", te: "వాంతిలో రక్తం" },
        { en: "Blood in stool", hi: "मल में खून", te: "మలంలో రక్తం" },
        { en: "More than one", hi: "एक से अधिक", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Do you regularly take painkillers such as ibuprofen or aspirin?",
      qHi: "क्या आप नियमित रूप से दर्द निवारक दवाएं (जैसे ब्रूफेन या एस्पिरिन) लेते हैं?",
      qTe: "మీరు క్రమం తప్పకుండా పెయిన్ కిల్లర్ మందులు వాడుతుంటారా?",
      opts: [
        { en: "Regularly", hi: "नियमित रूप से", te: "రోజూ క్రమం తప్పకుండా" },
        { en: "Occasionally", hi: "कभी-कभार", te: "అప్పుడప్పుడు" },
        { en: "No", hi: "नहीं", te: "లేదు" }
      ]
    },
    {
      qEn: "Do you consume alcohol regularly?",
      qHi: "क्या आप नियमित रूप से शराब का सेवन करते हैं?",
      qTe: "మీరు మద్యం క్రమం తప్పకుండా తీసుకుంటారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Occasionally", hi: "कभी-कभार", te: "అప్పుడప్పుడు" }
      ]
    },
    {
      qEn: "Are you experiencing bloating, fullness, or excessive gas?",
      qHi: "क्या पेट फूलना, भारीपन या अधिक गैस बनने की समस्या है?",
      qTe: "కడుపు ఉబ్బరం, బరువుగా ఉండటం లేదా విపరీతమైన గ్యాస్ సమస్య ఉందా?",
      opts: [
        { en: "Bloating", hi: "पेट फूलना", te: "కడుపు ఉబ్బరం" },
        { en: "Fullness", hi: "भारीपन", te: "చెవి నిండినట్లు ఉండటం" },
        { en: "Excessive gas", hi: "अधिक गैस", te: "ఎక్కువ గ్యాస్" },
        { en: "More than one", hi: "एक से अधिक", te: "ఒకటి కంటే ఎక్కువ" },
        { en: "None", hi: "कोई नहीं", te: "ఏదీ లేదు" }
      ]
    },
    {
      qEn: "Have you experienced gastritis or similar stomach problems in the past?",
      qHi: "क्या आपको पहले भी कभी गैस्ट्राइटिस या पेट में जलन की समस्या हुई है?",
      qTe: "గతంలో కూడా మీకు గ్యాస్ట్రైటిస్ లేదా కడుపులో మంట సమస్య వచ్చిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you taken any medicine to reduce your stomach symptoms or acidity?",
      qHi: "क्या आपने पेट की तकलीफ या एसिडिटी कम करने के लिए कोई दवा ली है?",
      qTe: "కడుపు మంట లేదా ఎసిడిటీ తగ్గడానికి ఏదైనా మందు తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ],

  "Peptic Ulcer": [
    {
      qEn: "Where in your upper abdomen do you usually feel the pain?",
      qHi: "ऊपरी पेट में आमतौर पर किस जगह दर्द महसूस होता है?",
      qTe: "పై కడుపులో సాధారణంగా ఎక్కడ నొప్పి వస్తోంది?",
      opts: [
        { en: "Upper middle", hi: "ऊपरी मध्य भाग", te: "పై మధ్య భాగం" },
        { en: "Upper left", hi: "ऊपरी बायां भाग", te: "పై ఎడమ భాగం" },
        { en: "Upper right", hi: "ऊपरी दायां भाग", te: "పై కుడి భాగం" },
        { en: "Other", hi: "अन्य", te: "ఇతర" }
      ]
    },
    {
      qEn: "Does the pain feel like burning or a dull discomfort?",
      qHi: "क्या दर्द में तेज जलन होती है या हल्का लगातार दर्द रहता है?",
      qTe: "నొప్పి మంటగా అనిపిస్తుందా లేక మొద్దుబారినట్లుగా ఉంటుందా?",
      opts: [
        { en: "Burning", hi: "जलन", te: "మంట" },
        { en: "Dull discomfort", hi: "हल्का दर्द", te: "మొద్దుబారిన అసౌకర్యం" },
        { en: "Sharp pain", hi: "तेज चुभने वाला दर्द", te: "తీవ్రమైన నొప్పి" },
        { en: "Cramping", hi: "मरोड़", te: "కడుపు పిసికినట్లు ఉండటం" }
      ]
    },
    {
      qEn: "Does the pain usually occur before or after eating?",
      qHi: "क्या दर्द आमतौर पर खाना खाने से पहले होता है या बाद में?",
      qTe: "నొప్పి భోజనానికి ముందు వస్తుందా లేక తిన్న తర్వాత వస్తుందా?",
      opts: [
        { en: "Before eating", hi: "खाने से पहले", te: "భోజనానికి ముందు" },
        { en: "After eating", hi: "खाने के बाद", te: "భోజనం తర్వాత" },
        { en: "Both", hi: "दोनों", te: "రెండూ" },
        { en: "No clear pattern", hi: "कोई निश्चित समय नहीं", te: "స్పష్టమైన సమయం లేదు" }
      ]
    },
    {
      qEn: "Does the stomach pain wake you up during the night?",
      qHi: "क्या पेट दर्द की वजह से रात में आपकी नींद खुल जाती है?",
      qTe: "కడుపు నొప్పి వల్ల రాత్రి వేళల్లో నిద్రలోంచి మెలకువ వస్తుందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you experienced vomiting along with the stomach pain?",
      qHi: "क्या पेट दर्द के साथ उल्टी भी हुई है?",
      qTe: "కడుపు నొప్పితో పాటు వాంతులు అయ్యాయా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    },
    {
      qEn: "Have you ever vomited blood or material that looked like coffee grounds?",
      qHi: "क्या उल्टी में कभी खून या कॉफी जैसे काले रंग का पदार्थ निकला है?",
      qTe: "వాంతిలో ఎప్పుడైనా రక్తం లేదా కాఫీ గింజల రంగులో పదార్థం పడిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you noticed black or tar-like stools?",
      qHi: "क्या आपने काले या डामर जैसे चिपचिपे मल का अनुभव किया है?",
      qTe: "నల్లటి లేదా తారు లాంటి మలం రావడం గమనించారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Do you regularly take painkillers such as ibuprofen or aspirin?",
      qHi: "क्या आप नियमित रूप से दर्द निवारक दवाएं लेते हैं?",
      qTe: "మీరు క్రమం తప్పకుండా పెయిన్ కిల్లర్ మందులు తీసుకుంటారా?",
      opts: [
        { en: "Regularly", hi: "नियमित रूप से", te: "రోజూ క్రమం తప్పకుండా" },
        { en: "Occasionally", hi: "कभी-कभार", te: "అప్పుడప్పుడు" },
        { en: "No", hi: "नहीं", te: "లేదు" }
      ]
    },
    {
      qEn: "Have you been diagnosed with a peptic ulcer in the past?",
      qHi: "क्या पहले कभी आपको पेट में अल्सर होने का पता चला है?",
      qTe: "గతంలో మీకు కడుపులో అల్సర్ ఉన్నట్లు నిర్ధారణ అయిందా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" },
        { en: "Not sure", hi: "निश्चित नहीं", te: "ఖచ్చితంగా తెలియదు" }
      ]
    },
    {
      qEn: "Have you previously received treatment for an ulcer or acidity-related problem?",
      qHi: "क्या आपने पहले कभी अल्सर या गंभीर एसिडिटी का इलाज कराया है?",
      qTe: "గతంలో అల్సర్ లేదా ఎసిడిటీ సంబంధిత సమస్యకు చికిత్స తీసుకున్నారా?",
      opts: [
        { en: "Yes", hi: "हाँ", te: "అవును" },
        { en: "No", hi: "नहीं", te: "కాదు" }
      ]
    }
  ]
};
