import type { LanguageCode } from '../engine/types';

export interface UIStrings {
  title: string;
  subtitle: string;
  guided: string;
  practice: string;
  check: string;
  next: string;
  correct: string;
  notQuite: string;
  tryAgain: string;
  home: string;
  listen: string;
  listening: string;
  safetyBadgeEarned: string;
  safetyStepMissed: string;
  best: string;
  yourName: string;
  namePlaceholder: string;
  xp: string;
  dayStreak: string;
  certified: string;
  outOfLives: string;
  dragHint: string;
  topRuns: string;
  watchDemo: string;
  replay: string;
  startPractice: string;
  startGuided: string;
  settings: string;
  leaderboardToggle: string;
  soundEffects: string;
  vibration: string;
  autoReadTTS: string;
  exportCsv: string;
  exportJson: string;
  supervisorSignOff: string;
  supervisorSignatureLine: string;
  plantLocation: string;
  rotateDevicePrompt: string;
  fullscreen: string;
  exitFullscreen: string;
  accuracy: string;
  speedBonusEarned: string;
  comboLabel: string;
  livesLabel: string;
  viewCertificate: string;
  printCertificate: string;
  close: string;
  sampleNotice: string;
  itemsRemaining: string;
  docNumber: string;
  effectiveDate: string;
  stage1Badge: string;
  safetyCritical: string;
  sopGuidance: string;
  scanPrompt: string;
  backToTerminal: string;
  restart: string;
  clearData: string;
  clearConfirm: string;
  completedBadge: string;
  dockMapLegend: string;
  allocatedDock: string;
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    title: 'Floor Trainer',
    subtitle: 'Ather AURIC Warehouse Training Terminal · Interactive Floor Simulations',
    guided: 'Guided',
    practice: 'Practice',
    check: 'Verify & Check',
    next: 'Continue to Next Step',
    correct: 'SOP Compliant · Correct!',
    notQuite: 'Deviation Detected · Not Quite',
    tryAgain: 'Review SOP & Try Again',
    home: 'Terminal Home',
    listen: 'Voice Guidance',
    listening: 'Playing Voice...',
    safetyBadgeEarned: 'Safety Star Earned',
    safetyStepMissed: 'Safety protocol missed. Repeat the training without missing safety steps to earn the star.',
    best: 'Best Score',
    yourName: 'Operator Name / ID',
    namePlaceholder: 'Enter your name or ID',
    xp: 'XP',
    dayStreak: 'day streak',
    certified: 'Certified. Present this certificate to your warehouse supervisor for floor sign-off.',
    outOfLives: 'Out of lives. Review the SOP instructions and try again.',
    dragHint: 'Drag documents to target desks, or tap a document then tap its destination tray.',
    topRuns: 'Top Operators on this Tablet',
    watchDemo: 'Watch Walkthrough',
    replay: 'Replay Walkthrough',
    startPractice: 'Start Practice (3 Lives)',
    startGuided: 'Start Guided (Hints ON)',
    settings: 'Terminal Settings',
    leaderboardToggle: 'Show Tablet Leaderboard',
    soundEffects: 'Industrial Audio Synthesizer',
    vibration: 'Vibration Haptic Feedback',
    autoReadTTS: 'Auto-Read Questions Aloud',
    exportCsv: 'Export Records (CSV)',
    exportJson: 'Export Backup (JSON)',
    supervisorSignOff: 'Supervisor Verification & Sign-off',
    supervisorSignatureLine: 'Shift Supervisor Signature: _______________________',
    plantLocation: 'Ather Energy · Chhatrapati Sambhajinagar Plant (AURIC M002)',
    rotateDevicePrompt: 'Please rotate your tablet to landscape mode for factory floor simulation.',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    accuracy: 'Accuracy',
    speedBonusEarned: '+5 Speed Bonus (<12s)!',
    comboLabel: 'Combo',
    livesLabel: 'Lives',
    viewCertificate: 'View Certificate',
    printCertificate: 'Print Certificate',
    close: 'Close',
    sampleNotice: 'Standard Plant SOP Training Pack',
    itemsRemaining: 'documents remaining to file',
    docNumber: 'Doc No: XXXX_PRO_001 · Rev 1.0',
    effectiveDate: 'Effective: 28/08/2026',
    stage1Badge: 'Module 1 · Stage 1: Gate & Dock',
    safetyCritical: 'Critical Safety Protocol',
    sopGuidance: 'SOP Operating Principle',
    scanPrompt: 'Tap barcode sticker to scan with optical reader:',
    backToTerminal: 'Back to Terminal',
    restart: 'Restart Stage',
    clearData: 'Reset Tablet Data',
    clearConfirm: 'Are you sure you want to clear all progress records on this tablet?',
    completedBadge: 'Stage 1 Gate & Dock Qualified',
    dockMapLegend: 'Tap the allocated dock on the warehouse layout to route the delivery vehicle:',
    allocatedDock: 'Dock 04 (Inbound Bay B)'
  },
  hi: {
    title: 'फ़्लोर ट्रेनर',
    subtitle: 'एथर AURIC वेयरहाउस ट्रेनिंग टर्मिनल · इंटरएक्टिव फ़्लोर सिमुलेशन',
    guided: 'गाइडेड',
    practice: 'प्रैक्टिस',
    check: 'सत्यापित करें और जाँचें',
    next: 'अगले चरण पर जाएँ',
    correct: 'SOP के अनुसार · सही!',
    notQuite: 'विचलन पाया गया · सही नहीं',
    tryAgain: 'SOP देखें और पुनः प्रयास करें',
    home: 'टर्मिनल होम',
    listen: 'आवाज़ में सुनें',
    listening: 'आवाज़ चल रही है...',
    safetyBadgeEarned: 'सुरक्षा स्टार प्राप्त हुआ',
    safetyStepMissed: 'सुरक्षा नियम छूट गया। सुरक्षा स्टार पाने के लिए बिना किसी सुरक्षा चूक के फिर से पूरा करें।',
    best: 'सर्वश्रेष्ठ स्कोर',
    yourName: 'ऑपरेटर का नाम / आईडी',
    namePlaceholder: 'अपना नाम या आईडी दर्ज करें',
    xp: 'XP',
    dayStreak: 'दिन लगातार',
    certified: 'प्रमाणित। फ़्लोर साइन-ऑफ और सत्यापन के लिए यह प्रमाण पत्र अपने वेयरहाउस सुपरवाइज़र को दिखाएँ।',
    outOfLives: 'सभी जीवन समाप्त। SOP निर्देशों को ध्यान से पढ़ें और पुनः प्रयास करें।',
    dragHint: 'दस्तावेज़ों को लक्षित डेस्क पर खींचें, या दस्तावेज़ छूकर गंतव्य ट्रे छुएँ।',
    topRuns: 'इस टैबलेट पर शीर्ष ऑपरेटर',
    watchDemo: 'वॉकथ्रू देखें',
    replay: 'वॉकथ्रू फिर से देखें',
    startPractice: 'प्रैक्टिस शुरू करें (3 जीवन)',
    startGuided: 'गाइडेड शुरू करें (संकेत चालू)',
    settings: 'टर्मिनल सेटिंग्स',
    leaderboardToggle: 'टैबलेट लीडरबोर्ड दिखाएँ',
    soundEffects: 'औद्योगिक ऑडियो सिंथेसाइज़र',
    vibration: 'वाइब्रेशन (हैप्टिक फीडबैक)',
    autoReadTTS: 'प्रश्न अपने आप बोलकर सुनाएँ',
    exportCsv: 'रिकॉर्ड्स निर्यात करें (CSV)',
    exportJson: 'बैकअप निर्यात करें (JSON)',
    supervisorSignOff: 'सुपरवाइज़र सत्यापन एवं हस्ताक्षर',
    supervisorSignatureLine: 'शिफ्ट सुपरवाइज़र हस्ताक्षर: _______________________',
    plantLocation: 'एथर एनर्जी · छत्रपति संभाजीनगर प्लांट (AURIC M002)',
    rotateDevicePrompt: 'फ़ैक्टरी फ़्लोर सिमुलेशन के लिए कृपया अपने टैबलेट को लैंडस्केप में घुमाएँ।',
    fullscreen: 'फुलस्क्रीन',
    exitFullscreen: 'फुलस्क्रीन बंद करें',
    accuracy: 'सटीकता',
    speedBonusEarned: '+5 गति बोनस (<12 सेकंड)!',
    comboLabel: 'कॉम्बो',
    livesLabel: 'जीवन',
    viewCertificate: 'प्रमाणपत्र देखें',
    printCertificate: 'प्रमाणपत्र प्रिंट करें',
    close: 'बंद करें',
    sampleNotice: 'मानक प्लांट SOP प्रशिक्षण पैक',
    itemsRemaining: 'दस्तावेज़ बाँटना शेष',
    docNumber: 'दस्तावेज़ संख्या: XXXX_PRO_001 · सं 1.0',
    effectiveDate: 'प्रभावी तिथि: 28/08/2026',
    stage1Badge: 'मॉड्यूल 1 · चरण 1: गेट और डॉक',
    safetyCritical: 'अत्यंत महत्वपूर्ण सुरक्षा नियम',
    sopGuidance: 'SOP संचालन सिद्धांत',
    scanPrompt: 'ऑप्टिकल स्कैनर से पढ़ने के लिए बारकोड स्टीकर पर टैप करें:',
    backToTerminal: 'टर्मिनल पर वापस',
    restart: 'चरण पुनः प्रारंभ करें',
    clearData: 'टैबलेट डेटा रीसेट करें',
    clearConfirm: 'क्या आप वाकई इस टैबलेट पर सभी प्रगति रिकॉर्ड हटाना चाहते हैं?',
    completedBadge: 'चरण 1 गेट और डॉक योग्य',
    dockMapLegend: 'डिलीवरी वाहन को भेजने के लिए वेयरहाउस लेआउट पर आवंटित डॉक पर टैप करें:',
    allocatedDock: 'डॉक 04 (इनबाउंड बे B)'
  },
  mr: {
    title: 'फ्लोअर ट्रेनर',
    subtitle: 'अथेर AURIC वेअरहाऊस प्रशिक्षण टर्मिनल · परस्परसंवादी फ्लोअर सिम्युलेशन',
    guided: 'गाइडेड',
    practice: 'प्रॅक्टिस',
    check: 'पडताळा व तपासा',
    next: 'पुढील पायरीवर जा',
    correct: 'SOP नुसार अचूक · बरोबर!',
    notQuite: 'त्रुटी आढळली · बरोबर नाही',
    tryAgain: 'SOP तपासा व पुन्हा प्रयत्न करा',
    home: 'टर्मिनल होम',
    listen: 'आवाजात ऐका',
    listening: 'आवाज चालू आहे...',
    safetyBadgeEarned: 'सुरक्षा स्टार मिळाला',
    safetyStepMissed: 'सुरक्षा नियम चुकला. सुरक्षा स्टार मिळवण्यासाठी कोणतीही सुरक्षा चूक न करता पुन्हा पूर्ण करा.',
    best: 'सर्वोत्तम गुण',
    yourName: 'ऑपरेटरचे नाव / आयडी',
    namePlaceholder: 'तुमचे नाव किंवा आयडी टाका',
    xp: 'XP',
    dayStreak: 'दिवस सलग',
    certified: 'प्रमाणित. फ्लोअर साइन-ऑफ आणि पडताळणीसाठी हे प्रमाणपत्र तुमच्या वेअरहाऊस सुपरवायझरला दाखवा.',
    outOfLives: 'सर्व जीव संपले. SOP सूचना काळजीपूर्वक वाचा आणि पुन्हा प्रयत्न करा.',
    dragHint: 'कागदपत्रे संबंधित डेस्कवर ओढा, किंवा कागदपत्राला स्पर्श करून योग्य ट्रे निवडा.',
    topRuns: 'या टॅबलेटवरील सर्वोत्तम ऑपरेटर',
    watchDemo: 'मार्गदर्शन पहा',
    replay: 'मार्गदर्शन पुन्हा पहा',
    startPractice: 'प्रॅक्टिस सुरू करा (३ जीव)',
    startGuided: 'गाइडेड सुरू करा (संकेत चालू)',
    settings: 'टर्मिनल सेटिंग्ज',
    leaderboardToggle: 'टॅबलेट लीडरबोर्ड दाखवा',
    soundEffects: 'औद्योगिक ऑडिओ सिंथेसायझर',
    vibration: 'कंपन (हॅप्टिक फीडबॅक)',
    autoReadTTS: 'प्रश्न आपोआप बोलून दाखवा',
    exportCsv: 'नोंदी निर्यात करा (CSV)',
    exportJson: 'बॅकअप निर्यात करा (JSON)',
    supervisorSignOff: 'सुपरवायझर पडताळणी व स्वाक्षरी',
    supervisorSignatureLine: 'शिफ्ट सुपरवायझर स्वाक्षरी: _______________________',
    plantLocation: 'अथेर एनर्जी · छत्रपती संभाजीनगर प्लांट (AURIC M002)',
    rotateDevicePrompt: 'फॅक्टरी फ्लोअर सिम्युलेशनसाठी कृपया तुमचा टॅबलेट लँडस्केपमध्ये फिरवा.',
    fullscreen: 'पूर्ण स्क्रीन',
    exitFullscreen: 'पूर्ण स्क्रीन बंद करा',
    accuracy: 'अचूकता',
    speedBonusEarned: '+५ गती बोनस (<१२ सेकंद)!',
    comboLabel: 'कॉम्बो',
    livesLabel: 'जीव',
    viewCertificate: 'प्रमाणपत्र पहा',
    printCertificate: 'प्रमाणपत्र प्रिंट करा',
    close: 'बंद करा',
    sampleNotice: 'मानक प्लांट SOP प्रशिक्षण पॅक',
    itemsRemaining: 'कागदपत्रे वाटप बाकी',
    docNumber: 'दस्तऐवज क्र: XXXX_PRO_001 · आवृत्ती १.०',
    effectiveDate: 'लागू तारीख: २८/०८/२०२६',
    stage1Badge: 'मॉड्यूल १ · टप्पा १: गेट आणि डॉक',
    safetyCritical: 'अत्यंत महत्त्वाची सुरक्षा मार्गदर्शक तत्त्वे',
    sopGuidance: 'SOP कार्यप्रणाली तत्त्व',
    scanPrompt: 'ऑप्टिकल रीडरने स्कॅन करण्यासाठी बारकोड स्टिकरवर टॅप करा:',
    backToTerminal: 'टर्मिनलवर परत',
    restart: 'टप्पा पुन्हा सुरू करा',
    clearData: 'टॅबलेट डेटा रीसेट करा',
    clearConfirm: 'तुम्हाला नक्की या टॅबलेटवरील सर्व प्रगती नोंदी पुसून टाकायच्या आहेत का?',
    completedBadge: 'टप्पा १ गेट व डॉक प्रमाणित',
    dockMapLegend: 'डिलिव्हरी वाहनाला पाठवण्यासाठी वेअरहाऊस लेआउटवरील वाटप केलेल्या डॉकवर टॅप करा:',
    allocatedDock: 'डॉक ०४ (इनबाउंड बे B)'
  }
};

