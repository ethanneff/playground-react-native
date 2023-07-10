import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const jest = process.env.JEST_WORKER_ID;
const dev =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  process.env.NODE_ENV === 'development' || (Platform.OS !== 'web' && __DEV__);
const emulator = DeviceInfo.isEmulatorSync();

export const Globals = {
  device: emulator ? 'emulator' : 'device',
  environment: jest ? 'test' : dev ? 'dev' : 'prod',
  platform: Platform.OS,
} as const;
