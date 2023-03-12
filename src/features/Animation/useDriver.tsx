import { Globals } from '../Config';

export const useDriver = (): boolean => {
  if (Globals.environment === 'test') return false;
  if (Globals.platform === 'web') return false;
  return Globals.device !== 'emulator';
};
