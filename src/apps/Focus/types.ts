export type Category = {
  id: string;
  name: string;
  total: number;
};

export type Item = {
  title: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  zone: string;
};

export type AuthStackRoutes = {
  home: undefined;
  'category-detail': { category: Category };
  'interval-detail': { item: Item };
};
export type UnAuthStackRoutes = {
  landing: undefined;
};

export type HomeTabRoutes = {
  interval: undefined;
  progress: undefined;
  profile: undefined;
};
