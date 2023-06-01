import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Loader,
  Screen,
  Spacing,
  Text,
  View,
} from '../../../../components';
import {
  Firebase,
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { getLoaded } from '../../data';
import { type AuthStackRoutes } from '../../types';

const tenSeconds = 10000;
export const Download = () => {
  const { navigate } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'download'>>();
  const [showLogout, setShowLogout] = useState(false);
  const loaded = useAppSelector(getLoaded);
  const mounted = useRef(true);

  const handleLogout = useCallback(async () => {
    await Firebase.auth().signOut();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mounted.current) return;
      setShowLogout(true);
    }, tenSeconds);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    mounted.current = false;
    navigate('home');
  }, [loaded, navigate]);

  return (
    <Screen title="download">
      <View
        flex={1}
        justifyContent="center"
      >
        <Loader style={{ flex: 0 }} />
        <View style={{ opacity: showLogout ? 1 : 0 }}>
          <Spacing padding={spacing(5)} />
          <Text
            center
            title="Taking too long?"
            type="body1"
          />
          <Spacing padding={spacing(0.5)} />
          <Button
            center
            color="secondary"
            emphasis="low"
            onPress={handleLogout}
            title="log out"
          />
        </View>
      </View>
    </Screen>
  );
};
