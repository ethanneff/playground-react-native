import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {ReactElement, useCallback} from 'react';
import {Icon} from '../../components';
import {useColor} from '../../hooks';
import {rootScreenOptions} from '../../providers/Navigation/configs';
import {
  HomeStackRoutes,
  ImplementStackRoutes,
  LandingStackRoutes,
  MainStackRoutes,
} from './navigationTypes';
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
  [key in keyof HomeStackRoutes]: {focused: string; unFocused: string};
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

  const screenOptions = useCallback(
    ({route}) => ({
      headerShown: false,
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const iconColor = focused ? 'primaryA' : 'tertiary';
        const key = focused ? 'focused' : 'unFocused';
        const name = (tabIcons as any)[route.name][key];
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

  return {screenOptions};
};

const HomeStack = createBottomTabNavigator<HomeStackRoutes>();
const Home = () => {
  const {screenOptions} = useTabs();
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen component={Capture} name="plan" />
      <HomeStack.Screen component={Implement} name="implement" />
      <HomeStack.Screen component={Reflect} name="reflect" />
      <HomeStack.Screen component={Account} name="account" />
    </HomeStack.Navigator>
  );
};

const ImplementStack = createStackNavigator<ImplementStackRoutes>();
const Implement = () => {
  useTabTap();
  return (
    <ImplementStack.Navigator screenOptions={noHeader}>
      <ImplementStack.Screen component={Projects} name="projects" />
      <ImplementStack.Screen component={Project} name="project" />
    </ImplementStack.Navigator>
  );
};

const LandingStack = createStackNavigator<LandingStackRoutes>();
export const Landing = (): ReactElement => {
  return (
    <LandingStack.Navigator screenOptions={rootScreenOptions}>
      <LandingStack.Screen component={Welcome} name="welcome" />
      <LandingStack.Screen component={SignUp} name="sign-up" />
      <LandingStack.Screen component={LogIn} name="log-in" />
      <LandingStack.Screen component={PasswordReset} name="password-reset" />
    </LandingStack.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackRoutes>();
export const Main = (): ReactElement => {
  return (
    <MainStack.Navigator screenOptions={rootScreenOptions}>
      <MainStack.Screen component={Home} name="home" />
      <MainStack.Screen component={ItemDetail} name="item-detail" />
    </MainStack.Navigator>
  );
};
