import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabIcons, useNavScreenOptions } from '../../features';
import { CategoryDetail, Journal, Landing, Profile, Progress } from './screens';
import { JournalDetail } from './screens/JournalDetail';
import { AuthStackRoutes, HomeTabRoutes, UnAuthStackRoutes } from './types';

const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<HomeTabRoutes>();

const tabIcons: TabIcons = {
  journal: {
    focused: 'format-list-bulleted',
    unFocused: 'format-list-bulleted',
  },
  progress: {
    focused: 'calendar-month',
    unFocused: 'calendar-month',
  },
  profile: {
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
        name="journal"
      />
      <TabBar.Screen
        component={Progress}
        name="progress"
      />
      <TabBar.Screen
        component={Profile}
        name="profile"
      />
    </TabBar.Navigator>
  );
};

export const Navigation = () => {
  const { modalScreenOptions, bottomScreenOptions } = useNavScreenOptions();
  const login = false;

  return login ? (
    <UnAuthStack.Navigator screenOptions={modalScreenOptions}>
      <UnAuthStack.Screen
        component={Landing}
        name="landing"
      />
    </UnAuthStack.Navigator>
  ) : (
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
  );
};
