import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

export const formatRelativeDate = (date: Date): string => {
  const today = new Date();
  const years = differenceInYears(date, today);
  const weeks = differenceInWeeks(date, today);
  const days = differenceInDays(date, today);
  const hours = differenceInHours(date, today);
  const minutes = differenceInMinutes(date, today);
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
