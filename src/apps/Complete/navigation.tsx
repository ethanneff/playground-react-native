import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import { type TabIcons, useNavScreenOptions } from '../../features';
import {
  type HomeStackRoutes,
  type ImplementStackRoutes,
  type LandingStackRoutes,
  type MainStackRoutes,
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

const noHeader: NativeStackNavigationOptions = { headerShown: false };

const tabIcons: TabIcons = {
  account: { focused: 'account', unFocused: 'account' },
  implement: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  plan: { focused: 'pencil-plus-outline', unFocused: 'pencil-plus-outline' },
  reflect: { focused: 'finance', unFocused: 'finance' },
};

const ImplementStack = createNativeStackNavigator<ImplementStackRoutes>();
const Implement = () => {
  return (
    <ImplementStack.Navigator screenOptions={noHeader}>
      <ImplementStack.Screen
        component={Projects}
        name="projects"
      />
      <ImplementStack.Screen
        component={Project}
        name="project"
      />
    </ImplementStack.Navigator>
  );
};

const TabStack = createBottomTabNavigator<HomeStackRoutes>();
const Home = () => {
  const { tabScreenListeners, tabScreenOptions } = useNavScreenOptions();
  return (
    <TabStack.Navigator
      screenListeners={tabScreenListeners}
      screenOptions={tabScreenOptions({ tabIcons })}
    >
      <TabStack.Screen
        component={Capture}
        name="plan"
      />
      <TabStack.Screen
        component={Implement}
        name="implement"
      />
      <TabStack.Screen
        component={Reflect}
        name="reflect"
      />
      <TabStack.Screen
        component={Account}
        name="account"
      />
    </TabStack.Navigator>
  );
};

const LandingStack = createNativeStackNavigator<LandingStackRoutes>();
export const Landing = () => {
  const { modalScreenOptions } = useNavScreenOptions();
  return (
    <LandingStack.Navigator screenOptions={modalScreenOptions}>
      <LandingStack.Screen
        component={Welcome}
        name="welcome"
      />
      <LandingStack.Screen
        component={SignUp}
        name="sign-up"
      />
      <LandingStack.Screen
        component={LogIn}
        name="log-in"
      />
      <LandingStack.Screen
        component={PasswordReset}
        name="password-reset"
      />
    </LandingStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator<MainStackRoutes>();
export const Main = () => {
  const { modalScreenOptions } = useNavScreenOptions();
  return (
    <MainStack.Navigator screenOptions={modalScreenOptions}>
      <MainStack.Screen
        component={Home}
        name="home"
      />
      <MainStack.Screen
        component={ItemDetail}
        name="item-detail"
      />
    </MainStack.Navigator>
  );
};
