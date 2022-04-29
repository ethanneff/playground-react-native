import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export type layoutDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export const useLayout = () => {
  const [layout, setLayout] = useState<layoutDimensions | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setLayout({ x, y, height, width });
  }, []);

  return { layout, onLayout };
};
