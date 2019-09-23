import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus, Dimensions, Keyboard } from "react-native";
import DeviceInfo from "react-native-device-info";
import {
  DimensionsProps,
  updateDimensions,
  updateNetwork,
  changeKeyboardStatus,
  changeAppStatus,
  deviceInfoInitialState,
  loadDevice
} from "../../models";
import { useRootDispatch } from "../../utils";

export const useKeyboard = () => {
  const dispatch = useRootDispatch();
  const onShow = useCallback(() => dispatch(changeKeyboardStatus(true)), [
    dispatch
  ]);
  const onHide = useCallback(() => dispatch(changeKeyboardStatus(false)), [
    dispatch
  ]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onShow);
    Keyboard.addListener("keyboardDidHide", onHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", onShow);
      Keyboard.removeListener("keyboardDidHide", onHide);
    };
  }, [onShow, onHide]);
};

export const useDimensions = () => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: DimensionsProps) => dispatch(updateDimensions(change)),
    [dispatch]
  );

  useEffect(() => {
    Dimensions.addEventListener("change", handleChange);
    return () => {
      Dimensions.removeEventListener("change", handleChange);
    };
  }, [handleChange, dispatch]);
};

export const useAppState = () => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: AppStateStatus) => dispatch(changeAppStatus(change)),
    [dispatch]
  );

  useEffect(() => {
    AppState.addEventListener("change", handleChange);
    return () => {
      AppState.removeEventListener("change", handleChange);
    };
  }, [handleChange]);
};

export const useNetInfo = () => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: NetInfoState) => dispatch(updateNetwork(change)),
    [dispatch]
  );

  useEffect(() => {
    return NetInfo.addEventListener(handleChange);
  }, [handleChange]);
};

