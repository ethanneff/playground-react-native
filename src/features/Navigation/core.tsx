import React, { memo, Suspense } from 'react';
import Config from 'react-native-config';
import Admin from '../../apps/Admin';
import CantHurtMe from '../../apps/CantHurtMe';
import Checklists from '../../apps/Checklists';
import ComfortZone from '../../apps/ComfortZone';
import Complete from '../../apps/Complete';
import DeepWork from '../../apps/DeepWork';
import Focus from '../../apps/Focus';
import Journal from '../../apps/Journal';
import Playground from '../../apps/Playground';
import Portfolio from '../../apps/Portfolio';
import Progress from '../../apps/Progress';
import TheOneThing from '../../apps/TheOneThing';
import { Loader } from '../../components';
import { createStackNavigator, NavigationContainer } from '../../conversions';
import { type RootRoutes } from './types';
import { useNavScreenOptions } from './useNavScreenOptions';
import { usePersistedState } from './usePersistedState';

const Stack = createStackNavigator<RootRoutes>();
const linking = {
  prefixes: ['https://app.example.com', 'eneff://'],
};

export const NavigationProvider = memo(function NavigationProvider() {
  const { initialState, isReady, onRef, onStateChange } = usePersistedState();
  const { rightScreenOptions } = useNavScreenOptions();
  const fallback = <Loader />;
  const initialRouteName = Config.APP as keyof RootRoutes;

  if (!isReady) return null;

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
          screenOptions={rightScreenOptions}
        >
          <Stack.Screen
            component={Admin}
            name="admin"
          />
          <Stack.Screen
            component={Portfolio}
            name="portfolio"
          />
          <Stack.Screen
            component={Progress}
            name="progress"
          />
          <Stack.Screen
            component={Playground}
            name="playground"
          />
          <Stack.Screen
            component={CantHurtMe}
            name="cant-hurt-me"
          />
          <Stack.Screen
            component={Checklists}
            name="checklists"
          />
          <Stack.Screen
            component={Focus}
            name="focus"
          />
          <Stack.Screen
            component={Complete}
            name="complete"
          />
          <Stack.Screen
            component={Journal}
            name="journal"
          />
          <Stack.Screen
            component={ComfortZone}
            name="comfort-zone"
          />
          <Stack.Screen
            component={TheOneThing}
            name="the-one-thing"
          />
          <Stack.Screen
            component={DeepWork}
            name="deep-work"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
});
