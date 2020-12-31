import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {lazy, memo, Suspense, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Notification,
  Text,
} from '../../components';
import {rootMode, rootScreenOptions} from './configs';
import {usePersistedState} from './usePersistedState';

const Arcade = lazy(() => import('../../apps/Arcade'));
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
const AlertExample = () => {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Alert onBackgroundPress={navBack}>
      <Text title="This is a alert!" type="h3" />
      <Button center onPress={navBack} title="Dismiss" />
    </Alert>
  );
};
const NotificationExample = () => {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Notification
      onBackgroundPress={navBack}
      onCancel={navBack}
      title="this is a notification!"
    />
  );
};

const Stack = createStackNavigator();
const linking = {
  prefixes: ['https://app.example.com', 'mychat://'],
};

export const Navigation = memo(function Navigation() {
  const {initialState, isReady, onStateChange, onRef} = usePersistedState();
  const fallback = <ActivityIndicator />;

  if (!isReady) return fallback;

  // TODO: fix splash screen
  return (
    <Suspense fallback={fallback}>
      {/* <SplashScreen
        backgroundColor={color.background}
        primaryColor={color.brand}
        source={require('../../assets/line-chart.png')}> */}
      <NavigationContainer
        fallback={fallback}
        initialState={initialState}
        linking={linking}
        onStateChange={onStateChange}
        ref={onRef}>
        <Stack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
          <Stack.Screen component={Admin} name="admin" />
          <Stack.Screen component={Arcade} name="arcade" />
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
          <Stack.Screen component={NotificationExample} name="notification" />
          <Stack.Screen component={AlertExample} name="alert" />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SplashScreen> */}
    </Suspense>
  );
});
