import React, { memo, ReactElement, useCallback } from 'react';
import { Keyboard, LayoutChangeEvent, View } from 'react-native';
import { TouchableWithoutFeedback } from '../../conversions';

type HandleKeyboardProps = {
  backgroundColor?: string;
  children: ReactElement | ReactElement[];
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
