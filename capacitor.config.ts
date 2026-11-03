import type { CapacitorConfig } from '@capacitor/cli';

const appMode = process.env.CAPACITOR_APP_MODE || process.env.VITE_APP_MODE || 'receiving';
const isPicking = appMode === 'picking';

const config: CapacitorConfig = {
  appId: isPicking ? 'com.ather.warehouse.picking' : 'com.ather.warehouse.receiving',
  appName: isPicking ? 'Order Picking & Packaging' : 'Warehouse Receiving & Put-Away',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
