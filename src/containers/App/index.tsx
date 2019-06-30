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
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import {
  changeAppStatus,
  changeKeyboardStatus,
  DimensionsProps,
  generateAppInitialState,
  generateDeviceInitialState,
  loadApp,
  loadDevice,
  updateBattery,
  updateDimensions,
  updateFingerprint,
  updateNetwork
} from "../../models";
import { Navigation } from "../Navigation";

interface DispatchProps {
  loadApp: typeof loadApp;
  changeAppStatus: typeof changeAppStatus;
  updateNetwork: typeof updateNetwork;
  updateDimensions: typeof updateDimensions;
  updateFingerprint: typeof updateFingerprint;
  updateBattery: typeof updateBattery;
  loadDevice: typeof loadDevice;
  changeKeyboardStatus: typeof changeKeyboardStatus;
}

type Props = DispatchProps;

class Component extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.setProperties();
    this.enableListeners();
  }

  public componentWillUnmount() {
    this.disableListeners();
  }

  public render() {
    return <Navigation />;
  }

  private setProperties() {
    this.props.loadApp(generateAppInitialState());
    this.props.loadDevice(generateDeviceInitialState());
    if (DeviceInfo.isEmulator()) {
      return;
    }
    DeviceInfo.isPinOrFingerprintSet((isPinOrFingerprintSet: boolean) =>
      this.props.updateFingerprint(isPinOrFingerprintSet)
    );
    DeviceInfo.getBatteryLevel().then((batteryLevel: number) =>
      this.props.updateBattery(batteryLevel)
    );
  }

  private enableListeners() {
    NetInfo.addEventListener("connectionChange", this.updateNetwork);
    Dimensions.addEventListener("change", this.updateDimensions);
    AppState.addEventListener("change", this.onAppStateChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide);
  }

  private disableListeners() {
    NetInfo.removeEventListener("connectionChange", this.updateNetwork);
    Dimensions.removeEventListener("change", this.updateDimensions);
    AppState.removeEventListener("change", this.onAppStateChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", this.onKeyboardDidHide);
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

  private onKeyboardDidShow = () => {
    this.props.changeKeyboardStatus(true);
  };

  private onKeyboardDidHide = () => {
    this.props.changeKeyboardStatus(false);
  };
}

export const App = connect(
  null,
  {
    changeAppStatus,
    changeKeyboardStatus,
    loadApp,
    loadDevice,
    updateBattery,
    updateDimensions,
    updateFingerprint,
    updateNetwork
  }
)(Component);
