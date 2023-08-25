export type Site = 'github' | 'gitlab' | 'hackerRank' | 'leetCode' | 'random';

export type ActivityDay = {
  count: number;
  date: number;
};

export type ActivityWeek = ActivityDay[];
type ActivityMatrix = ActivityWeek[];

export type ActivityModel = {
  activity: {
    matrix: ActivityMatrix;
    max: number;
    total: number;
  };
  request: 'failure' | 'loading' | 'success';
  selected: {
    day: number;
    submissions: string;
  };
};

export type ApiResponse = {
  contributions: Record<string, number>;
};

export type ActivitySquares = {
  matrix: ActivityMatrix;
  max: number;
  total: number;
};

export type ApiPromise = Promise<ApiResponse>;

export type ApiInput = {
  site: Site;
  username: string;
};
