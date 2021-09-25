import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useCallback, useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  Dimensions,
  Keyboard,
  KeyboardEvent,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  changeAppStatus,
  changeKeyboardStatus,
  DimensionsProps,
  loadDevice,
  updateDimension,
  updateNetwork,
  useRootDispatch,
} from '../../redux';

export const useKeyboard = (): void => {
  const dispatch = useRootDispatch();
  const onShow = useCallback(
    (event: KeyboardEvent) =>
      dispatch(changeKeyboardStatus(event.endCoordinates.height)),
    [dispatch],
  );
  const onHide = useCallback(
    () => dispatch(changeKeyboardStatus(0)),
    [dispatch],
  );

  useEffect(() => {
    const android = Platform.OS === 'android';
    const show = android ? 'keyboardDidShow' : 'keyboardWillShow';
    const hide = android ? 'keyboardDidHide' : 'keyboardWillHide';
    Keyboard.addListener(show, onShow);
    Keyboard.addListener(hide, onHide);
    return () => {
      Keyboard.removeListener(show, onShow);
      Keyboard.removeListener(hide, onHide);
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
    const subscription = Dimensions.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
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
    const subscription = AppState.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
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

export const useDeviceInfo = (): void => {
  const dispatch = useRootDispatch();

  const onLoad = useCallback(async () => {
    const isEmulator = await DeviceInfo.isEmulator();
    dispatch(
      loadDevice({
        androidId: await DeviceInfo.getAndroidId(),
        apiLevel: await DeviceInfo.getApiLevel(),
        applicationName: await DeviceInfo.getApplicationName(),
        availableLocationProviders:
          await DeviceInfo.getAvailableLocationProviders(),
        baseOs: await DeviceInfo.getBaseOs(),
        buildId: await DeviceInfo.getBuildId(),
        batteryLevel: isEmulator ? 0 : await DeviceInfo.getBatteryLevel(),
        bootloader: await DeviceInfo.getBootloader(),
        brand: await DeviceInfo.getBrand(),
        buildNumber: await DeviceInfo.getBuildNumber(),
        bundleId: await DeviceInfo.getBundleId(),
        isCameraPresent: await DeviceInfo.isCameraPresent(),
        carrier: await DeviceInfo.getCarrier(),
        codename: await DeviceInfo.getCodename(),
        device: await DeviceInfo.getDevice(),
        deviceId: await DeviceInfo.getDeviceId(),
        deviceType: await DeviceInfo.getDeviceType(),
        display: await DeviceInfo.getDisplay(),
        deviceName: await DeviceInfo.getDeviceName(),
        deviceToken: isEmulator ? '' : await DeviceInfo.getDeviceToken(),
        firstInstallTime: await DeviceInfo.getFirstInstallTime(),
        fingerprint: await DeviceInfo.getFingerprint(),
        fontScale: await DeviceInfo.getFontScale(),
        freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
        hardware: await DeviceInfo.getHardware(),
        host: await DeviceInfo.getHost(),
        ipAddress: await DeviceInfo.getIpAddress(),
        incremental: await DeviceInfo.getIncremental(),
        installerPackageName: await DeviceInfo.getInstallerPackageName(),
        installReferrer: await DeviceInfo.getInstallReferrer(),
        instanceId: await DeviceInfo.getInstanceId(),
        lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
        macAddress: await DeviceInfo.getMacAddress(),
        manufacturer: await DeviceInfo.getManufacturer(),
        maxMemory: await DeviceInfo.getMaxMemory(),
        model: await DeviceInfo.getModel(),
        phoneNumber: await DeviceInfo.getPhoneNumber(),
        powerState: isEmulator ? null : await DeviceInfo.getPowerState(),
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
        hasGms: await DeviceInfo.hasGms(),
        hasHms: await DeviceInfo.hasHms(),
        hasNotch: await DeviceInfo.hasNotch(),
        isAirplaneMode: await DeviceInfo.isAirplaneMode(),
        isBatteryCharging: isEmulator
          ? false
          : await DeviceInfo.isBatteryCharging(),
        isEmulator,
        isLandscape: await DeviceInfo.isLandscape(),
        isLocationEnabled: await DeviceInfo.isLocationEnabled(),
        isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
        isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
        isTablet: await DeviceInfo.isTablet(),
        supported32BitAbis: await DeviceInfo.supported32BitAbis(),
        supported64BitAbis: await DeviceInfo.supported64BitAbis(),
        supportedAbis: await DeviceInfo.supportedAbis(),
        syncUniqueId: await DeviceInfo.syncUniqueId(),
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);
};
