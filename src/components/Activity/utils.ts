import { endOfWeek, format, isToday, startOfWeek, sub } from 'date-fns';

import { type ActivitySquares, type ApiResponse } from './types';

export const getDateFormat = (date: number): string =>
  format(date, 'yyyy-MM-dd');

export const getSubmissionFormat = (count: number, date: number): string => {
  const submissions = count === 1 ? 'submission' : 'submissions';
  const day = isToday(date) ? 'today' : `on ${format(date, 'MMM dd, yyyy')}`;
  return `${count} ${submissions} ${day}`;
};

export const getActivitySquares = (): ActivitySquares => {
  const matrix = [];
  const oneDay = 60 * 60 * 24 * 1000;
  const begin = sub(startOfWeek(new Date()), { years: 1 }).valueOf();
  let end = endOfWeek(new Date()).valueOf();
  let day = 0;
  let week = [];
  while (end >= begin) {
    week.unshift({ count: 0, date: end });
    if (day > 5) {
      matrix.push(week);
      week = [];
      day = 0;
    } else {
      day++;
    }
    end -= oneDay;
  }

  return { matrix, max: 0, total: 0 };
};

export const updateActivitySquares = (
  squares: ActivitySquares,
  active: ApiResponse,
): ActivitySquares => {
  let max = 0;
  let total = 0;

  const matrix = squares.matrix.map((week) =>
    week.map((day) => {
      const count = active.contributions[getDateFormat(day.date)] || 0;
      max = Math.max(count, max);
      total += count;
      return { ...day, count };
    }),
  );
  return { matrix, max, total };
};
