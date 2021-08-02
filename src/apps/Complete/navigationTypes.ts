import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type MainStackRoutes = {
  home: undefined;
  'item-detail': undefined;
};
export type LandingStackRoutes = {
  welcome: undefined;
  'sign-up': undefined;
  'log-in': undefined;
  'password-reset': undefined;
};
export type ImplementStackRoutes = {
  projects: undefined;
  project: undefined;
};
export type HomeStackRoutes = {
  plan: undefined;
  implement: undefined;
  reflect: undefined;
  account: undefined;
};

export type ImplementTabNavigation = CompositeNavigationProp<
  StackNavigationProp<MainStackRoutes, 'home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<HomeStackRoutes>,
    StackNavigationProp<ImplementStackRoutes>
  >
>;
