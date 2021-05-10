import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
export type Item = {
  title: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  zone: string;
};

export type StackParamList = {
  home: undefined;
  item: {item: Item};
};

export type ItemScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'item'
>;
export type ItemScreenRouteProp = RouteProp<StackParamList, 'item'>;
export type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'home'
>;
export type HomeScreenRouteProp = RouteProp<StackParamList, 'home'>;
