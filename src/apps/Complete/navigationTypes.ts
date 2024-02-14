import {
  type StackNavigationProperty,
  type BottomTabNavigationProp as BottomTabNavigationProperty,
  type CompositeNavigationProp as CompositeNavigationProperty,
} from '../../conversions';

export type MainStackRoutes = {
  home: undefined;
  'item-detail': undefined;
};
export type LandingStackRoutes = {
  'log-in': undefined;
  'password-reset': undefined;
  'sign-up': undefined;
  welcome: undefined;
};
export type ImplementStackRoutes = {
  project: undefined;
  projects: undefined;
};
export type HomeStackRoutes = {
  account: undefined;
  implement: undefined;
  plan: undefined;
  reflect: undefined;
};

export type ImplementTabNavigation = CompositeNavigationProperty<
  StackNavigationProperty<MainStackRoutes, 'home'>,
  CompositeNavigationProperty<
    BottomTabNavigationProperty<HomeStackRoutes>,
    StackNavigationProperty<ImplementStackRoutes>
  >
>;
