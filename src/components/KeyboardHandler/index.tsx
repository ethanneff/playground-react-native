import React, { memo, useCallback, type ReactNode } from 'react';
import { Keyboard, type LayoutChangeEvent } from 'react-native';
import { useColors, type MonoMultiColor } from '../../features';
import { Pressable } from '../Pressable';

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
  const colors = useColors();

  const onDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <Pressable
      containerStyle={{
        backgroundColor: colors.background[backgroundColor ?? 'primaryA'],
        flex: 1,
      }}
      contentStyle={{ flex: 1 }}
      onLayout={onLayout}
      onPress={onDismissKeyboard}
      withoutFeedback
    >
      {children}
    </Pressable>
  );
});
