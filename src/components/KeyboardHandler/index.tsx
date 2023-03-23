import React, { memo, useCallback, type ReactNode } from 'react';
import { Keyboard, type LayoutChangeEvent } from 'react-native';
import { View } from '../../components';
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback';

type HandleKeyboardProps = {
  backgroundColor?: string;
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
      onPress={onDismissKeyboard}
      style={{ height: '100%' }}
    >
      <View
        onLayout={onLayout}
        style={{ backgroundColor, flex: 1 }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
});
