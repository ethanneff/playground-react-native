import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { CantHurtMe, Configs, Profile } from "../../apps/CantHurtMe/screens";
import {
  Checklist,
  ChecklistCreate,
  Checklists,
  ChecklistUpdate,
  ItemCreate,
  ItemUpdate
} from "../../apps/Checklists/screens";
import {
  Article,
  Ball,
  Buttons,
  Cards,
  Chat,
  DarkMode,
  Debug,
  Drag,
  Fonts,
  ImageCollection,
  Input,
  OKRs,
  PinchSpread,
  Questionnaire,
  SearchBar,
  Stopwatch,
  SwipeCell
} from "../../apps/Debug/screens";
import { Focus } from "../../apps/Focus";
import {
  ForgotPassword,
  Landing,
  Login,
  NotFound,
  Portfolio,
  Settings
} from "../../apps/Portfolio/screens";
import {
  getModal,
  getScreen,
  NavigationModal as M,
  NavigationScreen as S
} from "../../models";
import { useRootSelector } from "../../utils";

type Screens = { [key in S]: any };
type Modals = { [key in M]: any };

const screens: Screens = {
  [S.CantHurtMe]: <CantHurtMe />,
  [S.Checklists]: <Checklists />,
  [S.ChecklistsCreate]: <ChecklistCreate />,
  [S.ChecklistsItemCreate]: <ItemCreate />,
  [S.ChecklistsItemUpdate]: <ItemUpdate />,
  [S.ChecklistsList]: <Checklist />,
  [S.ChecklistsUpdate]: <ChecklistUpdate />,
  [S.Debug]: <Debug />,
  [S.DebugArticle]: <Article />,
  [S.DebugBall]: <Ball />,
  [S.DebugButtons]: <Buttons />,
  [S.DebugCards]: <Cards />,
  [S.DebugChat]: <Chat />,
  [S.DebugDarkMode]: <DarkMode />,
  [S.DebugDrag]: <Drag />,
  [S.DebugFonts]: <Fonts />,
  [S.DebugImageCollection]: <ImageCollection />,
  [S.DebugInput]: <Input />,
  [S.DebugOKRs]: <OKRs />,
  [S.DebugPinchSpread]: <PinchSpread />,
  [S.DebugQuestionnaire]: <Questionnaire />,
  [S.DebugSearchBar]: <SearchBar />,
  [S.DebugStopwatch]: <Stopwatch />,
  [S.DebugSwipeCell]: <SwipeCell />,
  [S.Focus]: <Focus />,
  [S.Portfolio]: <Portfolio />,
  [S.PortfolioForgotPassword]: <ForgotPassword />,
  [S.PortfolioLanding]: <Landing />,
  [S.PortfolioLogin]: <Login />,
  [S.PortfolioNotFound]: <NotFound />,
  [S.PortfolioSettings]: <Settings />
};

const modals: Modals = {
  [M.CantHurtMeConfigs]: <Configs />,
  [M.CantHurtMeProfile]: <Profile />,
  [M.None]: <></>
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export const Navigation = memo(() => {
  const screen = useRootSelector(state => getScreen(state));
  const modal = useRootSelector(state => getModal(state));
  return (
    <View style={styles.container}>
      {screens[screen]}
      {modals[modal]}
    </View>
  );
});
