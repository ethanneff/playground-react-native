import Original, { SliderProps } from '@react-native-community/slider';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SoundManager } from '../../features';

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

type Props = SliderProps & {
  flex?: boolean;
};

export const Slider = ({ onSlidingComplete, flex, style, ...rest }: Props) => {
  const handleSlidingComplete = useCallback(
    (value: number) => {
      if (!onSlidingComplete) return;
      SoundManager.play('tap');
      onSlidingComplete(value);
    },
    [onSlidingComplete],
  );

  const combinedStyles = [flex && styles.flex, style];

  return (
    <Original
      style={combinedStyles}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      onSlidingComplete={handleSlidingComplete}
      tapToSeek
    />
  );
};
