/* eslint-disable no-restricted-imports */
export {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
export {
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

export { NavigationContainer } from '@react-navigation/native';
export {
  createNativeStackNavigator as createStackNavigator,
  type NativeStackNavigationOptions as StackNavigationOptions,
  type NativeStackNavigationProp as StackNavigationProperty,
} from '@react-navigation/native-stack';
/* eslint-enable no-restricted-imports */
