import React, { memo, useCallback } from 'react';
import { GestureSwitch } from '../../conversions';
import { SoundManager, useColors } from '../../features';

export type SwitchRef = GestureSwitch | null;

type Props = {
  onValueChange: (value: boolean) => void;
  value: boolean;
};

export const Switch = memo(function Switch({ onValueChange, value }: Props) {
  const handleValueChange = useCallback(
    (result: boolean) => {
      SoundManager.play('tap');
      onValueChange(result);
    },
    [onValueChange],
  );
  const colors = useColors();
  return (
    <GestureSwitch
      onValueChange={handleValueChange}
      trackColor={{ true: colors.background.accent }}
      value={value}
    />
  );
});
