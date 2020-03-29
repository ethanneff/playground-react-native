import React, {memo, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
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

export const Rating = memo(function RatingMemo(props: Props) {
  const color = useColor();
  const {
    size,
    count,
    onPress,
    rating,
    colorFilled = color.text,
    colorUnfilled = color.secondary,
    iconFilled = 'star',
    iconUnfilled = 'star-outline',
  } = props;
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
          <TouchableOpacity key={index} onPress={handleOnPress(index)}>
            <Icon
              size={size}
              name={index > rating || !rating ? iconUnfilled : iconFilled}
              color={index > rating || !rating ? colorUnfilled : colorFilled}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
});
