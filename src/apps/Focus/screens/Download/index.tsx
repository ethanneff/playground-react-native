import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Lottie from 'lottie-react-native';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Screen, Text, View } from '../../../../components';
import { getSmallestDimension, useRootSelector } from '../../../../redux';
import { getLoaded } from '../../data';
import { AuthStackRoutes } from '../../types';

const minTime = 1500;
export const Download = memo(function Download() {
  const { navigate } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'download'>>();
  const width = useRootSelector(getSmallestDimension);
  const loaded = useRootSelector(getLoaded);
  const imageSize = width * 0.65;
  const init = useRef(Date.now());

  const nav = useCallback(() => {
    navigate('home');
  }, [navigate]);

  useEffect(() => {
    if (!loaded) return;
    const now = Date.now();
    const diff = now - init.current;
    const tooSoon = diff < minTime;
    const next = minTime - diff;
    setTimeout(nav, tooSoon ? next : 0);
  }, [loaded, nav, navigate]);

  return (
    <Screen>
      <View
        center
        flex
      >
        <Lottie
          autoPlay
          loop
          source={require('./loader.json')}
          speed={0.75}
          style={{
            width: imageSize,
            height: imageSize,
            alignSelf: 'center',
          }}
        />
        <Text
          center
          title="loading"
          type="h5"
        />
      </View>
    </Screen>
  );
});
