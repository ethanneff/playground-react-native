import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Icon, TouchableOpacity} from '../../components';
import {MonoMultiColor, padding} from '../../utils';

interface Props {
  size: number;
  count: number;
  rating: number;
  onPress: (index: number) => void;
  colorFilled?: keyof MonoMultiColor;
  colorUnfilled?: keyof MonoMultiColor;
  iconFilled?: string;
  iconUnfilled?: string;
}

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
      }}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <TouchableOpacity key={index} onPress={handleOnPress(index)}>
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
