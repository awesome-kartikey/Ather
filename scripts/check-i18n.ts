import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_LANGUAGES = ['en', 'hi', 'mr'] as const;
const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

let totalFilesChecked = 0;
let totalStringsChecked = 0;
let unreviewedCount = 0;
const errors: string[] = [];

function isLikelyLocalizedObject(obj: any): boolean {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  // If it has 'en' or 'hi' or 'mr', it's expected to be a LocalizedString
  return 'en' in obj || 'hi' in obj || 'mr' in obj;
}

function validateLocalizedString(val: any, location: string) {
  totalStringsChecked++;
  for (const lang of REQUIRED_LANGUAGES) {
    if (!(lang in val)) {
      errors.push(`Missing language '${lang}' at ${location}`);
    } else if (typeof val[lang] !== 'string' || val[lang].trim() === '') {
      errors.push(`Empty or invalid string for language '${lang}' at ${location}`);
    }
  }

  if (val.reviewed === false) {
    unreviewedCount++;
  }
}

function traverse(node: any, currentPath: string) {
  if (!node || typeof node !== 'object') return;

  if (isLikelyLocalizedObject(node)) {
    validateLocalizedString(node, currentPath);
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      traverse(item, `${currentPath}[${index}]`);
    });
  } else {
    for (const [key, value] of Object.entries(node)) {
      traverse(value, currentPath ? `${currentPath}.${key}` : key);
    }
  }
}

function checkContentFiles() {
  console.log('🔍 Checking i18n completeness in scenario packs (EN, HI, MR)...');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.error(`❌ No JSON pack files found in ${CONTENT_DIR}`);
    process.exit(1);
  }

  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    try {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      totalFilesChecked++;
      traverse(content, `${file}`);
    } catch (e: any) {
      errors.push(`Malformed JSON file ${file}: ${e.message}`);
    }
  }

  console.log(`\n📊 i18n Check Summary:`);
  console.log(`  - Files checked: ${totalFilesChecked}`);
  console.log(`  - Localized strings checked: ${totalStringsChecked}`);
  console.log(`  - Unreviewed translations flagged: ${unreviewedCount}`);

  if (errors.length > 0) {
    console.error(`\n❌ i18n check FAILED with ${errors.length} error(s):`);
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✅ All scenario pack strings have full {en, hi, mr} translations!\n');
}

checkContentFiles();
