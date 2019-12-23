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

  return { matrix: activity.reverse(), max };
};

const getGithubActivity = async (username: string): ApiPromise => {
  const url = `https://github-contributions-json-api.now.sh/api?username=${username}`;
  const res = await axios.get(url);
  return res.data;
};

const getLeetCodeActivity = async (username: string): ApiPromise => {
  const url = `https://leetcode.com/api/user_submission_calendar/${username}`;
  const res = await axios.get(url);
  const data = JSON.parse(res.data);
  return Object.keys(data).reduce((total: ApiResponse, item) => {
    const day = dayjs(Number(item) * 1000).format("YYYY-MM-DD");
    if (day in total) {
      total[day] += data[item];
    } else {
      total[day] = data[item];
    }
    return total;
  }, {});
};

const getHackerRankActivity = async (username: string): ApiPromise => {
  const url = `https://www.hackerrank.com/rest/hackers/${username}/submission_histories`;
  const res = await axios.get(url);
  return Object.keys(res.data).reduce((total: ApiResponse, item) => {
    total[item] = Number(res.data[item]);
    return total;
  }, {});
};

};
