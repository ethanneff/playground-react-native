import React, { useCallback, type ReactNode } from 'react';
import { Keyboard, type LayoutChangeEvent } from 'react-native';
import { useColors, type MonoMultiColor } from '../../features';
import { Pressable } from '../Pressable';

type HandleKeyboardProps = {
  readonly backgroundColor?: keyof MonoMultiColor;
  readonly children: ReactNode;
  readonly onLayout: (event: LayoutChangeEvent) => void;
};

export const KeyboardHandler = ({
  backgroundColor,
  children,
  onLayout,
}: HandleKeyboardProps) => {
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
};
