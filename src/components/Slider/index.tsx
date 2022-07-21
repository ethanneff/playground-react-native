import Original, { SliderProps } from '@react-native-community/slider';
import React, { useCallback } from 'react';
import { SoundManager } from '../../features';

export const Slider = ({ onSlidingComplete, ...rest }: SliderProps) => {
  const handleSlidingComplete = useCallback(
    (value: number) => {
      if (!onSlidingComplete) return;
      SoundManager.play('tap');
      onSlidingComplete(value);
    },
    [onSlidingComplete],
  );

  return (
    <Original
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      onSlidingComplete={handleSlidingComplete}
      tapToSeek
    />
  );
};
