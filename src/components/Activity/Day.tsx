import isToday from 'date-fns/isToday';
import React, {memo} from 'react';
import {useColor} from '../../hooks';
import {colorWithOpacity} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';
import {ActivityDay} from './types';

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
      key={String(day.date)}
      onPress={onPress(day)}
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
