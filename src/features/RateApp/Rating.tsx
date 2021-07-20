import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Icon, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {padding} from '../../utils';

interface Props {
  size: number;
  count: number;
  rating: number;
  onPress: (index: number) => void;
  colorFilled?: string;
  colorUnfilled?: string;
  iconFilled?: string;
  iconUnfilled?: string;
}

export const Rating = memo(function RatingMemo({
  size,
  count,
  onPress,
  rating,
  colorFilled,
  colorUnfilled,
  iconFilled = 'star',
  iconUnfilled = 'star-outline',
}: Props) {
  const color = useColor();
  const fill = colorFilled || color.text.accent;
  const unfilled = colorUnfilled || color.text.secondary;

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
              color={index > rating || !rating ? unfilled : fill}
              name={index > rating || !rating ? iconUnfilled : iconFilled}
              size={size}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
});
