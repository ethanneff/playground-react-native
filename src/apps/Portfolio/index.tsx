import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Landing} from './Landing';
import {ForgotPassword} from './ForgotPassword';
import {Login} from './Login';
import {NotFound} from './NotFound';
import {Settings} from './Settings';
import {Home} from './Home';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

export default memo(function Portfolio() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Landing} name="landing" />
      <Stack.Screen component={Login} name="login" />
      <Stack.Screen component={ForgotPassword} name="forgotPassword" />
      <Stack.Screen component={Home} name="home" />
      <Stack.Screen component={NotFound} name="notFound" />
      <Stack.Screen component={Settings} name="settings" />
    </Stack.Navigator>
  );
});
