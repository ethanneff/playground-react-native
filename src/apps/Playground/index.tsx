import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import {
  Colors,
  Fonts,
  Inputs,
  Modals,
  Paragraphs,
  Themes,
} from './Components';
import {
  AppleFit,
  AppleMask,
  AppleStopWatch,
  Ball,
  Drag,
  OKRs,
  Questionnaire,
  Startup,
  Tinder,
  WeekendPlanner,
} from './Creations';
import {
  BouncingBalls,
  Chat,
  ImageCollection,
  KeyboardScroll,
  PinchSpread,
  SearchBar,
  SkeletonLoading,
  SwipeFeed,
} from './Features';
import {
  Archero,
  Bejeweled,
  Crash,
  Drift,
  FlappyBird,
  FortuneWheel,
  GameOfLife,
  PapiJump,
  SlotMachine,
  Snake,
  TicTacToe,
} from './Games';
import { Landing } from './Landing';
import { NavParams } from './navParams';

const noHeader = { headerShown: false };
const Stack = createNativeStackNavigator<NavParams>();

export default memo(function Games() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen
        component={Landing}
        name="landing"
      />
      {/* storybook */}
      <Stack.Screen
        component={Colors}
        name="colors"
      />
      <Stack.Screen
        component={Themes}
        name="themes"
      />
      <Stack.Screen
        component={Fonts}
        name="fonts"
      />
      <Stack.Screen
        component={Paragraphs}
        name="paragraphs"
      />
      <Stack.Screen
        component={Inputs}
        name="inputs"
      />
      <Stack.Screen
        component={Modals}
        name="modals"
      />

      {/* games */}
      <Stack.Screen
        component={PapiJump}
        name="papi-jump"
      />
      <Stack.Screen
        component={Snake}
        name="snake"
      />
      <Stack.Screen
        component={Archero}
        name="archero"
      />
      <Stack.Screen
        component={Crash}
        name="crash"
      />
      <Stack.Screen
        component={FlappyBird}
        name="flappy-bird"
      />
      <Stack.Screen
        component={TicTacToe}
        name="tic-tac-toe"
      />
      <Stack.Screen
        component={GameOfLife}
        name="game-of-life"
      />
      <Stack.Screen
        component={Bejeweled}
        name="bejeweled"
      />
      <Stack.Screen
        component={SlotMachine}
        name="slot-machine"
      />
      <Stack.Screen
        component={FortuneWheel}
        name="fortune-wheel"
      />
      <Stack.Screen
        component={Drift}
        name="drift"
      />

      {/* features */}
      <Stack.Screen
        component={Chat}
        name="chat"
      />
      <Stack.Screen
        component={ImageCollection}
        name="infinite-images"
      />
      <Stack.Screen
        component={SkeletonLoading}
        name="skeleton-loader"
      />
      <Stack.Screen
        component={KeyboardScroll}
        name="recycler-flatList"
      />
      <Stack.Screen
        component={SearchBar}
        name="search-bar"
      />
      <Stack.Screen
        component={SwipeFeed}
        name="swipe-feed"
      />
      <Stack.Screen
        component={BouncingBalls}
        name="bouncing-balls"
      />
      <Stack.Screen
        component={PinchSpread}
        name="pinch-spread"
      />

      {/* creations */}
      <Stack.Screen
        component={WeekendPlanner}
        name="weekend-planner"
      />
      <Stack.Screen
        component={Ball}
        name="ball"
      />
      <Stack.Screen
        component={Drag}
        name="drag"
      />
      <Stack.Screen
        component={OKRs}
        name="okrs"
      />
      <Stack.Screen
        component={Startup}
        name="startup"
      />
      <Stack.Screen
        component={Questionnaire}
        name="questionnaire"
      />
      <Stack.Screen
        component={AppleMask}
        name="apple-mask"
      />
      <Stack.Screen
        component={AppleStopWatch}
        name="apple-stopwatch"
      />
      <Stack.Screen
        component={AppleFit}
        name="apple-fit"
      />
      <Stack.Screen
        component={Tinder}
        name="tinder"
      />
    </Stack.Navigator>
  );
});
