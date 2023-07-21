import { isToday } from 'date-fns';
import React from 'react';
import { colorWithOpacity, useColors } from '../../features';
import { Pressable } from '../Pressable';
import { type ActivityDay } from './types';

type Props = {
  readonly day: ActivityDay;
  readonly margin: number;
  readonly max: number;
  readonly onPress: (item: ActivityDay) => () => void;
  readonly size: number;
};

export const Day = ({ day, margin, max, onPress, size }: Props) => {
  const colors = useColors();
  const backgroundColor =
    day.count === 0
      ? colors.background.secondary
      : colorWithOpacity(colors.text.positive, day.count / max + 0.33);
  const borderColor = isToday(day.date)
    ? colors.border.negative
    : 'transparent';
  return (
    <Pressable
      containerStyle={{
        backgroundColor,
        borderColor,
        borderWidth: 2,
        height: size,
        margin,
        width: size,
      }}
      onPress={onPress(day)}
    />
  );
};
