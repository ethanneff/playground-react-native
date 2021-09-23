import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home';

const noHeader = { headerShown: false };
const Stack = createStackNavigator();

export default memo(function TheOneThing() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Home} name="home" />
    </Stack.Navigator>
  );
});
