import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Config } from "../Config";

export const useNativeDriver = !(
  DeviceInfo.isEmulator() || Platform.OS === Config.os.web
);
