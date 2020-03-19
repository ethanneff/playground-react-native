import dayjs, { Dayjs } from "dayjs";
import { ActivityMatrix, Site } from "./interfaces";
import axios from "axios";

type ApiResponse = { [unix: string]: number };

type ApiPromise = Promise<ApiResponse>;

type ApiInput = {
  username: string;
  site: Site;
};

type ActivitySquares = {
  matrix: ActivityMatrix;
  max: number;
};

export const getDateFormat = (date: Dayjs) => date.format("YYYY-MM-DD");

export const getSubmissionFormat = (count: number, date: Dayjs): string => {
  const submissions = count === 1 ? "submission" : "submissions";
  const today = date.isSame(dayjs(), "day");
  const day = today ? "today" : `on ${date.format("MMM DD, YYYY")}`;
  return `${count} ${submissions} ${day}`;
};

export const getActivitySquares = (): ActivitySquares => {
  const today = Date.now();
  const matrix = [];
  const oneDay = 60 * 60 * 24 * 1000;
  const begin = startOfWeek(sub(today, { years: 1 })).valueOf();
  let end = endOfWeek(today).valueOf();
  let day = 0;
  const max = 0;
  let week = [];
  while (end >= begin) {
    week.unshift({ date: end, count: 0 });
    if (day > 5) {
      matrix.push(week);
      week = [];
      day = 0;
    } else {
      day++;
    }
    end -= oneDay;
  }

  return { matrix, max };
};

export const updateActivitySquares = (
  squares: ActivitySquares,
  active: ApiResponse
): ActivitySquares => {
  let max = 0;
  const matrix = squares.matrix.map(week =>
    week.map(day => {
      const count = active[getDateFormat(day.date)] || 0;
      max = Math.max(count, max);
      return { ...day, count };
    })
  );
  return { matrix, max };
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
    const day = getDateFormat(dayjs(Number(item) * 1000));
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

export const getApiActivity = ({ username, site }: ApiInput): ApiPromise => {
  switch (site) {
    case "github":
      return getGithubActivity(username);
    case "leetCode":
      return getLeetCodeActivity(username);
    case "hackerRank":
      return getHackerRankActivity(username);
    default:
      return Promise.resolve({});
  }
};
