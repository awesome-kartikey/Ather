import { registerPlugin, Capacitor } from '@capacitor/core';

export const CURRENT_APP_VERSION = '1.0.4';

export interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseName: string;
  releaseNotes: string;
  downloadUrl: string;
  publishedAt: string;
}

interface AppUpdatePluginInterface {
  getAppVersion(): Promise<{ versionName: string; versionCode: number }>;
  installApk(options: { url: string }): Promise<{ status: string; downloadId?: number }>;
}

const AppUpdate = registerPlugin<AppUpdatePluginInterface>('AppUpdate');

/**
 * Compare two semver-like strings (e.g., 'v1.0.3' or '1.0.3')
 * Returns 1 if vA > vB, -1 if vA < vB, 0 if equal
 */
function compareVersions(vA: string, vB: string): number {
  const cleanA = vA.replace(/^v/, '').trim();
  const cleanB = vB.replace(/^v/, '').trim();

  const partsA = cleanA.split('.').map(n => parseInt(n, 10) || 0);
  const partsB = cleanB.split('.').map(n => parseInt(n, 10) || 0);

  const maxLen = Math.max(partsA.length, partsB.length);
  for (let i = 0; i < maxLen; i++) {
    const a = partsA[i] || 0;
    const b = partsB[i] || 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }
  return 0;
}

/**
 * Check GitHub Releases for newer APK versions
 */
export async function checkForAppUpdate(appMode: 'receiving' | 'picking'): Promise<UpdateInfo | null> {
  try {
    const repo = 'awesome-kartikey/Ather';
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        // No releases published yet
        return null;
      }
      throw new Error(`GitHub Releases HTTP ${response.status}`);
    }

    const release = await response.json();
    const latestTag = release.tag_name || release.name || '1.0.0';
    const cleanLatest = latestTag.replace(/^v/, '');

    // 1. Get true installed version from Android OS
    let installedVersion = CURRENT_APP_VERSION;
    if (Capacitor.isNativePlatform()) {
      try {
        const info = await AppUpdate.getAppVersion();
        if (info && info.versionName) {
          installedVersion = info.versionName.replace(/^v/, '');
        }
      } catch (err) {
        console.warn('[AutoUpdate] Could not fetch native app version:', err);
      }
    }

    // 2. Check if user already dismissed or installed this version in this session
    const dismissedVersion = localStorage.getItem('ather_dismissed_update_version');
    const installedVersionCache = localStorage.getItem('ather_installed_update_version');
    if (dismissedVersion === cleanLatest || installedVersionCache === cleanLatest) {
      return null;
    }

    // 3. Compare versions: only prompt if release is strictly higher than installed
    const hasUpdate = compareVersions(cleanLatest, installedVersion) > 0;
    if (!hasUpdate) {
      return null;
    }

    // Pick target APK based on appMode
    const isPicking = appMode === 'picking';
    const apkKeyword = isPicking ? 'picking' : 'receiving';
    const defaultApkName = isPicking 
      ? 'Ather_Order_Picking_Packaging.apk' 
      : 'Ather_Warehouse_Receiving_PutAway.apk';

    let downloadUrl = `https://github.com/${repo}/releases/latest/download/${defaultApkName}`;

    if (Array.isArray(release.assets) && release.assets.length > 0) {
      const matchedAsset = release.assets.find((asset: any) => 
        asset.name.toLowerCase().includes(apkKeyword) && asset.name.endsWith('.apk')
      );
      if (matchedAsset && matchedAsset.browser_download_url) {
        downloadUrl = matchedAsset.browser_download_url;
      }
    }

    return {
      hasUpdate,
      currentVersion: installedVersion,
      latestVersion: cleanLatest,
      releaseName: release.name || `Release v${cleanLatest}`,
      releaseNotes: release.body || 'New operational training features, voiceover sync, and performance optimizations.',
      downloadUrl,
      publishedAt: release.published_at || new Date().toISOString()
    };
  } catch (err) {
    console.warn('[AutoUpdate] Background update check failed (offline or network):', err);
    return null;
  }
}

/**
 * Initiate in-app APK download and installation
 */
export async function installAppUpdate(downloadUrl: string, latestVersion?: string): Promise<{ success: boolean; message: string }> {
  try {
    if (latestVersion) {
      localStorage.setItem('ather_installed_update_version', latestVersion);
    }

    if (Capacitor.isNativePlatform()) {
      try {
        await AppUpdate.installApk({ url: downloadUrl });
        return {
          success: true,
          message: 'Download started in Android notifications. Installation will launch automatically.'
        };
      } catch (nativeErr: any) {
        console.warn('[AutoUpdate] Native installer failed, falling back to system browser:', nativeErr);
        window.open(downloadUrl, '_system');
        return {
          success: true,
          message: nativeErr?.message?.includes('PERMISSION_NEEDED')
            ? nativeErr.message
            : 'Opening download link in system browser...'
        };
      }
    } else {
      // Running as PWA / Browser
      window.open(downloadUrl, '_blank');
      return {
        success: true,
        message: 'Opening APK download in browser.'
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to initiate update download.'
    };
  }
}
