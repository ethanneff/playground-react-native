import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Platform, View } from 'react-native';
import { Icon, IconName, Text } from '../../components';
import { StringMethods } from '../../features';
import { useColors } from '../Theme';

export type TabIcons = {
  [key: string]: { focused: IconName; unFocused: IconName };
};
type NavOptions = { route: RouteProp<ParamListBase> };
type TabScreenOptions = {
  headerShown?: boolean;
  tabIcons: TabIcons;
  titleShown?: boolean;
};

type UseNavScreenOptions = {
  bottomScreenOptions: StackNavigationOptions;
  modalScreenOptions: StackNavigationOptions;
  tabScreenOptions: (
    options: TabScreenOptions,
  ) => (screenOptions: NavOptions) => BottomTabNavigationOptions;
};

export const useNavScreenOptions = (): UseNavScreenOptions => {
  const colors = useColors();

  const modalScreenOptions: StackNavigationOptions = {
    cardOverlayEnabled: true,
    presentation: Platform.OS === 'web' ? 'card' : 'transparentModal',
    headerShown: false,
    ...TransitionPresets.ModalFadeTransition,
  };

  const bottomScreenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  };

  const tabScreenOptions = useCallback(
    ({ tabIcons, headerShown = false, titleShown = false }: TabScreenOptions) =>
      ({ route }: NavOptions): BottomTabNavigationOptions => ({
        headerShown,
        tabBarIcon: function tabBarIcon({ focused, size }) {
          const iconColor = focused ? 'primaryA' : 'tertiary';
          const emphasis = focused ? 'none' : 'low';
          const key = focused ? 'focused' : 'unFocused';
          const name = tabIcons[route.name][key];
          const title = StringMethods.capitalize(route.name);
          return (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Icon
                color={iconColor}
                name={name}
                size={size}
              />
              {titleShown ? (
                <Text
                  emphasis={emphasis}
                  title={title}
                  type="caption"
                />
              ) : null}
            </View>
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.text.primaryA,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background.primaryA,
        },
      }),
    [colors.background.primaryA, colors.text.primaryA, colors.text.tertiary],
  );

  return { modalScreenOptions, tabScreenOptions, bottomScreenOptions };
};
