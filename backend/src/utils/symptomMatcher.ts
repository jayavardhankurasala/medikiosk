/**
 * Comprehensive Static Clinical Symptom Matcher for 50 OPD Conditions
 * Supports English, Hindi (Devanagari + Hinglish), and Telugu (Telugu Script + Transliteration)
 */

interface ConditionKeywords {
  pathwayKey: string;
  keywords: string[];
}

export const CLINICAL_PATHWAY_KEYWORDS: ConditionKeywords[] = [
  {
    pathwayKey: 'Fever',
    keywords: [
      'fever', 'high temperature', 'pyrexia', 'chills', 'shivering', 'febrile', 'hot body',
      // Telugu
      'జ్వరం', 'జ్వరము', 'ఒళ్ళు కాలుతుంది', 'సెగ', 'ఒళ్ళు వెచ్చగా', 'చలి జ్వరం',
      'jwaram', 'jvaram', 'ollu vechaga', 'sega', 'chali jwaram',
      // Hindi
      'बुखार', 'तेज़ बुखार', 'तपिश', 'ताप', 'हरारत', 'जाड़ा लगकर बुखार',
      'bukhar', 'tez bukhar', 'tapish', 'hararat'
    ]
  },
  {
    pathwayKey: 'Common Cold',
    keywords: [
      'cold', 'common cold', 'runny nose', 'sneezing', 'sneezes', 'nasal congestion', 'blocked nose', 'sniffles',
      // Telugu
      'జలుబు', 'రొంప', 'ముక్కు కారడం', 'తుమ్ములు', 'ముక్కు దిబ్బడ',
      'jalubu', 'rompa', 'mukku karadam', 'thummulu', 'mukku dibbada',
      // Hindi
      'सर्दी', 'जुकाम', 'जुखाम', 'बहती नाक', 'छींक', 'छींकें', 'नाक बंद',
      'sardi', 'jukam', 'zukam', 'zukaam', 'naak behna', 'cheenk'
    ]
  },
  {
    pathwayKey: 'Flu (Influenza)',
    keywords: [
      'flu', 'influenza', 'body chills with fever',
      // Telugu
      'ఫ్లూ', 'ఇన్ఫ్లుయెంజా',
      // Hindi
      'फ्लू', 'इन्फ्लूएंजा'
    ]
  },
  {
    pathwayKey: 'COVID-19',
    keywords: [
      'covid', 'covid-19', 'corona', 'coronavirus', 'loss of taste', 'loss of smell',
      // Telugu
      'కోవిడ్', 'కరోనా', 'రుచి తెలియకపోవడం', 'వాసన తెలియకపోవడం',
      // Hindi
      'कोविड', 'कोरोना', 'स्वाद न आना', 'गंध न आना'
    ]
  },
  {
    pathwayKey: 'Cough',
    keywords: [
      'cough', 'coughing', 'dry cough', 'wet cough', 'phlegm', 'sputum', 'barking cough',
      // Telugu
      'దగ్గు', 'పొడి దగ్గు', 'కఫం దగ్గు', 'తెమడ', 'కఫం',
      'daggu', 'podi daggu', 'kafam', 'themoda', 'daggutunnanu',
      // Hindi
      'खांसी', 'खाँसी', 'सूखी खांसी', 'बलगम', 'बलगम वाली खांसी', 'कफ',
      'khansi', 'sookhi khansi', 'balgam', 'sukhi khansi'
    ]
  },
  {
    pathwayKey: 'Sore Throat',
    keywords: [
      'sore throat', 'throat pain', 'throat irritation', 'difficulty swallowing', 'tonsil pain', 'pharyngitis',
      // Telugu
      'గొంతు నొప్పి', 'గొంతు మంట', 'గొంతు గరగర', 'మింగలేకపోతున్నాను', 'టాన్సిల్స్',
      'gonthu noppi', 'gonthu manta', 'gonthu garagara', 'mingaleka',
      // Hindi
      'गले में दर्द', 'गले में खराश', 'गले में चुभन', 'निगलने में दर्द', 'टॉन्सिल',
      'gale me dard', 'gale me kharash', 'galey me dard', 'tonsil'
    ]
  },
  {
    pathwayKey: 'Asthma',
    keywords: [
      'asthma', 'wheezing', 'breathless', 'inhaler', 'gasping for air', 'chest whistling',
      // Telugu
      'ఆస్తమా', 'ఉబ్బసం', 'ఆయాసం', 'పిల్లికూతలు', 'ఊపిరి ఆడకపోవడం',
      'asthma', 'ubbasam', 'aayaasam', 'aayasam', 'pillikootalu', 'oopiri',
      // Hindi
      'अस्थमा', 'दमा', 'सांस फूलना', 'सांस लेने में दिक्कत', 'सीटी जैसी आवाज',
      'dama', 'saans phoolna', 'saans lene me dikkat', 'wheezing'
    ]
  },
  {
    pathwayKey: 'Pneumonia',
    keywords: [
      'pneumonia', 'lung infection', 'chest congestion fever',
      // Telugu
      'న్యుమోనియా', 'ఊపిరితిత్తుల ఇన్ఫెక్షన్', 'pneumonia',
      // Hindi
      'निमोनिया', 'फेफड़ों का संक्रमण', 'pneumonia'
    ]
  },
  {
    pathwayKey: 'Tuberculosis (TB)',
    keywords: [
      'tuberculosis', 'tb', 'coughing blood', 'night sweats weight loss',
      // Telugu
      'టిబి', 'క్షయ', 'క్షయవ్యాధి', 'దగ్గులో రక్తం', 'రాత్రి పూట చెమటలు',
      'tb', 'tuberculosis', 'kshaya',
      // Hindi
      'टीबी', 'तपेदिक', 'क्षय रोग', 'खांसी में खून आना',
      'tb', 'kshay rog'
    ]
  },
  {
    pathwayKey: 'Allergic Rhinitis',
    keywords: [
      'allergic rhinitis', 'dust allergy', 'pollen allergy', 'continuous sneezing',
      // Telugu
      'అలెర్జిక్ రైనైటిస్', 'దుమ్ము అలర్జీ', 'dust allergy',
      // Hindi
      'धूल से एलर्जी', 'एलर्जिक राइनाइटिस', 'allergy'
    ]
  },
  {
    pathwayKey: 'Migraine',
    keywords: [
      'migraine', 'throbbing headache', 'one sided headache', 'half head pain', 'aura',
      // Telugu
      'మైగ్రేన్', 'పార్శ్వపు నొప్పి', 'ఒకవైపు తలనొప్పి',
      'migraine', 'parshwapu noppi',
      // Hindi
      'माइग्रेन', 'आधा सीसी का दर्द', 'एक तरफ सिरदर्द',
      'migraine', 'aadha sirdard'
    ]
  },
  {
    pathwayKey: 'Headache',
    keywords: [
      'headache', 'head pain', 'heavy head', 'forehead pain',
      // Telugu
      'తలనొప్పి', 'తల నొప్పి', 'తల బరువుగా ఉంది', 'తలపోటు',
      'talanoppi', 'thala noppi', 'thalanoppi', 'thala baruvu',
      // Hindi
      'सिरदर्द', 'सिर में दर्द', 'सर दर्द', 'सर में भारीपन',
      'sirdard', 'sar dard', 'sar me dard', 'sir dard'
    ]
  },
  {
    pathwayKey: 'Dizziness',
    keywords: [
      'dizziness', 'dizzy', 'vertigo', 'room spinning', 'lightheaded', 'giddiness',
      // Telugu
      'తలతిరుగుడు', 'తల తిరగడం', 'కళ్ళు తిరగడం', 'మైకం',
      'talathirugudu', 'kallu tiragadam', 'kallu tirugutunnayi', 'maikam',
      // Hindi
      'चक्कर आना', 'सिर चकराना', 'सिर घूमना', 'चक्कर',
      'chakkar', 'chakkar aana', 'sar ghoomna', 'dizziness'
    ]
  },
  {
    pathwayKey: 'Fainting',
    keywords: [
      'fainting', 'fainted', 'passed out', 'blackout', 'loss of consciousness', 'syncope',
      // Telugu
      'స్పృహ తప్పడం', 'మూర్ఛ', 'కళ్ళు తిరిగి పడిపోవడం',
      'spruha tappadam', 'moorcha', 'padipoyadu',
      // Hindi
      'बेहोश होना', 'बेहोशी', 'चक्कर खाकर गिरना',
      'behosh', 'behoshi', 'behosh hona'
    ]
  },
  {
    pathwayKey: 'Ear Infection',
    keywords: [
      'ear infection', 'ear pain', 'earache', 'ear discharge', 'pus in ear',
      // Telugu
      'చెవి నొప్పి', 'చెవిలో చీము', 'చెవి పోటు', 'చెవి దిబ్బడ',
      'chevi noppi', 'chevi potu', 'chevi lo cheemu',
      // Hindi
      'कान में दर्द', 'कान बहना', 'कान का संक्रमण', 'कान में मवाद',
      'kaan me dard', 'kaan behna', 'kaan dard'
    ]
  },
  {
    pathwayKey: 'Conjunctivitis (Eye Infection)',
    keywords: [
      'conjunctivitis', 'pink eye', 'red eye', 'eye infection', 'sticky eye discharge',
      // Telugu
      'కండ్లకలక', 'కన్ను ఎర్రబడటం', 'కంటి ఇన్ఫెక్షన్', 'కళ్ళలో చీము',
      'kandlakalaka', 'kannu erraga', 'kanti infection',
      // Hindi
      'आंख आना', 'आंख लाल होना', 'आंखों में संक्रमण', 'आंख में कीचड़',
      'aankh aana', 'aankh laal hona', 'aankh infection'
    ]
  },
  {
    pathwayKey: 'Toothache',
    keywords: [
      'toothache', 'tooth pain', 'teeth pain', 'gum swelling', 'dental pain', 'jaw pain from tooth',
      // Telugu
      'పంటి నొప్పి', 'పంటిపోటు', 'దంతాల నొప్పి', 'చిగుళ్ళ వాపు',
      'panti noppi', 'pantipotu', 'chigulla vaapu',
      // Hindi
      'दांत दर्द', 'दांत में दर्द', 'मसूड़ों में सूजन', 'दाढ़ में दर्द',
      'daant dard', 'dant me dard', 'dadh me dard', 'masudo me dard'
    ]
  },
  {
    pathwayKey: 'GERD (Acid Reflux)',
    keywords: [
      'gerd', 'acid reflux', 'acidity', 'heartburn', 'sour burps', 'chest burning after food',
      // Telugu
      'ఎసిడిటీ', 'గుండెల్లో మంట', 'పుల్లటి తేన్పులు', 'గ్యాస్ ట్రబుల్',
      'acidity', 'gundello manta', 'pullati thenpulu', 'gas problem',
      // Hindi
      'एसिडिटी', 'सीने में जलन', 'खट्टी डकारें', 'छाती में जलन', 'गैस',
      'acidity', 'seene me jalan', 'khatti dakar', 'chest burning'
    ]
  },
  {
    pathwayKey: 'Gastritis',
    keywords: [
      'gastritis', 'stomach burning', 'upper stomach burning', 'bloating in stomach',
      // Telugu
      'గ్యాస్ట్రైటిస్', 'కడుపులో మంట', 'కడుపు ఉబ్బరం',
      'gastritis', 'kadupulo manta', 'kadupu ubbaram',
      // Hindi
      'गैस्ट्राइटिस', 'पेट में जलन', 'पेट फूलना',
      'gastritis', 'pet me jalan'
    ]
  },
  {
    pathwayKey: 'Peptic Ulcer',
    keywords: [
      'peptic ulcer', 'stomach ulcer', 'ulcer', 'burning stomach before eating',
      // Telugu
      'కడుపులో అల్సర్', 'పేగు పుండు', 'అల్సర్',
      'ulcer', 'peptic ulcer', 'kadupulo ulcer',
      // Hindi
      'पेट का अल्सर', 'पेप्टिक अल्सर', 'पेट में छाले',
      'ulcer', 'pet ka ulcer'
    ]
  },
  {
    pathwayKey: 'Diarrhea',
    keywords: [
      'diarrhea', 'loose motions', 'loose stools', 'watery stools', 'dysentery',
      // Telugu
      'విరేచనాలు', 'నీళ్ల విరేచనాలు', 'మోషన్స్', 'కడుపు కడగడం',
      'virechanalu', 'neella virechanalu', 'motions', 'loose motions',
      // Hindi
      'दस्त', 'पतले दस्त', 'लूज मोशन', 'पेचिश',
      'dast', 'loose motions', 'patle dast', 'loose motion'
    ]
  },
  {
    pathwayKey: 'Constipation',
    keywords: [
      'constipation', 'hard stool', 'difficulty passing stool', 'not able to pass stool',
      // Telugu
      'మలబద్ధకం', 'మలబద్దకం', 'మోషన్ రాకపోవడం', 'కడుపు బిగువు',
      'malabaddhakam', 'motion ravatledu',
      // Hindi
      'कब्ज', 'पेट साफ न होना', 'शौच न होना',
      'kabz', 'pet saaf na hona', 'constipation'
    ]
  },
  {
    pathwayKey: 'Food Poisoning',
    keywords: [
      'food poisoning', 'spoiled food', 'ate outside vomited', 'hotel food stomach upset',
      // Telugu
      'ఫుడ్ పాయిజనింగ్', 'కలుషిత ఆహారం', 'బయట తిన్న తర్వాత వాంతులు',
      'food poisoning',
      // Hindi
      'फूड पॉइजनिंग', 'बाहर का खाना खाने से उल्टी दस्त',
      'food poisoning'
    ]
  },
  {
    pathwayKey: 'Vomiting',
    keywords: [
      'vomiting', 'vomited', 'throwing up', 'nausea vomiting', 'feeling like vomiting',
      // Telugu
      'వాంతులు', 'వాంతి', 'వాంతులు అవుతున్నాయి', 'వికారం',
      'vantulu', 'vaanti', 'vaanthulu', 'vikaaram',
      // Hindi
      'उल्टी', 'उल्टियां', 'उल्टी आना', 'जी मिचलाना',
      'ulti', 'ultiyan', 'ulti aana', 'ji michlana'
    ]
  },
  {
    pathwayKey: 'Abdominal Pain',
    keywords: [
      'abdominal pain', 'stomach pain', 'stomach ache', 'belly pain', 'tummy ache', 'stomach cramps',
      // Telugu
      'కడుపు నొప్పి', 'కడుపులో నొప్పి', 'కడుపు పట్టేయడం',
      'kadupu noppi', 'kadupulo noppi', 'stomach noppi',
      // Hindi
      'पेट दर्द', 'पेट में दर्द', 'पेट का दर्द', 'पेट में मरोड़',
      'pet dard', 'pet me dard', 'pet kharab'
    ]
  },
  {
    pathwayKey: 'Appendicitis',
    keywords: [
      'appendicitis', 'appendix', 'right lower abdomen pain',
      // Telugu
      'అపెండిసైటిస్', 'అపెండిక్స్', 'కుడి కింది కడుపు నొప్పి',
      'appendix', 'appendicitis',
      // Hindi
      'अपेंडिक्स', 'अपेंडिसाइटिस', 'दाहिने पेट में दर्द',
      'appendix', 'appendicitis'
    ]
  },
  {
    pathwayKey: 'Gallstones',
    keywords: [
      'gallstone', 'gallstones', 'gallbladder pain', 'biliary colic',
      // Telugu
      'పిత్తాశయ రాళ్ళు', 'గాల్ స్టోన్స్',
      'gallstones', 'gallbladder',
      // Hindi
      'पित्त की पथरी', 'पित्ताशय की पथरी',
      'gallstones', 'pitt ki pathri'
    ]
  },
  {
    pathwayKey: 'Hemorrhoids (Piles)',
    keywords: [
      'piles', 'hemorrhoids', 'bleeding in stool', 'blood while passing stool', 'anal swelling', 'anal pain',
      // Telugu
      'మొలలు', 'పైల్స్', 'మోషన్ లో రక్తం', 'పైల్స్ సమస్య',
      'molalu', 'piles', 'motion lo raktham',
      // Hindi
      'बवासीर', 'पाइल्स', 'मल में खून', 'शौच में खून',
      'bawasir', 'piles', 'bawaseer'
    ]
  },
  {
    pathwayKey: 'Urinary Tract Infection (UTI)',
    keywords: [
      'uti', 'urinary tract infection', 'burning urination', 'pain while passing urine', 'burning pee',
      // Telugu
      'మూత్రంలో మంట', 'యూరినరీ ఇన్ఫెక్షన్', 'మూత్రం పోసేటప్పుడు నొప్పి', 'తరచుగా మూత్రం',
      'mootramlo manta', 'urine infection', 'mootram pothe manta',
      // Hindi
      'पेशाब में जलन', 'यूटीआई', 'पेशाब करते समय दर्द', 'पेशाब में दर्द',
      'peshab me jalan', 'uti', 'peshab me dard'
    ]
  },
  {
    pathwayKey: 'Kidney Stones',
    keywords: [
      'kidney stone', 'kidney stones', 'renal calculi', 'flank pain', 'stone in urine',
      // Telugu
      'కిడ్నీలో రాళ్ళు', 'మూత్రపిండాల్లో రాళ్ళు', 'కిడ్నీ స్టోన్స్',
      'kidney stone', 'kidney stones', 'mootrapindallo raallu',
      // Hindi
      'गुर्दे की पथरी', 'किडनी स्टोन', 'पथरी',
      'kidney stone', 'gurde ki pathri', 'pathri'
    ]
  },
  {
    pathwayKey: 'Kidney Infection',
    keywords: [
      'kidney infection', 'pyelonephritis',
      // Telugu
      'కిడ్నీ ఇన్ఫెక్షన్', 'మూత్రపిండాల ఇన్ఫెక్షన్',
      // Hindi
      'किडनी का संक्रमण', 'गुर्दे का संक्रमण'
    ]
  },
  {
    pathwayKey: 'Menstrual Cramps',
    keywords: [
      'menstrual cramps', 'period pain', 'periods pain', 'dysmenorrhea', 'menstruation pain',
      // Telugu
      'పీరియడ్స్ నొప్పి', 'బహిష్టు నొప్పి', 'ఋతుక్రమ నొప్పి',
      'periods noppi', 'period pain',
      // Hindi
      'पीरियड्स का दर्द', 'मासिक धर्म में दर्द',
      'periods dard', 'period pain'
    ]
  },
  {
    pathwayKey: 'PCOS (Polycystic Ovary Syndrome)',
    keywords: [
      'pcos', 'pcod', 'polycystic ovary', 'irregular periods', 'facial hair women',
      // Telugu
      'పిసిఒఎస్', 'పిసిఒడి', 'పీరియడ్స్ సరిగ్గా రాకపోవడం',
      'pcos', 'pcod',
      // Hindi
      'पीसीओएस', 'पीसीओडी', 'अनियमित पीरियड्स',
      'pcos', 'pcod'
    ]
  },
  {
    pathwayKey: 'Diabetes',
    keywords: [
      'diabetes', 'high sugar', 'blood sugar', 'diabetic', 'frequent thirst urination',
      // Telugu
      'షుగర్', 'మధుమేహం', 'డయాబెటిస్', 'రక్తంలో చక్కెర',
      'sugar', 'diabetes', 'madhumeham',
      // Hindi
      'शुगर', 'मधुमेह', 'डायबिटीज',
      'sugar', 'diabetes', 'madhumeh'
    ]
  },
  {
    pathwayKey: 'High Blood Pressure (Hypertension)',
    keywords: [
      'high blood pressure', 'hypertension', 'high bp', 'bp problem',
      // Telugu
      'అధిక రక్తపోటు', 'హై బిపి', 'బిపి', 'రక్తపోటు',
      'high bp', 'bp', 'rakthapotu',
      // Hindi
      'हाई ब्लड प्रेशर', 'उच्च रक्तचाप', 'हाई बीपी', 'बीपी',
      'high bp', 'bp', 'hypertension'
    ]
  },
  {
    pathwayKey: 'Heart Disease',
    keywords: [
      'heart disease', 'chest pain left side', 'angina', 'heart attack', 'cardiac', 'palpitations',
      // Telugu
      'గుండె జబ్బు', 'గుండె నొప్పి', 'ఛాతీ నొప్పి', 'గుండె దడ',
      'gunde noppi', 'chati noppi', 'chaathilo noppi', 'gunde jabbu',
      // Hindi
      'दिल की बीमारी', 'सीने में तेज दर्द', 'दिल का दौरा', 'धड़कन तेज होना',
      'dil ki bimari', 'chest pain', 'heart attack', 'dil me dard'
    ]
  },
  {
    pathwayKey: 'Stroke',
    keywords: [
      'stroke', 'paralysis', 'facial drooping', 'slurred speech', 'arm weakness sudden',
      // Telugu
      'పక్షవాతం', 'స్ట్రోక్', 'మూతి వంకరపోవడం', 'ఒకవైపు పడిపోవడం',
      'pakshavaatham', 'stroke',
      // Hindi
      'स्ट्रोक', 'लकवा', 'फालिज', 'मुंह टेढ़ा होना',
      'paralysis', 'stroke', 'lakwa'
    ]
  },
  {
    pathwayKey: 'Arthritis',
    keywords: [
      'arthritis', 'joint pain', 'knee pain', 'swollen joints', 'joint stiffness',
      // Telugu
      'కీళ్ళ నొప్పులు', 'మోకాళ్ళ నొప్పులు', 'కీళ్ళ వాతం', 'మోకాళ్ళ నొప్పి',
      'keellanoppulu', 'mokaalla noppulu', 'mokaalu noppi', 'keella noppulu',
      // Hindi
      'गठिया', 'जोड़ों का दर्द', 'घुटनों में दर्द', 'जोड़ों में सूजन',
      'gathiya', 'jodo me dard', 'ghutne me dard', 'joint pain'
    ]
  },
  {
    pathwayKey: 'Osteoporosis',
    keywords: [
      'osteoporosis', 'weak bones', 'bone weakness', 'fracture after minor fall',
      // Telugu
      'ఎముకల బలహీనత', 'ఆస్టియోపోరోసిస్', 'ఎముకల్లో నొప్పి',
      'osteoporosis', 'emukalu',
      // Hindi
      'ऑस्टियोपोरोसिस', 'हड्डियों की कमजोरी',
      'osteoporosis', 'haddi kamjor'
    ]
  },
  {
    pathwayKey: 'Thyroid Disorders',
    keywords: [
      'thyroid', 'hypothyroid', 'hyperthyroid', 'goiter', 'neck swelling front',
      // Telugu
      'థైరాయిడ్', 'గొంతు వాపు', 'థైరాయిడ్ సమస్య',
      'thyroid',
      // Hindi
      'थायराइड', 'गले में सूजन', 'थायराइड समस्या',
      'thyroid'
    ]
  },
  {
    pathwayKey: 'Anemia',
    keywords: [
      'anemia', 'low hemoglobin', 'pale skin', 'low blood count', 'iron deficiency',
      // Telugu
      'రక్తహీనత', 'రక్తం తక్కువగా ఉండటం', 'తెల్లబారడం',
      'rakthaheenatha', 'anemia', 'raktham takkuva',
      // Hindi
      'एनीमिया', 'खून की कमी', 'हीमोग्लोबिन कम',
      'khoon ki kami', 'anemia', 'hemoglobin kam'
    ]
  },
  {
    pathwayKey: 'Skin Allergy / Dermatitis',
    keywords: [
      'skin allergy', 'dermatitis', 'rash', 'itchy skin', 'skin redness', 'hives',
      // Telugu
      'చర్మ అలర్జీ', 'దురద', 'దద్దుర్లు', 'ఎర్రటి మచ్చలు',
      'charma allergy', 'durada', 'daddurlu', 'skin allergy',
      // Hindi
      'त्वचा की एलर्जी', 'खुजली', 'चकत्ते', 'दाने',
      'skin allergy', 'khujli', 'chakatte'
    ]
  },
  {
    pathwayKey: 'Eczema',
    keywords: [
      'eczema', 'dry itchy skin patches', 'cracked skin',
      // Telugu
      'తామర', 'ఎగ్జిమా', 'చర్మం పగలడం',
      'eczema', 'thamara',
      // Hindi
      'एक्जिमा', 'सूखी खुजली',
      'eczema'
    ]
  },
  {
    pathwayKey: 'Fungal Skin Infection',
    keywords: [
      'fungal infection', 'ringworm', 'jock itch', 'athlete foot', 'round itchy patch',
      // Telugu
      'ఫంగల్ ఇన్ఫెక్షన్', 'గజ్జి', 'తామర', 'రింగ్‌వార్మ్',
      'fungal infection', 'gajji',
      // Hindi
      'फंगल संक्रमण', 'दाद', 'खाज', 'खुजली वाला गोल दाग',
      'daad', 'fungal infection', 'khaj'
    ]
  },
  {
    pathwayKey: 'Acne',
    keywords: [
      'acne', 'pimples', 'pimple', 'blackheads', 'breakouts face',
      // Telugu
      'మొటిమలు', 'పింపుల్స్', 'మొటిమ',
      'pimples', 'motamalu', 'motima',
      // Hindi
      'मुँहासे', 'पिंपल्स', 'कील मुहासे',
      'muhase', 'pimples', 'pimple'
    ]
  },
  {
    pathwayKey: 'Psoriasis',
    keywords: [
      'psoriasis', 'silvery scales', 'scaly patches elbows knees',
      // Telugu
      'సోరియాసిస్', 'పొలుసుల వ్యాధి',
      'psoriasis',
      // Hindi
      'सोरायसिस', 'त्वचा पर पपड़ी',
      'psoriasis'
    ]
  },
  {
    pathwayKey: 'Eye Allergy',
    keywords: [
      'eye allergy', 'itchy eyes', 'watery red eyes', 'eye itching',
      // Telugu
      'కంటి అలర్జీ', 'కళ్ళలో దురద', 'కళ్ళు ఎర్రబడటం',
      'kanti allergy', 'kallalo durada',
      // Hindi
      'आंखों में एलर्जी', 'आंख में खुजली', 'आंख से पानी आना',
      'eye allergy', 'aankh me khujli'
    ]
  },
  {
    pathwayKey: 'Back Pain',
    keywords: [
      'back pain', 'lower back pain', 'backache', 'spine pain', 'lumbago',
      // Telugu
      'వెన్ను నొప్పి', 'నడుము నొప్పి', 'వీపు నొప్పి', 'నడుం నొప్పి',
      'nadumu noppi', 'vennu noppi', 'veepu noppi', 'back pain',
      // Hindi
      'पीठ दर्द', 'कमर दर्द', 'कमर में दर्द', 'पीठ में दर्द',
      'kamar dard', 'peeth dard', 'kamar me dard', 'back pain'
    ]
  },
  {
    pathwayKey: 'Neck Pain',
    keywords: [
      'neck pain', 'stiff neck', 'cervical pain', 'neck catch',
      // Telugu
      'మెడ నొప్పి', 'మెడ పట్టేయడం', 'మెడ బిగువు',
      'meda noppi', 'meda patteyadam', 'neck pain',
      // Hindi
      'गर्दन में दर्द', 'गर्दन अकड़ना', 'सर्वाइकल दर्द',
      'gardan me dard', 'gardan akdna', 'cervical'
    ]
  },
  {
    pathwayKey: 'Insomnia',
    keywords: [
      'insomnia', 'sleeplessness', 'cant sleep', 'cannot sleep', 'trouble sleeping', 'poor sleep',
      // Telugu
      'నిద్రలేమి', 'నిద్ర పట్టకపోవడం', 'నిద్ర రావడం లేదు',
      'nidralemi', 'nidra pattatledu', 'nidra ravatledu',
      // Hindi
      'अनिद्रा', 'नींद न आना', 'नींद नहीं आती', 'नींद की समस्या',
      'neend na aana', 'neend nahi aati', 'anidra', 'insomnia'
    ]
  }
];

