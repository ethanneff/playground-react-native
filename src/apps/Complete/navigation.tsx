import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {ReactElement, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {rootMode, rootScreenOptions} from '../../providers/Navigation/configs';
import {
  Account,
  Capture,
  ItemDetail,
  LogIn,
  Project,
  Projects,
  Reflect,
  SignUp,
  Welcome,
} from './screens';

const noHeader: StackNavigationOptions = {headerShown: false};
const RootTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

type Tabs = 'plan' | 'implement' | 'reflect';
type TabIcons = {[key in Tabs]: {focused: string; unFocused: string}};

const tabIcons: TabIcons = {
  plan: {
    focused: 'pencil-plus-outline',
    unFocused: 'pencil-plus-outline',
  },
  implement: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'finance', unFocused: 'finance'},
};

type ScreenOptionsProps = {
  route: Route<string, Record<string, unknown> | undefined>;
};

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

const useTabs = () => {
  const color = useColor();
  const tabBarOptions: BottomTabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: color.text,
    inactiveTintColor: color.secondary,
    showLabel: false,
  };
  const screenOptions = useCallback(
    ({route}: ScreenOptionsProps) => ({
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const key = focused ? 'focused' : 'unFocused';
        const iconColor = focused ? color.text : color.secondary;
        const name = (tabIcons as any)[route.name][key];
        return <Icon color={iconColor} name={name} size={size} />;
      },
    }),
    [color],
  );

  return {tabBarOptions, screenOptions};
};

const TabStack = (): ReactElement => {
  const {tabBarOptions, screenOptions} = useTabs();
  return (
    <RootTab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <RootTab.Screen component={Capture} name="plan" />
      <RootTab.Screen component={ImplementStack} name="implement" />
      <RootTab.Screen component={Reflect} name="reflect" />
    </RootTab.Navigator>
  );
};

const ImplementStack = (): ReactElement => {
  return (
    <ProjectsStack.Navigator screenOptions={noHeader}>
      <ProjectsStack.Screen component={Projects} name="projects" />
      <ProjectsStack.Screen component={Project} name="project" />
    </ProjectsStack.Navigator>
  );
};

export const LandingStack = (): ReactElement => {
  return (
    <RootStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <RootTab.Screen component={Welcome} name="welcome" />
      <RootTab.Screen component={SignUp} name="sign-up" />
      <RootTab.Screen component={LogIn} name="log-in" />
    </RootStack.Navigator>
  );
};

export const HomeStack = (): ReactElement => {
  return (
    <RootStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <RootStack.Screen component={TabStack} name="home" />
      <RootStack.Screen component={Account} name="account" />
      <RootStack.Screen component={ItemDetail} name="item-detail" />
    </RootStack.Navigator>
  );
};
