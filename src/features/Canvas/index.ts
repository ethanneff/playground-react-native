import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export type CanvasDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export const useCanvas = () => {
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCanvas({ x, y, height, width });
  }, []);

  return { canvas, onLayout };
};
