import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  spacing,
  useColors,
  useDriver,
  type MonoMultiColor,
} from '../../features';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { View } from '../View';
import { getIcon, getPlacement } from './utils';

type Position = 'bottom' | 'left' | 'right' | 'top';
type Props = {
  readonly backgroundColor: keyof MonoMultiColor;
  readonly duration?: number;
  readonly onPress?: () => void;
  readonly position: Position;
  readonly title: string;
  readonly visible: boolean;
};

export const ScrollButton = ({
  backgroundColor,
  duration = 300,
  onPress,
  position,
  title,
  visible,
}: Props) => {
  const icon = getIcon(position);
  const colors = useColors();
  const useNativeDriver = useDriver();
  const placement = getPlacement(position);
  const opacity = useRef(new Animated.Value(0)).current;
  const zIndex = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 1],
  });

  useEffect(() => {
    const toValue = visible ? 1 : 0;
    Animated.timing(opacity, {
      duration,
      toValue,
      useNativeDriver,
    }).start();
  }, [visible, opacity, duration, useNativeDriver]);

  return (
    <Animated.View
      style={{
        alignSelf: 'center',
        opacity,
        position: 'absolute',
        zIndex,
        ...placement,
      }}
    >
      <Pressable
        containerStyle={{
          backgroundColor: colors.background[backgroundColor],
          borderRadius: spacing(4),
          margin: spacing(2),
        }}
        disabled={!onPress}
        onPress={onPress}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: spacing(2),
            paddingLeft: position === 'left' ? spacing(2) : spacing(4),
            paddingRight: position === 'left' ? spacing(4) : spacing(2),
          }}
        >
          {position === 'left' ? (
            <Icon
              color="primaryB"
              name={icon}
            />
          ) : null}
          <Text
            color="primaryB"
            title={title}
          />
          {position === 'left' ? null : (
            <Icon
              color="primaryB"
              name={icon}
            />
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};
