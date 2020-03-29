import React, {Suspense, lazy, memo} from 'react';
import {useRootSelector} from '../../utils';
import {ErrorBoundary} from '../../components/ErrorBoundary';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';

// screens
const Portfolio = lazy(() => import('../../apps/Portfolio/screens/Main'));
const PortfolioSettings = lazy(() =>
  import('../../apps/Portfolio/screens/Settings'),
);
const PortfolioLanding = lazy(() =>
  import('../../apps/Portfolio/screens/Landing'),
);
const PortfolioNotFound = lazy(() =>
  import('../../apps/Portfolio/screens/NotFound'),
);
const PortfolioForgot = lazy(() =>
  import('../../apps/Portfolio/screens/ForgotPassword'),
);
const PortfolioLogin = lazy(() => import('../../apps/Portfolio/screens/Login'));
const Checklists = lazy(() => import('../../apps/Checklists/screens/Main'));
const ChecklistsList = lazy(() => import('../../apps/Checklists/screens/List'));
const ChecklistsListCreate = lazy(() =>
  import('../../apps/Checklists/screens/ListCreate'),
);
const ChecklistsListUpdate = lazy(() =>
  import('../../apps/Checklists/screens/ListUpdate'),
);
const ChecklistsItemCreate = lazy(() =>
  import('../../apps/Checklists/screens/ItemCreate'),
);
const ChecklistsItemUpdate = lazy(() =>
  import('../../apps/Checklists/screens/ItemUpdate'),
);
const Focus = lazy(() => import('../../apps/Focus'));
const CantHurtMe = lazy(() => import('../../apps/CantHurtMe/screens/Main'));
const Journal = lazy(() => import('../../apps/Journal'));
const Activity = lazy(() => import('../../apps/Activity'));
const Debug = lazy(() => import('../../apps/Debug/screens/Main'));
const DebugArticle = lazy(() => import('../../apps/Debug/screens/Article'));
const DebugBall = lazy(() => import('../../apps/Debug/screens/Ball'));
const DebugChat = lazy(() => import('../../apps/Debug/screens/Chat'));
const DebugColors = lazy(() => import('../../apps/Debug/screens/Colors'));
const DebugDarkMode = lazy(() => import('../../apps/Debug/screens/DarkMode'));
const DebugDrag = lazy(() => import('../../apps/Debug/screens/Drag'));
const DebugDrift = lazy(() => import('../../apps/Debug/screens/Drift'));
const DebugFonts = lazy(() => import('../../apps/Debug/screens/Fonts'));
const DebugSwipeFeed = lazy(() => import('../../apps/Debug/screens/SwipeFeed'));
const DebugReminder = lazy(() => import('../../apps/Debug/screens/Reminder'));
const DebugTinder = lazy(() => import('../../apps/Debug/screens/Tinder'));
const DebugGameOfLife = lazy(() =>
  import('../../apps/Debug/screens/GameOfLife'),
);
const DebugImage = lazy(() =>
  import('../../apps/Debug/screens/ImageCollection'),
);
const DebugInput = lazy(() => import('../../apps/Debug/screens/Input'));
const DebugOKRs = lazy(() => import('../../apps/Debug/screens/OKRs'));
const DebugPinchSpread = lazy(() =>
  import('../../apps/Debug/screens/PinchSpread'),
);
const DebugQuestionnaire = lazy(() =>
  import('../../apps/Debug/screens/Questionnaire'),
);
const DebugSearchBar = lazy(() => import('../../apps/Debug/screens/SearchBar'));
const DebugStartup = lazy(() => import('../../apps/Debug/screens/Startup'));
const DebugStopwatch = lazy(() => import('../../apps/Debug/screens/Stopwatch'));
const GamesFlappyBird = lazy(() => import('../../apps/Games/FlappyBird'));
const GamesSnake = lazy(() => import('../../apps/Games/Snake'));
const GamesPapiJump = lazy(() => import('../../apps/Games/PapiJump'));
const GamesArchero = lazy(() => import('../../apps/Games/Archero'));

export const screens = {
  focus: <Focus />,
  portfolio: <Portfolio />,
  portfolioSettings: <PortfolioSettings />,
  portfolioLanding: <PortfolioLanding />,
  portfolioNotFound: <PortfolioNotFound />,
  portfolioForgotPassword: <PortfolioForgot />,
  portfolioLogin: <PortfolioLogin />,
  cantHurtMe: <CantHurtMe />,
  journal: <Journal />,
  activity: <Activity />,
  debug: <Debug />,
  debugArticle: <DebugArticle />,
  debugBall: <DebugBall />,
  debugChat: <DebugChat />,
  debugDarkMode: <DebugDarkMode />,
  debugDrag: <DebugDrag />,
  debugFonts: <DebugFonts />,
  debugImageCollection: <DebugImage />,
  debugInput: <DebugInput />,
  debugOKRs: <DebugOKRs />,
  debugPinchSpread: <DebugPinchSpread />,
  debugQuestionnaire: <DebugQuestionnaire />,
  debugSearchBar: <DebugSearchBar />,
  debugStartup: <DebugStartup />,
  debugStopwatch: <DebugStopwatch />,
  debugColors: <DebugColors />,
  debugSwipeFeed: <DebugSwipeFeed />,
  debugGameOfLife: <DebugGameOfLife />,
  debugReminder: <DebugReminder />,
  debugTinder: <DebugTinder />,
  debugDrift: <DebugDrift />,
  checklists: <Checklists />,
  checklistsList: <ChecklistsList />,
  checklistsListCreate: <ChecklistsListCreate />,
  checklistsListUpdate: <ChecklistsListUpdate />,
  checklistsItemCreate: <ChecklistsItemCreate />,
  checklistsItemUpdate: <ChecklistsItemUpdate />,
  gamesFlappyBird: <GamesFlappyBird />,
  gamesSnake: <GamesSnake />,
  gamesPapiJump: <GamesPapiJump />,
  gamesArchero: <GamesArchero />,
};

const Loading = memo(function NavigationLoading() {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color.dark} />
    </View>
  );
});

export const Navigation = memo(function Navigation() {
  const screen = useRootSelector((state) => state.navigation.screen);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        {screens[screen] || screens.portfolioLanding}
      </Suspense>
    </ErrorBoundary>
  );
});
