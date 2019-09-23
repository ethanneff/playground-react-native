import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Config } from "../../utils";

export const useNativeDriver = !(
  process.env.JEST_WORKER_ID ||
  DeviceInfo.isEmulator() || // make sync https://github.com/react-native-community/react-native-device-info/issues/776
  Platform.OS === Config.os.web
);
