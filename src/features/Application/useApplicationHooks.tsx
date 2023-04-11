import NetInfo from '@react-native-community/netinfo';
import { useCallback, useEffect } from 'react';
import {
  AppState,
  Dimensions,
  Keyboard,
  Platform,
  type KeyboardEvent,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as Localize from 'react-native-localize';
import {
  setDetails,
  setDimensions,
  setKeyboardHeight,
  setLocalization,
  setNetwork,
  setStatus,
  useAppDispatch,
} from '../../redux';

const android = Platform.OS === 'android';

export const useNetInfo = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    NetInfo.fetch().then((state) => dispatch(setNetwork(state)));
  }, [dispatch]);

  useEffect(() => {
    handleChange();
    const subscription = NetInfo.addEventListener(handleChange);
    return () => {
      subscription();
    };
  }, [handleChange]);
};

export const useDimensions = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    const state = {
      screen: Dimensions.get('screen'),
      window: Dimensions.get('window'),
    };
    dispatch(setDimensions(state));
  }, [dispatch]);

  useEffect(() => {
    handleChange();
    const subscription = Dimensions.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
    };
  }, [handleChange]);
};

export const useKeyboard = () => {
  const dispatch = useAppDispatch();

  const handleShow = useCallback(
    (event: KeyboardEvent) => {
      dispatch(setKeyboardHeight(event.endCoordinates.height));
    },
    [dispatch],
  );

  const handleHide = useCallback(() => {
    dispatch(setKeyboardHeight(0));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setKeyboardHeight(0));
    const show = android ? 'keyboardDidShow' : 'keyboardWillShow';
    const hide = android ? 'keyboardDidHide' : 'keyboardWillHide';
    const showSubscription = Keyboard.addListener(show, handleShow);
    const hideSubscription = Keyboard.addListener(hide, handleHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [dispatch, handleShow, handleHide]);
};

export const useAppState = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    dispatch(setStatus(AppState.currentState));
  }, [dispatch]);

  useEffect(() => {
    handleChange();
    const subscription = AppState.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
    };
  }, [handleChange]);
};

export const useLocalization = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    const state = {
      calendar: Localize.getCalendar(),
      country: Localize.getCountry(),
      currencies: Localize.getCurrencies(),
      locales: Localize.getLocales(),
      numberFormatSettings: Localize.getNumberFormatSettings(),
      temperatureUnit: Localize.getTemperatureUnit(),
      timeZone: Localize.getTimeZone(),
      uses24HourClock: Localize.uses24HourClock(),
      usesAutoDateAndTime: Localize.usesAutoDateAndTime(),
      usesAutoTimeZone: Localize.usesAutoTimeZone(),
      usesMetricSystem: Localize.usesMetricSystem(),
    };
    dispatch(setLocalization(state));
  }, [dispatch]);

  useEffect(() => {
    handleChange();
    Localize.addEventListener('change', handleChange);
    return () => {
      Localize.removeEventListener('change', handleChange);
    };
  }, [handleChange]);
};

export const useDeviceInfo = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(async () => {
    const isEmulator = await DeviceInfo.isEmulator();
    const state = {
      androidId: await DeviceInfo.getAndroidId(),
      apiLevel: await DeviceInfo.getApiLevel(),
      applicationName: DeviceInfo.getApplicationName(),
      availableLocationProviders:
        await DeviceInfo.getAvailableLocationProviders(),
      baseOs: await DeviceInfo.getBaseOs(),
      batteryLevel: isEmulator ? 0 : await DeviceInfo.getBatteryLevel(),
      bootloader: await DeviceInfo.getBootloader(),
      brand: DeviceInfo.getBrand(),
      brightness: await DeviceInfo.getBrightness(),
      buildId: await DeviceInfo.getBuildId(),
      buildNumber: DeviceInfo.getBuildNumber(),
      bundleId: DeviceInfo.getBundleId(),
      carrier: await DeviceInfo.getCarrier(),
      codename: await DeviceInfo.getCodename(),
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
      freeDiskStorageOld: await DeviceInfo.getFreeDiskStorageOld(),
      hardware: await DeviceInfo.getHardware(),
      hasDynamicIsland: DeviceInfo.hasDynamicIsland(),
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
      isDisplayZoomed: DeviceInfo.isDisplayZoomed(),
      isEmulator,
      isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
      isKeyboardConnected: await DeviceInfo.isKeyboardConnected(),
      isLandscape: await DeviceInfo.isLandscape(),
      isLocationEnabled: await DeviceInfo.isLocationEnabled(),
      isMouseConnected: await DeviceInfo.isMouseConnected(),
      isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
      isTablet: DeviceInfo.isTablet(),
      isTabletMode: await DeviceInfo.isTabletMode(),
      lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
      macAddress: await DeviceInfo.getMacAddress(),
      manufacturer: await DeviceInfo.getManufacturer(),
      maxMemory: await DeviceInfo.getMaxMemory(),
      model: DeviceInfo.getModel(),
      phoneNumber: await DeviceInfo.getPhoneNumber(),
      powerState: isEmulator ? {} : await DeviceInfo.getPowerState(),
      previewSdkInt: await DeviceInfo.getPreviewSdkInt(),
      product: await DeviceInfo.getProduct(),
      readableVersion: DeviceInfo.getReadableVersion(),
      securityPatch: await DeviceInfo.getSecurityPatch(),
      serialNumber: await DeviceInfo.getSerialNumber(),
      supported32BitAbis: await DeviceInfo.supported32BitAbis(),
      supported64BitAbis: await DeviceInfo.supported64BitAbis(),
      supportedAbis: await DeviceInfo.supportedAbis(),
      systemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      tags: await DeviceInfo.getTags(),
      totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
      totalDiskCapacityOld: await DeviceInfo.getTotalDiskCapacityOld(),
      totalMemory: await DeviceInfo.getTotalMemory(),
      type: await DeviceInfo.getType(),
      uniqueId: await DeviceInfo.getUniqueId(),
      usedMemory: await DeviceInfo.getUsedMemory(),
      userAgent: await DeviceInfo.getUserAgent(),
      version: DeviceInfo.getVersion(),
    };
    dispatch(setDetails(state));
  }, [dispatch]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);
};
