import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { ActivitySquares, ApiResponse } from './types';
dayjs.extend(isToday);

export const getDateFormat = (date: number): string =>
  dayjs(date).format('YYYY-MM-DD');

export const getSubmissionFormat = (count: number, date: number): string => {
  const submissions = count === 1 ? 'submission' : 'submissions';
  const day = dayjs(date).isToday()
    ? 'today'
    : `on ${dayjs(date).format('MMM DD, YYYY')}`;
  return `${count} ${submissions} ${day}`;
};

export const getActivitySquares = (): ActivitySquares => {
  const matrix = [];
  const oneDay = 60 * 60 * 24 * 1000;
  const begin = dayjs().startOf('week').subtract(1, 'year').valueOf();
  let end = dayjs().endOf('week').valueOf();
  let day = 0;
  let week = [];
  while (end >= begin) {
    week.unshift({ date: end, count: 0 });
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
      const count = active[getDateFormat(day.date)] || 0;
      max = Math.max(count, max);
      total += count;
      return { ...day, count };
    }),
  );
  return { matrix, max, total };
};
