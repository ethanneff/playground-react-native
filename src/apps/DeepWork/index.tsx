import React from 'react';
import { createStackNavigator } from '../../conversions';
import { Account } from './Account';
import { Day } from './Day';
import { Home } from './Home';
import { type DeepWorkRoutes } from './types';

const noHeader = { headerShown: false };
const Stack = createStackNavigator<DeepWorkRoutes>();

export const DeepWork = () => (
  <Stack.Navigator screenOptions={noHeader}>
    <Stack.Screen
      component={Home}
      name="home"
    />
    <Stack.Screen
      component={Day}
      name="day"
    />
    <Stack.Screen
      component={Account}
      name="account"
    />
  </Stack.Navigator>
);
