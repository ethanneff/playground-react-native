import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const useDriver = (): boolean => {
  return !(
    process.env.JEST_WORKER_ID ||
    Platform.OS === 'web' ||
    DeviceInfo.isEmulatorSync()
  );
};
