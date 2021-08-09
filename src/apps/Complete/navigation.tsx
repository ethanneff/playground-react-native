import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {
  rootScreenOptions,
  useNavScreenOptions,
} from '../../providers/Navigation/configs';
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

const tabIcons = {
  plan: {focused: 'pencil-plus-outline', unFocused: 'pencil-plus-outline'},
  implement: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'finance', unFocused: 'finance'},
  account: {focused: 'account', unFocused: 'account'},
};

const TabStack = createBottomTabNavigator<HomeStackRoutes>();
const Home = () => {
  const {tabScreenOptions} = useNavScreenOptions();
  return (
    <TabStack.Navigator screenOptions={tabScreenOptions({tabIcons})}>
      <TabStack.Screen component={Capture} name="plan" />
      <TabStack.Screen component={Implement} name="implement" />
      <TabStack.Screen component={Reflect} name="reflect" />
      <TabStack.Screen component={Account} name="account" />
    </TabStack.Navigator>
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
