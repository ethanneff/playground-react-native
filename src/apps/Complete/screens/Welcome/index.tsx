import React, { useCallback } from 'react';
import { Button, Carousel, Screen, View } from '../../../../components';
import { spacing, useAuth } from '../../../../features';
import { useAppDispatch } from '../../../../redux';
import { createItem, loadUser, login } from '../../models';
import { completeConfig, getDefaultUserTemplate } from '../../utils';
import { slides } from './slides';

export const Welcome = () => {
  const dispatch = useAppDispatch();
  const { signInAnonymously } = useAuth();

  const handleLogin = useCallback(async () => {
    const response = await signInAnonymously();
    if (!response) throw new Error('Sign in failed');
    dispatch(login(response.user));
    const { items, user } = getDefaultUserTemplate();
    for (const item of items) dispatch(createItem(item));
    dispatch(loadUser({ ...user, email: response.user.email ?? 'anonymous' }));
  }, [dispatch, signInAnonymously]);

  return (
    <Screen>
      <View flex={1}>
        <Carousel
          duration={6000}
          slides={slides}
        />
        <View style={{ padding: completeConfig.padding }}>
          <Button
            buttonStyle={{ marginBottom: spacing(2) }}
            center
            color="accent"
            emphasis="high"
            onPress={handleLogin}
            title="Get Started"
          />
        </View>
      </View>
    </Screen>
  );
};
