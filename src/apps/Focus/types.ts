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
  admin: undefined;
  debug: undefined;
  download: undefined;
  home: undefined;
  'interval-details': { item: Item };
  'progression-details': { category: Category };
};
export type UnAuthStackRoutes = {
  debug: undefined;
  'forgot-password': { email: string };
  landing: undefined;
  onboarding: undefined;
  privacy: undefined;
  'sign-up': undefined;
  terms: undefined;
};

export type HomeTabRoutes = {
  account: undefined;
  progression: undefined;
  tracker: undefined;
};
