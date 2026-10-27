import type { LevelDefinition, BadgeDefinition, BadgeId } from './types';

export const LEVELS: LevelDefinition[] = [
  {
    level: 0,
    minXp: 0,
    title: {
      en: 'Rookie',
      hi: 'नया',
      mr: 'नवखा'
    }
  },
  {
    level: 1,
    minXp: 60,
    title: {
      en: 'Handler',
      hi: 'हैंडलर',
      mr: 'हँडलर'
    }
  },
  {
    level: 2,
    minXp: 150,
    title: {
      en: 'Specialist',
      hi: 'स्पेशलिस्ट',
      mr: 'स्पेशालिस्ट'
    }
  },
  {
    level: 3,
    minXp: 300,
    title: {
      en: 'Floor Pro',
      hi: 'फ़्लोर प्रो',
      mr: 'फ्लोअर प्रो'
    }
  }
];

export const BADGES: Record<BadgeId, BadgeDefinition> = {
  safe: {
    id: 'safe',
    icon: '🛡️',
    title: {
      en: 'Safety Star',
      hi: 'सेफ्टी स्टार',
      mr: 'सेफ्टी स्टार'
    },
    description: {
      en: 'Zero safety misses in this run',
      hi: 'इस रन में शून्य सुरक्षा विफलताएँ',
      mr: 'या रनमध्ये कोणतीही सुरक्षा चूक नाही'
    }
  },
  perf: {
    id: 'perf',
    icon: '🎯',
    title: {
      en: 'Perfect Run',
      hi: 'परफेक्ट रन',
      mr: 'परफेक्ट रन'
    },
    description: {
      en: '100% correct answers',
      hi: '100% सही उत्तर',
      mr: '100% अचूक उत्तरे'
    }
  },
  eye: {
    id: 'eye',
    icon: '👁️',
    title: {
      en: 'Sharp Eye',
      hi: 'तेज़ नज़र',
      mr: 'तीक्ष्ण नजर'
    },
    description: {
      en: '2+ correct hotspot or error detections',
      hi: '2+ सही स्पॉट या त्रुटि खोज',
      mr: '2+ अचूक हॉटस्पॉट किंवा चुका शोधल्या'
    }
  },
  cmb: {
    id: 'cmb',
    icon: '🔥',
    title: {
      en: 'Combo ×5',
      hi: 'कॉम्बो ×5',
      mr: 'कॉम्बो ×5'
    },
    description: {
      en: 'Maintained a 5-step streak without mistakes',
      hi: 'बिना गलती के 5 लगातार सही उत्तर',
      mr: 'कोणतीही चूक न करता सलग 5 अचूक उत्तरे'
    }
  },
  cert: {
    id: 'cert',
    icon: '🏅',
    title: {
      en: 'Certified',
      hi: 'प्रमाणित',
      mr: 'प्रमाणित'
    },
    description: {
      en: 'Passed Practice Mode with 3 Stars',
      hi: 'प्रैक्टिस मोड 3 स्टार के साथ उत्तीर्ण',
      mr: 'प्रॅक्टिस मोड 3 स्टारसह उत्तीर्ण'
    }
  }
};

export function getLevelInfo(totalXp: number): {
  levelIndex: number;
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  progressPct: number;
} {
  let levelIndex = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) {
      levelIndex = i;
      break;
    }
  }

  const currentLevel = LEVELS[levelIndex];
  const nextLevel = levelIndex + 1 < LEVELS.length ? LEVELS[levelIndex + 1] : null;

  let progressPct = 100;
  if (nextLevel) {
    const range = nextLevel.minXp - currentLevel.minXp;
    const gainedInRange = totalXp - currentLevel.minXp;
    progressPct = Math.min(Math.max(Math.round((gainedInRange / range) * 100), 0), 100);
  }

  return {
    levelIndex,
    currentLevel,
    nextLevel,
    progressPct
  };
}
