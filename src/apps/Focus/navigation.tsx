import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement, useMemo} from 'react';
import {useNavScreenOptions} from '../../features';
import {
  AuthStackRoutes,
  HomeTabRoutes,
  UnAuthStackRoutes,
} from './navigationTypes';
import {Daily, Details, Hourly, Landing, Profile} from './screens';

const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<HomeTabRoutes>();

const Tabs = () => {
  const tabIcons = useMemo(
    () => ({
      hourly: {
        focused: 'format-list-bulleted',
        unFocused: 'format-list-bulleted',
      },
      daily: {
        focused: 'calendar-month',
        unFocused: 'calendar-month',
      },
      profile: {
        focused: 'account-outline',
        unFocused: 'account-outline',
      },
    }),
    [],
  );
  const {tabScreenOptions} = useNavScreenOptions();
  const screenOptions = tabScreenOptions({tabIcons});
  return (
    <TabBar.Navigator screenOptions={screenOptions}>
      <TabBar.Screen component={Hourly} name="hourly" />
      <TabBar.Screen component={Daily} name="daily" />
      <TabBar.Screen component={Profile} name="profile" />
    </TabBar.Navigator>
  );
};

export const Navigation = (): ReactElement => {
  const {modalScreenOptions} = useNavScreenOptions();
  const login = false;

  return login ? (
    <UnAuthStack.Navigator screenOptions={{}}>
      <UnAuthStack.Screen component={Landing} name="landing" />
    </UnAuthStack.Navigator>
  ) : (
    <AuthStack.Navigator screenOptions={modalScreenOptions}>
      <AuthStack.Screen component={Tabs} name="home" />
      <AuthStack.Screen component={Details} name="details" />
    </AuthStack.Navigator>
  );
};
