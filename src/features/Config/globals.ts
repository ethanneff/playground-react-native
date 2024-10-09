import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const jest = process.env.JEST_WORKER_ID;
const development =
  process.env.NODE_ENV === 'development' || (Platform.OS !== 'web' && __DEV__);
const emulator = DeviceInfo.isEmulatorSync();

export const Globals = {
  device: emulator ? 'emulator' : 'device',
  environment: jest ? 'test' : development ? 'dev' : 'prod',
  platform: Platform.OS,
} as const;
