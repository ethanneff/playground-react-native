import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {Archero} from './Archero';
import {FlappyBird} from './FlappyBird';
import {Landing} from './Landing';
import {PapiJump} from './PapiJump';
import {Snake} from './Snake';
import {TicTacToe} from './TicTacToe';
import {StackParams} from './types';

const noHeader = {headerShown: false};
const Stack = createStackNavigator<StackParams>();

export default memo(function Games() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Landing} name="landing" />
      <Stack.Screen component={FlappyBird} name="flappy-bird" />
      <Stack.Screen component={Snake} name="snake" />
      <Stack.Screen component={PapiJump} name="papi-jump" />
      <Stack.Screen component={Archero} name="archero" />
    </Stack.Navigator>
  );
});
