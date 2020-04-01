import React, {memo} from 'react';
import {Animated, StyleSheet, TextStyle, StyleProp} from 'react-native';
import {Theme, colorWithOpacity} from '../../utils';
import {useNativeDriver, useColor} from '../../hooks';
import {getTextEmphasis, getFontType, FontType, FontEmphasis} from './utils';

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
  secondary?: boolean;
  adjustsFontSizeToFit?: boolean;

  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;

  type?: FontType;
  emphasis?: FontEmphasis;

  onPress?(): void;
}

export const Text: React.FC<TextProps> = memo(function Text(props: TextProps) {
  const {
    type,
    emphasis,
    title,
    onPress,
    hidden,
    center,
    bold,
    ellipsizeMode,
    centerVertically,
    invisible,
    style,
    adjustsFontSizeToFit,
    numberOfLines,
  } = props;
  const opacity = new Animated.Value(1);
  const color = useColor();
  const nativeDriver = useNativeDriver();
  const textColorPercent = getTextEmphasis(emphasis);
  const fontSize = getFontType(type);
  const textColor = props.inverse ? color.background : color.text;
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
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
    invisible: {
      opacity: 0,
    },
    color: {
      color: textColorWithOpacity,
    },
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    // TODO: does not work on real devices
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 50,
        toValue: 0.2,
        useNativeDriver: nativeDriver,
      }),
      Animated.timing(opacity, {
        duration: 350,
        toValue: 1,
        useNativeDriver: nativeDriver,
      }),
    ]).start();
  };

  const textStyle = [
    styles.color,
    fontSize,
    center && styles.center,
    centerVertically && styles.centerVertically,
    bold && styles.bold,
    {opacity},
    invisible && styles.invisible,
    style,
  ];

  return title === undefined || hidden ? null : (
    <Animated.Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={textStyle}
      onPress={onPress ? handlePress : undefined}>
      {text}
    </Animated.Text>
  );
});
