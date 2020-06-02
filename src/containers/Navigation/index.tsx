import React, {Suspense, lazy, memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useRootSelector} from '../../utils';
import {ErrorBoundary} from '../../components/ErrorBoundary';
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
const Checklists = lazy(() => import('../../apps/Checklists'));
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
const CantHurtMe = lazy(() => import('../../apps/CantHurtMe'));
const Journal = lazy(() => import('../../apps/Journal'));
const Activity = lazy(() => import('../../apps/Activity'));
const Playground = lazy(() => import('../../apps/Playground/screens/Main'));
const PlaygroundArticle = lazy(() =>
  import('../../apps/Playground/screens/Article'),
);
const PlaygroundBall = lazy(() => import('../../apps/Playground/screens/Ball'));
const PlaygroundChat = lazy(() => import('../../apps/Playground/screens/Chat'));
const PlaygroundColors = lazy(() =>
  import('../../apps/Playground/screens/Colors'),
);
const PlaygroundDarkMode = lazy(() =>
  import('../../apps/Playground/screens/DarkMode'),
);
const PlaygroundDrag = lazy(() => import('../../apps/Playground/screens/Drag'));
const PlaygroundDrift = lazy(() =>
  import('../../apps/Playground/screens/Drift'),
);
const PlaygroundFonts = lazy(() =>
  import('../../apps/Playground/screens/Fonts'),
);
const PlaygroundSwipeFeed = lazy(() =>
  import('../../apps/Playground/screens/SwipeFeed'),
);
const PlaygroundReminder = lazy(() =>
  import('../../apps/Playground/screens/Reminder'),
);
const PlaygroundTinder = lazy(() =>
  import('../../apps/Playground/screens/Tinder'),
);
const PlaygroundGameOfLife = lazy(() =>
  import('../../apps/Playground/screens/GameOfLife'),
);
const PlaygroundImage = lazy(() =>
  import('../../apps/Playground/screens/ImageCollection'),
);
const PlaygroundInput = lazy(() =>
  import('../../apps/Playground/screens/Input'),
);
const PlaygroundOKRs = lazy(() => import('../../apps/Playground/screens/OKRs'));
const PlaygroundPinchSpread = lazy(() =>
  import('../../apps/Playground/screens/PinchSpread'),
);
const PlaygroundQuestionnaire = lazy(() =>
  import('../../apps/Playground/screens/Questionnaire'),
);
const PlaygroundSearchBar = lazy(() =>
  import('../../apps/Playground/screens/SearchBar'),
);
const PlaygroundStartup = lazy(() =>
  import('../../apps/Playground/screens/Startup'),
);
const PlaygroundStopwatch = lazy(() =>
  import('../../apps/Playground/screens/Stopwatch'),
);
const PlaygroundAppleMask = lazy(() =>
  import('../../apps/Playground/screens/AppleMask'),
);
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
  playground: <Playground />,
  playgroundArticle: <PlaygroundArticle />,
  playgroundBall: <PlaygroundBall />,
  playgroundChat: <PlaygroundChat />,
  playgroundDarkMode: <PlaygroundDarkMode />,
  playgroundDrag: <PlaygroundDrag />,
  playgroundFonts: <PlaygroundFonts />,
  playgroundImageCollection: <PlaygroundImage />,
  playgroundInput: <PlaygroundInput />,
  playgroundOKRs: <PlaygroundOKRs />,
  playgroundPinchSpread: <PlaygroundPinchSpread />,
  playgroundQuestionnaire: <PlaygroundQuestionnaire />,
  playgroundSearchBar: <PlaygroundSearchBar />,
  playgroundStartup: <PlaygroundStartup />,
  playgroundStopwatch: <PlaygroundStopwatch />,
  playgroundColors: <PlaygroundColors />,
  playgroundSwipeFeed: <PlaygroundSwipeFeed />,
  playgroundGameOfLife: <PlaygroundGameOfLife />,
  playgroundReminder: <PlaygroundReminder />,
  playgroundTinder: <PlaygroundTinder />,
  playgroundDrift: <PlaygroundDrift />,
  playgroundAppleMask: <PlaygroundAppleMask />,
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
