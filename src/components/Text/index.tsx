import React, { memo, useCallback, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { useDriver } from '../../features/Animation';
import {
  FontEmphasis,
  FontType,
  fontWeight,
  getFontStyles,
  MonoMultiColor,
} from '../../features/Config';
import { SoundManager } from '../../features/Sound';
import { useColor } from '../../features/Theme';

type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

export interface TextProps {
  adjustsFontSizeToFit?: boolean;
  bold?: boolean;

  center?: boolean;
  centerVertically?: boolean;
  color?: keyof MonoMultiColor;
  ellipsizeMode?: EllipsizeMode;
  emphasis?: FontEmphasis;
  flex?: boolean;
  hidden?: boolean;
  inverse?: boolean;
  invisible?: boolean;

  numberOfLines?: number;
  onPress?(): void;

  style?: StyleProp<TextStyle>;
  title?: string;

  type?: FontType;
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
  const { fontSize, textColor } = getFontStyles({
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
    center ? styles.center : undefined,
    centerVertically ? styles.centerVertically : undefined,
    bold ? styles.bold : undefined,
    { opacity },
    invisible ? styles.invisible : undefined,
    flex ? styles.flex : undefined,
    style,
  ];

  return title === undefined || hidden ? null : (
    <Animated.Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={handlePress}
      style={textStyle}
    >
      {text}
    </Animated.Text>
  );
});
