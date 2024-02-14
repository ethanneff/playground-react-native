import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import { Icon, Pressable, View, type IconName } from '../../components';
import { spacing, type MonoMultiColor } from '../../features';

type Properties = {
  readonly colorFilled?: keyof MonoMultiColor;
  readonly colorUnfilled?: keyof MonoMultiColor;
  readonly count: number;
  readonly iconFilled?: IconName;
  readonly iconUnfilled?: IconName;
  readonly onPress: (index: number) => void;
  readonly rating: number;
  readonly size: number;
};

export const Rating = ({
  colorFilled = 'accent',
  colorUnfilled = 'secondary',
  count,
  iconFilled = 'star',
  iconUnfilled = 'star-outline',
  onPress,
  rating,
  size,
}: Properties) => {
  const handleOnPress = useCallback(
    (index: number) => () => {
      onPress(index);
    },
    [onPress],
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing(4),
      }}
    >
      {Array.from({ length: count })
        .fill(0)
        .map((_, index) => (
          <Pressable
            key={v4()}
            onPress={handleOnPress(index)}
          >
            <Icon
              color={index > rating || !rating ? colorUnfilled : colorFilled}
              name={index > rating || !rating ? iconUnfilled : iconFilled}
              size={size}
            />
          </Pressable>
        ))}
    </View>
  );
};
