type Category = 'features' | 'games' | 'storybook' | 'creations' | 'none';
type RouteCategories = Record<string, Category>;

const routeCategories: RouteCategories = {
  'apple-fit': 'creations',
  'apple-mask': 'creations',
  'apple-stopwatch': 'creations',
  archero: 'games',
  ball: 'creations',
  bejeweled: 'games',
  'bouncing-balls': 'features',
  chat: 'features',
  colors: 'storybook',
  crash: 'games',
  drag: 'creations',
  drift: 'games',
  'flappy-bird': 'games',
  fonts: 'storybook',
  'fortune-wheel': 'games',
  'game-of-life': 'games',
  'infinite-images': 'features',
  inputs: 'storybook',
  landing: 'none',
  modals: 'storybook',
  okrs: 'creations',
  'papi-jump': 'games',
  paragraphs: 'storybook',
  'pinch-spread': 'features',
  questionnaire: 'creations',
  'recycler-flatList': 'features',
  'search-bar': 'features',
  'skeleton-loader': 'features',
  'slot-machine': 'games',
  snake: 'games',
  startup: 'creations',
  'swipe-feed': 'features',
  themes: 'storybook',
  'tic-tac-toe': 'games',
  tinder: 'creations',
  'weekend-planner': 'creations',
};

type NavParams = Record<string, undefined>;

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
  { creations: [], features: [], games: [], none: [], storybook: [] },
);