export function useTranslation(lang: LanguageCode): UIStrings {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Landing Page Translations
// ─────────────────────────────────────────────────────────────────────────────

export interface LandingTranslations {
  modeReceivingBadge: string;
  modePickingBadge: string;
  adminConsole: string;
  titleReceivingMain: string;
  titleReceivingHighlight: string;
  titlePickingMain: string;
  titlePickingHighlight: string;
  descReceiving: string;
  descPicking: string;
  enterDojoStation: string;
  modulesHeadingReceiving: string;
  modulesHeadingPicking: string;
  modulesSubReceiving: string;
  modulesSubPicking: string;
  moduleLabel: string;
  scenesCount: (count: number) => string;
  roleBadges: Record<string, string>;
}

export const LANDING_TRANSLATIONS: Record<LanguageCode, LandingTranslations> = {
  en: {
    modeReceivingBadge: 'Warehouse Receiving & Put-Away',
    modePickingBadge: 'Order Picking & Packaging',
    adminConsole: 'Admin Console',
    titleReceivingMain: 'Warehouse Receiving & ',
    titleReceivingHighlight: 'Put-Away DOJO',
    titlePickingMain: 'Order Picking & ',
    titlePickingHighlight: 'Packaging DOJO',
    descReceiving: 'Interactive vehicle gate check, DEO document triage, SAP ERP intake, and high-rise put-away simulations for Ather AURIC Plant M002.',
    descPicking: 'Interactive vehicle line feeding, paint decanting, order picking, and reverse logistics simulations for Ather AURIC Plant M002.',
    enterDojoStation: 'Enter DOJO Station',
    modulesHeadingReceiving: 'Warehouse Receiving & Put-Away Modules (SOP 01 – 07)',
    modulesHeadingPicking: 'Order Picking & Packaging Modules (SOP 08 – 12)',
    modulesSubReceiving: 'Master all 7 Inbound Standard Operating Procedures with 100% SOP accuracy.',
    modulesSubPicking: 'Master all 5 Outbound Standard Operating Procedures with 100% SOP accuracy.',
    moduleLabel: 'MODULE',
    scenesCount: (count) => `${count} Scenes`,
    roleBadges: {
      'GATE KEEPER': 'GATE KEEPER',
      'QUALITY SENTINEL': 'QUALITY SENTINEL',
      'HIGH-RISE STOWAGE MASTER': 'HIGH-RISE STOWAGE MASTER',
      'CELL VAULT GUARDIAN': 'CELL VAULT GUARDIAN',
      'HAZMAT CUSTODIAN': 'HAZMAT CUSTODIAN',
      'SUPERMARKET KANBAN SPECIALIST': 'SUPERMARKET KANBAN SPECIALIST',
      'QUARANTINE DISPOSITION AUTHORITY': 'QUARANTINE DISPOSITION AUTHORITY',
      'LINE FEEDER CHAMPION': 'LINE FEEDER CHAMPION',
      'PAINT & DECANTING VIRTUOSO': 'PAINT & DECANTING VIRTUOSO',
      'INDIRECT STORES CUSTODIAN': 'INDIRECT STORES CUSTODIAN',
      'PIR & STO DISPATCH SPECIALIST': 'PIR & STO DISPATCH SPECIALIST',
      'WAREHOUSE GRANDMASTER': 'WAREHOUSE GRANDMASTER'
    }
  },
  hi: {
    modeReceivingBadge: 'वेयरहाउस रिसीविंग और पुट-अवे',
    modePickingBadge: 'ऑर्डर पिकिंग और पैकेजिंग',
    adminConsole: 'एडमिन कंसोल',
    titleReceivingMain: 'वेयरहाउस रिसीविंग और ',
    titleReceivingHighlight: 'पुट-अवे डोजो',
    titlePickingMain: 'ऑर्डर पिकिंग और ',
    titlePickingHighlight: 'पैकेजिंग डोजो',
    descReceiving: 'एथर AURIC प्लांट M002 के लिए इंटरएक्टिव वाहन गेट जाँच, DEO दस्तावेज़ सत्यापन, SAP ERP इनटेक और हाई-राइज़ पुट-अवे सिमुलेशन।',
    descPicking: 'एथर AURIC प्लांट M002 के लिए इंटरएक्टिव वाहन लाइन फीडिंग, पेंट डिकैंटिंग, ऑर्डर पिकिंग और रिवर्स लॉजिस्टिक्स सिमुलेशन।',
    enterDojoStation: 'डोजो स्टेशन में प्रवेश करें',
    modulesHeadingReceiving: 'वेयरहाउस रिसीविंग और पुट-अवे मॉड्यूल्स (SOP 01 – 07)',
    modulesHeadingPicking: 'ऑर्डर पिकिंग और पैकेजिंग मॉड्यूल्स (SOP 08 – 12)',
    modulesSubReceiving: '100% SOP सटीकता के साथ सभी 7 इनबाउंड मानक संचालन प्रक्रियाओं में दक्षता प्राप्त करें।',
    modulesSubPicking: '100% SOP सटीकता के साथ सभी 5 आउटबाउंड मानक संचालन प्रक्रियाओं में दक्षता प्राप्त करें।',
    moduleLabel: 'मॉड्यूल',
    scenesCount: (count) => `${count} दृश्य`,
    roleBadges: {
      'GATE KEEPER': 'गेट कीपर',
      'QUALITY SENTINEL': 'क्वालिटी सेंटिनल',
      'HIGH-RISE STOWAGE MASTER': 'हाई-राइज़ स्टोवेज मास्टर',
      'CELL VAULT GUARDIAN': 'सेल वॉल्ट गार्जियन',
      'HAZMAT CUSTODIAN': 'हैज़मैट संरक्षक',
      'SUPERMARKET KANBAN SPECIALIST': 'सुपरमार्केट कानबान विशेषज्ञ',
      'QUARANTINE DISPOSITION AUTHORITY': 'क्वारंटाइन निस्तारण प्राधिकारी',
      'LINE FEEDER CHAMPION': 'लाइन फीडर चैंपियन',
      'PAINT & DECANTING VIRTUOSO': 'पेंट और डिकैंटिंग विशेषज्ञ',
      'INDIRECT STORES CUSTODIAN': 'अप्रत्यक्ष सामग्री संरक्षक',
      'PIR & STO DISPATCH SPECIALIST': 'PIR और STO प्रेषण विशेषज्ञ',
      'WAREHOUSE GRANDMASTER': 'वेयरहाउस ग्रैंडमास्टर'
    }
  },
  mr: {
    modeReceivingBadge: 'वेअरहाऊस रिसिव्हिंग आणि पुट-अवे',
    modePickingBadge: 'ऑर्डर पिकिंग आणि पॅकेजिंग',
    adminConsole: 'अ‍ॅडमिन कन्सोल',
    titleReceivingMain: 'वेअरहाऊस रिसिव्हिंग आणि ',
    titleReceivingHighlight: 'पुट-अवे डोझो',
    titlePickingMain: 'ऑर्डर पिकिंग आणि ',
    titlePickingHighlight: 'पॅकेजिंग डोझो',
    descReceiving: 'अथेर AURIC प्लांट M002 साठी परस्परसंवादी वाहन गेट तपासणी, DEO दस्तऐवज पडताळणी, SAP ERP इनटेक आणि हाय-राईझ पुट-अवे सिम्युलेशन.',
    descPicking: 'अथेर AURIC प्लांट M002 साठी परस्परसंवादी वाहन लाईन फीडिंग, पेंट डिकँटिंग, ऑर्डर पिकिंग आणि रिव्हर्स लॉजिस्टिक सिम्युलेशन.',
    enterDojoStation: 'डोझो स्टेशनमध्ये प्रवेश करा',
    modulesHeadingReceiving: 'वेअरहाऊस रिसिव्हिंग आणि पुट-अवे मॉड्यूल्स (SOP 01 – 07)',
    modulesHeadingPicking: 'ऑर्डर पिकिंग आणि पॅकेजिंग मॉड्यूल्स (SOP 08 – 12)',
    modulesSubReceiving: '१००% SOP अचूकतेसह सर्व ७ इनबाउंड मानक कार्यप्रणालींमध्ये प्राविण्य मिळवा.',
    modulesSubPicking: '१००% SOP अचूकतेसह सर्व ५ आउटबाउंड मानक कार्यप्रणालींमध्ये प्राविण्य मिळवा.',
    moduleLabel: 'मॉड्यूल',
    scenesCount: (count) => `${count} दृश्ये`,
    roleBadges: {
      'GATE KEEPER': 'गेट कीपर',
      'QUALITY SENTINEL': 'क्वालिटी सेंटिनेल',
      'HIGH-RISE STOWAGE MASTER': 'हाय-राईझ स्टोवेज मास्टर',
      'CELL VAULT GUARDIAN': 'सेल व्हॉल्ट गार्डियन',
      'HAZMAT CUSTODIAN': 'हॅझमॅट संरक्षक',
      'SUPERMARKET KANBAN SPECIALIST': 'सुपरमार्केट कानबान तज्ज्ञ',
      'QUARANTINE DISPOSITION AUTHORITY': 'क्वारंटाईन विल्हेवाट प्राधिकारी',
      'LINE FEEDER CHAMPION': 'लाईन फीडर चॅम्पियन',
      'PAINT & DECANTING VIRTUOSO': 'पेंट आणि डिकँटिंग तज्ज्ञ',
      'INDIRECT STORES CUSTODIAN': 'अप्रत्यक्ष साहित्य संरक्षक',
      'PIR & STO DISPATCH SPECIALIST': 'PIR आणि STO डिस्पॅच तज्ज्ञ',
      'WAREHOUSE GRANDMASTER': 'वेअरहाऊस ग्रँडमास्टर'
    }
  }
};

export function getLandingTranslations(lang: LanguageCode): LandingTranslations {
  return LANDING_TRANSLATIONS[lang] || LANDING_TRANSLATIONS.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Trainee Registration Translations
// ─────────────────────────────────────────────────────────────────────────────

export interface RegistrationTranslations {
  dojoHome: string;
  badgePhoto: string;
  compulsory: string;
  captured: string;
  frontCamera: string;
  operatorBadgePhoto: string;
  photoCompulsorySub: string;
  frontCameraSub: string;
  snapPhoto: string;
  cancel: string;
  retakePhoto: string;
  upload: string;
  removePhoto: string;
  photoRequiredAlert: string;
  traineeSignIn: string;
  operatorFullName: string;
  valid: string;
  namePlaceholder: string;
  nameRequiredAlert: string;
  operatorId: string;
  idPlaceholder: string;
  idRequiredAlert: string;
  previousSessionFound: (stage: number, scene: number) => string;
  startFromBeginning: string;
  resume: (stage: number, scene: number) => string;
  startCertification: string;
}

export const REGISTRATION_TRANSLATIONS: Record<LanguageCode, RegistrationTranslations> = {
  en: {
    dojoHome: 'DOJO Home',
    badgePhoto: 'Badge Photo',
    compulsory: 'Compulsory',
    captured: 'Captured',
    frontCamera: 'Front Camera',
    operatorBadgePhoto: 'Operator Badge Photo',
    photoCompulsorySub: 'Front camera or upload compulsory',
    frontCameraSub: 'Front camera capture',
    snapPhoto: 'Snap Photo',
    cancel: 'Cancel',
    retakePhoto: 'Retake Photo',
    upload: 'Upload',
    removePhoto: 'Remove photo',
    photoRequiredAlert: 'Badge photo is compulsory to start',
    traineeSignIn: 'Trainee Sign-In',
    operatorFullName: 'Operator Full Name',
    valid: '✓ Valid',
    namePlaceholder: 'Enter full name',
    nameRequiredAlert: 'Please enter operator full name',
    operatorId: 'Operator ID / Badge No.',
    idPlaceholder: 'e.g. OP-AURIC-104',
    idRequiredAlert: 'Please enter valid Operator ID (min 3 chars)',
    previousSessionFound: (stage, scene) => `Previous session found (Module ${stage} · Scene ${scene})`,
    startFromBeginning: 'Start From Beginning',
    resume: (stage, scene) => `Resume (M${stage}:S${scene}) →`,
    startCertification: 'Start Certification →'
  },
  hi: {
    dojoHome: 'डोजो होम',
    badgePhoto: 'बैज फोटो',
    compulsory: 'अनिवार्य',
    captured: 'कैप्चर किया गया',
    frontCamera: 'फ्रंट कैमरा',
    operatorBadgePhoto: 'ऑपरेटर बैज फोटो',
    photoCompulsorySub: 'फ्रंट कैमरा या फोटो अपलोड अनिवार्य है',
    frontCameraSub: 'फ्रंट कैमरा से फोटो लें',
    snapPhoto: 'फोटो खींचें',
    cancel: 'रद्द करें',
    retakePhoto: 'फोटो दोबारा लें',
    upload: 'अपलोड',
    removePhoto: 'फोटो हटाएँ',
    photoRequiredAlert: 'प्रारंभ करने के लिए बैज फोटो अनिवार्य है',
    traineeSignIn: 'प्रशिक्षु साइन-इन',
    operatorFullName: 'ऑपरेटर का पूरा नाम',
    valid: '✓ मान्य',
    namePlaceholder: 'पूरा नाम दर्ज करें',
    nameRequiredAlert: 'कृपया ऑपरेटर का पूरा नाम दर्ज करें',
    operatorId: 'ऑपरेटर आईडी / बैज संख्या',
    idPlaceholder: 'उदा. OP-AURIC-104',
    idRequiredAlert: 'कृपया मान्य ऑपरेटर आईडी दर्ज करें (कम से कम 3 अक्षर)',
    previousSessionFound: (stage, scene) => `पिछला सत्र मिला (मॉड्यूल ${stage} · दृश्य ${scene})`,
    startFromBeginning: 'शुरू से प्रारंभ करें',
    resume: (stage, scene) => `पुनः जारी रखें (M${stage}:S${scene}) →`,
    startCertification: 'प्रमाणीकरण प्रारंभ करें →'
  },
  mr: {
    dojoHome: 'डोझो होम',
    badgePhoto: 'बॅज फोटो',
    compulsory: 'अनिवार्य',
    captured: 'कॅप्चर केले',
    frontCamera: 'समोरचा कॅमेरा',
    operatorBadgePhoto: 'ऑपरेटर बॅज फोटो',
    photoCompulsorySub: 'समोरचा कॅमेरा किंवा फोटो अपलोड अनिवार्य आहे',
    frontCameraSub: 'समोरच्या कॅमेऱ्याने फोटो घ्या',
    snapPhoto: 'फोटो काढा',
    cancel: 'रद्द करा',
    retakePhoto: 'फोटो पुन्हा घ्या',
    upload: 'अपलोड',
    removePhoto: 'फोटो काढा',
    photoRequiredAlert: 'सुरू करण्यासाठी बॅज फोटो अनिवार्य आहे',
    traineeSignIn: 'प्रशिक्षणार्थी साइन-इन',
    operatorFullName: 'ऑपरेटरचे पूर्ण नाव',
    valid: '✓ वैध',
    namePlaceholder: 'पूर्ण नाव टाका',
    nameRequiredAlert: 'कृपया ऑपरेटरचे पूर्ण नाव टाका',
    operatorId: 'ऑपरेटर आयडी / बॅज क्र.',
    idPlaceholder: 'उदा. OP-AURIC-104',
    idRequiredAlert: 'कृपया वैध ऑपरेटर आयडी टाका (किमान ३ अक्षरे)',
    previousSessionFound: (stage, scene) => `मागील सत्र आढळले (मॉड्यूल ${stage} · दृश्य ${scene})`,
    startFromBeginning: 'सुरुवातीपासून सुरू करा',
    resume: (stage, scene) => `पुढे सुरू ठेवा (M${stage}:S${scene}) →`,
    startCertification: 'प्रमाणीकरण सुरू करा →'
  }
};

export function getRegistrationTranslations(lang: LanguageCode): RegistrationTranslations {
  return REGISTRATION_TRANSLATIONS[lang] || REGISTRATION_TRANSLATIONS.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Results Page Translations
// ─────────────────────────────────────────────────────────────────────────────

export interface ResultsTranslations {
  headerTitle: string;
  certifiedTitle: string;
  completedTitle: string;
  operatorPrefix: string;
  accuracy: string;
  pointsScored: string;
  floorRating: string;
  auditDeckTitle: string;
  isoStandard: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  statusPass: string;
  statusViolation: string;
  statusQualified: string;
  statusNeedsReattempt: string;
  statusCompliant: string;
  badgesTitle: string;
  badgeSafetyStar: string;
  badgePerfectRun: string;
  badgeCertified: string;
  viewCertificate: string;
  restartModule: string;
  dojoHome: string;
}

export const RESULTS_TRANSLATIONS: Record<LanguageCode, ResultsTranslations> = {
  en: {
    headerTitle: 'AURIC Plant M002 · Floor Competency Scorecard',
    certifiedTitle: 'SOP Floor Competency Certified!',
    completedTitle: 'SOP Floor Assessment Completed',
    operatorPrefix: 'Operator: ',
    accuracy: 'Accuracy',
    pointsScored: 'Points Scored',
    floorRating: 'Floor Rating',
    auditDeckTitle: '3-PILLAR FLOOR COMPETENCY AUDIT',
    isoStandard: 'Ather Standard ISO 9001:2015',
    pillar1Title: 'Pillar 1: Safety & EHS Adherence',
    pillar1Desc: 'Mandatory dock wheel chocking, engine shut-off, chemical Class 3 PPE, and hazardous vapor protocols. Zero tolerance threshold.',
    pillar2Title: 'Pillar 2: Process & Stowage Accuracy',
    pillar2Desc: 'Barcode verification, bin marriage scans, 10% statistical sampling, and SAP EWM transaction accuracy.',
    pillar3Title: 'Pillar 3: Line Feeder SLA & Velocity',
    pillar3Desc: 'Non-DOL 30-min handover SLA, paint shop 2-hour decanting buffer, and 4:00 PM STO dispatch cutoff adherence.',
    statusPass: 'PASS',
    statusViolation: 'VIOLATION',
    statusQualified: 'QUALIFIED (100%)',
    statusNeedsReattempt: 'NEEDS RE-ATTEMPT',
    statusCompliant: 'COMPLIANT (ON TIME)',
    badgesTitle: 'BADGES:',
    badgeSafetyStar: 'Safety Star',
    badgePerfectRun: 'Perfect Run',
    badgeCertified: 'Certified',
    viewCertificate: 'View & Print Official Certificate',
    restartModule: 'Restart Module',
    dojoHome: 'DOJO Home'
  },
  hi: {
    headerTitle: 'AURIC प्लांट M002 · फ़्लोर सक्षमता स्कोरकार्ड',
    certifiedTitle: 'SOP फ़्लोर सक्षमता प्रमाणित!',
    completedTitle: 'SOP फ़्लोर मूल्यांकन पूर्ण',
    operatorPrefix: 'ऑपरेटर: ',
    accuracy: 'सटीकता',
    pointsScored: 'अर्जित अंक',
    floorRating: 'फ़्लोर रेटिंग',
    auditDeckTitle: '3-स्तंभ फ़्लोर सक्षमता ऑडिट',
    isoStandard: 'एथर मानक ISO 9001:2015',
    pillar1Title: 'स्तंभ 1: सुरक्षा एवं EHS अनुपालन',
    pillar1Desc: 'अनिवार्य डॉक व्हील चॉकिंग, इंजन शट-ऑफ, रासायनिक क्लास 3 PPE और खतरनाक वाष्प प्रोटोकॉल। शून्य सहनशीलता नियम।',
    pillar2Title: 'स्तंभ 2: प्रक्रिया एवं स्टोवेज सटीकता',
    pillar2Desc: 'बारकोड सत्यापन, बिन मैरिज स्कैन, 10% सांख्यिकीय सैंपलिंग और SAP EWM ट्रांजेक्शन सटीकता।',
    pillar3Title: 'स्तंभ 3: लाइन फीडर SLA एवं गति',
    pillar3Desc: 'नॉन-DOL 30-मिनट हैंडओवर SLA, पेंट शॉप 2-घंटे डिकैंटिंग बफ़र और 4:00 PM STO डिस्पैच कटऑफ अनुपालन।',
    statusPass: 'उत्तीर्ण',
    statusViolation: 'उल्लंघन',
    statusQualified: 'योग्य (100%)',
    statusNeedsReattempt: 'पुनः प्रयास आवश्यक',
    statusCompliant: 'अनुपालन (समय पर)',
    badgesTitle: 'बैज:',
    badgeSafetyStar: 'सुरक्षा स्टार',
    badgePerfectRun: 'परफेक्ट रन',
    badgeCertified: 'प्रमाणित',
    viewCertificate: 'आधिकारिक प्रमाण पत्र देखें और प्रिंट करें',
    restartModule: 'मॉड्यूल पुनः प्रारंभ करें',
    dojoHome: 'डोजो होम'
  },
  mr: {
    headerTitle: 'AURIC प्लांट M002 · फ्लोअर सक्षमता स्कोअरकार्ड',
    certifiedTitle: 'SOP फ्लोअर सक्षमता प्रमाणित!',
    completedTitle: 'SOP फ्लोअर मूल्यांकन पूर्ण',
    operatorPrefix: 'ऑपरेटर: ',
    accuracy: 'अचूकता',
    pointsScored: 'मिळालेले गुण',
    floorRating: 'फ्लोअर रेटिंग',
    auditDeckTitle: '३-स्तंभ फ्लोअर सक्षमता ऑडिट',
    isoStandard: 'अथेर मानक ISO 9001:2015',
    pillar1Title: 'स्तंभ १: सुरक्षा आणि EHS पालन',
    pillar1Desc: 'अनिवार्य डॉक व्हील चॉकिंग, इंजिन शट-ऑफ, रासायनिक क्लास ३ PPE आणि धोकादायक बाष्प प्रोटोकॉल. शून्य सहनशीलता नियम.',
    pillar2Title: 'स्तंभ २: प्रक्रिया आणि स्टोवेज अचूकता',
    pillar2Desc: 'बारकोड पडताळणी, बिन मॅरेज स्कॅन, १०% सांख्यिकी सॅम्पलिंग आणि SAP EWM ट्रान्झॅक्शन अचूकता.',
    pillar3Title: 'स्तंभ ३: लाईन फीडर SLA आणि गती',
    pillar3Desc: 'नॉन-DOL ३०-मिनिट हँडओव्हर SLA, पेंट शॉप २-तास डिकँटिंग बफर आणि ४:०० PM STO डिस्पॅच कटऑफ पालन.',
    statusPass: 'उत्तीर्ण',
    statusViolation: 'उल्लंघन',
    statusQualified: 'पात्र (१००%)',
    statusNeedsReattempt: 'पुन्हा प्रयत्न आवश्यक',
    statusCompliant: 'पालन (वेळेवर)',
    badgesTitle: 'बॅजेस:',
    badgeSafetyStar: 'सुरक्षा स्टार',
    badgePerfectRun: 'परफेक्ट रन',
    badgeCertified: 'प्रमाणित',
    viewCertificate: 'अधिकृत प्रमाणपत्र पहा आणि प्रिंट करा',
    restartModule: 'मॉड्यूल पुन्हा सुरू करा',
    dojoHome: 'डोझो होम'
  }
};

export function getResultsTranslations(lang: LanguageCode): ResultsTranslations {
  return RESULTS_TRANSLATIONS[lang] || RESULTS_TRANSLATIONS.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Certificate Page Translations
// ─────────────────────────────────────────────────────────────────────────────

export interface CertificateTranslations {
  returnToScorecard: string;
  officialCredential: string;
  printCertificate: string;
  finishSession: string;
  auricHeader: string;
  industrialSafetyDojo: string;
  verifiedSopCompliance: string;
  refPrefix: string;
  issuedPrefix: string;
  certificateTitle: string;
  certificateName: string;
  certificateBody: string;
  certifiedOperatorLabel: string;
  defaultOperatorName: string;
  empIdPrefix: string;
  facilityLabel: string;
  verifiedQcPass: string;
  standardCompliant: string;
  certifiedModuleLabel: string;
  receivingModuleName: string;
  pickingModuleName: string;
  receivingModuleSlices: string;
  pickingModuleSlices: string;
  governingStandardLabel: string;
  governingStandardSub: string;
  assessmentScoreLabel: string;
  accuracyLabel: string;
  pointsScoredSuffix: string;
  zeroViolations: string;
  dateOfCertificationLabel: string;
  qcPassCertifiedStamp: string;
  m002QaStampSub: string;
  trainingPlatformLabel: string;
  plantOpsHeadTitle: string;
  plantOpsHeadName: string;
  qualitySafetyHeadTitle: string;
  qualitySafetyHeadName: string;
}

export const CERTIFICATE_TRANSLATIONS: Record<LanguageCode, CertificateTranslations> = {
  en: {
    returnToScorecard: 'RETURN TO SCORECARD',
    officialCredential: 'Official Competency Credential · Ather Energy AURIC Mega-Plant',
    printCertificate: 'PRINT CERTIFICATE (A4)',
    finishSession: 'FINISH SESSION',
    auricHeader: 'AURIC PLANT M002 · SAMBHAJINAGAR',
    industrialSafetyDojo: 'Industrial Safety & Operations Dojo',
    verifiedSopCompliance: 'VERIFIED SOP COMPLIANCE',
    refPrefix: 'Ref: ',
    issuedPrefix: 'Issued: ',
    certificateTitle: 'CERTIFICATE OF OPERATIONAL COMPETENCY',
    certificateName: 'Ather Floor Operator SOP Certification',
    certificateBody: 'This officially certifies that the operator named below has successfully undergone interactive training and rigorous digital assessment for standard operating procedures at Ather Energy AURIC Mega-Plant.',
    certifiedOperatorLabel: 'CERTIFIED OPERATOR / TRAINEE',
    defaultOperatorName: 'Floor Operator',
    empIdPrefix: 'Emp ID: ',
    facilityLabel: 'Facility: AURIC Mega-Plant',
    verifiedQcPass: 'VERIFIED QC PASS',
    standardCompliant: 'Standard Compliant',
    certifiedModuleLabel: 'CERTIFIED OPERATIONAL MODULE',
    receivingModuleName: 'Warehouse Receiving & Put-Away Certification',
    pickingModuleName: 'Order Picking & Packaging Certification',
    receivingModuleSlices: '7 Modules · 52 Operational Slices',
    pickingModuleSlices: '5 Modules · 44 Operational Slices',
    governingStandardLabel: 'GOVERNING SOP STANDARD',
    governingStandardSub: 'Ather AURIC Standard Operating Procedures',
    assessmentScoreLabel: 'ASSESSMENT SCORE',
    accuracyLabel: 'Accuracy',
    pointsScoredSuffix: 'Points Scored',
    zeroViolations: 'Zero Violations',
    dateOfCertificationLabel: 'DATE OF CERTIFICATION',
    qcPassCertifiedStamp: 'QC PASS & CERTIFIED',
    m002QaStampSub: 'M002 QA & Safety Cell Verified',
    trainingPlatformLabel: 'TRAINING PLATFORM',
    plantOpsHeadTitle: 'Plant Operations Head',
    plantOpsHeadName: 'Sunil Kulkarni',
    qualitySafetyHeadTitle: 'Head of Quality & Safety',
    qualitySafetyHeadName: 'Anand Sharma'
  },
  hi: {
    returnToScorecard: 'स्कोरकार्ड पर वापस',
    officialCredential: 'आधिकारिक सक्षमता प्रमाण पत्र · एथर एनर्जी AURIC मेगा-प्लांट',
    printCertificate: 'प्रमाण पत्र प्रिंट करें (A4)',
    finishSession: 'सत्र समाप्त करें',
    auricHeader: 'AURIC प्लांट M002 · संभाजीनगर',
    industrialSafetyDojo: 'औद्योगिक सुरक्षा एवं संचालन डोजो',
    verifiedSopCompliance: 'सत्यापित SOP अनुपालन',
    refPrefix: 'संदर्भ: ',
    issuedPrefix: 'जारी तिथि: ',
    certificateTitle: 'परिचालन सक्षमता प्रमाण पत्र',
    certificateName: 'एथर फ़्लोर ऑपरेटर SOP प्रमाणीकरण',
    certificateBody: 'यह प्रमाणित किया जाता है कि नीचे उल्लिखित ऑपरेटर ने एथर एनर्जी AURIC मेगा-प्लांट में मानक संचालन प्रक्रियाओं के लिए इंटरएक्टिव प्रशिक्षण और कठोर डिजिटल मूल्यांकन सफलतापूर्वक पूरा किया है।',
    certifiedOperatorLabel: 'प्रमाणित ऑपरेटर / प्रशिक्षु',
    defaultOperatorName: 'फ़्लोर ऑपरेटर',
    empIdPrefix: 'कर्मचारी आईडी: ',
    facilityLabel: 'संयंत्र: AURIC मेगा-प्लांट',
    verifiedQcPass: 'सत्यापित QC उत्तीर्ण',
    standardCompliant: 'मानक अनुपालन',
    certifiedModuleLabel: 'प्रमाणित परिचालन मॉड्यूल',
    receivingModuleName: 'वेयरहाउस रिसीविंग और पुट-अवे प्रमाणीकरण',
    pickingModuleName: 'ऑर्डर पिकिंग और पैकेजिंग प्रमाणीकरण',
    receivingModuleSlices: '7 मॉड्यूल · 52 परिचालन चरण',
    pickingModuleSlices: '5 मॉड्यूल · 44 परिचालन चरण',
    governingStandardLabel: 'शासी SOP मानक',
    governingStandardSub: 'एथर AURIC मानक संचालन प्रक्रियाएँ',
    assessmentScoreLabel: 'मूल्यांकन स्कोर',
    accuracyLabel: 'सटीकता',
    pointsScoredSuffix: 'अर्जित अंक',
    zeroViolations: 'शून्य उल्लंघन',
    dateOfCertificationLabel: 'प्रमाणीकरण तिथि',
    qcPassCertifiedStamp: 'QC उत्तीर्ण एवं प्रमाणित',
    m002QaStampSub: 'M002 QA एवं सुरक्षा प्रकोष्ठ द्वारा सत्यापित',
    trainingPlatformLabel: 'प्रशिक्षण मंच',
    plantOpsHeadTitle: 'प्लांट ऑपरेशंस प्रमुख',
    plantOpsHeadName: 'सुनील कुलकर्णी',
    qualitySafetyHeadTitle: 'गुणवत्ता एवं सुरक्षा प्रमुख',
    qualitySafetyHeadName: 'आनंद शर्मा'
  },
  mr: {
    returnToScorecard: 'स्कोअरकार्डवर परत',
    officialCredential: 'अधिकृत सक्षमता प्रमाणपत्र · अथेर एनर्जी AURIC मेगा-प्लांट',
    printCertificate: 'प्रमाणपत्र प्रिंट करा (A4)',
    finishSession: 'सत्र पूर्ण करा',
    auricHeader: 'AURIC प्लांट M002 · संभाजीनगर',
    industrialSafetyDojo: 'औद्योगिक सुरक्षा आणि ऑपरेशन्स डोझो',
    verifiedSopCompliance: 'पडताळलेले SOP पालन',
    refPrefix: 'संदर्भ: ',
    issuedPrefix: 'जारी तारीख: ',
    certificateTitle: 'ऑपरेशनल सक्षमता प्रमाणपत्र',
    certificateName: 'अथेर फ्लोअर ऑपरेटर SOP प्रमाणीकरण',
    certificateBody: 'याद्वारे प्रमाणित करण्यात येते की खाली नमूद केलेल्या ऑपरेटरने अथेर एनर्जी AURIC मेगा-प्लांटमध्ये मानक कार्यप्रणालींसाठी परस्परसंवादी प्रशिक्षण आणि कठोर डिजिटल मूल्यांकन यशस्वीरीत्या पूर्ण केले आहे.',
    certifiedOperatorLabel: 'प्रमाणित ऑपरेटर / प्रशिक्षणार्थी',
    defaultOperatorName: 'फ्लोअर ऑपरेटर',
    empIdPrefix: 'कर्मचारी आयडी: ',
    facilityLabel: 'संयंत्र: AURIC मेगा-प्लांट',
    verifiedQcPass: 'पडताळलेले QC उत्तीर्ण',
    standardCompliant: 'मानक पालन',
    certifiedModuleLabel: 'प्रमाणित ऑपरेशनल मॉड्यूल',
    receivingModuleName: 'वेअरहाऊस रिसिव्हिंग आणि पुट-अवे प्रमाणीकरण',
    pickingModuleName: 'ऑर्डर पिकिंग आणि पॅकेजिंग प्रमाणीकरण',
    receivingModuleSlices: '७ मॉड्यूल · ५२ ऑपरेशनल टप्पे',
    pickingModuleSlices: '५ मॉड्यूल · ४४ ऑपरेशनल टप्पे',
    governingStandardLabel: 'नियंत्रक SOP मानक',
    governingStandardSub: 'अथेर AURIC मानक कार्यप्रणाली',
    assessmentScoreLabel: 'मूल्यांकन स्कोअर',
    accuracyLabel: 'अचूकता',
    pointsScoredSuffix: 'मिळालेले गुण',
    zeroViolations: 'शून्य उल्लंघन',
    dateOfCertificationLabel: 'प्रमाणीकरण तारीख',
    qcPassCertifiedStamp: 'QC उत्तीर्ण व प्रमाणित',
    m002QaStampSub: 'M002 QA आणि सुरक्षा विभागाद्वारे पडताळलेले',
    trainingPlatformLabel: 'प्रशिक्षण मंच',
    plantOpsHeadTitle: 'प्लांट ऑपरेशन्स प्रमुख',
    plantOpsHeadName: 'सुनील कुलकर्णी',
    qualitySafetyHeadTitle: 'गुणवत्ता आणि सुरक्षा प्रमुख',
    qualitySafetyHeadName: 'आनंद शर्मा'
  }
};

export function getCertificateTranslations(lang: LanguageCode): CertificateTranslations {
  return CERTIFICATE_TRANSLATIONS[lang] || CERTIFICATE_TRANSLATIONS.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. In-Game Story HUD Translations
// ─────────────────────────────────────────────────────────────────────────────

export interface HudTranslations {
  sceneCounter: (current: number, total: number) => string;
  voice: string;
  on: string;
  muted: string;
  dojoHome: string;
}

export const HUD_TRANSLATIONS: Record<LanguageCode, HudTranslations> = {
  en: {
    sceneCounter: (current, total) => `Scene ${current} of ${total}`,
    voice: 'Voice',
    on: 'ON',
    muted: 'MUTED',
    dojoHome: 'DOJO Home'
  },
  hi: {
    sceneCounter: (current, total) => `दृश्य ${current} / ${total}`,
    voice: 'आवाज़',
    on: 'चालू',
    muted: 'म्यूट',
    dojoHome: 'डोजो होम'
  },
  mr: {
    sceneCounter: (current, total) => `दृश्य ${current} / ${total}`,
    voice: 'आवाज',
    on: 'चालू',
    muted: 'म्यूट',
    dojoHome: 'डोझो होम'
  }
};

export function getHudTranslations(lang: LanguageCode): HudTranslations {
  return HUD_TRANSLATIONS[lang] || HUD_TRANSLATIONS.en;
}
