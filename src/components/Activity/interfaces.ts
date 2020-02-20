import { Dayjs } from "dayjs";

export interface ActivityDay {
  date: Dayjs;
  count: number;
}

export type ActivityDayInWeek = Array<ActivityDay>;

export type ActivityMatrix = Array<ActivityDayInWeek>;

export type ActivityModel = {
  activity: {
    matrix: ActivityMatrix;
    max: number;
  };
  request: "loading" | "failure" | "success";
  selected: {
    submissions: string | undefined;
    day: string | undefined;
  };
};

export type Site = "github" | "leetCode" | "hackerRank" | "gitlab" | "random";
