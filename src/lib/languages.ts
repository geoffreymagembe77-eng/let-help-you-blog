export type Language = 'en' | 'sw' | 'yo' | 'ha' | 'am' | 'zu' | 'fr';

export interface Translation {
  title: string;
  heroSubtitle: string;
  getStarted: string;
  login: string;
  patientDash: string;
  providerPortal: string;
  aiEducator: string;
  healthTrends: string;
  educationHub: string;
  analytics: string;
  emergency: string;
  categories: string;
  community: string;
  virtualHub: string;
  consultancy: string;
  aiPredictions: string;
  riskAssessment: string;
  realTime: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    title: "GembeEduPro",
    heroSubtitle: "Personalized healthcare education for every African patient in their native language.",
    getStarted: "Get Started",
    login: "Login",
    patientDash: "Patient Dashboard",
    providerPortal: "Provider Portal",
    aiEducator: "AI Educator",
    healthTrends: "Health Trends",
    educationHub: "Education Hub",
    analytics: "Analytics Hub",
    emergency: "Emergency",
    categories: "Medical Specialities",
    community: "Community",
    virtualHub: "Virtual Hub",
    consultancy: "Consultancy",
    aiPredictions: "AI Predictions",
    riskAssessment: "Risk Assessment",
    realTime: "Real-time"
  },
  sw: {
    title: "GembeEduPro",
    heroSubtitle: "Elimu ya afya ya kibinafsi kwa kila mgonjwa wa Afrika katika lugha yao ya asili.",
    getStarted: "Anza Sasa",
    login: "Ingia",
    patientDash: "Dashibodi ya Mgonjwa",
    providerPortal: "Lango la Mtoa Huduma",
    aiEducator: "Mkufunzi wa AI",
    healthTrends: "Mienendo ya Afya",
    educationHub: "Kitovu cha Elimu",
    analytics: "Kitovu cha Uchambuzi",
    emergency: "Dharura",
    categories: "Utaalamu wa Matibabu",
    community: "Jumuiya",
    virtualHub: "Kitovu cha Mtandao",
    consultancy: "Ushauri",
    aiPredictions: "Utabiri wa AI",
    riskAssessment: "Tathmini ya Hatari",
    realTime: "Muda Halisi"
  },
  yo: {
    title: "GembeEduPro",
    heroSubtitle: "Ẹkọ ilera ti ara ẹni fun gbogbo alaisan Afirika ni ede abinibi wọn.",
    getStarted: "Bẹrẹ",
    login: "Wọle",
    patientDash: "Dasibodu Alaisan",
    providerPortal: "Portal Olupese",
    aiEducator: "Olùkọ́ AI",
    healthTrends: "Awọn aṣa Ilera",
    educationHub: "Ibi Ẹkọ",
    analytics: "Ibi Atupale",
    emergency: "Pajawiri",
    categories: "Specialties egbogi",
    community: "Agbegbe",
    virtualHub: "Virtual Hub",
    consultancy: "Ijumọsọrọ",
    aiPredictions: "AI Asọtẹlẹ",
    riskAssessment: "Iyẹwo Ewu",
    realTime: "Gidi-akoko"
  },
  ha: {
    title: "GembeEduPro",
    heroSubtitle: "Ilimin kiwon lafiya na ke\u0253a\u0253\u0253en ga kowane ha\u0199uri na Afirka a cikin yarensu na asali.",
    getStarted: "Fara",
    login: "Shiga",
    patientDash: "Dashboard na Mara lafiya",
    providerPortal: "Portal Mai Bayarwa",
    aiEducator: "Malamin AI",
    healthTrends: "Hanyoyin Lafiya",
    educationHub: "Cibiyar Ilimi",
    analytics: "Cibiyar Nazari",
    emergency: "Gaggawa",
    categories: "Kwarewar Likitoci",
    community: "Al'umma",
    virtualHub: "Virtual Hub",
    consultancy: "Shawara",
    aiPredictions: "AI Hasashen",
    riskAssessment: "Kimanin Hadari",
    realTime: "Real-lokaci"
  },
  am: {
    title: "GembeEduPro",
    heroSubtitle: "\u1208\u12a5\u12eb\u1295\u12f3\u1295\u12f1 \u12a0\u134d\u122a\u12ab\u12ca \u1273\u12ab\u121a \u1260\u122b\u1233\u1278\u12cd \u124b\u1295\u124b \u12e8\u130d\u120d \u12e8\u1324\u1293 \u1275\u121d\u1205\u122d\u1275\u1362",
    getStarted: "\u12ed\u1300\u121d\u1229",
    login: "\u12ed\u130d\u1261",
    patientDash: "\u12e8\u1273\u12ab\u121a \u12f3\u123d\u1266\u122d\u12f5",
    providerPortal: "\u12e8\u12a0\u1245\u122b\u1262 \u1356\u122d\u1273\u120d",
    aiEducator: "\u12e8 AI \u1218\u121d\u1205\u122d",
    healthTrends: "\u12e8\u1324\u1293 \u12a0\u12dd\u121b\u121a\u12eb\u12ce\u127d",
    educationHub: "\u12e8\u1275\u121d\u1205\u122d\u1275 \u121b\u12d5\u12a8\u120d",
    analytics: "\u12e8\u1275\u1295\u1273\u1294 \u121b\u12d5\u12a8\u120d",
    emergency: "\u12a0\u12f0\u130b",
    categories: "\u12e8\u1215\u12ad\u121d\u1293 \u120d\u12e9 \u1263\u1208\u1219\u12eb\u12ce\u127d",
    community: "\u121b\u1205\u1260\u1228\u1230\u1265",
    virtualHub: "\u126b\u122d\u1279\u12a0\u120d \u121b\u12d5\u12a8\u120d",
    consultancy: "\u12a0\u121b\u12ab\u122a\u1290\u1275",
    aiPredictions: "\u12e8 AI \u1275\u1295\u1262\u1275",
    riskAssessment: "\u12e8\u12a0\u12f0\u130b \u130d\u121d\u130b\u121b",
    realTime: "\u1240\u1325\u1273"
  },
  zu: {
    title: "GembeEduPro",
    heroSubtitle: "Imfundo yezempilo eyenziwe ngezifiso kuwo wonke amazwe ase-Afrika ngezilimi zawo zokuzalwa.",
    getStarted: "Qala Manje",
    login: "Ngena",
    patientDash: "Ideshibhodi Yesiguli",
    providerPortal: "Iphothali Yomhlinzeki",
    aiEducator: "UMfundisi we-AI",
    healthTrends: "Amathrendi Ezempilo",
    educationHub: "Isikhungo Sezemfundo",
    analytics: "Isikhungo Sokuhlaziya",
    emergency: "Isimo Esiphuthumayo",
    categories: "Amakhono Ezokwelapha",
    community: "Umphakathi",
    virtualHub: "I-Virtual Hub",
    consultancy: "Ukubonisana",
    aiPredictions: "Izibikezelo ze-AI",
    riskAssessment: "Ukuhlola Ingozi",
    realTime: "Isikhathi Sangempela"
  },
  fr: {
    title: "GembeEduPro",
    heroSubtitle: "\u00c9ducation \u00e0 la sant\u00e9 personnalis\u00e9e pour chaque patient africain dans sa langue maternelle.",
    getStarted: "Commencer",
    login: "Connexion",
    patientDash: "Tableau de bord patient",
    providerPortal: "Portail prestataire",
    aiEducator: "\u00c9ducateur IA",
    healthTrends: "Tendances sant\u00e9",
    educationHub: "Centre d'\u00e9ducation",
    analytics: "Centre d'analyse",
    emergency: "Urgence",
    categories: "Sp\u00e9cialit\u00e9s m\u00e9dicales",
    community: "Communaut\u00e9",
    virtualHub: "Hub Virtuel",
    consultancy: "Consultance",
    aiPredictions: "Pr\u00e9dictions IA",
    riskAssessment: "\u00c9valuation des risques",
    realTime: "Temps r\u00e9el"
  }
};

export const languageNames: Record<Language, string> = {
  en: "English",
  sw: "Kiswahili",
  yo: "Yor\u00f9b\u00e1",
  ha: "Hausa",
  am: "\u12a0\u121b\u122d\u129b",
  zu: "isiZulu",
  fr: "Fran\u00e7ais"
};