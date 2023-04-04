import React, { memo, useCallback, type ReactNode } from 'react';
import { Keyboard, type LayoutChangeEvent } from 'react-native';
import { type MonoMultiColor } from '../../features';
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback';

type HandleKeyboardProps = {
  backgroundColor?: keyof MonoMultiColor;
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const KeyboardHandler = memo(function KeyboardHandler({
  backgroundColor,
  children,
  onLayout,
}: HandleKeyboardProps) {
  const onDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  return (
    <TouchableWithoutFeedback
      onLayout={onLayout}
      onPress={onDismissKeyboard}
      style={{ backgroundColor, height: '100%' }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
});
