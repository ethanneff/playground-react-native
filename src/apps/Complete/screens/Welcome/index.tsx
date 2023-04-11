import React, { memo, useCallback, useState } from 'react';
import { Button, Carousel, Screen, View } from '../../../../components';
import { type FirebaseAuthTypes } from '../../../../conversions';
import { spacing } from '../../../../features';
import { useAppDispatch } from '../../../../redux';
import { createItem, loadUser, login } from '../../models';
import { completeConfig, getDefaultUserTemplate } from '../../utils';
import { Login } from './Login';
import { slides } from './slides';

export const Welcome = memo(function Welcome() {
  const dispatch = useAppDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => {
    setShowLogin((p) => !p);
  }, []);

  const onLoginSuccess = useCallback(
    (auth: FirebaseAuthTypes.User | null) => {
      if (!auth) throw new Error('no login');
      dispatch(login(auth));
      const { items, user } = getDefaultUserTemplate();
      items.forEach((item) => dispatch(createItem(item)));
      dispatch(loadUser({ ...user, email: auth.email ?? 'anonymous' }));
    },
    [dispatch],
  );

  return (
    <>
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
              onPress={onToggleLogin}
              title="Get Started"
            />
          </View>
        </View>
      </Screen>
      {showLogin ? (
        <Login
          onBackgroundPress={onToggleLogin}
          onSuccess={onLoginSuccess}
          showAnonymous
          showEmail
          showFacebook
          showGoogle
          showPhone
        />
      ) : null}
    </>
  );
});
