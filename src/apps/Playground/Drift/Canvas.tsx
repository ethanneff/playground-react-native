import React, { memo, ReactNode } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useColor } from '../../../features';

type Props = {
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const Canvas = memo(function Canvas({ children, onLayout }: Props) {
  const color = useColor();
  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, backgroundColor: color.background.secondary }}
    >
      {children}
    </View>
  );
});
