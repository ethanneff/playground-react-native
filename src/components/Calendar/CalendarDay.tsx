import React, { useCallback } from 'react';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { useRootDispatch, useRootSelector } from '../../redux';
import { Text } from '../Text';
import { Pressable } from '../Pressable';
import { calendarActions } from './calendarReducer';
import { calendarUtils } from './calendarUtils';
import { type DayState } from './types';

type Props = {
  dayKey: string;
  hiddenDays?: boolean;
};

type ConfigProps = {
  day: DayState;
  dayKey: string;
  hiddenDays?: boolean;
  monthKey: string;
};

const useConfig = ({ day, dayKey, hiddenDays, monthKey }: ConfigProps) => {
  const colors = useColors();
  const today = new Date();
  const isToday = calendarUtils.isSameDay(new Date(day.value), today);
  const isWithinMonth = calendarUtils.isSameMonth(monthKey, dayKey);
  const backgroundColor = day.isSelected
    ? colors.background.accent
    : 'transparent';
  const nonMonthDay = hiddenDays && !isWithinMonth;
  const hiddenDay = nonMonthDay && !day.isHeader;
  const textColor = hiddenDay
    ? 'transparent'
    : day.isSelected
    ? colors.text.primaryB
    : isWithinMonth
    ? colors.text.primaryA
    : colors.text.tertiary;
  const disabled = day.isHeader || nonMonthDay;
  const bold = isToday || day.isHeader;
  return { backgroundColor, bold, disabled, textColor };
};

export const CalendarDay = ({ dayKey, hiddenDays }: Props) => {
  const monthKey = useRootSelector((state) => state.calendar.activeMonth);
  const day = useRootSelector((state) => state.calendar.days[dayKey]);
  const { backgroundColor, bold, disabled, textColor } = useConfig({
    day,
    dayKey,
    hiddenDays,
    monthKey,
  });
  const dispatch = useRootDispatch();

  const handleSelect = useCallback(() => {
    dispatch(calendarActions.select(day.value));
  }, [day.value, dispatch]);

  return (
    <Pressable
      disabled={disabled}
      onPress={handleSelect}
    >
      <View
        style={{
          backgroundColor,
          borderRadius: spacing(20),
          height: spacing(8),
          justifyContent: 'center',
          width: spacing(10),
        }}
      >
        <Text
          bold={bold}
          center
          style={{ color: textColor }}
          title={day.display}
        />
      </View>
    </Pressable>
  );
};
