import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from '../../conversions';
import { useNavScreenOptions, type TabIcons } from '../../features';
import { useAppSelector } from '../../redux';
import {
  Account,
  Debug,
  Download,
  ForgotPassword,
  Interval,
  IntervalDetails,
  Landing,
  Onboarding,
  Privacy,
  Progression,
  ProgressionDetails,
  SignUp,
  Terms,
} from './screens';
import {
  type AuthStackRoutes,
  type HomeTabRoutes,
  type UnAuthStackRoutes,
} from './types';

const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<HomeTabRoutes>();

const tabIcons: TabIcons = {
  account: {
    focused: 'account-outline',
    unFocused: 'account-outline',
  },
  progression: {
    focused: 'calendar-month-outline',
    unFocused: 'calendar-month-outline',
  },
  tracker: {
    focused: 'format-list-bulleted',
    unFocused: 'format-list-bulleted',
  },
};

const Tabs = () => {
  const { tabScreenListeners, tabScreenOptions } = useNavScreenOptions();
  const screenOptions = tabScreenOptions({ tabIcons, titleShown: true });

  return (
    <TabBar.Navigator
      screenListeners={tabScreenListeners}
      screenOptions={screenOptions}
    >
      <TabBar.Screen
        component={Interval}
        name="tracker"
      />
      <TabBar.Screen
        component={Progression}
        name="progression"
      />
      <TabBar.Screen
        component={Account}
        name="account"
      />
    </TabBar.Navigator>
  );
};

export const Navigation = () => {
  const { bottomScreenOptions, rightScreenOptions } = useNavScreenOptions();
  const auth = useAppSelector((state) => state.focus.auth.status);

  if (auth === 'initializing') return null;

  return auth === 'authenticated' ? (
    <AuthStack.Navigator
      initialRouteName="download"
      screenOptions={bottomScreenOptions}
    >
      <AuthStack.Screen
        component={Download}
        name="download"
      />
      <AuthStack.Screen
        component={Debug}
        name="debug"
      />
      <AuthStack.Screen
        component={Tabs}
        name="home"
      />
      <AuthStack.Screen
        component={IntervalDetails}
        name="interval-details"
      />
      <AuthStack.Screen
        component={ProgressionDetails}
        name="progression-details"
      />
    </AuthStack.Navigator>
  ) : (
    <UnAuthStack.Navigator
      initialRouteName="landing"
      screenOptions={rightScreenOptions}
    >
      <UnAuthStack.Screen
        component={Landing}
        name="landing"
      />
      <UnAuthStack.Screen
        component={Onboarding}
        name="onboarding"
      />
      <UnAuthStack.Screen
        component={SignUp}
        name="sign-up"
      />
      <UnAuthStack.Screen
        component={ForgotPassword}
        name="forgot-password"
      />
      <UnAuthStack.Screen
        component={Terms}
        name="terms"
      />
      <UnAuthStack.Screen
        component={Privacy}
        name="privacy"
      />
      <UnAuthStack.Screen
        component={Debug}
        name="debug"
      />
    </UnAuthStack.Navigator>
  );
};
