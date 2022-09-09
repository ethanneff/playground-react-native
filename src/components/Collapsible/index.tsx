import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { spacing, useColors, useDriver } from '../../features';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
import { View } from '../View';

type Props = {
  children: ReactNode;
  title: string;
};

export const Collapsible = ({ children, title }: Props) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const useNativeDriver = useDriver();
  const colors = useColors();
  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200000],
  });
  const icon = open ? 'minus' : 'plus';
  const backgroundColor = open
    ? colors.background.accent
    : colors.background.secondary;
  const color = open ? 'primaryB' : 'primaryA';

  const handlePress = useCallback(() => {
    const toValue = open ? 0 : 1;
    Animated.timing(animation, {
      duration: 200,
      easing: Easing.quad,
      toValue,
      useNativeDriver,
    }).start();
    setOpen(Boolean(toValue));
  }, [animation, open, useNativeDriver]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View
          row
          style={{
            backgroundColor,
            justifyContent: 'space-between',
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
        >
          <Text
            color={color}
            title={title}
            type="h4"
          />
          <Icon
            color={color}
            name={icon}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={{
          maxHeight,
        }}
      >
        <View style={{ padding: spacing(2) }}>{children}</View>
      </Animated.View>
    </View>
  );
};
