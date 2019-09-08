import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Config } from "../../utils";

export const useNativeDriver = !(
  process.env.JEST_WORKER_ID ||
  DeviceInfo.isEmulator() ||
  Platform.OS === Config.os.web
);
