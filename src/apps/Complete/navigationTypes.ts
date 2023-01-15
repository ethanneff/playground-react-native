import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { type CompositeNavigationProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  NativeStackNavigationProp<MainStackRoutes, 'home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<HomeStackRoutes>,
    NativeStackNavigationProp<ImplementStackRoutes>
  >
>;
