import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Firebase } from '../../conversions';
import { FirebaseAuthTypes } from '../../conversions/Firebase';
import { TabIcons, useNavScreenOptions } from '../../features';
import {
  CategoryDetail,
  Journal,
  Landing,
  Onboarding,
  Profile,
  Progress,
  SignUp,
} from './screens';
import { JournalDetail } from './screens/JournalDetail';
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
        component={Journal}
        name="tracker"
      />
      <TabBar.Screen
        component={Progress}
        name="progression"
      />
      <TabBar.Screen
        component={Profile}
        name="account"
      />
    </TabBar.Navigator>
  );
};

export const Navigation = () => {
  const { modalScreenOptions, bottomScreenOptions } = useNavScreenOptions();
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
        component={JournalDetail}
        name="journal-detail"
      />
      <AuthStack.Screen
        component={CategoryDetail}
        name="category-detail"
      />
    </AuthStack.Navigator>
  ) : (
    <UnAuthStack.Navigator screenOptions={modalScreenOptions}>
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
        name="signup"
      />
    </UnAuthStack.Navigator>
  );
};
