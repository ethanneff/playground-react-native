import dayjs, { Dayjs } from "dayjs";

const getApiCount = (unix: number) => {
  // look at {date: count}
  if (!unix) {
    return 0;
  }
  return Math.floor(Math.random() * 10);
};

export interface ActivityDay {
  date: Dayjs;
  count: number;
}

export type ActivityDayInWeek = Array<ActivityDay>;

export type ActivityMatrix = { max: number; matrix: Array<ActivityDayInWeek> };

export const getActivitySquares = (): ActivityMatrix => {
  let start = dayjs()
    .startOf("week")
    .subtract(1, "year")
    .add(1, "day");
  let startUnix = start.valueOf();
  const endUnix = dayjs()
    .add(1, "day")
    .endOf("week")
    .valueOf();

  const activity = [];
  let week = [];
  let max = 0;
  while (startUnix < endUnix) {
    const count = getApiCount(startUnix);
    max = count > max ? count : max;
    week.push({ date: start, count });
    if (start.isSame(start.endOf("week"), "day")) {
      activity.push(week);
      week = [];
    }
    start = start.add(1, "day");
    startUnix = start.valueOf();
  }

  return {
    max,
    matrix: activity.reverse()
  };
};
