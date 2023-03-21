import React from 'react';
import { createSelector } from 'reselect';
import { type RootState } from 'root-types';
import { v4 } from 'uuid';
import { View } from '..';
import { spacing } from '../../features';
import { useRootSelector } from '../../redux';
import { CalendarDay } from './CalendarDay';
import { calendarUtils } from './calendarUtils';

type Props = {
  hiddenDays?: boolean;
};

export const getMonthKey = createSelector(
  (state: RootState) => state,
  (state) => {
    const selectedMonth = state.calendar.selected;
    return calendarUtils.getFormat(new Date(selectedMonth), 'YYYY-MM');
  },
);

export const getMonth = createSelector(
  [(state: RootState) => state, getMonthKey],
  (state, monthKey) => {
    return state.calendar.months[monthKey].days;
  },
);

export const CalendarMonth = ({ hiddenDays }: Props) => {
  const days = useRootSelector(getMonth);

  console.log('month');
  return (
    <View style={{ paddingHorizontal: spacing(2) }}>
      {days.map((row) => (
        <View
          key={v4()}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {row.map((col) => (
            <CalendarDay
              dayKey={
                col.isHeader
                  ? col.display
                  : calendarUtils.getFormat(new Date(col.value), 'YYYY-MM-DD')
              }
              hiddenDays={hiddenDays}
              key={v4()}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
