import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { lazy, memo, Suspense } from 'react';
import Config from 'react-native-config';
import { Loader } from '../../components';
import { RootRoutes } from './types';
import { useNavScreenOptions } from './useNavScreenOptions';
import { usePersistedState } from './usePersistedState';

const Portfolio = lazy(() => import('../../apps/Portfolio'));
const Playground = lazy(() => import('../../apps/Playground'));
const Admin = lazy(() => import('../../apps/Admin'));
const Progress = lazy(() => import('../../apps/Progress'));
const CantHurtMe = lazy(() => import('../../apps/CantHurtMe'));
const Checklists = lazy(() => import('../../apps/Checklists'));
const Focus = lazy(() => import('../../apps/Focus'));
const Journal = lazy(() => import('../../apps/Journal'));
const ComfortZone = lazy(() => import('../../apps/ComfortZone'));
const TheOneThing = lazy(() => import('../../apps/TheOneThing'));
const Complete = lazy(() => import('../../apps/Complete'));
const DeepWork = lazy(() => import('../../apps/DeepWork'));

const Stack = createStackNavigator<RootRoutes>();
const linking = {
  prefixes: ['https://app.example.com', 'mychat://'],
};

export const NavigationProvider = memo(function NavigationProvider() {
  const { initialState, isReady, onStateChange, onRef } = usePersistedState();
  const { modalScreenOptions } = useNavScreenOptions();
  const fallback = <Loader />;
  const initialRouteName = Config.APP as keyof RootRoutes;

  if (!isReady) return fallback;

  return (
    <Suspense fallback={fallback}>
      <NavigationContainer
        fallback={fallback}
        initialState={initialState}
        linking={linking}
        onStateChange={onStateChange}
        ref={onRef}
      >
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={modalScreenOptions}
        >
          <Stack.Screen component={Admin} name="admin" />
          <Stack.Screen component={Portfolio} name="portfolio" />
          <Stack.Screen component={Progress} name="progress" />
          <Stack.Screen component={Playground} name="playground" />
          <Stack.Screen component={CantHurtMe} name="cant-hurt-me" />
          <Stack.Screen component={Checklists} name="checklists" />
          <Stack.Screen component={Focus} name="focus" />
          <Stack.Screen component={Complete} name="complete" />
          <Stack.Screen component={Journal} name="journal" />
          <Stack.Screen component={ComfortZone} name="comfort-zone" />
          <Stack.Screen component={TheOneThing} name="the-one-thing" />
          <Stack.Screen component={DeepWork} name="deep-work" />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
});