export const useDeviceInfo = () => {
  const dispatch = useRootDispatch();
  const result = deviceInfoInitialState;
  useEffect(() => {
    Promise.all([
      DeviceInfo.getAndroidId().then(
        (value: string) => (result.androidId = value)
      ),
      DeviceInfo.getApiLevel().then(
        (value: number) => (result.apiLevel = value)
      ),
      DeviceInfo.getApplicationName().then(
        (value: string) => (result.applicationName = value)
      ),
      DeviceInfo.getAvailableLocationProviders().then(
        (value: string[]) => (result.availableLocationProviders = value)
      ),
      DeviceInfo.getBaseOs().then((value: string) => (result.baseOs = value)),
      DeviceInfo.getBuildId().then((value: string) => (result.buildId = value)),
      DeviceInfo.getBatteryLevel().then(
        (value: number) => (result.batteryLevel = value)
      ),
      DeviceInfo.getBootloader().then(
        (value: string) => (result.bootloader = value)
      ),
      DeviceInfo.getBrand().then((value: string) => (result.brand = value)),
      DeviceInfo.getBuildNumber().then(
        (value: string) => (result.buildNumber = value)
      ),
      DeviceInfo.getBundleId().then(
        (value: string) => (result.bundleId = value)
      ),
      DeviceInfo.getCameraPresence().then(
        (value: boolean) => (result.cameraPresence = value)
      ),
      DeviceInfo.getCarrier().then((value: string) => (result.carrier = value)),
      DeviceInfo.getCodename().then(
        (value: string) => (result.codename = value)
      ),
      DeviceInfo.getDevice().then((value: string) => (result.device = value)),
      DeviceInfo.getDeviceId().then(
        (value: string) => (result.deviceId = value)
      ),
      DeviceInfo.getDeviceType().then(
        (value: string) => (result.deviceType = value)
      ),
      DeviceInfo.getDisplay().then((value: string) => (result.display = value)),
      DeviceInfo.getDeviceName().then(
        (value: string) => (result.deviceName = value)
      ),
      DeviceInfo.getFirstInstallTime().then(
        (value: number) => (result.firstInstallTime = value)
      ),
      DeviceInfo.getFingerprint().then(
        (value: string) => (result.fingerprint = value)
      ),
      DeviceInfo.getFontScale().then(
        (value: number) => (result.fontScale = value)
      ),
      DeviceInfo.getFreeDiskStorage().then(
        (value: number) => (result.freeDiskStorage = value)
      ),
      DeviceInfo.getHardware().then(
        (value: string) => (result.hardware = value)
      ),
      DeviceInfo.getHost().then((value: string) => (result.host = value)),
      DeviceInfo.getIpAddress().then(
        (value: string) => (result.ipAddress = value)
      ),
      DeviceInfo.getIncremental().then(
        (value: string) => (result.incremental = value)
      ),
      DeviceInfo.getInstallReferrer().then(
        (value: string) => (result.installReferrer = value)
      ),
      DeviceInfo.getInstanceId().then(
        (value: string) => (result.instanceId = value)
      ),
      DeviceInfo.getLastUpdateTime().then(
        (value: number) => (result.lastUpdateTime = value)
      ),
      DeviceInfo.getMacAddress().then(
        (value: string) => (result.macAddress = value)
      ),
      DeviceInfo.getManufacturer().then(
        (value: string) => (result.manufacturer = value)
      ),
      DeviceInfo.getMaxMemory().then(
        (value: string) => (result.maxMemory = value)
      ),
      DeviceInfo.getModel().then((value: string) => (result.model = value)),
      DeviceInfo.getPhoneNumber().then(
        (value: string) => (result.phoneNumber = value)
      ),
      DeviceInfo.getPowerState().then(
        (value: object) => (result.powerState = value)
      ),
      DeviceInfo.getProduct().then((value: string) => (result.product = value)),
      DeviceInfo.getPreviewSdkInt().then(
        (value: number) => (result.previewSdkInt = value)
      ),
      DeviceInfo.getReadableVersion().then(
        (value: string) => (result.readableVersion = value)
      ),
      DeviceInfo.getSerialNumber().then(
        (value: string) => (result.serialNumber = value)
      ),
      DeviceInfo.getSecurityPatch().then(
        (value: string) => (result.securityPatch = value)
      ),
      DeviceInfo.getSystemAvailableFeatures().then(
        (value: string[]) => (result.systemAvailableFeatures = value)
      ),
      DeviceInfo.getSystemName().then(
        (value: string) => (result.systemName = value)
      ),
      DeviceInfo.getSystemVersion().then(
        (value: string) => (result.systemVersion = value)
      ),
      DeviceInfo.getTags().then((value: string) => (result.tags = value)),
      DeviceInfo.getType().then((value: string) => (result.type = value)),
      DeviceInfo.getTotalDiskCapacity().then(
        (value: number) => (result.totalDiskCapacity = value)
      ),
      DeviceInfo.getTotalMemory().then(
        (value: string) => (result.totalMemory = value)
      ),
      DeviceInfo.getUniqueId().then(
        (value: string) => (result.uniqueId = value)
      ),
      DeviceInfo.getUsedMemory().then(
        (value: number) => (result.usedMemory = value)
      ),
      DeviceInfo.getUserAgent().then(
        (value: string) => (result.userAgent = value)
      ),
      DeviceInfo.getVersion().then((value: string) => (result.version = value)),
      DeviceInfo.hasNotch().then((value: boolean) => (result.hasNotch = value)),
      DeviceInfo.hasSystemFeature().then(
        (value: boolean) => (result.hasSystemFeature = value)
      ),
      DeviceInfo.isAirplaneMode().then(
        (value: boolean) => (result.isAirplaneMode = value)
      ),
      DeviceInfo.isBatteryCharging().then(
        (value: boolean) => (result.isBatteryCharging = value)
      ),
      DeviceInfo.isEmulator().then(
        (value: boolean) => (result.isEmulator = value)
      ),
      DeviceInfo.isLandscape().then(
        (value: boolean) => (result.isLandscape = value)
      ),
      DeviceInfo.isLocationEnabled().then(
        (value: boolean) => (result.isLocationEnabled = value)
      ),
      DeviceInfo.isPinOrFingerprintSet().then(
        (value: boolean) => (result.isPinOrFingerprintSet = value)
      ),
      DeviceInfo.isTablet().then((value: boolean) => (result.isTablet = value)),
      DeviceInfo.supported32BitAbis().then(
        (value: string[]) => (result.supported32BitAbis = value)
      ),
      DeviceInfo.supported64BitAbis().then(
        (value: string[]) => (result.supported64BitAbis = value)
      ),
      DeviceInfo.supportedAbis().then(
        (value: string[]) => (result.supportedAbis = value)
      )
    ]).then(() => dispatch(loadDevice(result)));
  }, [dispatch, result]);
};
