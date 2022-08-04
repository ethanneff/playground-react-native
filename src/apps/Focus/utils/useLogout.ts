import { useCallback } from 'react';
import { Toast } from '../../../components';
import { Firebase } from '../../../conversions';

export const useLogout = () => {
  const handleLogout = useCallback(async () => {
    try {
      await Firebase.auth().signOut();
    } catch (e) {
      Toast.show({
        type: 'accent',
        props: {
          title: 'Unable to log out',
          description: `${e}`,
        },
      });
      Firebase.crashlytics().log('unable to sign out');
    }
  }, []);

  return { handleLogout };
};
