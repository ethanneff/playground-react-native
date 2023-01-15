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
  display: number | string;
  header?: boolean;
  id: number | string;
};
const createDayObj = ({
  current = false,
  display,
  header = false,
  id,
}: DayObject): Day => ({
  current,
  display: String(display),
  header,
  id: String(id),
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
      createDayObj({ current: false, display: day, header: true, id: day }),
    ),
  );
  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++)
      calendarMatrix[row][col] =
        row === 1 && col < firstDay
          ? createDayObj({
              display: prevDayCounter++,
              id: addDays(addMonths(date, -1), prevDayCounter).valueOf(),
            })
          : row > 1 && dayCounter > maxDays
          ? createDayObj({
              display: nextDayCounter++,
              id: addDays(addMonths(date, 1), nextDayCounter).valueOf(),
            })
          : createDayObj({
              current: true,
              display: dayCounter++,
              id: addDays(addMonths(date, 0), dayCounter).valueOf(),
            });
  }
  return calendarMatrix;
};

const calendarMatrixMemo: Record<string, CalendarMatrix> = {};

export const getCalendarMatrix = (date: Date): CalendarMatrix => {
  const today = date.valueOf();
  if (today in calendarMatrixMemo) return calendarMatrixMemo[today];
  const matrix = generateCalendarMatrix(date);
  calendarMatrixMemo[date.valueOf()] = matrix;
  return matrix;
};
