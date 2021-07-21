import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Screen} from '../../../components';
import {AppleActivity} from './AppleActivity';
import {Ring} from './types';

const TAU = 2 * Math.PI;
const size = 300;
const strokeWidth = 40;
const rings: Ring[] = [
  {
    start: 'rgb(249, 18, 78)',
    end: 'rgb(249, 56, 133)',
    bg: 'rgb(50, 1, 14)',
    theta: 1.7 * TAU,
    size: size,
    icon: 'chevron-right',
  },
  {
    start: 'rgb(153, 255, 0)',
    end: 'rgb(216, 255, 1)',
    bg: 'rgb(47, 78, 0)',
    theta: 0.6 * TAU,
    size: size - strokeWidth * 2,
    icon: 'chevron-double-right',
  },
  {
    start: 'rgb(0, 217, 253)',
    end: 'rgb(0, 255, 169)',
    bg: 'rgb(0, 72, 77)',
    theta: 2.3 * TAU,
    size: size - strokeWidth * 4,
    icon: 'chevron-up',
  },
];

export const AppleFit = memo(function PlaygroundAppleFit() {
  const {goBack} = useNavigation();

  return (
    <Screen onLeftPress={goBack} title="Apple Fit">
      <View style={{alignItems: 'center'}}>
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
