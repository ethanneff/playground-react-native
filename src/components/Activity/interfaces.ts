import { Dayjs } from "dayjs";

export interface ActivityDay {
  date: Dayjs;
  count: number;
}

export type ActivityDayInWeek = Array<ActivityDay>;

export type ActivityMatrix = Array<ActivityDayInWeek>;

export type ActivityModel = {
  matrix: ActivityMatrix;
  max: number;
  loading: boolean;
};

export type Site = "github" | "leetCode" | "hackerRank";
