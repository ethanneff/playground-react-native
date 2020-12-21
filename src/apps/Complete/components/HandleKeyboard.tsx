import React, {memo, ReactElement, useCallback} from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {config} from '../configs';

type HandleKeyboardProps = {
  onLayout: (event: LayoutChangeEvent) => void;
  render: boolean;
  backgroundColor: string;
  children: ReactElement | ReactElement[];
};

export const HandleKeyboard = memo(function HandleKeyboard({
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
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor,
          padding: config.padding,
        }}>
        {render ? children : null}
      </View>
    </TouchableWithoutFeedback>
  );
});
