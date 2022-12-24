import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React, { memo } from 'react';
import { colorWithOpacity, useColors } from '../../features';
import { TouchableOpacity } from '../TouchableOpacity';
import { ActivityDay } from './types';
dayjs.extend(isToday);

type Props = {
  day: ActivityDay;
  margin: number;
  max: number;
  onPress: (item: ActivityDay) => () => void;
  size: number;
};

export const Day = memo(function Day({
  day,
  margin,
  max,
  onPress,
  size,
}: Props) {
  const colors = useColors();
  const backgroundColor =
    day.count === 0
      ? colors.background.secondary
      : colorWithOpacity(colors.text.positive, day.count / max + 0.33);
  const borderColor = dayjs(day.date).isToday()
    ? colors.border.negative
    : 'transparent';
  return (
    <TouchableOpacity
      key={String(day.date)}
      onPress={onPress(day)}
      style={{
        backgroundColor,
        borderColor,
        borderWidth: 2,
        height: size,
        margin,
        width: size,
      }}
    />
  );
});
