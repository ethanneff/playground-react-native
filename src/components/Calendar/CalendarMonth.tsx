import { format } from 'date-fns';
import React from 'react';
import { v4 } from 'uuid';
import { View } from '..';
import { spacing } from '../../features';
import { useRootSelector } from '../../redux';
import { CalendarDay } from './CalendarDay';
import { keyOfMonth } from './constants';

type Props = {
  hiddenDays?: boolean;
};

export const CalendarMonth = ({ hiddenDays }: Props) => {
  const activeMonth = useRootSelector((s) => s.calendar.activeMonth);
  const monthKey = format(activeMonth, keyOfMonth);
  const days = useRootSelector((s) => s.calendar.months[monthKey].days);

  return (
    <View style={{ paddingHorizontal: spacing(2) }}>
      {days.map((row) => (
        <View
          flexDirection="row"
          justifyContent="space-between"
          key={v4()}
        >
          {row.map((col) => (
            <CalendarDay
              day={col}
              hiddenDays={hiddenDays}
              key={v4()}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
