import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Screen, Text } from '../../../../components';
import { useColors } from '../../../../features';
import { Wheel } from './Wheel';

const useSegments = () => {
  const colors = useColors();
  return useMemo(
    () => [
      { display: '1', value: '1', color: colors.background.positive },
      { display: '2', value: '2', color: colors.background.negative },
      { display: '3', value: '3', color: colors.background.secondary },
      { display: '4', value: '4', color: colors.background.warning },
      { display: '5', value: '5', color: colors.background.tertiary },
      { display: '6', value: '6', color: colors.background.accent },
      { display: '7', value: '7', color: colors.background.primaryA },
    ],
    [
      colors.background.accent,
      colors.background.negative,
      colors.background.positive,
      colors.background.primaryA,
      colors.background.secondary,
      colors.background.tertiary,
      colors.background.warning,
    ],
  );
};

export const FortuneWheel = memo(function PlaygroundFortuneWheel() {
  const segments = useSegments();
  const { goBack } = useNavigation();
  const [winner, setWinner] = useState(null);

  const onComplete = useCallback((a) => {
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
