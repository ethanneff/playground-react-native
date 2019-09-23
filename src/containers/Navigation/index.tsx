import React, { memo, lazy, Suspense, ReactElement } from "react";
import { ActivityIndicator } from "react-native";
import { Configs, Profile } from "../../apps/CantHurtMe/screens";
import { NavigationModal as M } from "../../models";
import { useRootSelector } from "../../utils";
import { ErrorBoundary } from "../../components/ErrorBoundary";

// screens
const Portfolio = lazy(() => import(`../../apps/Portfolio/screens/Main`));
const PortfolioSettings = lazy(() =>
  import(`../../apps/Portfolio/screens/Settings`)
);
const PortfolioLanding = lazy(() =>
  import(`../../apps/Portfolio/screens/Landing`)
);
const PortfolioNotFound = lazy(() =>
  import(`../../apps/Portfolio/screens/NotFound`)
);
const PortfolioForgot = lazy(() =>
  import(`../../apps/Portfolio/screens/ForgotPassword`)
);
const PortfolioLogin = lazy(() => import(`../../apps/Portfolio/screens/Login`));
const Checklists = lazy(() => import(`../../apps/Checklists/screens/Main`));
const ChecklistsList = lazy(() => import(`../../apps/Checklists/screens/List`));
const ChecklistsListCreate = lazy(() =>
  import(`../../apps/Checklists/screens/ListCreate`)
);
const ChecklistsListUpdate = lazy(() =>
  import(`../../apps/Checklists/screens/ListUpdate`)
);
const ChecklistsItemCreate = lazy(() =>
  import(`../../apps/Checklists/screens/ItemCreate`)
);
const ChecklistsItemUpdate = lazy(() =>
  import(`../../apps/Checklists/screens/ItemUpdate`)
);
const Focus = lazy(() => import(`../../apps/Focus`));
const CantHurtMe = lazy(() => import(`../../apps/CantHurtMe/screens/Main`));
const Debug = lazy(() => import(`../../apps/Debug/screens/Main`));
const DebugArticle = lazy(() => import(`../../apps/Debug/screens/Article`));
const DebugBall = lazy(() => import(`../../apps/Debug/screens/Ball`));
const DebugButtons = lazy(() => import(`../../apps/Debug/screens/Buttons`));
const DebugCards = lazy(() => import(`../../apps/Debug/screens/Cards`));
const DebugChat = lazy(() => import(`../../apps/Debug/screens/Chat`));
const DebugDarkMode = lazy(() => import(`../../apps/Debug/screens/DarkMode`));
const DebugDrag = lazy(() => import(`../../apps/Debug/screens/Drag`));
const DebugFonts = lazy(() => import(`../../apps/Debug/screens/Fonts`));
const DebugImage = lazy(() =>
  import(`../../apps/Debug/screens/ImageCollection`)
);
const DebugInput = lazy(() => import(`../../apps/Debug/screens/Input`));
const DebugOKRs = lazy(() => import(`../../apps/Debug/screens/OKRs`));
const DebugPinchSpread = lazy(() =>
  import(`../../apps/Debug/screens/PinchSpread`)
);
const DebugQuestionnaire = lazy(() =>
  import(`../../apps/Debug/screens/Questionnaire`)
);
const DebugSearchBar = lazy(() => import(`../../apps/Debug/screens/SearchBar`));
const DebugStopwatch = lazy(() => import(`../../apps/Debug/screens/Stopwatch`));
const DebugSwipeCell = lazy(() => import(`../../apps/Debug/screens/SwipeCell`));

type Modals = { [key in M]: ReactElement };

export const screens = {
  focus: <Focus />,
  portfolio: <Portfolio />,
  portfolioSettings: <PortfolioSettings />,
  portfolioLanding: <PortfolioLanding />,
  portfolioNotFound: <PortfolioNotFound />,
  portfolioForgotPassword: <PortfolioForgot />,
  portfolioLogin: <PortfolioLogin />,
  cantHurtMe: <CantHurtMe />,
  debug: <Debug />,
  debugArticle: <DebugArticle />,
  debugBall: <DebugBall />,
  debugButtons: <DebugButtons />,
  debugCards: <DebugCards />,
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
  debugStopwatch: <DebugStopwatch />,
  debugSwipeCell: <DebugSwipeCell />,
  checklists: <Checklists />,
  checklistsList: <ChecklistsList />,
  checklistsListCreate: <ChecklistsListCreate />,
  checklistsListUpdate: <ChecklistsListUpdate />,
  checklistsItemCreate: <ChecklistsItemCreate />,
  checklistsItemUpdate: <ChecklistsItemUpdate />
};

// TODO: remove for similar to focus
const modals: Modals = {
  [M.CantHurtMeConfigs]: <Configs />,
  [M.CantHurtMeProfile]: <Profile />,
  [M.None]: <></>
};

export const Navigation = memo(() => {
  const screen = useRootSelector(state => state.navigation.screen);
  const modal = useRootSelector(state => state.navigation.modal);
  return (
    <ErrorBoundary>
      <Suspense fallback={<ActivityIndicator />}>{screens[screen]}</Suspense>
      {modals[modal]}
    </ErrorBoundary>
  );
});
