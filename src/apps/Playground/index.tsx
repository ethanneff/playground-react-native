import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import { AppleFit } from './AppleFit';
import { AppleMask } from './AppleMask';
import { Ball } from './Ball';
import { Bejeweled } from './Bejeweled';
import { BouncingBalls } from './BouncingBalls';
import { Chat } from './Chat';
import { Colors } from './Colors';
import { Drag } from './Drag';
import { Drift } from './Drift';
import { Fonts } from './Fonts';
import { FortuneWheel } from './FortuneWheel';
import { GameOfLife } from './GameOfLife';
import { ImageCollection } from './ImageCollection';
import { Inputs } from './Inputs';
import { KeyboardScroll } from './KeyboardScroll';
import { Landing } from './Landing';
import { stackParams } from './navParams';
import { OKRs } from './OKRs';
import { Paragraphs } from './Paragraphs';
import { PinchSpread } from './PinchSpread';
import { Questionnaire } from './Questionnaire';
import { ReminderExample } from './Reminder';
import { SearchBar } from './SearchBar';
import { SkeletonLoading } from './SkeletonLoader';
import { SlotMachine } from './SlotMachine';
import { Startup } from './Startup';
import { StopWatch } from './Stopwatch';
import { SwipeFeed } from './SwipeFeed';
import { Themes } from './Themes';
import { Tinder } from './Tinder';

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
      <Stack.Screen component={ReminderExample} name="modals" />

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
      <Stack.Screen component={StopWatch} name="appleStopWatch" />
      <Stack.Screen component={AppleFit} name="appleFit" />
      <Stack.Screen component={Tinder} name="tinder" />
    </Stack.Navigator>
  );
});