/**
 * High-performance deterministic symptom matching
 * Returns the matching pathwayKey or null if no confident match.
 */
export function matchStaticPathway(userComplaint: string): string | null {
  if (!userComplaint || typeof userComplaint !== 'string') return null;

  const text = userComplaint.toLowerCase().trim();

  // 1. Direct key match (e.g. user clicked "Fever" button or spoke exact condition)
  for (const item of CLINICAL_PATHWAY_KEYWORDS) {
    if (text === item.pathwayKey.toLowerCase()) {
      return item.pathwayKey;
    }
  }

  // 2. Multi-word phrase matching first (longer matches take priority, e.g. "sore throat" before "throat")
  for (const item of CLINICAL_PATHWAY_KEYWORDS) {
    for (const kw of item.keywords) {
      if (kw.includes(' ')) {
        const regex = new RegExp(`\\b${escapeRegex(kw.toLowerCase())}\\b`, 'i');
        if (regex.test(text) || text.includes(kw.toLowerCase())) {
          return item.pathwayKey;
        }
      }
    }
  }

  // 3. Single-word token matching
  for (const item of CLINICAL_PATHWAY_KEYWORDS) {
    for (const kw of item.keywords) {
      if (!kw.includes(' ')) {
        // Use boundary matching for ASCII words; direct includes for Indic unicode scripts
        const isIndic = /[\u0900-\u097F\u0C00-\u0C7F]/.test(kw);
        if (isIndic) {
          if (text.includes(kw.toLowerCase())) {
            return item.pathwayKey;
          }
        } else {
          const regex = new RegExp(`\\b${escapeRegex(kw.toLowerCase())}\\b`, 'i');
          if (regex.test(text)) {
            return item.pathwayKey;
          }
        }
      }
    }
  }

  return null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
