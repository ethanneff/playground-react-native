import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useCallback, useEffect } from 'react';
import {
  AppState,
  type AppStateStatus,
  Dimensions,
  Keyboard,
  type KeyboardEvent,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as Localize from 'react-native-localize';
import {
  changeAppStatus,
  changeKeyboardStatus,
  loadDevice,
  updateDimension,
  updateNetwork,
  useRootDispatch,
} from '../../redux';
import { type DimensionsProps } from './types';

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
    const showListener = Keyboard.addListener(show, onShow);
    const hideListener = Keyboard.addListener(hide, onHide);
    return () => {
      showListener.remove();
      hideListener.remove();
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
    const subscription = NetInfo.addEventListener(handleChange);
    return () => {
      subscription();
    };
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
        applicationName: DeviceInfo.getApplicationName(),
        availableLocationProviders:
          await DeviceInfo.getAvailableLocationProviders(),
        baseOs: await DeviceInfo.getBaseOs(),
        batteryLevel: isEmulator ? 0 : await DeviceInfo.getBatteryLevel(),
        bootloader: await DeviceInfo.getBootloader(),
        brand: DeviceInfo.getBrand(),
        buildId: await DeviceInfo.getBuildId(),
        buildNumber: DeviceInfo.getBuildNumber(),
        bundleId: DeviceInfo.getBundleId(),
        calendar: Localize.getCalendar(),
        carrier: await DeviceInfo.getCarrier(),
        codename: await DeviceInfo.getCodename(),
        country: Localize.getCountry(),
        currencies: Localize.getCurrencies(),
        device: await DeviceInfo.getDevice(),
        deviceId: DeviceInfo.getDeviceId(),
        deviceName: await DeviceInfo.getDeviceName(),
        deviceToken: isEmulator ? '' : await DeviceInfo.getDeviceToken(),
        deviceType: DeviceInfo.getDeviceType(),
        display: await DeviceInfo.getDisplay(),
        fingerprint: await DeviceInfo.getFingerprint(),
        firstInstallTime: await DeviceInfo.getFirstInstallTime(),
        fontScale: await DeviceInfo.getFontScale(),
        freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
        hardware: await DeviceInfo.getHardware(),
        hasGms: await DeviceInfo.hasGms(),
        hasHms: await DeviceInfo.hasHms(),
        hasNotch: DeviceInfo.hasNotch(),
        host: await DeviceInfo.getHost(),
        incremental: await DeviceInfo.getIncremental(),
        installReferrer: await DeviceInfo.getInstallReferrer(),
        installerPackageName: await DeviceInfo.getInstallerPackageName(),
        instanceId: await DeviceInfo.getInstanceId(),
        ipAddress: await DeviceInfo.getIpAddress(),
        isAirplaneMode: await DeviceInfo.isAirplaneMode(),
        isBatteryCharging: isEmulator
          ? false
          : await DeviceInfo.isBatteryCharging(),
        isCameraPresent: await DeviceInfo.isCameraPresent(),
        isEmulator,
        isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
        isLandscape: await DeviceInfo.isLandscape(),
        isLocationEnabled: await DeviceInfo.isLocationEnabled(),
        isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
        isTablet: DeviceInfo.isTablet(),
        lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
        locales: Localize.getLocales(),
        macAddress: await DeviceInfo.getMacAddress(),
        manufacturer: await DeviceInfo.getManufacturer(),
        maxMemory: await DeviceInfo.getMaxMemory(),
        model: DeviceInfo.getModel(),
        numberFormatSettings: Localize.getNumberFormatSettings(),
        phoneNumber: await DeviceInfo.getPhoneNumber(),
        powerState: isEmulator ? null : await DeviceInfo.getPowerState(),
        previewSdkInt: await DeviceInfo.getPreviewSdkInt(),
        product: await DeviceInfo.getProduct(),
        readableVersion: DeviceInfo.getReadableVersion(),
        securityPatch: await DeviceInfo.getSecurityPatch(),
        serialNumber: await DeviceInfo.getSerialNumber(),
        supported32BitAbis: await DeviceInfo.supported32BitAbis(),
        supported64BitAbis: await DeviceInfo.supported64BitAbis(),
        supportedAbis: await DeviceInfo.supportedAbis(),
        syncUniqueId: await DeviceInfo.syncUniqueId(),
        systemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        tags: await DeviceInfo.getTags(),
        temperatureUnit: Localize.getTemperatureUnit(),
        timezone: Localize.getTimeZone(),
        totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
        totalMemory: await DeviceInfo.getTotalMemory(),
        type: await DeviceInfo.getType(),
        uniqueId: await DeviceInfo.getUniqueId(),
        usedMemory: await DeviceInfo.getUsedMemory(),
        userAgent: await DeviceInfo.getUserAgent(),
        uses24HourClock: Localize.uses24HourClock(),
        usesAutoDateAndTime: Localize.usesAutoDateAndTime(),
        usesAutoTimeZone: Localize.usesAutoTimeZone(),
        usesMetricSystem: Localize.usesMetricSystem(),
        version: DeviceInfo.getVersion(),
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);
};
