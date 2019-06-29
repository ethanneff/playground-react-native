import * as React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "..";
import {
  Home as CantHurtMeHome,
  Profile as CantHurtMeProfile,
  Settings as CantHurtMeSettings
} from "../../apps/CantHurtMe/screens";
import {
  ItemCreate as ChecklistsItemCreate,
  ItemUpdate as ChecklistsItemUpdate,
  List as ChecklistsList,
  ListCreate as ChecklistsListCreate,
  Lists as ChecklistsLists,
  ListUpdate as ChecklistsListUpdate
} from "../../apps/Checklists/screens";
import {
  Ball as DebugBall,
  Buttons as DebugButtons,
  Cards as DebugCards,
  Chat as DebugChat,
  Drag as DebugDrag,
  Fonts as DebugFonts,
  Home as DebugHome,
  ImageCollection as DebugImageCollection,
  Input as DebugInput,
  OKRs as DebugOKRs,
  PinchSpread as DebugPinchSpread,
  Questionnaire as DebugQuestionnaire,
  SearchBar as DebugSearchBar,
  Stopwatch as DebugStopwatch,
  SwipeCell as DebugSwipeCell
} from "../../apps/Debug/screens";
import {
  ForgotPassword as PortfolioForgotPassword,
  Landing as PortfolioLanding,
  Login as PortfolioLogin,
  Main as PortfolioMain,
  NotFound as PortfolioNotFound
} from "../../apps/Portfolio/screens";
import {
  getModal,
  getScreen,
  navigate,
  NavigationModal,
  NavigationScreen
} from "../../models";

interface StateProps {
  screen: NavigationScreen;
  modal: NavigationModal;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = StateProps & DispatchProps;

class Container extends React.PureComponent<Props> {
  public readonly styles = StyleSheet.create({
    container: { flex: 1 }
  });
  public readonly screens: { [key in NavigationScreen]: any } = {
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
    [NavigationScreen.DebugSwipeCell]: <DebugSwipeCell />,
    [NavigationScreen.CantHurtMeHome]: <CantHurtMeHome />,
    [NavigationScreen.ChecklistsList]: <ChecklistsList />,
    [NavigationScreen.ChecklistsListCreate]: <ChecklistsListCreate />,
    [NavigationScreen.ChecklistsListUpdate]: <ChecklistsListUpdate />,
    [NavigationScreen.ChecklistsLists]: <ChecklistsLists />,
    [NavigationScreen.ChecklistsItemCreate]: <ChecklistsItemCreate />,
    [NavigationScreen.ChecklistsItemUpdate]: <ChecklistsItemUpdate />
  };
  public readonly modals: { [key in NavigationModal]: any } = {
    [NavigationModal.CantHurtMeSettings]: <CantHurtMeSettings />,
    [NavigationModal.CantHurtMeProfile]: <CantHurtMeProfile />,
    [NavigationModal.None]: <></>
  };

  public render() {
    return (
      <View style={this.styles.container}>
        {this.screens[this.props.screen]}
        {this.modals[this.props.modal]}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  modal: getModal(state),
  screen: getScreen(state)
});

const mapDispatchToProps: DispatchProps = {
  navigate
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
