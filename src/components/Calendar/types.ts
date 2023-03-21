type Location = { col: number; row: number };
type IndexState = Record<string, Location>;

export type DayState = {
  display: string;
  isHeader: boolean;
  isSelected: boolean;
  isWithinMonth: boolean;
  value: Date;
};

export type MonthState = {
  days: DayState[][];
  indexDays: IndexState;
  selected: Location;
};

export type CalendarState = {
  loading: boolean;
  months: Record<string, MonthState>;
  selected: Date;
};
