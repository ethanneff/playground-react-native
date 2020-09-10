import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PapiJump} from './PapiJump';
import {Archero} from './Archero';
import {Landing} from './Landing';
import {Snake} from './Snake';
import {FlappyBird} from './FlappyBird';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

export default memo(function Games() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Landing} name="landing" />
      <Stack.Screen component={FlappyBird} name="flappyBird" />
      <Stack.Screen component={Snake} name="snake" />
      <Stack.Screen component={PapiJump} name="papiJump" />
      <Stack.Screen component={Archero} name="archero" />
    </Stack.Navigator>
  );
});
