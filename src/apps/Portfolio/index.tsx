import React from 'react';
import { createStackNavigator } from '../../conversions';
import { ForgotPassword } from './ForgotPassword';
import { Home } from './Home';
import { Landing } from './Landing';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { Settings } from './Settings';
import { type PortfolioRoutes } from './types';

const noHeader = { headerShown: false };
const Stack = createStackNavigator<PortfolioRoutes>();

export const Portfolio = () => (
  <Stack.Navigator screenOptions={noHeader}>
    <Stack.Screen
      component={Landing}
      name="landing"
    />
    <Stack.Screen
      component={Login}
      name="login"
    />
    <Stack.Screen
      component={ForgotPassword}
      name="forgotPassword"
    />
    <Stack.Screen
      component={Home}
      name="home"
    />
    <Stack.Screen
      component={NotFound}
      name="notFound"
    />
    <Stack.Screen
      component={Settings}
      name="settings"
    />
  </Stack.Navigator>
);
