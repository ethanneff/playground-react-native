import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useCallback, useEffect} from 'react';
import {AppState, AppStateStatus, Dimensions, Keyboard} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  DimensionsProps,
  changeAppStatus,
  changeKeyboardStatus,
  loadDevice,
  updateDimension,
  updateNetwork,
} from '../../models';
import {useRootDispatch} from '../../utils';

export const useKeyboard = (): void => {
  const dispatch = useRootDispatch();
  const onShow = useCallback(() => dispatch(changeKeyboardStatus(true)), [
    dispatch,
  ]);
  const onHide = useCallback(() => dispatch(changeKeyboardStatus(false)), [
    dispatch,
  ]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onShow);
    Keyboard.addListener('keyboardDidHide', onHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onShow);
      Keyboard.removeListener('keyboardDidHide', onHide);
    };
  }, [onShow, onHide]);
};

export const useDimensions = (): void => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: DimensionsProps) => dispatch(updateDimension(change)),
    [dispatch],
  );

  useEffect(() => {
    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [handleChange, dispatch]);
};

export const useAppState = (): void => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: AppStateStatus) => dispatch(changeAppStatus(change)),
    [dispatch],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, [handleChange]);
};

export const useNetInfo = (): void => {
  const dispatch = useRootDispatch();

  const handleChange = useCallback(
    (change: NetInfoState) => dispatch(updateNetwork(change)),
    [dispatch],
  );

  useEffect(() => {
    return NetInfo.addEventListener(handleChange);
  }, [handleChange]);
};

export const useDeviceInfo = async (): Promise<void> => {
  const dispatch = useRootDispatch();
  dispatch(
    loadDevice({
      androidId: await DeviceInfo.getAndroidId(),
      apiLevel: await DeviceInfo.getApiLevel(),
      applicationName: await DeviceInfo.getApplicationName(),
      availableLocationProviders: await DeviceInfo.getAvailableLocationProviders(),
      baseOs: await DeviceInfo.getBaseOs(),
      buildId: await DeviceInfo.getBuildId(),
      batteryLevel: __DEV__
        ? Promise.resolve(0)
        : await DeviceInfo.getBatteryLevel(),
      bootloader: await DeviceInfo.getBootloader(),
      brand: await DeviceInfo.getBrand(),
      buildNumber: await DeviceInfo.getBuildNumber(),
      bundleId: await DeviceInfo.getBundleId(),
      carrier: await DeviceInfo.getCarrier(),
      codename: await DeviceInfo.getCodename(),
      device: await DeviceInfo.getDevice(),
      deviceId: await DeviceInfo.getDeviceId(),
      deviceType: await DeviceInfo.getDeviceType(),
      deviceToken: __DEV__
        ? Promise.resolve('')
        : await DeviceInfo.getDeviceToken(),
      display: await DeviceInfo.getDisplay(),
      deviceName: await DeviceInfo.getDeviceName(),
      firstInstallTime: await DeviceInfo.getFirstInstallTime(),
      fingerprint: await DeviceInfo.getFingerprint(),
      fontScale: await DeviceInfo.getFontScale(),
      freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
      hardware: await DeviceInfo.getHardware(),
      host: await DeviceInfo.getHost(),
      ipAddress: await DeviceInfo.getIpAddress(),
      incremental: await DeviceInfo.getIncremental(),
      installReferrer: await DeviceInfo.getInstallReferrer(),
      instanceId: await DeviceInfo.getInstanceId(),
      lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
      macAddress: await DeviceInfo.getMacAddress(),
      manufacturer: await DeviceInfo.getManufacturer(),
      maxMemory: await DeviceInfo.getMaxMemory(),
      model: await DeviceInfo.getModel(),
      phoneNumber: await DeviceInfo.getPhoneNumber(),
      powerState: __DEV__
        ? Promise.resolve('')
        : await DeviceInfo.getPowerState(),
      product: await DeviceInfo.getProduct(),
      previewSdkInt: await DeviceInfo.getPreviewSdkInt(),
      readableVersion: await DeviceInfo.getReadableVersion(),
      serialNumber: await DeviceInfo.getSerialNumber(),
      securityPatch: await DeviceInfo.getSecurityPatch(),
      systemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
      systemName: await DeviceInfo.getSystemName(),
      systemVersion: await DeviceInfo.getSystemVersion(),
      tags: await DeviceInfo.getTags(),
      type: await DeviceInfo.getType(),
      totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
      totalMemory: await DeviceInfo.getTotalMemory(),
      uniqueId: await DeviceInfo.getUniqueId(),
      usedMemory: await DeviceInfo.getUsedMemory(),
      userAgent: await DeviceInfo.getUserAgent(),
      version: await DeviceInfo.getVersion(),
      hasNotch: await DeviceInfo.hasNotch(),
      hasSystemFeature: await DeviceInfo.hasSystemFeature(),
      isAirplaneMode: await DeviceInfo.isAirplaneMode(),
      isBatteryCharging: __DEV__
        ? Promise.resolve(true)
        : await DeviceInfo.isBatteryCharging(),
      isCameraPresence: await DeviceInfo.isCameraPresent(),
      isEmulator: await DeviceInfo.isEmulator(),
      isLandscape: await DeviceInfo.isLandscape(),
      isLocationEnabled: await DeviceInfo.isLocationEnabled(),
      isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
      isTablet: await DeviceInfo.isTablet(),
      supported32BitAbis: await DeviceInfo.supported32BitAbis(),
      supported64BitAbis: await DeviceInfo.supported64BitAbis(),
      supportedAbis: await DeviceInfo.supportedAbis(),
    }),
  );
};
