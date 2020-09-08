import React, {Suspense, lazy, memo} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColor} from '../../hooks';
import {Alert, Notification} from '../../components';
import {usePersistedState} from './usePersistedState';
import {rootMode, rootScreenOptions} from './configs';

const Games = lazy(() => import('../../apps/Arcade'));
const Portfolio = lazy(() => import('../../apps/Portfolio'));

const Loading = memo(function NavigationLoading() {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator color={color.dark} size="large" />
    </View>
  );
});

const Stack = createStackNavigator();
const linking = {
  prefixes: ['https://app.example.com', 'mychat://'],
};

const Home = () => {
  const nav = useNavigation();
  return (
    <View>
      <Text>hello</Text>
      <Button
        onPress={() => nav.navigate('notification')}
        title="notification"
      />
      <Button onPress={() => nav.navigate('alert')} title="alert" />
      <Button onPress={() => nav.navigate('games')} title="games" />
      <Button onPress={() => nav.navigate('portfolio')} title="portfolio" />
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
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <NavigationContainer
        fallback={<Loading />}
        initialState={initialState}
        linking={linking}
        onStateChange={onStateChange}
        ref={onRef}>
        <Stack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
          <Stack.Screen component={HomeStack} name="app" />
          <Stack.Screen component={Games} name="games" />
          <Stack.Screen component={Portfolio} name="portfolio" />
          <Stack.Screen component={Notification} name="notification" />
          <Stack.Screen component={Alert} name="alert" />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
});
