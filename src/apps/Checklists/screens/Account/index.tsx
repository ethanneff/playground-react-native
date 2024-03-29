import React, { useCallback } from 'react';
import { Button, Screen } from '../../../../components';
import {
  Firebase,
  useNavigation,
  type StackNavigationProperty,
} from '../../../../conversions';
import { type AuthStackRoutes } from '../../types';

export const Account = () => {
  const { navigate } =
    useNavigation<StackNavigationProperty<AuthStackRoutes, 'home'>>();

  const handleLogout = useCallback(async () => {
    await Firebase.auth().signOut();
  }, []);

  const handleAdmin = useCallback(() => {
    navigate('admin');
  }, [navigate]);

  return (
    <Screen title="Account">
      <Button
        onPress={handleLogout}
        title="logout"
      />
      <Button
        onPress={handleAdmin}
        title="admin"
      />
    </Screen>
  );
};
