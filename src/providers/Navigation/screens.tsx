// import React, {lazy} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';

export const bob = 1;

// // TODO: make work on web
// // TODO: callbacks for notification and modal
// // TODO: split by app
// // TODO: fix broken links
// // TODO: add screens for apps
// // TODO: remove redux
// // TODO: add app dotenv
// // TODO: add admin toggle
// // TODO: figure out debugDev

// // config
// const noHeader = {headerShown: false};

// // stack
// const Stack = createStackNavigator();

// // screens
// const Portfolio = lazy(() => import('../../apps/Portfolio/screens/Main'));
// const PortfolioSettings = lazy(
//   () => import('../../apps/Portfolio/screens/Settings'),
// );
// const PortfolioLanding = lazy(
//   () => import('../../apps/Portfolio/screens/Landing'),
// );
// const PortfolioNotFound = lazy(
//   () => import('../../apps/Portfolio/screens/NotFound'),
// );
// const PortfolioForgot = lazy(
//   () => import('../../apps/Portfolio/screens/ForgotPassword'),
// );
// const PortfolioLogin = lazy(() => import('../../apps/Portfolio/screens/Login'));
// const Checklists = lazy(() => import('../../apps/Checklists'));
// const ChecklistsList = lazy(() => import('../../apps/Checklists/screens/List'));
// const ChecklistsListCreate = lazy(
//   () => import('../../apps/Checklists/screens/ListCreate'),
// );
// const ChecklistsListUpdate = lazy(
//   () => import('../../apps/Checklists/screens/ListUpdate'),
// );
// const ChecklistsItemCreate = lazy(
//   () => import('../../apps/Checklists/screens/ItemCreate'),
// );
// const ChecklistsItemUpdate = lazy(
//   () => import('../../apps/Checklists/screens/ItemUpdate'),
// );
// const Focus = lazy(() => import('../../apps/Focus'));
// const CantHurtMe = lazy(() => import('../../apps/CantHurtMe'));
// const TheOneThing = lazy(() => import('../../apps/TheOneThing'));
// const Journal = lazy(() => import('../../apps/Journal'));
// const Activity = lazy(() => import('../../apps/Activity'));
// const Playground = lazy(() => import('../../apps/Playground/Main'));
// const PlaygroundArticle = lazy(() => import('../../apps/Playground/Article'));
// const PlaygroundBall = lazy(() => import('../../apps/Playground/Ball'));
// const PlaygroundChat = lazy(() => import('../../apps/Playground/Chat'));
// const PlaygroundColors = lazy(() => import('../../apps/Playground/Colors'));
// const PlaygroundDarkMode = lazy(() => import('../../apps/Playground/DarkMode'));
// const PlaygroundDrag = lazy(() => import('../../apps/Playground/Drag'));
// const PlaygroundDrift = lazy(() => import('../../apps/Playground/Drift'));
// const PlaygroundFonts = lazy(() => import('../../apps/Playground/Fonts'));
// const PlaygroundAppleFit = lazy(() => import('../../apps/Playground/AppleFit'));
// const PlaygroundFortuneWheel = lazy(
//   () => import('../../apps/Playground/FortuneWheel'),
// );
// const PlaygroundBejeweled = lazy(
//   () => import('../../apps/Playground/Bejeweled'),
// );
// const PlaygroundSlotMachine = lazy(
//   () => import('../../apps/Playground/SlotMachine'),
// );
// const PlaygroundSwipeFeed = lazy(
//   () => import('../../apps/Playground/SwipeFeed'),
// );
// const PlaygroundReminder = lazy(() => import('../../apps/Playground/Reminder'));
// const PlaygroundTinder = lazy(() => import('../../apps/Playground/Tinder'));
// const PlaygroundBouncingBalls = lazy(
//   () => import('../../apps/Playground/BouncingBalls'),
// );
// const PlaygroundGameOfLife = lazy(
//   () => import('../../apps/Playground/GameOfLife'),
// );
// const PlaygroundImage = lazy(
//   () => import('../../apps/Playground/ImageCollection'),
// );
// const PlaygroundInput = lazy(() => import('../../apps/Playground/Input'));
// const PlaygroundOKRs = lazy(() => import('../../apps/Playground/OKRs'));
// const PlaygroundPinchSpread = lazy(
//   () => import('../../apps/Playground/PinchSpread'),
// );
// const PlaygroundQuestionnaire = lazy(
//   () => import('../../apps/Playground/Questionnaire'),
// );
// const PlaygroundSearchBar = lazy(
//   () => import('../../apps/Playground/SearchBar'),
// );
// const PlaygroundStartup = lazy(() => import('../../apps/Playground/Startup'));
// const PlaygroundStopwatch = lazy(
//   () => import('../../apps/Playground/Stopwatch'),
// );
// const PlaygroundAppleMask = lazy(
//   () => import('../../apps/Playground/AppleMask'),
// );
// const GameFlappyBird = lazy(() => import('../../apps/Games/FlappyBird'));
// const GameSnake = lazy(() => import('../../apps/Games/Snake'));
// const GamePapiJump = lazy(() => import('../../apps/Games/PapiJump'));
// const GameArchero = lazy(() => import('../../apps/Games/Archero'));

