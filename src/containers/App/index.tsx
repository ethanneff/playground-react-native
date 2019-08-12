import React, { memo } from "react";
import { Navigation } from "../Navigation";
import {
  useAppLoad,
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo
} from "./hooks";

export const App = memo(() => {
  useAppLoad();
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return <Navigation />;
});
