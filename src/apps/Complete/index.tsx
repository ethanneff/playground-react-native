import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {memo, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {Account, Capture, Project, Projects, Reflect} from './screens';

const noHeader: StackNavigationOptions = {headerShown: false};
const RootTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

type Tabs = 'Capture' | 'Focus' | 'Reflect' | 'Account';
type TabIcons = {
  [key in Tabs]: {focused: string; unfocused: string};
};

const tabIcons: TabIcons = {
  Capture: {
    focused: 'pencil-plus-outline',
    unfocused: 'pencil-plus-outline',
  },
  Focus: {
    focused: 'checkbox-multiple-marked-outline',
    unfocused: 'checkbox-multiple-marked-outline',
  },
  Reflect: {focused: 'finance', unfocused: 'finance'},
  Account: {focused: 'account', unfocused: 'account-outline'},
};

type ScreenOptionsProps = {
  route: Route<string, Record<string, unknown> | undefined>;
};

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

const Focus = () => {
  return (
    <ProjectsStack.Navigator screenOptions={noHeader}>
      <ProjectsStack.Screen component={Projects} name="Projects" />
      <ProjectsStack.Screen component={Project} name="Project" />
    </ProjectsStack.Navigator>
  );
};

const Tabs = () => {
  const color = useColor();
  const tabBarOptions: BottomTabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: color.primary,
    inactiveTintColor: color.text,
    showLabel: false,
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
    <RootTab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <RootTab.Screen component={Capture} name="Capture" />
      <RootTab.Screen component={Focus} name="Focus" />
      <RootTab.Screen component={Reflect} name="Reflect" />
    </RootTab.Navigator>
  );
};

export default memo(function Complete() {
  return (
    <RootStack.Navigator screenOptions={noHeader}>
      <RootStack.Screen component={Tabs} name="main" />
      <RootStack.Screen component={Account} name="account" />
    </RootStack.Navigator>
  );
});
