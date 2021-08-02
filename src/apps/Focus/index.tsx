import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {rootScreenOptions} from '../../providers/Navigation/configs';
import {Home} from './Home';
import {ItemDetails} from './ItemDetails';
import {StackParamList} from './types';

const Stack = createStackNavigator<StackParamList>();

export default memo(function Focus() {
  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      <Stack.Screen component={Home} name="home" />
      <Stack.Screen component={ItemDetails} name="item" />
    </Stack.Navigator>
  );
});
