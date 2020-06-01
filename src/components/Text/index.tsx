import React from 'react';
import {Animated, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {Theme, colorWithOpacity} from '../../utils';
import {useColor, useNativeDriver} from '../../hooks';
import {Sound} from '../../conversions';
import {FontEmphasis, FontType, getFontType, getTextEmphasis} from './utils';

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

const sound = new Sound(require('./../TouchableOpacity/tap.mp3'));
export const Text: React.FC<TextProps> = ({
  type,
  emphasis,
  title,
  onPress,
  hidden,
  center,
  bold,
  inverse,
  ellipsizeMode,
  centerVertically,
  invisible,
  style,
  adjustsFontSizeToFit,
  numberOfLines,
}: TextProps) => {
  const opacity = new Animated.Value(1);
  const color = useColor();
  const nativeDriver = useNativeDriver();
  const textColorPercent = getTextEmphasis(emphasis);
  const fontSize = getFontType(type);
  const textColor = inverse ? color.background : color.text;
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
    if (!onPress) {
      return;
    }
    sound.stop(() => sound.play());
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
};
