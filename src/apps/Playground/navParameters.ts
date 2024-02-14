const routes = [
  'apple-fit',
  'apple-mask',
  'apple-stopwatch',
  'archero',
  'ball',
  'bejeweled',
  'bouncing-balls',
  'chat',
  'colors',
  'crash',
  'drag',
  'drift',
  'flappy-bird',
  'fonts',
  'fortune-wheel',
  'game-of-life',
  'infinite-images',
  'inputs',
  'landing',
  'modals',
  'okrs',
  'papi-jump',
  'paragraphs',
  'pinch-spread',
  'search-bar',
  'skeleton-loader',
  'slot-machine',
  'snake',
  'startup',
  'swipe-feed',
  'themes',
  'tic-tac-toe',
  'tinder',
  'scroll-views',
  'weekend-planner',
] as const;

const categories = [
  'features',
  'games',
  'storybook',
  'creations',
  'none',
] as const;

type Route = (typeof routes)[number];
type Category = (typeof categories)[number];
export type NavParameters = Record<Route, undefined>;

const routeCategory: Record<Route, Category> = {
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
  'scroll-views': 'storybook',
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

type LandingRoutes = { [key in Category]: string[] };

// eslint-disable-next-line unicorn/no-array-reduce
export const landingRoutes = Object.keys(routeCategory).reduce<LandingRoutes>(
  (hash, key) => {
    const category = routeCategory[key as Route];
    hash[category].push(key);
    return hash;
  },
  { creations: [], features: [], games: [], none: [], storybook: [] },
);
