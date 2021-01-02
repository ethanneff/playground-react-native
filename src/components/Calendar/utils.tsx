export type Day = {
  id: string;
  display: string;
  current: boolean;
  header: boolean;
};

export type CalendarMatrix = Day[][];

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const dayOfMonth = date.getDate();
  result.setMonth(result.getMonth() + months);
  if (result.getDate() !== dayOfMonth) result.setDate(0);

  return result;
};

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const firstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const lastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const createDayObj = (
  id: string | number,
  display: string | number,
  current = false,
  header = false,
): Day => ({id: String(id), display: String(display), current, header});

const generateCalendarMatrix = (date: Date) => {
  const firstDay = firstDayOfMonth(date).getDay();
  const maxDays = lastDayOfMonth(date).getDate();
  const prevMaxDays = lastDayOfMonth(addMonths(date, -1)).getDate();
  let dayCounter = 1;
  let prevDayCounter = prevMaxDays - firstDay + 1;
  let nextDayCounter = 1;
  const calendarMatrix: CalendarMatrix = [];
  calendarMatrix.push(days.map((day) => createDayObj(day, day, false, true)));
  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++)
      calendarMatrix[row][col] =
        row === 1 && col < firstDay
          ? createDayObj(
              addDays(addMonths(date, -1), prevDayCounter).valueOf(),
              prevDayCounter++,
            )
          : row > 1 && dayCounter > maxDays
          ? createDayObj(
              addDays(addMonths(date, 1), nextDayCounter).valueOf(),
              nextDayCounter++,
            )
          : createDayObj(
              addDays(addMonths(date, 0), dayCounter).valueOf(),
              dayCounter++,
              true,
            );
  }
  return calendarMatrix;
};

const calendarMatrixMemo: {[key in string]: CalendarMatrix} = {};
export const getCalendarMatrix = (date: Date): CalendarMatrix => {
  const memo = calendarMatrixMemo[date.valueOf()];
  if (memo) return memo;

  const matrix = generateCalendarMatrix(date);
  calendarMatrixMemo[date.valueOf()] = matrix;
  return matrix;
};
