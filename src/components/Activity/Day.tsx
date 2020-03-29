import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useColor} from '../../hooks';
import {colorWithOpacity} from '../../utils';
import isToday from 'date-fns/isToday';

export interface ActivityDay {
  date: number;
  count: number;
}

interface Props {
  day: ActivityDay;
  max: number;
  size: number;
  margin: number;
  onPress: (item: ActivityDay) => () => void;
}

export const Day = memo(function Day({day, max, size, margin, onPress}: Props) {
  const color = useColor();
  const backgroundColor =
    day.count === 0
      ? color.surface
      : colorWithOpacity(color.success, (day.count / max) * 3 + 0.25);
  const borderColor = isToday(day.date) ? color.danger : 'transparent';
  return (
    <TouchableOpacity
      onPress={onPress(day)}
      key={String(day.date)}
      style={{
        width: size,
        height: size,
        margin,
        backgroundColor,
        borderColor,
        borderWidth: 2,
      }}
    />
  );
});
