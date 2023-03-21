import React, { useCallback } from 'react';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { useRootDispatch, useRootSelector } from '../../redux';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
import { calendarActions } from './calendarReducer';
import { calendarUtils } from './calendarUtils';
import { type DayState } from './types';

type Props = {
  dayKey: string;
  hiddenDays?: boolean;
};

const useConfig = (day: DayState, hiddenDays?: boolean) => {
  const colors = useColors();
  const today = new Date();
  const isToday = calendarUtils.isSameDay(new Date(day.value), today);
  const backgroundColor = day.isSelected
    ? colors.background.accent
    : 'transparent';
  const nonMonthDay = hiddenDays && !day.isWithinMonth;
  const hiddenDay = nonMonthDay && !day.isHeader;
  const textColor = hiddenDay
    ? 'transparent'
    : day.isSelected
    ? colors.text.primaryB
    : day.isWithinMonth
    ? colors.text.primaryA
    : colors.text.tertiary;
  const disabled = day.isHeader || nonMonthDay;
  const bold = isToday || day.isHeader;
  return { backgroundColor, bold, disabled, textColor };
};

export const CalendarDay = ({ dayKey, hiddenDays }: Props) => {
  const selectedMonth = useRootSelector((state) => state.calendar.selected);
  const monthKey = calendarUtils.getFormat(new Date(selectedMonth), 'YYYY-MM');
  const location = useRootSelector(
    (state) => state.calendar.months[monthKey].indexDays[dayKey],
  );
  const day = useRootSelector(
    (state) => state.calendar.months[monthKey].days[location.row][location.col],
  );
  const { backgroundColor, bold, disabled, textColor } = useConfig(
    day,
    hiddenDays,
  );
  const dispatch = useRootDispatch();

  const handleSelect = useCallback(() => {
    dispatch(calendarActions.select(day.value));
  }, [day.value, dispatch]);

  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
};
