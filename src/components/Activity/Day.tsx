import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React, {memo} from 'react';
import {colorWithOpacity} from '../../features/Config';
import {useColor} from '../../features/Theme';
import {TouchableOpacity} from '../TouchableOpacity';
import {ActivityDay} from './types';
dayjs.extend(isToday);

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
      ? color.background.secondary
      : colorWithOpacity(color.text.positive, day.count / max + 0.33);
  const borderColor = dayjs(day.date).isToday()
    ? color.border.negative
    : 'transparent';
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
