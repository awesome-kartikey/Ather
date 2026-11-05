import fs from 'node:fs';
import path from 'node:path';

const mode = (process.argv[2] || process.env.CAPACITOR_APP_MODE || process.env.VITE_APP_MODE || 'receiving').toLowerCase();
const isPicking = mode === 'picking';

const appId = isPicking ? 'com.ather.warehouse.picking' : 'com.ather.warehouse.receiving';
const appName = isPicking ? 'Order Picking & Packaging' : 'Warehouse Receiving & Put-Away';

const rootDir = process.cwd();
const gradlePath = path.join(rootDir, 'android/app/build.gradle');
const stringsPath = path.join(rootDir, 'android/app/src/main/res/values/strings.xml');

// 1. Update android/app/build.gradle applicationId
let gradleContent = fs.readFileSync(gradlePath, 'utf8');
gradleContent = gradleContent.replace(
  /applicationId\s+["'].*?["']/,
  `applicationId "${appId}"`
);
fs.writeFileSync(gradlePath, gradleContent, 'utf8');

// 2. Update android/app/src/main/res/values/strings.xml
const xmlEscapedAppName = appName.replace(/&/g, '&amp;');
const stringsContent = `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">${xmlEscapedAppName}</string>
    <string name="title_activity_main">${xmlEscapedAppName}</string>
    <string name="package_name">${appId}</string>
    <string name="custom_url_scheme">${appId}</string>
</resources>
`;
fs.writeFileSync(stringsPath, stringsContent, 'utf8');

console.log(`[sync-android-mode] Synced Android configuration for mode '${mode}':`);
console.log(`  Package ID (applicationId): ${appId}`);
console.log(`  App Name:                   ${appName}`);
