import { getCurrentColor } from "./../../models/Theme/index";
import { useRootSelector } from "../../utils";

export const useColor = () => useRootSelector(state => getCurrentColor(state));
