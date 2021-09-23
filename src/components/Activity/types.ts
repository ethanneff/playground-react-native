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
    submissions: string;
    day: number;
  };
};

export type ActivityWeek = Array<ActivityDay>;

export type ActivityDay = {
  date: number;
  count: number;
};

export type ApiResponse = { [unix: string]: number };

export type ActivitySquares = {
  matrix: ActivityMatrix;
  max: number;
  total: number;
};

export type ApiPromise = Promise<ApiResponse>;

export type ApiInput = {
  username: string;
  site: Site;
};
