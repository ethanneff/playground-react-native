import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {Account} from './Account';
import {Day} from './Day';
import {Home} from './Home';
import {DeepWorkRoutes} from './types';

const noHeader = {headerShown: false};
const Stack = createStackNavigator<DeepWorkRoutes>();

export default memo(function DeepWork() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Home} name="home" />
      <Stack.Screen component={Day} name="day" />
      <Stack.Screen component={Account} name="account" />
    </Stack.Navigator>
  );
});
