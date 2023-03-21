import { type DayState, type MonthState } from './types';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const header: DayState[] = daysOfWeek.map((day) => ({
  display: day,
  isHeader: true,
  isSelected: false,
  isWithinMonth: false,
  value: new Date(0),
}));

export const calendarUtils = {
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  addMonths: (date: Date, months: number): Date => {
    const result = new Date(date);
    const dayOfMonth = date.getDate();
    result.setMonth(result.getMonth() + months);
    if (result.getDate() !== dayOfMonth) result.setDate(0);
    return result;
  },
  getFirstDayOfMonth: (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
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
  getMonthMatrix: (date: Date): MonthState => {
    const firstDayOfMonth = calendarUtils.getFirstDayOfMonth(date);
    let day = calendarUtils.addDays(firstDayOfMonth, -firstDayOfMonth.getDay());
    const month: MonthState = {
      days: [],
      indexDays: {},
      selected: { col: 0, row: 0 },
    };
    month.days.push(header);
    daysOfWeek.forEach((key, index) => {
      month.indexDays[key] = { col: index, row: 0 };
    });
    for (let row = 1; row < 7; row++) {
      month.days[row] = [];
      for (let col = 0; col < 7; col++) {
        month.days[row][col] = {
          display: calendarUtils.getFormat(day, 'D'),
          isHeader: false,
          isSelected: false,
          isWithinMonth: calendarUtils.isSameMonth(date, day),
          value: day,
        };
        const dayFormat = calendarUtils.getFormat(day, 'YYYY-MM-DD');
        month.indexDays[dayFormat] = { col, row };
        day = calendarUtils.addDays(day, 1);
      }
    }
    return month;
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
