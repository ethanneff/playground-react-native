import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {Capture} from './Capture';
import {Focus} from './Focus';
import {Reflect} from './Reflect';

const Tab = createBottomTabNavigator();

type Tabs = 'Capture' | 'Focus' | 'Reflect' | 'Account';
type TabIcons = {
  [key in Tabs]: {focused: string; unfocused: string};
};

const tabIcons: TabIcons = {
  Capture: {focused: 'thought-bubble', unfocused: 'thought-bubble-outline'},
  Focus: {
    focused: 'checkbox-multiple-marked',
    unfocused: 'checkbox-multiple-marked-outline',
  },
  Reflect: {focused: 'file-chart', unfocused: 'file-chart-outline'},
  Account: {focused: 'account', unfocused: 'account-outline'},
};

type ScreenOptionsProps = {
  route: Route<string, Record<string, unknown> | undefined>;
};

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

export default memo(function Complete() {
  const color = useColor();
  const tabBarOptions = {
    activeTintColor: color.primary,
    inactiveTintColor: color.text,
  };
  const screenOptions = useCallback(
    ({route}: ScreenOptionsProps) => ({
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const focus = focused ? 'focused' : 'unfocused';
        const iconColor = focused ? color.primary : color.text;
        const name = (tabIcons as any)[route.name][focus];
        return <Icon color={iconColor} name={name} size={size} />;
      },
    }),
    [color],
  );
  return (
    <Tab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen component={Capture} name="Capture" />
      <Tab.Screen component={Focus} name="Focus" />
      <Tab.Screen component={Reflect} name="Reflect" />
    </Tab.Navigator>
  );
});
