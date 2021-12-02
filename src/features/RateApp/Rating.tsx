import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { Icon, TouchableOpacity } from '../../components';
import { MonoMultiColor, padding } from '../../features/Config';

type Props = {
  colorFilled?: keyof MonoMultiColor;
  colorUnfilled?: keyof MonoMultiColor;
  count: number;
  iconFilled?: string;
  iconUnfilled?: string;
  onPress: (index: number) => void;
  rating: number;
  size: number;
};

export const Rating = memo(function RatingMemo({
  size,
  count,
  onPress,
  rating,
  colorFilled = 'accent',
  colorUnfilled = 'secondary',
  iconFilled = 'star',
  iconUnfilled = 'star-outline',
}: Props) {
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
        paddingHorizontal: padding(4),
      }}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <TouchableOpacity key={v4()} onPress={handleOnPress(index)}>
            <Icon
              color={index > rating || !rating ? colorUnfilled : colorFilled}
              name={index > rating || !rating ? iconUnfilled : iconFilled}
              size={size}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
});
