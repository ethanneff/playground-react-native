import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Firebase, FirebaseAuthTypes } from '../../conversions';
import { TabIcons, useNavScreenOptions } from '../../features';
import {
  Account,
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
import { AuthStackRoutes, HomeTabRoutes, UnAuthStackRoutes } from './types';

const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<HomeTabRoutes>();

const tabIcons: TabIcons = {
  tracker: {
    focused: 'format-list-bulleted',
    unFocused: 'format-list-bulleted',
  },
  progression: {
    focused: 'calendar-month-outline',
    unFocused: 'calendar-month-outline',
  },
  account: {
    focused: 'account-outline',
    unFocused: 'account-outline',
  },
};

const Tabs = () => {
  const { tabScreenOptions, tabScreenListeners } = useNavScreenOptions();
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
  const { rightScreenOptions, bottomScreenOptions } = useNavScreenOptions();
  const [login, setLogin] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setLogin(user);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    return Firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  if (initializing) return null;
  return login ? (
    <AuthStack.Navigator screenOptions={bottomScreenOptions}>
      <AuthStack.Screen
        component={Tabs}
        name="home"
      />
      <AuthStack.Screen
        component={IntervalDetails}
        name="interval-details"
      />
      <AuthStack.Screen
        component={Download}
        name="download"
      />
      <AuthStack.Screen
        component={ProgressionDetails}
        name="progression-details"
      />
    </AuthStack.Navigator>
  ) : (
    <UnAuthStack.Navigator screenOptions={rightScreenOptions}>
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
    </UnAuthStack.Navigator>
  );
};
