import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Lottie, { AnimationObject } from 'lottie-react-native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import {
  Button,
  Screen,
  Spacing,
  Text,
  TouchableOpacity,
  View,
} from '../../../../components';
import { useColors } from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';
import { getLoaded } from '../../data';
import { AuthStackRoutes } from '../../types';
import { useLogout } from '../../utils/useLogout';
import { PulseAnimation } from './PulseAnimation';
import { useHeartBeatAnimation } from './useHeartBeatAnimation';

const minTime = 1500;
const maxTime = 10000;

const loader = require('./loader.json') as AnimationObject;

export const Download = memo(function Download() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackRoutes, 'download'>>();
  const width = useRootSelector(getSmallestDimension);
  const loaded = useRootSelector(getLoaded);
  const [showLogout, setShowLogout] = useState(false);
  const imageSize = width * 0.65;
  const visible = useRef(true);
  const init = useRef(Date.now());
  const heartBeatStyles = useHeartBeatAnimation();
  const tapWidth = width / 1.5;
  const colors = useColors();
  const [pulses, setPulses] = useState([0]);

  const navNext = useCallback(() => {
    visible.current = false;
    navigate('home');
  }, [navigate]);

  const { handleLogout } = useLogout();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!visible.current) return;
      setShowLogout(true);
    }, maxTime);
    return () => clearTimeout(timer);
  }, [showLogout]);

  useEffect(() => {
    if (!loaded) return () => undefined;
    const now = Date.now();
    const diff = now - init.current;
    const tooSoon = diff < minTime;
    const next = minTime - diff;
    const timer = setTimeout(navNext, tooSoon ? next : 0);
    return () => clearTimeout(timer);
  }, [loaded, navNext, navigate]);

  const handleTapAnimation = useCallback(() => {
    setPulses((p) => [...p, p.length]);
  }, []);

  return (
    <Screen>
      <View
        flex={1}
        justifyContent="center"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTapAnimation}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Lottie
            autoPlay
            loop
            source={loader}
            speed={0.75}
            style={{
              alignSelf: 'center',
              height: imageSize,
              width: imageSize,
              zIndex: 1,
            }}
          />
          {pulses.map((pulse, index) => (
            <PulseAnimation
              key={pulse}
              repeat={index === 0}
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.secondary,
                borderRadius: tapWidth,
                borderWidth: 4,
                height: tapWidth,
                position: 'absolute',
                width: tapWidth,
              }}
            />
          ))}
        </TouchableOpacity>
        <Animated.View style={heartBeatStyles}>
          <Text
            center
            title="loading"
            type="h5"
          />
        </Animated.View>
        <View style={{ opacity: showLogout ? 1 : 0 }}>
          <Spacing padding={5} />
          <Text
            center
            title="Taking too long?"
            type="body1"
          />
          <Spacing padding={0.5} />
          <Button
            center
            color="secondary"
            emphasis="low"
            onPress={handleLogout}
            title="try logging out"
          />
        </View>
      </View>
    </Screen>
  );
});
