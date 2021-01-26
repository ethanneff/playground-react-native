import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {ReactElement, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {rootMode, rootScreenOptions} from '../../providers/Navigation/configs';
import {
  HomeStackParams,
  ImplementStackParams,
  LandingStackParams,
  MainStackParams,
} from './navigation-types';
import {
  Account,
  Capture,
  ItemDetail,
  LogIn,
  PasswordReset,
  Project,
  Projects,
  Reflect,
  SignUp,
  Welcome,
} from './screens';
import {useTabTap} from './utils';

const noHeader: StackNavigationOptions = {headerShown: false};
type TabIcons = {
  [key in keyof HomeStackParams]: {focused: string; unFocused: string};
};

const tabIcons: TabIcons = {
  plan: {focused: 'pencil-plus-outline', unFocused: 'pencil-plus-outline'},
  implement: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'finance', unFocused: 'finance'},
  account: {focused: 'account', unFocused: 'account'},
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
    ({route}) => ({
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

const HomeStack = createBottomTabNavigator<HomeStackParams>();
const Home = () => {
  const {tabBarOptions, screenOptions} = useTabs();
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}>
      <HomeStack.Screen component={Capture} name="plan" />
      <HomeStack.Screen component={Implement} name="implement" />
      <HomeStack.Screen component={Reflect} name="reflect" />
      <MainStack.Screen component={Account} name="account" />
    </HomeStack.Navigator>
  );
};

const ImplementStack = createStackNavigator<ImplementStackParams>();
const Implement = () => {
  useTabTap();
  return (
    <ImplementStack.Navigator screenOptions={noHeader}>
      <ImplementStack.Screen component={Projects} name="projects" />
      <ImplementStack.Screen component={Project} name="project" />
    </ImplementStack.Navigator>
  );
};

const LandingStack = createStackNavigator<LandingStackParams>();
export const Landing = (): ReactElement => {
  return (
    <LandingStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <LandingStack.Screen component={Welcome} name="welcome" />
      <LandingStack.Screen component={SignUp} name="sign-up" />
      <LandingStack.Screen component={LogIn} name="log-in" />
      <LandingStack.Screen component={PasswordReset} name="password-reset" />
    </LandingStack.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParams>();
export const Main = (): ReactElement => {
  return (
    <MainStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <MainStack.Screen component={Home} name="home" />
      <MainStack.Screen component={ItemDetail} name="item-detail" />
    </MainStack.Navigator>
  );
};
