import React, { memo, ReactNode, useCallback } from 'react';
import { Keyboard, LayoutChangeEvent } from 'react-native';
import { View } from '../../components';
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback';

type HandleKeyboardProps = {
  backgroundColor?: string;
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const KeyboardHandler = memo(function KeyboardHandler({
  onLayout,
  backgroundColor,
  children,
}: HandleKeyboardProps) {
  const onDismissKeyboard = useCallback(() => Keyboard.dismiss(), []);
  return (
    <TouchableWithoutFeedback
      onLayout={onLayout}
      onPress={onDismissKeyboard}
      style={{ height: '100%' }}
    >
      <View style={{ flex: 1, backgroundColor }}>{children}</View>
    </TouchableWithoutFeedback>
  );
});
