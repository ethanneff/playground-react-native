import React, { memo, useCallback } from 'react';
import { GestureSwitch } from '../../conversions';
import { SoundManager } from '../../features';

export type SwitchRef = GestureSwitch | null;

type Props = {
  onValueChange: (value: boolean) => void;
  value: boolean;
};

export const Switch = memo(function Switch({ value, onValueChange }: Props) {
  const handleValueChange = useCallback(
    (result: boolean) => {
      SoundManager.play('tap');
      onValueChange(result);
    },
    [onValueChange],
  );
  return (
    <GestureSwitch
      onValueChange={handleValueChange}
      value={value}
    />
  );
});
