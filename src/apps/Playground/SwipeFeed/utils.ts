import dayjs, { Dayjs } from 'dayjs';

export const formatRelativeDate = (date: Dayjs): string => {
  const now = dayjs();
  const years = now.diff(date, 'year');
  const weeks = now.diff(date, 'week');
  const days = now.diff(date, 'day');
  const hours = now.diff(date, 'hour');
  const minutes = now.diff(date, 'minute');
  return years
    ? `${years}y`
    : weeks
    ? `${weeks}w`
    : days
    ? `${days}d`
    : hours
    ? `${hours}h`
    : minutes
    ? `${minutes}m`
    : '';
};
