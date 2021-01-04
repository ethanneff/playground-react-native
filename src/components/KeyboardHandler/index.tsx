import React, {memo, ReactElement, useCallback} from 'react';
import {Keyboard, LayoutChangeEvent, View} from 'react-native';
import {TouchableWithoutFeedback} from '../../conversions/GestureHandler';

type HandleKeyboardProps = {
  onLayout: (event: LayoutChangeEvent) => void;
  render: boolean;
  backgroundColor?: string;
  children: ReactElement | ReactElement[];
};

export const KeyboardHandler = memo(function KeyboardHandler({
  onLayout,
  render,
  backgroundColor,
  children,
}: HandleKeyboardProps) {
  const onDismissKeyboard = useCallback(() => Keyboard.dismiss(), []);
  return (
    <TouchableWithoutFeedback
      onLayout={onLayout}
      onPress={onDismissKeyboard}
      style={{height: '100%'}}>
      <View style={{backgroundColor}}>{render ? children : null}</View>
    </TouchableWithoutFeedback>
  );
});
