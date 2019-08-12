import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus, Dimensions, Keyboard } from "react-native";
import DeviceInfo from "react-native-device-info";
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
import { useRootDispatch } from "../../utils";

export const useAppLoad = () => {
  const dispatch = useRootDispatch();
  dispatch(loadApp(generateAppInitialState()));
  dispatch(loadDevice(generateDeviceInitialState()));
};

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
    dispatch(
      updateDimensions({
        screen: Dimensions.get("screen"),
        window: Dimensions.get("window")
      })
    );
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

export const useDeviceInfo = () => {
  const dispatch = useRootDispatch();

  useEffect(() => {
    if (DeviceInfo.isEmulator()) {
      return;
    }
    DeviceInfo.isPinOrFingerprintSet((isPinOrFingerprintSet: boolean) =>
      dispatch(updateFingerprint(isPinOrFingerprintSet))
    );
    DeviceInfo.getBatteryLevel().then((batteryLevel: number) =>
      dispatch(updateBattery(batteryLevel))
    );
  }, [dispatch]);
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
