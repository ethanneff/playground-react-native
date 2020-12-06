import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {AppleFit} from './AppleFit';
import {AppleMask} from './AppleMask';
import {Article} from './Article';
import {Ball} from './Ball';
import {Bejeweled} from './Bejeweled';
import {BouncingBalls} from './BouncingBalls';
import {Chat} from './Chat';
import {Colors} from './Colors';
import {DarkMode} from './DarkMode';
import {Drag} from './Drag';
import {Drift} from './Drift';
import {Fonts} from './Fonts';
import {FortuneWheel} from './FortuneWheel';
import {GameOfLife} from './GameOfLife';
import {ImageCollection} from './ImageCollection';
import {Landing} from './Landing';
import {Login} from './Login';
import {stackParams} from './navParams';
import {OKRs} from './OKRs';
import {PinchSpread} from './PinchSpread';
import {Questionnaire} from './Questionnaire';
import {ReminderExample} from './Reminder';
import {SearchBar} from './SearchBar';
import {SkeletonLoading} from './SkeletonLoading';
import {SlotMachine} from './SlotMachine';
import {Startup} from './Startup';
import {StopWatch} from './Stopwatch';
import {SwipeFeed} from './SwipeFeed';
import {Tinder} from './Tinder';

const noHeader = {headerShown: false};
const Stack = createStackNavigator<typeof stackParams>();

export default memo(function Games() {
  return (
    <Stack.Navigator screenOptions={noHeader}>
      <Stack.Screen component={Landing} name="landing" />
      <Stack.Screen component={Article} name="article" />
      <Stack.Screen component={Ball} name="ball" />
      <Stack.Screen component={Chat} name="chat" />
      <Stack.Screen component={Drag} name="drag" />
      <Stack.Screen component={Fonts} name="fonts" />
      <Stack.Screen component={ImageCollection} name="imageCollection" />
      <Stack.Screen component={Login} name="login" />
      <Stack.Screen component={OKRs} name="oKRs" />
      <Stack.Screen component={PinchSpread} name="pinchSpread" />
      <Stack.Screen component={Questionnaire} name="questionnaire" />
      <Stack.Screen component={SearchBar} name="searchBar" />
      <Stack.Screen component={Startup} name="startup" />
      <Stack.Screen component={StopWatch} name="stopWatch" />
      <Stack.Screen component={DarkMode} name="darkMode" />
      <Stack.Screen component={Colors} name="colors" />
      <Stack.Screen component={SwipeFeed} name="swipeFeed" />
      <Stack.Screen component={GameOfLife} name="gameOfLife" />
      <Stack.Screen component={ReminderExample} name="reminder" />
      <Stack.Screen component={Tinder} name="tinder" />
      <Stack.Screen component={Drift} name="drift" />
      <Stack.Screen component={AppleMask} name="appleMask" />
      <Stack.Screen component={BouncingBalls} name="bouncingBalls" />
      <Stack.Screen component={Bejeweled} name="bejeweled" />
      <Stack.Screen component={SlotMachine} name="slotMachine" />
      <Stack.Screen component={FortuneWheel} name="fortuneWheel" />
      <Stack.Screen component={AppleFit} name="appleFit" />
      <Stack.Screen component={SkeletonLoading} name="skeletonLoading" />
    </Stack.Navigator>
  );
});
