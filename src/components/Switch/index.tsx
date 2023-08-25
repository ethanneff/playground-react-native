import React, { useCallback } from 'react';
import { GestureSwitch } from '../../conversions';
import { SoundManager, useColors } from '../../features';

type SwitchRef = GestureSwitch | null;

type Props = {
  readonly onRef?: (ref: SwitchRef) => void;
  readonly onValueChange: (value: boolean) => void;
  readonly value: boolean;
};

export const Switch = ({ onRef, onValueChange, value }: Props) => {
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
      ref={onRef}
      trackColor={{ true: colors.background.accent }}
      value={value}
    />
  );
};
