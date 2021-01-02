import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {Account} from './Account';
import {Day} from './Day';
import {Home} from './Home';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

export default memo(function ComfortZone() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Home} name="home" />
      <Stack.Screen component={Day} name="day" />
      <Stack.Screen component={Account} name="account" />
    </Stack.Navigator>
  );
});
