import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {Screen, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {Wheel} from './Wheel';

const useSegments = () => {
  const color = useColor();
  return useMemo(
    () => [
      {display: '1', value: '1', color: color.primary},
      {display: '2', value: '2', color: color.info},
      {display: '3', value: '3', color: color.danger},
      {display: '4', value: '4', color: color.brand},
      {display: '5', value: '5', color: color.warning},
      {display: '6', value: '6', color: color.success},
      {display: '7', value: '7', color: color.secondary},
    ],
    [
      color.brand,
      color.danger,
      color.info,
      color.primary,
      color.secondary,
      color.success,
      color.warning,
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

  const navBack = useCallback(() => goBack(), [goBack]);

  // TODO: fix text on android
  // TODO: increase duration based on spin

  return (
    <Screen onLeftPress={navBack} title="FortuneWheel">
      <Wheel onComplete={onComplete} segments={segments} />
      <Text center title={String(winner)} />
    </Screen>
  );
});
