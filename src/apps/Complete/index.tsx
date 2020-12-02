import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {Account} from './Account';
import {Capture} from './Capture';
import {Focus} from './Focus';
import {Prioritize} from './Prioritize';
import {Reflect} from './Reflect';

const Tab = createBottomTabNavigator();

const tabIcons: any = {
  capture: {focused: 'thought-bubble', unfocused: 'thought-bubble-outline'},
  prioritize: {focused: 'bullseye-arrow', unfocused: 'bullseye'},
  focus: {
    focused: 'checkbox-multiple-marked',
    unfocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'timer-sand-full', unfocused: 'timer-sand-empty'},
  account: {focused: 'account', unfocused: 'account-outline'},
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
    activeTintColor: color.brand,
    inactiveTintColor: color.text,
  };
  const screenOptions = useCallback(
    ({route}: ScreenOptionsProps) => ({
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const focus = focused ? 'focused' : 'unfocused';
        const iconColor = focused ? color.brand : color.text;
        const name = tabIcons[route.name][focus];
        return <Icon color={iconColor} name={name} size={size} />;
      },
    }),
    [color],
  );
  return (
    <Tab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen component={Capture} name="capture" />
      <Tab.Screen component={Prioritize} name="prioritize" />
      <Tab.Screen component={Focus} name="focus" />
      <Tab.Screen component={Reflect} name="reflect" />
      <Tab.Screen component={Account} name="account" />
    </Tab.Navigator>
  );
});
