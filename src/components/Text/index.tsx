import React from 'react';
import {Animated, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useColor, useDriver} from '../../hooks';
import {Color} from '../../models';
import {FontEmphasis, FontType, getFontStyles, Theme} from '../../utils';
import {SoundManager} from '../../utils/Sound';

type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

export interface TextProps {
  title?: string;
  style?: StyleProp<TextStyle>;

  center?: boolean;
  centerVertically?: boolean;
  bold?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  inverse?: boolean;
  color?: keyof Color;
  flex?: boolean;
  adjustsFontSizeToFit?: boolean;

  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;

  type?: FontType;
  emphasis?: FontEmphasis;

  onPress?(): void;
}

export const Text = ({
  type,
  emphasis,
  title,
  onPress,
  hidden,
  center,
  bold,
  color,
  inverse,
  flex,
  ellipsizeMode,
  centerVertically,
  invisible,
  style,
  adjustsFontSizeToFit,
  numberOfLines,
}: TextProps): JSX.Element => {
  const opacity = new Animated.Value(1);
  const useNativeDriver = useDriver();
  const colorScheme = useColor();
  const {fontSize, textColor} = getFontStyles({
    emphasis,
    type,
    inverse,
    color,
    colorScheme,
  });
  const text =
    type === 'button' || type === 'overline'
      ? (title || '').toUpperCase()
      : title;
  const styles = StyleSheet.create({
    bold: {
      fontWeight: Theme.fontWeight.medium,
    },
    center: {
      textAlign: 'center',
    },
    centerVertically: {
      flex: 1,
      textAlignVertical: 'center',
    },
    color: {
      color: textColor,
    },
    flex: {
      flex: 1,
    },
    invisible: {
      opacity: 0,
    },
  });

  const handlePress = () => {
    if (!onPress) return;

    SoundManager.play('tap');
    // TODO: does not work on real devices
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 50,
        toValue: 0.2,
        useNativeDriver,
      }),
      Animated.timing(opacity, {
        duration: 350,
        toValue: 1,
        useNativeDriver,
      }),
    ]).start();
    onPress();
  };

  const textStyle = [
    styles.color,
    fontSize,
    center && styles.center,
    centerVertically && styles.centerVertically,
    bold && styles.bold,
    {opacity},
    invisible && styles.invisible,
    flex && styles.flex,
    style,
  ];

  return title === undefined || hidden ? (
    <></>
  ) : (
    <Animated.Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress ? handlePress : undefined}
      style={textStyle}>
      {text}
    </Animated.Text>
  );
};
