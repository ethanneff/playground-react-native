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
  onboarding: undefined;
  signup: undefined;
};

export type HomeTabRoutes = {
  account: undefined;
  progression: undefined;
  tracker: undefined;
};
