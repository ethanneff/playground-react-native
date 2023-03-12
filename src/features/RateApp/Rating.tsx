import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { Icon, type IconName, TouchableOpacity, View } from '../../components';
import { type MonoMultiColor, spacing } from '../../features';

type Props = {
  colorFilled?: keyof MonoMultiColor;
  colorUnfilled?: keyof MonoMultiColor;
  count: number;
  iconFilled?: IconName;
  iconUnfilled?: IconName;
  onPress: (index: number) => void;
  rating: number;
  size: number;
};

export const Rating = memo(function RatingMemo({
  colorFilled = 'accent',
  colorUnfilled = 'secondary',
  count,
  iconFilled = 'star',
  iconUnfilled = 'star-outline',
  onPress,
  rating,
  size,
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
        paddingHorizontal: spacing(4),
      }}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <TouchableOpacity
            key={v4()}
            onPress={handleOnPress(index)}
          >
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
