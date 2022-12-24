import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { Icon, IconName, Text, View } from '../../components';
import { SoundManager, StringMethods } from '../../features';
import { useColors } from '../Theme';

export type TabIcons = Record<
  string,
  { focused: IconName; unFocused: IconName }
>;
type NavOptions = {
  route: RouteProp<ParamListBase>;
};
type TabScreenOptions = {
  headerShown?: boolean;
  tabIcons: TabIcons;
  titleShown?: boolean;
};

export const useNavScreenOptions = () => {
  const colors = useColors();

  const modalScreenOptions: NativeStackNavigationOptions = {
    animation: 'fade',
    headerShown: false,
    presentation: Platform.OS === 'web' ? 'card' : 'transparentModal',
  };

  const bottomScreenOptions: NativeStackNavigationOptions = {
    animation: 'slide_from_bottom',
    headerShown: false,
  };

  const rightScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  const tabScreenOptions = useCallback(
    ({ headerShown = false, tabIcons, titleShown = false }: TabScreenOptions) =>
      ({ route }: NavOptions): BottomTabNavigationOptions => ({
        headerShown,
        tabBarActiveTintColor: colors.text.primaryA,
        tabBarHideOnKeyboard: true,
        tabBarIcon: function tabBarIcon({ focused, size }) {
          const iconColor = focused ? 'primaryA' : 'tertiary';
          const emphasis = focused ? 'default' : 'low';
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
                  bold={focused}
                  emphasis={emphasis}
                  title={title}
                  type="caption"
                />
              ) : null}
            </View>
          );
        },
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background.primaryA,
        },
      }),
    [colors.background.primaryA, colors.text.primaryA, colors.text.tertiary],
  );

  const tabScreenListeners = () => ({
    tabPress: () => SoundManager.play('tap'),
  });

  return {
    bottomScreenOptions,
    modalScreenOptions,
    rightScreenOptions,
    tabScreenListeners,
    tabScreenOptions,
  };
};
