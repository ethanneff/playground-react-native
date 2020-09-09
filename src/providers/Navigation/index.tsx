import React, {Suspense, lazy, memo, useCallback} from 'react';
import {View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Alert,
  Button,
  Notification,
  Text,
} from '../../components';
import {usePersistedState} from './usePersistedState';
import {rootMode, rootScreenOptions} from './configs';

const Games = lazy(() => import('../../apps/Arcade'));
const Portfolio = lazy(() => import('../../apps/Portfolio'));
const Playground = lazy(() => import('../../apps/Playground'));

const Stack = createStackNavigator();
const linking = {
  prefixes: ['https://app.example.com', 'mychat://'],
};

const Home = () => {
  const {navigate} = useNavigation();
  const onPress = useCallback((to: string) => () => navigate(to), [navigate]);
  return (
    <View>
      <Text title="hello" />
      <Button onPress={onPress('notification')} title="notification" />
      <Button onPress={onPress('alert')} title="alert" />
      <Button onPress={onPress('games')} title="games" />
      <Button onPress={onPress('portfolio')} title="portfolio" />
      <Button onPress={onPress('playground')} title="playground" />
    </View>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="home" />
    </Stack.Navigator>
  );
};

export const Navigation = memo(function Navigation() {
  const {initialState, isReady, onStateChange, onRef} = usePersistedState();

  return !isReady ? (
    <ActivityIndicator />
  ) : (
    <Suspense fallback={<ActivityIndicator />}>
      <NavigationContainer
        fallback={<ActivityIndicator />}
        initialState={initialState}
        linking={linking}
        onStateChange={onStateChange}
        ref={onRef}>
        <Stack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
          <Stack.Screen component={HomeStack} name="app" />
          <Stack.Screen component={Games} name="games" />
          <Stack.Screen component={Portfolio} name="portfolio" />
          <Stack.Screen component={Playground} name="playground" />
          <Stack.Screen component={Notification} name="notification" />
          <Stack.Screen component={Alert} name="alert" />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
});
