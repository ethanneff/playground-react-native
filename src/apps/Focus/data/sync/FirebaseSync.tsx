import { useAuth } from './useAuth';
import { useGoals } from './useGoals';
import { useIntervals } from './useIntervals';
import { usePreferences } from './usePreferences';
import { useUsers } from './useUsers';

export const FirebaseSync = () => {
  useAuth();
  useUsers();
  useGoals();
  useIntervals();
  usePreferences();

  return null;
};
