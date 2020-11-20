import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {Home} from './Home';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

export default memo(function ComfortZone() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Home} name="home" />
    </Stack.Navigator>
  );
});
