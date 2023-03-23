export type DayState = {
  display: string;
  isHeader: boolean;
  isSelected: boolean;
  value: Date;
};

export type MonthState = {
  days: string[][];
};

export type CalendarState = {
  activeMonth: string;
  days: Record<string, DayState>;
  loading: boolean;
  months: Record<string, MonthState>;
};
