import axios from "axios";
import cheerio from "cheerio";

type Output = { [unix: string]: number };

type Response = Promise<Output>;

export const getGithubActivity = async (username: string): Response => {
  const activity: Output = {};
  const url = `https://github.com/${username}`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  $(".day").each((_, element) => {
    const item = $(element);
    const date: string = item.attr("data-date") || "";
    const unix: number = new Date(date).valueOf();
    const count = Number(item.attr("data-count"));
    activity[unix] = count;
  });
  return activity;
};

export const getLeetCodeActivity = async (username: string): Response => {
  const url = `https://leetcode.com/api/user_submission_calendar/${username}`;
  const res = await axios.get(url);
  const data = JSON.parse(res.data);
  return Object.keys(data).reduce((total: Output, item) => {
    total[Number(item) * 1000] = data[item];
    return total;
  }, {});
};

export const getHackerRankActivity = async (username: string): Response => {
  const url = `https://www.hackerrank.com/rest/hackers/${username}/submission_histories`;
  const res = await axios.get(url);
  return Object.keys(res.data).reduce((total: Output, item) => {
    const date = new Date(item).valueOf();
    total[date] = Number(res.data[item]);
    return total;
  }, {});
};
