import React, { memo } from "react";
import {
  useAppState,
  useDeviceInfo,
  useDimensions,
  useKeyboard,
  useNetInfo
} from "./hooks";

export const App = memo(function App({ children }) {
  useNetInfo();
  useDeviceInfo();
  useDimensions();
  useAppState();
  useKeyboard();

  return <>{children}</>;
});
