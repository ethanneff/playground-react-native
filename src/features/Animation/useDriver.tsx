import { Platform } from 'react-native';

export const useDriver = (): boolean => {
  return !(process.env.JEST_WORKER_ID || Platform.OS === 'web');
};
