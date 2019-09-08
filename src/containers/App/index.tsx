import React, { memo } from "react";
import {
  useAppLoad,
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo
} from "./hooks";

export const App = memo(function App({ children }) {
  useAppLoad();
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return <>{children}</>;
});
