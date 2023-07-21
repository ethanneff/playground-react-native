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
    const res = await signInAnonymously();
    if (!res) throw new Error('Sign in failed');
    dispatch(login(res.user));
    const { items, user } = getDefaultUserTemplate();
    items.forEach((item) => dispatch(createItem(item)));
    dispatch(loadUser({ ...user, email: res.user.email ?? 'anonymous' }));
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
