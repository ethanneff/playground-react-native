import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus, Dimensions, Keyboard } from "react-native";
import DeviceInfo from "react-native-device-info";
import {
  DimensionsProps,
  changeAppStatus,
  changeKeyboardStatus,
  loadDevice,
  updateDimension,
  updateNetwork
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
    (change: DimensionsProps) => dispatch(updateDimension(change)),
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

export const useDeviceInfo = async () => {
  const dispatch = useRootDispatch();
  dispatch(
    loadDevice({
      androidId: await DeviceInfo.getAndroidId(),
      apiLevel: await DeviceInfo.getApiLevel(),
      applicationName: await DeviceInfo.getApplicationName(),
      availableLocationProviders: await DeviceInfo.getAvailableLocationProviders(),
      baseOs: await DeviceInfo.getBaseOs(),
      buildId: await DeviceInfo.getBuildId(),
      batteryLevel: await DeviceInfo.getBatteryLevel(),
      bootloader: await DeviceInfo.getBootloader(),
      brand: await DeviceInfo.getBrand(),
      buildNumber: await DeviceInfo.getBuildNumber(),
      bundleId: await DeviceInfo.getBundleId(),
      carrier: await DeviceInfo.isCameraPresent(),
      codename: await DeviceInfo.getCarrier(),
      device: await DeviceInfo.getCodename(),
      deviceId: await DeviceInfo.getDevice(),
      deviceType: await DeviceInfo.getDeviceId(),
      display: await DeviceInfo.getDeviceType(),
      deviceName: await DeviceInfo.getDisplay(),
      firstInstallTime: await DeviceInfo.getDeviceName(),
      fingerprint: await DeviceInfo.getFirstInstallTime(),
      fontScale: await DeviceInfo.getFingerprint(),
      freeDiskStorage: await DeviceInfo.getFontScale(),
      hardware: await DeviceInfo.getFreeDiskStorage(),
      host: await DeviceInfo.getHardware(),
      ipAddress: await DeviceInfo.getHost(),
      incremental: await DeviceInfo.getIpAddress(),
      installReferrer: await DeviceInfo.getIncremental(),
      instanceId: await DeviceInfo.getInstallReferrer(),
      lastUpdateTime: await DeviceInfo.getInstanceId(),
      macAddress: await DeviceInfo.getLastUpdateTime(),
      manufacturer: await DeviceInfo.getMacAddress(),
      maxMemory: await DeviceInfo.getManufacturer(),
      model: await DeviceInfo.getMaxMemory(),
      phoneNumber: await DeviceInfo.getModel(),
      powerState: await DeviceInfo.getPhoneNumber(),
      product: await DeviceInfo.getPowerState(),
      previewSdkInt: await DeviceInfo.getProduct(),
      readableVersion: await DeviceInfo.getPreviewSdkInt(),
      serialNumber: await DeviceInfo.getReadableVersion(),
      securityPatch: await DeviceInfo.getSerialNumber(),
      systemAvailableFeatures: await DeviceInfo.getSecurityPatch(),
      systemName: await DeviceInfo.getSystemAvailableFeatures(),
      systemVersion: await DeviceInfo.getSystemName(),
      tags: await DeviceInfo.getSystemVersion(),
      type: await DeviceInfo.getTags(),
      totalDiskCapacity: await DeviceInfo.getType(),
      totalMemory: await DeviceInfo.getTotalDiskCapacity(),
      uniqueId: await DeviceInfo.getTotalMemory(),
      usedMemory: await DeviceInfo.getUniqueId(),
      userAgent: await DeviceInfo.getUsedMemory(),
      version: await DeviceInfo.getUserAgent(),
      hasNotch: await DeviceInfo.getVersion(),
      hasSystemFeature: await DeviceInfo.hasNotch(),
      isAirplaneMode: await DeviceInfo.hasSystemFeature(),
      isBatteryCharging: await DeviceInfo.isAirplaneMode(),
      isCameraPresence: await DeviceInfo.isBatteryCharging(),
      isEmulator: await DeviceInfo.isEmulator(),
      isLandscape: await DeviceInfo.isLandscape(),
      isLocationEnabled: await DeviceInfo.isLocationEnabled(),
      isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
      isTablet: await DeviceInfo.isTablet(),
      supported32BitAbis: await DeviceInfo.supported32BitAbis(),
      supported64BitAbis: await DeviceInfo.supported64BitAbis(),
      supportedAbis: await DeviceInfo.supportedAbis()
    })
  );
};
