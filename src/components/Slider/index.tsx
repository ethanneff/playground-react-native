import Original, { type SliderProps } from '@react-native-community/slider';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SoundManager } from '../../features';

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

type Props = SliderProps & {
  flex?: boolean;
};

export const Slider = ({ flex, onSlidingComplete, style, ...rest }: Props) => {
  const handleSlidingComplete = useCallback(
    (value: number) => {
      if (!onSlidingComplete) return;
      SoundManager.play('tap');
      onSlidingComplete(value);
    },
    [onSlidingComplete],
  );

  const combinedStyles = [flex ? styles.flex : undefined, style];

  return (
    // @ts-expect-error JSX element class does not support attributes because it does not have a 'props' property.
    <Original
      style={combinedStyles}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      onSlidingComplete={handleSlidingComplete}
      tapToSeek
    />
  );
};
