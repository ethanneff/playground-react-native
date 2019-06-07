import * as React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  getScreen,
  navigate,
  getModal,
  NavigationScreen,
  NavigationModal
} from "../../models";
import { RootState } from "..";
import {
  Login as PortfolioLogin,
  NotFound as PortfolioNotFound,
  Main as PortfolioMain,
  Landing as PortfolioLanding,
  ForgotPassword as PortfolioForgotPassword
} from "../../apps/Portfolio/screens";
import {
  Home as DebugHome,
  Ball as DebugBall,
  Buttons as DebugButtons,
  Cards as DebugCards,
  Chat as DebugChat,
  Drag as DebugDrag,
  Fonts as DebugFonts,
  ImageCollection as DebugImageCollection,
  Input as DebugInput,
  OKRs as DebugOKRs,
  PinchSpread as DebugPinchSpread,
  Questionnaire as DebugQuestionnaire,
  SearchBar as DebugSearchBar,
  Stopwatch as DebugStopwatch
} from "../../apps/Debug/screens";
import {
  Home as CantHurtMeHome,
  Settings as CantHurtMeSettings,
  Profile as CantHurtMeProfile
} from "../../apps/CantHurtMe/screens";
import {
  List as ChecklistsList,
  Lists as ChecklistsLists,
  ListCreate as ChecklistsListCreate,
  ListUpdate as ChecklistsListUpdate,
  ItemCreate as ChecklistsItemCreate,
  ItemUpdate as ChecklistsItemUpdate
} from "../../apps/Checklists/screens";

interface StateProps {
  screen: NavigationScreen;
  modal: NavigationModal;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = StateProps & DispatchProps;

class Container extends React.PureComponent<Props> {
  readonly styles = StyleSheet.create({
    container: { flex: 1 }
  });
  readonly screens: { [key in NavigationScreen]: any } = {
    [NavigationScreen.PortfolioNotFound]: <PortfolioNotFound />,
    [NavigationScreen.PortfolioMain]: <PortfolioMain />,
    [NavigationScreen.PortfolioLanding]: <PortfolioLanding />,
    [NavigationScreen.PortfolioLogin]: <PortfolioLogin />,
    [NavigationScreen.PortfolioForgotPassword]: <PortfolioForgotPassword />,
    [NavigationScreen.Debug]: <DebugHome />,
    [NavigationScreen.DebugBall]: <DebugBall />,
    [NavigationScreen.DebugButtons]: <DebugButtons />,
    [NavigationScreen.DebugCards]: <DebugCards />,
    [NavigationScreen.DebugChat]: <DebugChat />,
    [NavigationScreen.DebugDrag]: <DebugDrag />,
    [NavigationScreen.DebugFonts]: <DebugFonts />,
    [NavigationScreen.DebugImageCollection]: <DebugImageCollection />,
    [NavigationScreen.DebugInput]: <DebugInput />,
    [NavigationScreen.DebugOKRs]: <DebugOKRs />,
    [NavigationScreen.DebugPinchSpread]: <DebugPinchSpread />,
    [NavigationScreen.DebugQuestionnaire]: <DebugQuestionnaire />,
    [NavigationScreen.DebugSearchBar]: <DebugSearchBar />,
    [NavigationScreen.DebugStopwatch]: <DebugStopwatch />,
    [NavigationScreen.CantHurtMeHome]: <CantHurtMeHome />,
    [NavigationScreen.ChecklistsList]: <ChecklistsList />,
    [NavigationScreen.ChecklistsListCreate]: <ChecklistsListCreate />,
    [NavigationScreen.ChecklistsListUpdate]: <ChecklistsListUpdate />,
    [NavigationScreen.ChecklistsLists]: <ChecklistsLists />,
    [NavigationScreen.ChecklistsItemCreate]: <ChecklistsItemCreate />,
    [NavigationScreen.ChecklistsItemUpdate]: <ChecklistsItemUpdate />
  };
  readonly modals: { [key in NavigationModal]: any } = {
    [NavigationModal.CantHurtMeSettings]: <CantHurtMeSettings />,
    [NavigationModal.CantHurtMeProfile]: <CantHurtMeProfile />,
    [NavigationModal.None]: <></>
  };

  render() {
    return (
      <View style={this.styles.container}>
        {this.screens[this.props.screen]}
        {this.modals[this.props.modal]}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  screen: getScreen(state),
  modal: getModal(state)
});

const mapDispatchToProps: DispatchProps = {
  navigate
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
