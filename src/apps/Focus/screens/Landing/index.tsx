import Lottie, { type AnimationObject } from 'lottie-react-native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, Spacing, Text, View } from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useAppSelector,
} from '../../../../redux';
import { type UnAuthStackRoutes } from '../../types';

const trophy = require('./trophy.json') as AnimationObject;

export const Landing = memo(function Landing() {
  const { navigate } = useNavigation<StackNavigationProp<UnAuthStackRoutes>>();
  const width = useAppSelector(getSmallestDimension);
  const landscape = useAppSelector(getLandscapeOrientation);
  const imageSize = width * 0.5;

  const handleGetStarted = useCallback(() => {
    navigate('onboarding');
  }, [navigate]);

  const handleAccount = useCallback(() => {
    navigate('sign-up');
  }, [navigate]);

  return (
    <Screen>
      <View flex={1}>
        <View
          flex={1}
          flexDirection={landscape ? 'row' : 'column'}
          justifyContent="center"
        >
          <View flex={landscape ? 1 : 0}>
            <Lottie
              autoPlay
              loop
              source={trophy}
              speed={0.75}
              style={{
                alignSelf: 'center',
                height: imageSize,
                width: imageSize,
              }}
            />
          </View>
          <View
            flex={landscape ? 1 : 0}
            justifyContent="center"
          >
            <Text
              center
              title="Progression"
              type="h3"
            />
            <Spacing padding={spacing(2)} />
            <Text
              center
              emphasis="high"
              title="Improve your habits. Hit your goals."
              type="h5"
            />
            {landscape ? null : <Spacing padding={spacing(10)} />}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: landscape ? 'row' : 'column',
          justifyContent: 'space-between',
          paddingHorizontal: spacing(10),
          paddingVertical: spacing(4),
        }}
      >
        <View flex={landscape ? 1 : 0}>
          <Button
            center
            color="accent"
            emphasis="high"
            onPress={handleGetStarted}
            title="Get Started"
          />
        </View>
        <Spacing padding={spacing(2)} />
        <View flex={landscape ? 1 : 0}>
          <Button
            center
            color="secondary"
            emphasis="medium"
            onPress={handleAccount}
            title="I already have an account"
          />
        </View>
      </View>
    </Screen>
  );
});
