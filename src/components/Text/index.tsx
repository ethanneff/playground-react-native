import React, {memo, useCallback, useRef} from 'react';
import {Animated, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useColor, useDriver} from '../../hooks';
import {
  FontEmphasis,
  FontType,
  fontWeight,
  getFontStyles,
  MonoMultiColor,
  SoundManager,
} from '../../utils';

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
  color?: keyof MonoMultiColor;
  flex?: boolean;
  adjustsFontSizeToFit?: boolean;

  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;

  type?: FontType;
  emphasis?: FontEmphasis;

  onPress?(): void;
}

export const Text = memo(function Text({
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
}: TextProps) {
  const opacity = useRef(new Animated.Value(1)).current;
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
      fontWeight: fontWeight.medium,
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

  const handlePress = useCallback(() => {
    if (!onPress) return;

    SoundManager.play('tap');
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
  }, [onPress, opacity, useNativeDriver]);

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
      onPress={handlePress}
      style={textStyle}>
      {text}
    </Animated.Text>
  );
});
