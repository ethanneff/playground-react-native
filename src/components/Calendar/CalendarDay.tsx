import { isSameDay, isSameMonth } from 'date-fns';
import React, { useCallback } from 'react';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { useRootDispatch, useRootSelector } from '../../redux';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { calendarActions } from './calendarReducer';
import { type DayState } from './types';

type Props = {
  day: string;
  hiddenDays?: boolean;
};

type ConfigProps = {
  dayState: DayState;
  hiddenDays?: boolean;
  month: Date;
};

const useConfig = ({ dayState, hiddenDays, month }: ConfigProps) => {
  const colors = useColors();
  const today = new Date();
  const isToday = isSameDay(new Date(dayState.value), today);
  const isWithinMonth = isSameMonth(month, dayState.value);
  const backgroundColor = dayState.isSelected
    ? colors.background.accent
    : 'transparent';
  const nonMonthDay = hiddenDays && !isWithinMonth;
  const hiddenDay = nonMonthDay && !dayState.isHeader;
  const textColor = hiddenDay
    ? 'transparent'
    : dayState.isSelected
    ? colors.text.primaryB
    : isWithinMonth
    ? colors.text.primaryA
    : colors.text.tertiary;
  const disabled = dayState.isHeader || nonMonthDay;
  const bold = isToday || dayState.isHeader;
  return { backgroundColor, bold, disabled, textColor };
};

export const CalendarDay = ({ day, hiddenDays }: Props) => {
  const month = useRootSelector((state) => state.calendar.activeMonth);
  const dayState = useRootSelector((state) => state.calendar.days[day]);
  const { backgroundColor, bold, disabled, textColor } = useConfig({
    dayState,
    hiddenDays,
    month,
  });
  const dispatch = useRootDispatch();

  const handleSelect = useCallback(() => {
    dispatch(calendarActions.select(dayState.value));
  }, [dayState.value, dispatch]);

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
          title={dayState.display}
        />
      </View>
    </Pressable>
  );
};
