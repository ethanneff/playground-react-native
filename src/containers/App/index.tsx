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
import VersionNumber from "react-native-version-number";
import { connect } from "react-redux";
import { Route, Router, Switch } from "../../components";
import {
  DimensionsProps,
  loadApp,
  changeAppStatus,
  updateBattery,
  loadDevice,
  updateDimensions,
  updateFingerprint,
  changeKeyboardStatus,
  updateNetwork
} from "../../models";
import { Debug, Landing, Login, Main, NotFound } from "../../screens";

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

  private setProperties() {
    this.props.loadApp({
      appVersion: VersionNumber.appVersion,
      applicationName: DeviceInfo.getApplicationName(),
      buildNumber: DeviceInfo.getBuildNumber(),
      buildVersion: VersionNumber.buildVersion,
      bundleIdentifier:
        DeviceInfo.getBundleId() || VersionNumber.bundleIdentifier,
      keyboardVisible: false,
      readableVersion: DeviceInfo.getReadableVersion(),
      status: AppState.currentState,
      version: DeviceInfo.getVersion()
    });
    this.props.loadDevice({
      apiLevel: DeviceInfo.getAPILevel(),
      brand: DeviceInfo.getBrand(),
      carrier: DeviceInfo.getCarrier(),
      deviceCountry: DeviceInfo.getDeviceCountry(),
      deviceId: DeviceInfo.getDeviceId(),
      deviceLocale: DeviceInfo.getDeviceLocale(),
      deviceName: DeviceInfo.getDeviceName(),
      firstInstallTime: DeviceInfo.getFirstInstallTime(),
      fontScale: DeviceInfo.getFontScale(),
      freeDiskStorage: DeviceInfo.getFreeDiskStorage(),
      installReferrer: DeviceInfo.getInstallReferrer(),
      instanceId: DeviceInfo.getInstanceID(),
      is24Hour: DeviceInfo.is24Hour(),
      isEmulator: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),
      lastUpdateTime: DeviceInfo.getLastUpdateTime(),
      manufacturer: DeviceInfo.getManufacturer(),
      maxMemory: DeviceInfo.getMaxMemory(),
      model: DeviceInfo.getModel(),
      phoneNumber: DeviceInfo.getPhoneNumber(),
      screenDimensions: Dimensions.get("screen"),
      serialNumber: DeviceInfo.getSerialNumber(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      timezone: DeviceInfo.getTimezone(),
      totalDiskCapacity: DeviceInfo.getTotalDiskCapacity(),
      totalMemory: DeviceInfo.getTotalMemory(),
      uniqueId: DeviceInfo.getUniqueID(),
      userAgent: DeviceInfo.getUserAgent(),
      windowDimensions: Dimensions.get("window")
    });
    if (DeviceInfo.isEmulator()) return;
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
    loadApp,
    changeAppStatus,
    updateBattery,
    loadDevice,
    updateDimensions,
    updateFingerprint,
    changeKeyboardStatus,
    updateNetwork
  }
)(Component);