// export const PortfolioStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Portfolio} name="portfolio" />
//     <Stack.Screen component={PortfolioSettings} name="portfolioSettings" />
//     <Stack.Screen component={PortfolioLanding} name="portfolioLanding" />
//     <Stack.Screen component={PortfolioNotFound} name="portfolioNotFound" />
//     <Stack.Screen component={PortfolioForgot} name="portfolioForgot" />
//     <Stack.Screen component={PortfolioLogin} name="portfolioLogin" />
//   </Stack.Navigator>
// );

// export const OneThingStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={TheOneThing} name="theOneThing" />
//   </Stack.Navigator>
// );

// export const FocusStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Focus} name="focus" />
//   </Stack.Navigator>
// );

// export const ActivityStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Activity} name="activity" />
//   </Stack.Navigator>
// );

// export const CantHurtMeStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={CantHurtMe} name="cantHurtMe" />
//   </Stack.Navigator>
// );

// export const JournalStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Journal} name="journal" />
//   </Stack.Navigator>
// );

// export const ChecklistStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Checklists} name="checklists" />
//     <Stack.Screen component={ChecklistsList} name="checklistsList" />
//     <Stack.Screen
//       component={ChecklistsListCreate}
//       name="checklistsListCreate"
//     />
//     <Stack.Screen
//       component={ChecklistsListUpdate}
//       name="checklistsListUpdate"
//     />
//     <Stack.Screen
//       component={ChecklistsItemCreate}
//       name="checklistsItemCreate"
//     />
//     <Stack.Screen
//       component={ChecklistsItemUpdate}
//       name="checklistsItemUpdate"
//     />
//   </Stack.Navigator>
// );

// export const GamesStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={GameFlappyBird} name="gameFlappyBird" />
//     <Stack.Screen component={GameSnake} name="gameSnake" />
//     <Stack.Screen component={GamePapiJump} name="gamePapiJump" />
//     <Stack.Screen component={GameArchero} name="gameArchero" />
//   </Stack.Navigator>
// );

// export const PlaygroundStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={Playground} name="playground" />
//     <Stack.Screen component={PlaygroundArticle} name="playgroundArticle" />
//     <Stack.Screen component={PlaygroundBall} name="playgroundBall" />
//     <Stack.Screen component={PlaygroundChat} name="playgroundChat" />
//     <Stack.Screen component={PlaygroundDarkMode} name="playgroundDarkMode" />
//     <Stack.Screen component={PlaygroundDrag} name="playgroundDrag" />
//     <Stack.Screen component={PlaygroundFonts} name="playgroundFonts" />
//     <Stack.Screen
//       component={PlaygroundImage}
//       name="playgroundImageCollection"
//     />
//     <Stack.Screen component={PlaygroundInput} name="playgroundInput" />
//     <Stack.Screen component={PlaygroundOKRs} name="playgroundOKRs" />
//     <Stack.Screen
//       component={PlaygroundPinchSpread}
//       name="playgroundPinchSpread"
//     />
//     <Stack.Screen
//       component={PlaygroundQuestionnaire}
//       name="playgroundQuestionnaire"
//     />
//     <Stack.Screen component={PlaygroundSearchBar} name="playgroundSearchBar" />
//     <Stack.Screen component={PlaygroundStartup} name="playgroundStartup" />
//     <Stack.Screen component={PlaygroundStopwatch} name="playgroundStopwatch" />
//     <Stack.Screen component={PlaygroundColors} name="playgroundColors" />
//     <Stack.Screen component={PlaygroundSwipeFeed} name="playgroundSwipeFeed" />
//     <Stack.Screen
//       component={PlaygroundGameOfLife}
//       name="playgroundGameOfLife"
//     />
//     <Stack.Screen component={PlaygroundReminder} name="playgroundReminder" />
//     <Stack.Screen component={PlaygroundTinder} name="playgroundTinder" />
//     <Stack.Screen component={PlaygroundDrift} name="playgroundDrift" />
//     <Stack.Screen component={PlaygroundAppleMask} name="playgroundAppleMask" />
//     <Stack.Screen
//       component={PlaygroundBouncingBalls}
//       name="playgroundBouncingBalls"
//     />
//     <Stack.Screen component={PlaygroundBejeweled} name="playgroundBejeweled" />
//     <Stack.Screen
//       component={PlaygroundSlotMachine}
//       name="playgroundSlotMachine"
//     />
//     <Stack.Screen
//       component={PlaygroundFortuneWheel}
//       name="playgroundFortuneWheel"
//     />
//     <Stack.Screen component={PlaygroundAppleFit} name="playgroundAppleFit" />
//   </Stack.Navigator>
// );

// export const AdminStack = () => (
//   <Stack.Navigator screenOptions={noHeader}>
//     <Stack.Screen component={ActivityStack} name="activity" />
//     <Stack.Screen component={CantHurtMeStack} name="cantHurtMe" />
//     <Stack.Screen component={ChecklistStack} name="checklists" />
//     <Stack.Screen component={FocusStack} name="focus" />
//     <Stack.Screen component={GamesStack} name="games" />
//     <Stack.Screen component={JournalStack} name="journal" />
//     <Stack.Screen component={PlaygroundStack} name="playground" />
//     <Stack.Screen component={PortfolioStack} name="portfolio" />
//     <Stack.Screen component={OneThingStack} name="oneThing" />
//   </Stack.Navigator>
// );
