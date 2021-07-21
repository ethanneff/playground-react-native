import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {Screen, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {Wheel} from './Wheel';

const useSegments = () => {
  const color = useColor();
  return useMemo(
    () => [
      {display: '1', value: '1', color: color.background.positive},
      {display: '2', value: '2', color: color.background.negative},
      {display: '3', value: '3', color: color.background.secondary},
      {display: '4', value: '4', color: color.background.warning},
      {display: '5', value: '5', color: color.background.tertiary},
      {display: '6', value: '6', color: color.background.accent},
      {display: '7', value: '7', color: color.background.primaryA},
    ],
    [
      color.background.accent,
      color.background.negative,
      color.background.positive,
      color.background.primaryA,
      color.background.secondary,
      color.background.tertiary,
      color.background.warning,
    ],
  );
};

export const FortuneWheel = memo(function PlaygroundFortuneWheel() {
  const segments = useSegments();
  const {goBack} = useNavigation();
  const [winner, setWinner] = useState(null);

  const onComplete = useCallback(a => {
    setWinner(a.display);
  }, []);

  // TODO: fix text on android
  // TODO: increase duration based on spin

  return (
    <Screen onLeftPress={goBack} title="FortuneWheel">
      <Wheel onComplete={onComplete} segments={segments} />
      <Text center title={String(winner)} />
    </Screen>
  );
});
