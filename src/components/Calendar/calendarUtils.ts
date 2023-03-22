import dayjs from 'dayjs';
import { daysOfWeek } from './constants';
import { type DayState, type MonthState } from './types';

type MonthAndDays = {
  days: Record<string, DayState>;
  months: Record<string, MonthState>;
};

export const calendarUtils = {
  addDays: (date: Date | string, days: number): Date => {
    return dayjs(date).add(days, 'day').toDate();
  },
  addMonths: (date: Date | string, months: number): Date => {
    return dayjs(date).add(months, 'month').toDate();
  },
  getFirstDayOfMonth: (date: Date | string): Date => {
    return dayjs(date).startOf('month').toDate();
  },
  getFormat: (
    date: Date,
    format: 'D' | 'DD' | 'M' | 'MM' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY',
  ): string => {
    const iso = date.toISOString();
    switch (format) {
      case 'YYYY-MM-DD':
        return iso.substring(0, 10);
      case 'YYYY-MM':
        return iso.substring(0, 7);
      case 'YYYY':
        return iso.substring(0, 4);
      case 'MM':
        return iso.substring(5, 7);
      case 'DD':
        return iso.substring(8, 10);
      case 'M':
        return iso.substring(8, 10).replace(/^0+/u, '');
      case 'D':
        return iso.substring(8, 10).replace(/^0+/u, '');
      default:
        return iso;
    }
  },
  getLastDayOfMonth: (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  getMonthAndDays: (date: Date): MonthAndDays => {
    const firstDayOfMonth = calendarUtils.getFirstDayOfMonth(date);
    let day = calendarUtils.addDays(firstDayOfMonth, -firstDayOfMonth.getDay());
    const monthKey = calendarUtils.getFormat(date, 'YYYY-MM');
    const result: MonthAndDays = { days: {}, months: {} };
    result.months[monthKey] = { days: [daysOfWeek] };
    for (let row = 1; row < 7; row++) {
      result.months[monthKey].days[row] = [];
      for (let col = 0; col < 7; col++) {
        const key = calendarUtils.getFormat(day, 'YYYY-MM-DD');
        result.days[key] = {
          display: calendarUtils.getFormat(day, 'D'),
          isHeader: false,
          isSelected: false,
          isWithinMonth: calendarUtils.isSameMonth(date, day),
          value: day,
        };
        result.months[monthKey].days[row][col] = key;
        day = calendarUtils.addDays(day, 1);
      }
    }
    return result;
  },
  isSameDay: (first: Date, second: Date): boolean => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  },
  isSameMonth: (first: Date, second: Date): boolean => {
    return first.getMonth() === second.getMonth();
  },
};
