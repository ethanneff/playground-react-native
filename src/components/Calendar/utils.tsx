import { Dayjs } from "dayjs";

export type Day = {
  id: string;
  display: string;
  current: boolean;
  header: boolean;
};

export type CalendarMatrix = Day[][];

const getDay = (
  id: string,
  display: number | string,
  current = false,
  header = false
): Day => ({ id, display: String(display), current, header });

const getUnix = (today: Dayjs, month: number, day: number) =>
  String(
    today
      .add(month, "month")
      .date(day)
      .format("MM DD YYYY")
      .valueOf()
  );

export const getCalendarMatrix = (date: Dayjs): CalendarMatrix => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = Number(date.startOf("month").format("d"));
  const maxDays = Number(date.endOf("month").format("D"));
  const prevMaxDays = Number(
    date
      .subtract(1, "month")
      .endOf("month")
      .format("D")
  );
  let dayCounter = 1;
  let prevDayCounter = prevMaxDays - firstDay + 1;
  let nextDayCounter = 1;
  const calendarMatrix: CalendarMatrix = [];
  calendarMatrix.push(days.map(day => getDay(day, day, false, true)));
  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++) {
      calendarMatrix[row][col] =
        row === 1 && col < firstDay
          ? getDay(getUnix(date, -1, prevDayCounter), prevDayCounter++)
          : row > 1 && dayCounter > maxDays
          ? getDay(getUnix(date, 1, nextDayCounter), nextDayCounter++)
          : getDay(getUnix(date, 0, dayCounter), dayCounter++, true);
    }
  }
  return calendarMatrix;
};
