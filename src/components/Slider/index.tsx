import Original, { type SliderProps } from '@react-native-community/slider';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SoundManager } from '../../features';

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

type Props = SliderProps & {
  readonly defaultValue: number;
  readonly flex?: boolean;
};

export const Slider = ({
  defaultValue,
  flex,
  onSlidingComplete,
  style,
  ...rest
}: Props) => {
  const handleSlidingComplete = useCallback(
    (value: number) => {
      SoundManager.play('tap');
      if (!onSlidingComplete) return;
      onSlidingComplete(value);
    },
    [onSlidingComplete],
  );

  const combinedStyles = [flex ? styles.flex : undefined, style];

  return (
    <Original
      style={combinedStyles}
      value={defaultValue}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      onSlidingComplete={handleSlidingComplete}
      tapToSeek
    />
  );
};
