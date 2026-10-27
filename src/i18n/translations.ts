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
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    title: 'Floor Trainer',
    subtitle: 'Interactive warehouse training. Scenarios reflect standard SOP placeholders.',
    guided: 'Guided',
    practice: 'Practice',
    check: 'Check',
    next: 'Next Step',
    correct: 'Correct!',
    notQuite: 'Not Quite',
    tryAgain: 'Try Again',
    home: 'Home',
    listen: 'Listen',
    listening: 'Playing...',
    safetyBadgeEarned: 'Safety Star Earned',
    safetyStepMissed: 'Safety step missed. Repeat the training without missing safety to earn the star.',
    best: 'Best Score',
    yourName: 'Worker Name',
    namePlaceholder: 'Enter your name',
    xp: 'XP',
    dayStreak: 'day streak',
    certified: 'Certified. Present this certificate to your supervisor for floor verification.',
    outOfLives: 'Out of lives. Review the demo and try again.',
    dragHint: 'Drag each item to its zone, or tap an item then tap its zone.',
    topRuns: 'Top Runs on this Tablet',
    watchDemo: 'Watch Demo',
    replay: 'Replay Demo',
    startPractice: 'Start Practice (3 Lives)',
    startGuided: 'Start Guided (Hints ON)',
    settings: 'Floor Settings',
    leaderboardToggle: 'Show Tablet Leaderboard',
    soundEffects: 'Sound Effects (Audio Synth)',
    vibration: 'Vibration Haptic Feedback',
    autoReadTTS: 'Auto-Read Step Questions',
    exportCsv: 'Export Records (CSV)',
    exportJson: 'Export Backup (JSON)',
    supervisorSignOff: 'Supervisor Sign-off',
    supervisorSignatureLine: 'Supervisor Signature: _______________________',
    plantLocation: 'Chhatrapati Sambhajinagar Plant — Ather Energy',
    rotateDevicePrompt: 'Please rotate your tablet to landscape mode for the factory floor simulation.',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    accuracy: 'Accuracy',
    speedBonusEarned: '+5 Speed Bonus (<12s)!',
    comboLabel: 'Combo',
    livesLabel: 'Lives',
    viewCertificate: 'View Certificate',
    printCertificate: 'Print Certificate',
    close: 'Close',
    sampleNotice: 'Sample scenario — replace with Ather SOP',
    itemsRemaining: 'items left to place'
  },
  hi: {
    title: 'फ़्लोर ट्रेनर',
    subtitle: 'इंटरएक्टिव वेयरहाउस प्रशिक्षण। आधिकारिक SOP आने तक चरण नमूना हैं।',
    guided: 'गाइडेड',
    practice: 'प्रैक्टिस',
    check: 'जाँचें',
    next: 'अगला चरण',
    correct: 'सही!',
    notQuite: 'सही नहीं',
    tryAgain: 'फिर से करें',
    home: 'होम',
    listen: 'सुनों',
    listening: 'चल रहा है...',
    safetyBadgeEarned: 'सुरक्षा स्टार प्राप्त हुआ',
    safetyStepMissed: 'सुरक्षा चरण छूट गया। स्टार पाने के लिए बिना सुरक्षा चूके दोबारा अभ्यास करें।',
    best: 'सर्वश्रेष्ठ',
    yourName: 'ऑपरेटर का नाम',
    namePlaceholder: 'अपना नाम लिखें',
    xp: 'XP',
    dayStreak: 'दिन लगातार',
    certified: 'प्रमाणित। साइन-ऑफ और सत्यापन के लिए यह प्रमाण पत्र अपने सुपरवाइज़र को दिखाएँ।',
    outOfLives: 'सभी जीवन समाप्त। डेमो देखें और दोबारा कोशिश करें।',
    dragHint: 'हर वस्तु को उसके ज़ोन में खींचें, या वस्तु छूकर ज़ोन छुएँ।',
    topRuns: 'इस टैबलेट पर शीर्ष प्रदर्शन',
    watchDemo: 'डेमो देखें',
    replay: 'डेमो फिर देखें',
    startPractice: 'प्रैक्टिस शुरू करें (3 जीवन)',
    startGuided: 'गाइडेड शुरू करें (संकेत चालू)',
    settings: 'फ़्लोर सेटिंग्स',
    leaderboardToggle: 'टैबलेट लीडरबोर्ड दिखाएँ',
    soundEffects: 'ध्वनि प्रभाव (सिंथेसाइज़र)',
    vibration: 'कंपन (हैप्टिक)',
    autoReadTTS: 'प्रश्न अपने आप बोलकर सुनाएँ',
    exportCsv: 'रिकॉर्ड्स निर्यात करें (CSV)',
    exportJson: 'बैकअप निर्यात करें (JSON)',
    supervisorSignOff: 'सुपरवाइज़र साइन-ऑफ',
    supervisorSignatureLine: 'सुपरवाइज़र के हस्ताक्षर: _______________________',
    plantLocation: 'छत्रपति संभाजीनगर प्लांट — एथर एनर्जी',
    rotateDevicePrompt: 'कृपया फ़ैक्टरी फ़्लोर सिमुलेशन के लिए अपने टैबलेट को लैंडस्केप में घुमाएँ।',
    fullscreen: 'फुलस्क्रीन',
    exitFullscreen: 'फुलस्क्रीन बंद करें',
    accuracy: 'सटीकता',
    speedBonusEarned: '+5 गति बोनस (<12 सेकंड)!',
    comboLabel: 'कॉम्बो',
    livesLabel: 'जीवन',
    viewCertificate: 'प्रमाणपत्र देखें',
    printCertificate: 'प्रमाणपत्र प्रिंट करें',
    close: 'बंद करें',
    sampleNotice: 'नमूना परिदृश्य — एथर SOP से बदलें',
    itemsRemaining: 'वस्तुएँ शेष'
  },
  mr: {
    title: 'फ्लोअर ट्रेनर',
    subtitle: 'परस्परसंवादी गोदाम प्रशिक्षण. अधिकृत SOP येईपर्यंत पायऱ्या नमुना आहेत.',
    guided: 'गाइडेड',
    practice: 'प्रॅक्टिस',
    check: 'तपासा',
    next: 'पुढील पायरी',
    correct: 'बरोबर!',
    notQuite: 'बरोबर नाही',
    tryAgain: 'पुन्हा करा',
    home: 'होम',
    listen: 'ऐका',
    listening: 'चालू आहे...',
    safetyBadgeEarned: 'सुरक्षा स्टार मिळाला',
    safetyStepMissed: 'सुरक्षा पायरी चुकली. स्टार मिळवण्यासाठी सुरक्षेची चूक न करता पुन्हा सराव करा.',
    best: 'सर्वोत्तम',
    yourName: 'ऑपरेटरचे नाव',
    namePlaceholder: 'तुमचे नाव प्रविष्ट करा',
    xp: 'XP',
    dayStreak: 'दिवस सलग',
    certified: 'प्रमाणित. जमिनीवरील पडताळणी व सहीसाठी हे प्रमाणपत्र तुमच्या सुपरवायझरला दाखवा.',
    outOfLives: 'सर्व जीव संपले. डेमो पहा आणि पुन्हा प्रयत्न करा.',
    dragHint: 'प्रत्येक वस्तू जागेवर ओढा, किंवा वस्तूला स्पर्श करून जागा निवडा.',
    topRuns: 'या टॅबलेटवरील सर्वोत्तम स्कोअर',
    watchDemo: 'डेमो पहा',
    replay: 'डेमो पुन्हा पहा',
    startPractice: 'प्रॅक्टिस सुरू करा (३ जीव)',
    startGuided: 'गाइडेड सुरू करा (संकेत चालू)',
    settings: 'फ्लोअर सेटिंग्ज',
    leaderboardToggle: 'टॅबलेट लीडरबोर्ड दाखवा',
    soundEffects: 'ध्वनी प्रभाव (ऑडिओ सिंथ)',
    vibration: 'कंपन (हॅप्टिक फीडबॅक)',
    autoReadTTS: 'प्रश्न आपोआप बोलून दाखवा',
    exportCsv: 'रेकॉर्ड्स निर्यात करा (CSV)',
    exportJson: 'बॅकअप निर्यात करा (JSON)',
    supervisorSignOff: 'सुपरवायझर सही',
    supervisorSignatureLine: 'सुपरवायझरची सही: _______________________',
    plantLocation: 'छत्रपती संभाजीनगर प्लांट — अथेर एनर्जी',
    rotateDevicePrompt: 'कृपया फॅक्टरी फ्लोअर सिम्युलेशनसाठी तुमचा टॅबलेट लँडस्केपमध्ये फिरवा.',
    fullscreen: 'पूर्ण स्क्रीन',
    exitFullscreen: 'पूर्ण स्क्रीन बंद करा',
    accuracy: 'अचूकता',
    speedBonusEarned: '+५ गती बोनस (<१२ सेकंद)!',
    comboLabel: 'कॉम्बो',
    livesLabel: 'जीव',
    viewCertificate: 'प्रमाणपत्र पहा',
    printCertificate: 'प्रमाणपत्र प्रिंट करा',
    close: 'बंद करा',
    sampleNotice: 'नमुना परिस्थिती — अथेर SOP ने बदला',
    itemsRemaining: 'वस्तू शिल्लक'
  }
};

export function useTranslation(lang: LanguageCode): UIStrings {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
