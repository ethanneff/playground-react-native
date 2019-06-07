import * as React from "react";
import {
  AppState,
  AppStateStatus,
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  NetInfo
} from "react-native";
import { connect } from "react-redux";
import {
  DimensionsProps,
  changeAppStatus,
  updateDimensions,
  updateNetwork
} from "../../models";
import { Navigation } from "../Navigation";

interface DispatchProps {
  changeAppStatus: typeof changeAppStatus;
  updateNetwork: typeof updateNetwork;
  updateDimensions: typeof updateDimensions;
}

type Props = DispatchProps;

class Component extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.enableListeners();
  }

  public componentWillUnmount() {
    this.disableListeners();
  }

  public render() {
    return <Navigation />;
  }

  private enableListeners() {
    NetInfo.addEventListener("connectionChange", this.updateNetwork);
    Dimensions.addEventListener("change", this.updateDimensions);
    AppState.addEventListener("change", this.onAppStateChange);
  }

  private disableListeners() {
    NetInfo.removeEventListener("connectionChange", this.updateNetwork);
    Dimensions.removeEventListener("change", this.updateDimensions);
    AppState.removeEventListener("change", this.onAppStateChange);
  }

  private updateNetwork = (change: ConnectionType | ConnectionInfo) => {
    if (typeof change === "string") {
      return;
    }
    this.props.updateNetwork(change);
  };

  private updateDimensions = (change: DimensionsProps) => {
    this.props.updateDimensions(change);
  };

  private onAppStateChange = (change: AppStateStatus) => {
    this.props.changeAppStatus(change);
  };
}

export const App = connect(
  null,
  {
    changeAppStatus,
    updateDimensions,
    updateNetwork
  }
)(Component);
