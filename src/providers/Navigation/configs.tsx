import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import {Icon} from '../../components';
import {useColor} from './../../hooks/useColor/index';

// TODO: remove for hook
export const rootScreenOptions: StackNavigationOptions = {
  cardOverlayEnabled: true,
  presentation: Platform.OS === 'web' ? 'card' : 'transparentModal',
  headerShown: false,
  ...TransitionPresets.ModalFadeTransition,
};

type TabIcons = {[key: string]: {focused: string; unFocused: string}};
type NavOptions = {route: RouteProp<ParamListBase>};

type UseNavScreenOptions = {
  modalScreenOptions: StackNavigationOptions;
  tabScreenOptions: (
    tabIcons: TabIcons,
  ) => (screenOptions: NavOptions) => BottomTabNavigationOptions;
};

export const useNavScreenOptions = (): UseNavScreenOptions => {
  const color = useColor();

  const modalScreenOptions: StackNavigationOptions = rootScreenOptions;

  const tabScreenOptions = useCallback(
    tabIcons =>
      ({route}: NavOptions): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarIcon: function tabBarIcon({focused, size}) {
          const iconColor = focused ? 'primaryA' : 'tertiary';
          const key = focused ? 'focused' : 'unFocused';
          const name = tabIcons[route.name][key];
          return <Icon color={iconColor} name={name} size={size} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.text.primaryA,
        tabBarInactiveTintColor: color.text.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: color.background.primaryA},
      }),
    [color.background.primaryA, color.text.primaryA, color.text.tertiary],
  );

  return {modalScreenOptions, tabScreenOptions};
};
