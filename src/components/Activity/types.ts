export type Site = 'github' | 'leetCode' | 'hackerRank' | 'gitlab' | 'random';

export type ActivityMatrix = Array<ActivityWeek>;

export type ActivityModel = {
  activity: {
    matrix: ActivityMatrix;
    max: number;
    total: number;
  };
  request: 'loading' | 'failure' | 'success';
  selected: {
    day: number;
    submissions: string;
  };
};

export type ActivityWeek = Array<ActivityDay>;

export type ActivityDay = {
  count: number;
  date: number;
};

export type ApiResponse = { [unix: string]: number };

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
