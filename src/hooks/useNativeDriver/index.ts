import { Platform } from 'react-native';
import { Config, useRootSelector } from '../../utils';

export const useNativeDriver = () => {
  const emulator = useRootSelector(state => state.device.isEmulator);

  return !(
    process.env.JEST_WORKER_ID || // eslint-disable-line no-undef
    emulator ||
    Platform.OS === Config.os.web
  );
};
