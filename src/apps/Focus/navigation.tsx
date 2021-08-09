import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {useNavScreenOptions} from '../../providers/Navigation/configs';
import {
  AuthStackRoutes,
  HomeTabRoutes,
  UnAuthStackRoutes,
} from './navigationTypes';
import {Daily, Details, Hourly, Landing, Profile} from './screens';

const tabIcons = {
  hourly: {focused: 'pencil-plus-outline', unFocused: 'pencil-plus-outline'},
  daily: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  profile: {focused: 'finance', unFocused: 'finance'},
};
const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<HomeTabRoutes>();

export const Navigation = (): ReactElement => {
  const {tabScreenOptions, modalScreenOptions} = useNavScreenOptions();
  const login = true;

  return login ? (
    <UnAuthStack.Navigator screenOptions={modalScreenOptions}>
      <UnAuthStack.Screen component={Landing} name="landing" />
    </UnAuthStack.Navigator>
  ) : (
    <AuthStack.Navigator screenOptions={modalScreenOptions}>
      <TabBar.Navigator screenOptions={tabScreenOptions(tabIcons)}>
        <TabBar.Screen component={Hourly} name="hourly" />
        <TabBar.Screen component={Daily} name="daily" />
        <TabBar.Screen component={Profile} name="profile" />
      </TabBar.Navigator>
      <AuthStack.Screen component={Details} name="details" />
    </AuthStack.Navigator>
  );
};

// Notification.show()
// Alert.show()
// ShareSheet.show()
