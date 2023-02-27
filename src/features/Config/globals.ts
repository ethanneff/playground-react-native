import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// @ts-expect-error Cannot find name 'process'
const jest = process.env.JEST_WORKER_ID;
// @ts-expect-error Cannot find name 'process'
const dev = process.env.NODE_ENV === 'development' || __DEV__;
const emulator = DeviceInfo.isEmulatorSync();

export const Globals = {
  device: emulator ? 'emulator' : 'device',
  environment: jest ? 'test' : dev ? 'dev' : 'prod',
  platform: Platform.OS,
} as const;
