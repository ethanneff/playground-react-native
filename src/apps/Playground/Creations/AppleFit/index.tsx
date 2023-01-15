import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Screen, View } from '../../../../components';
import { AppleActivity } from './AppleActivity';
import { type Ring } from './types';

const TAU = 2 * Math.PI;
const size = 300;
const strokeWidth = 40;
const rings: Ring[] = [
  {
    bg: 'rgb(50, 1, 14)',
    end: 'rgb(249, 56, 133)',
    icon: 'chevron-right',
    size,
    start: 'rgb(249, 18, 78)',
    theta: 1.7 * TAU,
  },
  {
    bg: 'rgb(47, 78, 0)',
    end: 'rgb(216, 255, 1)',
    icon: 'chevron-double-right',
    size: size - strokeWidth * 2,
    start: 'rgb(153, 255, 0)',
    theta: 0.6 * TAU,
  },
  {
    bg: 'rgb(0, 72, 77)',
    end: 'rgb(0, 255, 169)',
    icon: 'chevron-up',
    size: size - strokeWidth * 4,
    start: 'rgb(0, 217, 253)',
    theta: 2.3 * TAU,
  },
];

export const AppleFit = memo(function PlaygroundAppleFit() {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Apple Fit"
    >
      <View style={{ alignItems: 'center' }}>
        <AppleActivity
          animate
          backgroundColor="primaryA"
          rings={rings}
          size={size}
          strokeWidth={strokeWidth}
        />
      </View>
    </Screen>
  );
});
