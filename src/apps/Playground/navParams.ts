type Category = 'features' | 'games' | 'storybook' | 'creations' | 'none';
type RouteCategories = { [key: string]: Category };

const routeCategories: RouteCategories = {
  landing: 'none',
  colors: 'storybook',
  themes: 'storybook',
  fonts: 'storybook',
  paragraphs: 'storybook',
  inputs: 'storybook',
  modals: 'storybook',
  'papi-jump': 'games',
  snake: 'games',
  archero: 'games',
  'flappy-bird': 'games',
  'tic-tac-toe': 'games',
  'game-of-life': 'games',
  bejeweled: 'games',
  'slot-machine': 'games',
  'fortune-wheel': 'games',
  drift: 'games',
  chat: 'features',
  'infinite-images': 'features',
  'skeleton-loader': 'features',
  'recycler-flatList': 'features',
  'search-bar': 'features',
  'swipe-feed': 'features',
  'bouncing-balls': 'features',
  'pinch-spread': 'features',
  ball: 'creations',
  drag: 'creations',
  okrs: 'creations',
  startup: 'creations',
  questionnaire: 'creations',
  'apple-mask': 'creations',
  'apple-stopwatch': 'creations',
  'apple-fit': 'creations',
  tinder: 'creations',
};

type NavParams = { [key: string]: undefined };

export const navParams: NavParams = Object.keys(routeCategories).reduce(
  (acc, key) => ({ ...acc, [key]: undefined }),
  {},
);

type LandingRoutes = { [key in Category]: string[] };
export const landingRoutes: LandingRoutes = Object.keys(routeCategories).reduce(
  (acc, key) => ({
    ...acc,
    [routeCategories[key]]: [...acc[routeCategories[key]], key],
  }),
  { features: [], games: [], storybook: [], creations: [], none: [] },
);
