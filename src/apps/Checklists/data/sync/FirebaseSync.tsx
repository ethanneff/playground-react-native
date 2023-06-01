import { memo } from 'react';
import { useAuth } from './useAuth';

export const FirebaseSync = memo(function FirebaseSync() {
  useAuth();

  return null;
});
