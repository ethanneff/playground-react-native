import React, { StrictMode, type PropsWithChildren } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Platform, View } from 'react-native';

// https://github.com/react-navigation/react-navigation/issues/10988
export const StrictModeProvider = ({ children }: PropsWithChildren) =>
  Platform.OS === 'web' ? (
    <View style={{ flex: 1 }}>{children}</View>
  ) : (
    <StrictMode>{children}</StrictMode>
  );
