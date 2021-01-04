import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Icon} from '../../components';
import {useColor} from '../../hooks';

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
  const fill = colorFilled || color.text;
  const unfilled = colorUnfilled || color.secondary;

  const handleOnPress = useCallback(
    (index: number) => () => {
      onPress(index);
    },
    [onPress],
  );
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Icon
            color={index > rating || !rating ? unfilled : fill}
            key={index}
            name={index > rating || !rating ? iconUnfilled : iconFilled}
            onPress={handleOnPress(index)}
            size={size}
          />
        ))}
    </View>
  );
});
