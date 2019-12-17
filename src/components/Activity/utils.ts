import dayjs, { Dayjs } from "dayjs";

const getApiCount = (unix: number) => {
  // look at {date: count}
  return Math.floor(Math.random() * 3);
};

export interface ActivityDay {
  date: Dayjs;
  count: number;
}

export type ActivityDayInWeek = Array<ActivityDay>;

export type ActivityMatrix = Array<ActivityDayInWeek>;

export const getActivitySquares = (): ActivityMatrix => {
  let start = dayjs()
    .startOf("week")
    .subtract(1, "year")
    .add(1, "day");
  let startUnix = start.valueOf();
  const endUnix = dayjs()
    .endOf("week")
    .valueOf(); // TODO: if end of week, add one

  const activity = [];
  let week = [];
  while (startUnix < endUnix) {
    const count = getApiCount(startUnix);
    week.push({ date: start, count });
    if (start.isSame(start.endOf("week"), "day")) {
      activity.push(week);
      week = [];
    }
    start = start.add(1, "day");
    startUnix = start.valueOf();
  }

  return activity.reverse();
};
