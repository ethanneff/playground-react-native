import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

export type ImplementTabNavigation = CompositeNavigationProp<
  StackNavigationProp<MainStackRoutes, 'home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<HomeStackRoutes>,
    StackNavigationProp<ImplementStackRoutes>
  >
>;
