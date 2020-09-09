import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Article} from './Article';
import {Ball} from './Ball';
import {Chat} from './Chat';
import {Drag} from './Drag';
import {Fonts} from './Fonts';
import {ImageCollection} from './ImageCollection';
import {Input} from './Input';
import {OKRs} from './OKRs';
import {PinchSpread} from './PinchSpread';
import {Questionnaire} from './Questionnaire';
import {SearchBar} from './SearchBar';
import {Startup} from './Startup';
import {StopWatch} from './Stopwatch';
import {DarkMode} from './DarkMode';
import {Colors} from './Colors';
import {SwipeFeed} from './SwipeFeed';
import {GameOfLife} from './GameOfLife';
import {ReminderExample} from './Reminder';
import {Tinder} from './Tinder';
// import {Drift} from './Drift'; // TODO: broken on web
import {AppleMask} from './AppleMask';
import {BouncingBalls} from './BouncingBalls';
import {Bejeweled} from './Bejeweled';
// import {SlotMachine} from './SlotMachine';
import {FortuneWheel} from './FortuneWheel';
// import {AppleFit} from './AppleFit';
import {Landing} from './Landing';
import {stackParams} from './navParams';

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
      <Stack.Screen component={Input} name="input" />
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
      {/* <Stack.Screen component={Drift} name="drift" /> */}
      <Stack.Screen component={AppleMask} name="appleMask" />
      <Stack.Screen component={BouncingBalls} name="bouncingBalls" />
      <Stack.Screen component={Bejeweled} name="bejeweled" />
      {/* <Stack.Screen component={SlotMachine} name="slotMachine" /> */}
      <Stack.Screen component={FortuneWheel} name="fortuneWheel" />
      {/* <Stack.Screen component={AppleFit} name="appleFit" /> */}
    </Stack.Navigator>
  );
});
