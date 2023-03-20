import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home } from './Home';

const noHeader = { headerShown: false };
const Stack = createNativeStackNavigator();

const CantHurtMe = () => {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen
        component={Home}
        name="home"
      />
    </Stack.Navigator>
  );
};
export default CantHurtMe;
