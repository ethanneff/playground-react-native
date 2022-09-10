import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Lottie from 'lottie-react-native';
import React, { memo, useCallback } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Button, Screen, Spacing, Text, View } from '../../../../components';
import { spacing } from '../../../../features';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useRootSelector,
} from '../../../../redux';
import { UnAuthStackRoutes } from '../../types';

const trophy = require('./trophy.json') as ImageSourcePropType;

export const Landing = memo(function Landing() {
  const { navigate } = useNavigation<StackNavigationProp<UnAuthStackRoutes>>();
  const width = useRootSelector(getSmallestDimension);
  const landscape = useRootSelector(getLandscapeOrientation);
  const imageSize = width * 0.5;

  const handleGetStarted = useCallback(() => {
    navigate('onboarding');
  }, [navigate]);

  const handleAccount = useCallback(() => {
    navigate('sign-up');
  }, [navigate]);

  return (
    <Screen>
      <View flex>
        <View
          center
          flex
          row={landscape}
        >
          <View flex={landscape}>
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
            center
            flex={landscape}
          >
            <Text
              center
              title="Progression"
              type="h3"
            />
            <Spacing padding={2} />
            <Text
              center
              emphasis="high"
              title="Improve your habits. Hit your goals."
              type="h5"
            />
            {landscape ? null : <Spacing padding={10} />}
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
        <View flex={landscape}>
          <Button
            center
            color="accent"
            emphasis="high"
            onPress={handleGetStarted}
            title="Get Started"
          />
        </View>
        <Spacing padding={2} />
        <View flex={landscape}>
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
