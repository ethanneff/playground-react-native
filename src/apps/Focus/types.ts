import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type Item = {
  title: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  zone: string;
};

export type AuthStackRoutes = {
  home: undefined;
  details: { item: Item };
};
export type UnAuthStackRoutes = {
  landing: undefined;
};

export type HomeTabRoutes = {
  hourly: undefined;
  daily: undefined;
  profile: undefined;
};

export type ItemScreenNavigationProp = StackNavigationProp<
  AuthStackRoutes,
  'details'
>;
export type ItemScreenRouteProp = RouteProp<AuthStackRoutes, 'details'>;
export type HomeScreenNavigationProp = StackNavigationProp<
  AuthStackRoutes,
  'home'
>;
export type HomeScreenRouteProp = RouteProp<AuthStackRoutes, 'home'>;
