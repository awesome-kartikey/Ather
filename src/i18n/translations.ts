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
