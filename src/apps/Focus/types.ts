export type Category = {
  id: string;
  name: string;
  total: number;
};

export type Item = {
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  title: string;
  zone: string;
};

export type AuthStackRoutes = {
  'category-detail': { category: Category };
  home: undefined;
  'journal-detail': { item: Item };
};
export type UnAuthStackRoutes = {
  landing: undefined;
};

export type HomeTabRoutes = {
  journal: undefined;
  profile: undefined;
  progress: undefined;
};
