import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

export const formatRelativeDate = (date: Date): string => {
  const today = new Date();
  const years = differenceInYears(today, date);
  const weeks = differenceInWeeks(today, date);
  const days = differenceInDays(today, date);
  const hours = differenceInHours(today, date);
  const minutes = differenceInMinutes(today, date);
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
