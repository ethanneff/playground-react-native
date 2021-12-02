export type Day = {
  current: boolean;
  display: string;
  header: boolean;
  id: string;
};

export type CalendarMatrix = Day[][];

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const dayOfMonth = date.getDate();
  result.setMonth(result.getMonth() + months);
  if (result.getDate() !== dayOfMonth) result.setDate(0);

  return result;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const firstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const lastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DayObject = {
  current?: boolean;
  display: string | number;
  header?: boolean;
  id: string | number;
};
const createDayObj = ({
  id,
  display,
  current = false,
  header = false,
}: DayObject): Day => ({
  id: String(id),
  display: String(display),
  current,
  header,
});

const generateCalendarMatrix = (date: Date) => {
  const firstDay = firstDayOfMonth(date).getDay();
  const maxDays = lastDayOfMonth(date).getDate();
  const prevMaxDays = lastDayOfMonth(addMonths(date, -1)).getDate();
  let dayCounter = 1;
  let prevDayCounter = prevMaxDays - firstDay + 1;
  let nextDayCounter = 1;
  const calendarMatrix: CalendarMatrix = [];
  calendarMatrix.push(
    days.map((day) =>
      createDayObj({ id: day, display: day, current: false, header: true }),
    ),
  );
  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++)
      calendarMatrix[row][col] =
        row === 1 && col < firstDay
          ? createDayObj({
              id: addDays(addMonths(date, -1), prevDayCounter).valueOf(),
              display: prevDayCounter++,
            })
          : row > 1 && dayCounter > maxDays
          ? createDayObj({
              id: addDays(addMonths(date, 1), nextDayCounter).valueOf(),
              display: nextDayCounter++,
            })
          : createDayObj({
              id: addDays(addMonths(date, 0), dayCounter).valueOf(),
              display: dayCounter++,
              current: true,
            });
  }
  return calendarMatrix;
};

const calendarMatrixMemo: { [key: string]: CalendarMatrix } = {};
export const getCalendarMatrix = (date: Date): CalendarMatrix => {
  const memo = calendarMatrixMemo[date.valueOf()];
  if (memo) return memo;

  const matrix = generateCalendarMatrix(date);
  calendarMatrixMemo[date.valueOf()] = matrix;
  return matrix;
};
