import * as React from "react";
import {
  AppState,
  AppStateStatus,
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  Keyboard,
  NetInfo
} from "react-native";
import { connect } from "react-redux";
import { Route, Router, Switch } from "../../components";
import { onAppLoad, onAppStateChange } from "../../models/App";
import {
  DimensionsProps,
  onDeviceLoad,
  onDeviceUpdateBattery,
  onDeviceUpdateFingerprint,
  onDimensionChange,
  onKeyboardChange,
  onNetworkChange
} from "../../models/Device";
import { Debug, Landing, Login, Main, NotFound } from "../../screens";

interface DispatchProps {
  onAppLoad: typeof onAppLoad;
  onAppStateChange: typeof onAppStateChange;
  onNetworkChange: typeof onNetworkChange;
  onDimensionChange: typeof onDimensionChange;
  onDeviceUpdateFingerprint: typeof onDeviceUpdateFingerprint;
  onDeviceUpdateBattery: typeof onDeviceUpdateBattery;
  onDeviceLoad: typeof onDeviceLoad;
  onKeyboardChange: typeof onKeyboardChange;
}

type Props = DispatchProps;

class Component extends React.PureComponent<Props> {
  public componentDidMount() {
    this.enableListeners();
  }

  public componentWillUnmount() {
    this.disableListeners();
  }

  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/debug" component={Debug} />
          <Route auth path="/app" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }

  private enableListeners() {
    Dimensions.addEventListener("change", this.onDimensionChange);
    NetInfo.addEventListener("connectionChange", this.onNetworkChange);
    AppState.addEventListener("change", this.onAppStateChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide);
  }

  private disableListeners() {
    NetInfo.removeEventListener("connectionChange", this.onNetworkChange);
    AppState.removeEventListener("change", this.onAppStateChange);
    Dimensions.removeEventListener("change", this.onDimensionChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", this.onKeyboardDidHide);
  }

  private onNetworkChange = (change: ConnectionType | ConnectionInfo) => {
    this.props.onNetworkChange(change);
  };

  private onDimensionChange = (change: DimensionsProps) => {
    this.props.onDimensionChange(change);
  };

  private onAppStateChange = (change: AppStateStatus) => {
    this.props.onAppStateChange(change);

  private onKeyboardDidShow = () => {
    this.props.onKeyboardChange(true);
  };

  private onKeyboardDidHide = () => {
    this.props.onKeyboardChange(false);
  };
}

export const App = connect(
  null,
  {
    onAppLoad,
    onAppStateChange,
    onDeviceLoad,
    onDeviceUpdateBattery,
    onDeviceUpdateFingerprint,
    onDimensionChange,
    onKeyboardChange,
    onNetworkChange
  }
)(Component);
