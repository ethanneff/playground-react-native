import React from 'react';
import { v4 } from 'uuid';
import { View } from '..';
import { spacing } from '../../features';
import { useRootSelector } from '../../redux';
import { CalendarDay } from './CalendarDay';
import { calendarUtils } from './calendarUtils';

type Props = {
  hiddenDays?: boolean;
};

export const CalendarMonth = ({ hiddenDays }: Props) => {
  const selectedMonth = useRootSelector((state) => state.calendar.selected);
  const dateKey = calendarUtils.getFormat(new Date(selectedMonth), 'YYYY-MM'); // TODO
  const month = useRootSelector((state) => state.calendar.months[dateKey]);

  console.log('month'); // TODO, should not on nav and select
  return (
    <View style={{ paddingHorizontal: spacing(2) }}>
      {month.days.map((row) => (
        <View
          key={v4()}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {row.map((col) => (
            <CalendarDay
              day={col} // TODO: pass keys, not object
              hiddenDays={hiddenDays}
              key={v4()}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
