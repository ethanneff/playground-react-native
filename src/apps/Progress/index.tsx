import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Home } from './Home';

const noHeader = { headerShown: false };
const Stack = createNativeStackNavigator();

export default memo(function Activity() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen
        component={Home}
        name="home"
      />
    </Stack.Navigator>
  );
});
