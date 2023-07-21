import React from 'react';
import { createStackNavigator } from '../../conversions';
import { Home } from './Home';

const noHeader = { headerShown: false };
const Stack = createStackNavigator();

export const ComfortZone = () => (
  <Stack.Navigator screenOptions={noHeader}>
    <Stack.Screen
      component={Home}
      name="home"
    />
  </Stack.Navigator>
);
