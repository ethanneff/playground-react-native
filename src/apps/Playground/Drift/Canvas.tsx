import React, { memo, ReactNode } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useColors } from '../../../features';

type Props = {
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const Canvas = memo(function Canvas({ children, onLayout }: Props) {
  const colors = useColors();
  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
    >
      {children}
    </View>
  );
});
