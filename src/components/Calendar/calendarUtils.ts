import { add, format, startOfMonth, toDate } from 'date-fns';
import { daysOfWeek, keyOfDay, keyOfMonth } from './constants';
import { type DayState, type MonthState } from './types';

type MonthAndDays = {
  days: Record<string, DayState>;
  months: Record<string, MonthState>;
};

export const calendarUtils = {
  addDays: (date: Date, days: number): Date => {
    return toDate(add(date, { days }));
  },
  addMonths: (date: Date, months: number): Date => {
    return toDate(add(date, { months }));
  },
  getFirstDayOfMonth: (date: Date): Date => {
    return toDate(startOfMonth(date));
  },
  getMonthAndDays: (month: Date): MonthAndDays => {
    const firstDayOfMonth = calendarUtils.getFirstDayOfMonth(month);
    const monthKey = format(firstDayOfMonth, keyOfMonth);
    let day = calendarUtils.addDays(firstDayOfMonth, -firstDayOfMonth.getDay());
    const result: MonthAndDays = { days: {}, months: {} };
    result.months[monthKey] = { days: [daysOfWeek] };
    for (let row = 1; row < 7; row++) {
      result.months[monthKey].days[row] = [];
      for (let col = 0; col < 7; col++) {
        const key = format(day, keyOfDay);
        result.days[key] = {
          display: format(day, 'd'),
          isHeader: false,
          isSelected: false,
          value: day,
        };
        result.months[monthKey].days[row][col] = key;
        day = calendarUtils.addDays(day, 1);
      }
    }
    return result;
  },
};
