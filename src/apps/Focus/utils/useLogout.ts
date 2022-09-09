import { useCallback } from 'react';
import { Toast } from '../../../components';
import { Firebase } from '../../../conversions';

export const useLogout = () => {
  const handleLogout = useCallback(async () => {
    try {
      await Firebase.auth().signOut();
    } catch (e) {
      Toast.show({
        props: {
          description: `${e}`,
          title: 'Unable to log out',
        },
        type: 'accent',
      });
      Firebase.crashlytics().log('unable to sign out');
    }
  }, []);

  return { handleLogout };
};
