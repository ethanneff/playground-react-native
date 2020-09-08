import React, {Suspense, memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColor} from '../../hooks';
import {Alert, Notification} from '../../components';
import {AdminStack} from './screens';
import {usePersistedState} from './usePersistedState';
import {rootMode, rootScreenOptions} from './configs';

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
          <Stack.Screen component={AdminStack} name="App" />
          <Stack.Screen component={Notification} name="Notification" />
          <Stack.Screen component={Alert} name="Alert" />
        </Stack.Navigator>

        {/* <Stack.Navigator>
          <Stack.Screen component={HomeScreen} name="Home" />
          <Stack.Screen component={Focus} name="focus" />
          <Stack.Screen component={Portfolio} name="portfolio" />
          <Stack.Screen
            component={PortfolioSettings}
            name="portfolioSettings"
          />
          <Stack.Screen component={PortfolioLanding} name="portfolioLanding" />
          <Stack.Screen
            component={PortfolioNotFound}
            name="portfolioNotFound"
          />
          <Stack.Screen
            component={PortfolioForgot}
            name="portfolioForgotPassword"
          />
          <Stack.Screen component={PortfolioLogin} name="portfolioLogin" />
          <Stack.Screen component={CantHurtMe} name="cantHurtMe" />
          <Stack.Screen component={TheOneThing} name="theOneThing" />
          <Stack.Screen component={Journal} name="journal" />
          <Stack.Screen component={Activity} name="activity" />

          <Stack.Screen component={Checklists} name="checklists" />
          <Stack.Screen component={ChecklistsList} name="checklistsList" />
          <Stack.Screen
            component={ChecklistsListCreate}
            name="checklistsListCreate"
          />
          <Stack.Screen
            component={ChecklistsListUpdate}
            name="checklistsListUpdate"
          />
          <Stack.Screen
            component={ChecklistsItemCreate}
            name="checklistsItemCreate"
          />
          <Stack.Screen
            component={ChecklistsItemUpdate}
            name="checklistsItemUpdate"
          />
          <Stack.Screen component={GamesFlappyBird} name="gamesFlappyBird" />
          <Stack.Screen component={GamesSnake} name="gamesSnake" />
          <Stack.Screen component={GamesPapiJump} name="gamesPapiJump" />
          <Stack.Screen component={GamesArchero} name="gamesArchero" />
        </Stack.Navigator> */}
      </NavigationContainer>
    </Suspense>
  );
});
