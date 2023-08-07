/* eslint-disable no-restricted-imports */
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  useIsFocused,
  useNavigation,
  useRoute,
  type CompositeNavigationProp,
  type NavigationContainerRef,
  type InitialState as NavigationInitialState,
  type NavigationState,
  type ParamListBase,
  type RouteProp,
} from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator as createStackNavigator,
  type NativeStackNavigationOptions as StackNavigationOptions,
  type NativeStackNavigationProp as StackNavigationProp,
} from '@react-navigation/native-stack';
/* eslint-enable no-restricted-imports */

export type {
  NavigationInitialState,
  NavigationContainerRef,
  NavigationState,
  BottomTabNavigationProp,
  CompositeNavigationProp,
  BottomTabNavigationOptions,
  ParamListBase,
  RouteProp,
  StackNavigationProp,
  StackNavigationOptions,
};
export {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationContainer,
  useIsFocused,
  useNavigation,
  useRoute,
};