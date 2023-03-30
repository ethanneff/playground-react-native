import React, { memo, useCallback, useMemo, useState } from 'react';
import { Screen, Text } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import { Wheel } from './Wheel';
import { type Segment } from './types';

const useSegments = () => {
  const colors = useColors();
  return useMemo(
    () => [
      { color: colors.background.positive, display: '1', value: '1' },
      { color: colors.background.negative, display: '2', value: '2' },
      { color: colors.background.secondary, display: '3', value: '3' },
      { color: colors.background.warning, display: '4', value: '4' },
      { color: colors.background.tertiary, display: '5', value: '5' },
      { color: colors.background.accent, display: '6', value: '6' },
      { color: colors.background.primaryA, display: '7', value: '7' },
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
  const [winner, setWinner] = useState<string | null>(null);

  const onComplete = useCallback((a: Segment) => {
    setWinner(a.display);
  }, []);

  // TODO: fix text on android
  // TODO: increase duration based on spin

  return (
    <Screen
      onLeftPress={goBack}
      title="FortuneWheel"
    >
      <Wheel
        onComplete={onComplete}
        segments={segments}
      />
      <Text
        center
        title={String(winner)}
      />
    </Screen>
  );
});
