import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { Icon, Pressable, View, type IconName } from '../../components';
import { spacing, type MonoMultiColor } from '../../features';

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
});
