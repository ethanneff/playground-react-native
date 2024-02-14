import React, { useCallback, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import {
  SoundManager,
  fontWeight,
  getFontStyles,
  useColors,
  useDriver,
  type FontEmphasis,
  type FontType,
  type MonoMultiColor,
} from '../../features';

type EllipsizeMode = 'clip' | 'head' | 'middle' | 'tail';

type TextProperties = {
  readonly adjustsFontSizeToFit?: boolean;
  readonly bold?: boolean;
  readonly center?: boolean;
  readonly centerVertically?: boolean;
  readonly color?: keyof MonoMultiColor;
  readonly ellipsizeMode?: EllipsizeMode;
  readonly emphasis?: FontEmphasis;
  readonly flex?: boolean;
  readonly hidden?: boolean;
  readonly inverse?: boolean;
  readonly invisible?: boolean;
  readonly numberOfLines?: number;
  readonly onPress?: () => void;
  readonly selectable?: boolean;
  readonly style?: StyleProp<TextStyle>;
  readonly testID?: string;
  readonly title?: string;
  readonly type?: FontType;
  readonly withoutTap?: boolean;
};

export const Text = ({
  adjustsFontSizeToFit,
  bold,
  center,
  centerVertically,
  color,
  ellipsizeMode,
  emphasis,
  flex,
  hidden,
  inverse,
  invisible,
  numberOfLines,
  onPress,
  selectable,
  style,
  testID,
  title,
  type,
  withoutTap,
}: TextProperties) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const useNativeDriver = useDriver();
  const colors = useColors();
  const { fontSize, textColor } = getFontStyles({
    color,
    colors,
    emphasis,
    inverse,
    type,
  });
  const text =
    type === 'button' || type === 'overline'
      ? (title ?? '').toUpperCase()
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
    if (!withoutTap) SoundManager.play('tap');
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
  }, [onPress, opacity, useNativeDriver, withoutTap]);

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
      onPress={onPress ? handlePress : undefined}
      selectable={selectable}
      style={textStyle}
      testID={testID}
    >
      {text}
    </Animated.Text>
  );
};
