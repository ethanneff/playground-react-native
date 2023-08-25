import React from 'react';
import { createStackNavigator } from '../../conversions';
import {
  Colors,
  Fonts,
  Inputs,
  Modals,
  Paragraphs,
  ScrollViews,
  Themes,
} from './Components';
import {
  AppleFit,
  AppleMask,
  AppleStopwatch,
  Ball,
  Drag,
  OKRs,
  Startup,
  Tinder,
  WeekendPlanner,
} from './Creations';
import {
  BouncingBalls,
  Chat,
  ImageCollection,
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
import { type NavParams } from './navParams';

const noHeader = { headerShown: false };
const Stack = createStackNavigator<NavParams>();

export const Playground = () => (
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
    <Stack.Screen
      component={ScrollViews}
      name="scroll-views"
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
      component={AppleMask}
      name="apple-mask"
    />
    <Stack.Screen
      component={AppleStopwatch}
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
