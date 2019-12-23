import dayjs from "dayjs";
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

export const getActivitySquares = (active: ApiResponse): ActivitySquares => {
  let max = 0;
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
  while (startUnix < endUnix) {
    const count = active[start.format("YYYY-MM-DD")] || 0;
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
