import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import {
  AppleFit,
  AppleMask,
  Ball,
  Drag,
  OKRs,
  Questionnaire,
  Startup,
  AppleStopWatch,
  Tinder,
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
  Colors,
  Fonts,
  Inputs,
  Modals,
  Paragraphs,
  Themes,
} from './Components';
import {
  Bejeweled,
  Drift,
  FortuneWheel,
  GameOfLife,
  SlotMachine,
} from './Games';
import { Landing } from './Landing';
import { stackParams } from './navParams';

const noHeader = { headerShown: false };
const Stack = createStackNavigator<typeof stackParams>();

export default memo(function Games() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Landing} name="landing" />
      {/* components */}
      <Stack.Screen component={Colors} name="colors" />
      <Stack.Screen component={Themes} name="themes" />
      <Stack.Screen component={Fonts} name="fonts" />
      <Stack.Screen component={Paragraphs} name="paragraphs" />
      <Stack.Screen component={Inputs} name="inputs" />
      <Stack.Screen component={Modals} name="modals" />

      {/* games */}
      <Stack.Screen component={GameOfLife} name="gameOfLife" />
      <Stack.Screen component={Bejeweled} name="bejeweled" />
      <Stack.Screen component={SlotMachine} name="slotMachine" />
      <Stack.Screen component={FortuneWheel} name="fortuneWheel" />
      <Stack.Screen component={Drift} name="drift" />

      {/* features */}
      <Stack.Screen component={Chat} name="chat" />
      <Stack.Screen component={ImageCollection} name="infiniteImages" />
      <Stack.Screen component={SkeletonLoading} name="skeletonLoader" />
      <Stack.Screen component={KeyboardScroll} name="recyclerFlatList" />
      <Stack.Screen component={SearchBar} name="searchBar" />
      <Stack.Screen component={SwipeFeed} name="swipeFeed" />
      <Stack.Screen component={BouncingBalls} name="bouncingBalls" />
      <Stack.Screen component={PinchSpread} name="pinchSpread" />

      {/* creations */}
      <Stack.Screen component={Ball} name="ball" />
      <Stack.Screen component={Drag} name="drag" />
      <Stack.Screen component={OKRs} name="okrs" />
      <Stack.Screen component={Startup} name="startup" />
      <Stack.Screen component={Questionnaire} name="questionnaire" />
      <Stack.Screen component={AppleMask} name="appleMask" />
      <Stack.Screen component={AppleStopWatch} name="appleStopWatch" />
      <Stack.Screen component={AppleFit} name="appleFit" />
      <Stack.Screen component={Tinder} name="tinder" />
    </Stack.Navigator>
  );
});
