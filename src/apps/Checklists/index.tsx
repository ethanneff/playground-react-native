import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {Home} from './Home';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

// TODO: remove unused checklist screens and redux

export default memo(function Checklists() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Home} name="home" />
    </Stack.Navigator>
  );
});
