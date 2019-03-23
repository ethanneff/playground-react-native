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
  onAppLoad,
  onAppStatusChange,
  onBatteryChange,
  onDeviceLoad,
  onDimensionChange,
  onFingerprintChange,
  onKeyboardChange,
  onNetworkChange
} from "../../models";
import { Debug, Landing, Login, Main, NotFound } from "../../screens";

interface DispatchProps {
  onAppLoad: typeof onAppLoad;
  onAppStatusChange: typeof onAppStatusChange;
  onNetworkChange: typeof onNetworkChange;
  onDimensionChange: typeof onDimensionChange;
  onFingerprintChange: typeof onFingerprintChange;
  onBatteryChange: typeof onBatteryChange;
  onDeviceLoad: typeof onDeviceLoad;
  onKeyboardChange: typeof onKeyboardChange;
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
    this.props.onAppLoad({
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
    this.props.onDeviceLoad({
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
    DeviceInfo.isPinOrFingerprintSet((isPinOrFingerprintSet: boolean) =>
      this.props.onFingerprintChange(isPinOrFingerprintSet)
    );
    DeviceInfo.getBatteryLevel().then((batteryLevel: number) =>
      this.props.onBatteryChange(batteryLevel)
    );
  }

  private enableListeners() {
    NetInfo.addEventListener("connectionChange", this.onNetworkChange);
    Dimensions.addEventListener("change", this.onDimensionChange);
    AppState.addEventListener("change", this.onAppStateChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHide);
  }

  private disableListeners() {
    NetInfo.removeEventListener("connectionChange", this.onNetworkChange);
    Dimensions.removeEventListener("change", this.onDimensionChange);
    AppState.removeEventListener("change", this.onAppStateChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", this.onKeyboardDidHide);
  }

  private onNetworkChange = (change: ConnectionType | ConnectionInfo) => {
    if (typeof change === "string") {
      return;
    }
    this.props.onNetworkChange(change);
  };

  private onDimensionChange = (change: DimensionsProps) => {
    this.props.onDimensionChange(change);
  };

  private onAppStateChange = (change: AppStateStatus) => {
    this.props.onAppStatusChange(change);
  };

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
    onAppStatusChange,
    onBatteryChange,
    onDeviceLoad,
    onDimensionChange,
    onFingerprintChange,
    onKeyboardChange,
    onNetworkChange
  }
)(Component);
