import React, { memo, ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useColor } from '../../../features';

type Props = {
  onLayout: (event: LayoutChangeEvent) => void;
  children: ReactNode;
};

export type CanvasDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Canvas = memo(function Canvas({ children, onLayout }: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.secondary,
      flex: 1,
    },
  });

  return (
    <View onLayout={onLayout} style={styles.container}>
      {children}
    </View>
  );
});
