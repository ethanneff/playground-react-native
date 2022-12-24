import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

export type LayoutDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const tabBarEdges: Edge[] = ['top', 'left', 'right'];

export const useLayout = () => {
  const [layout, setLayout] = useState<LayoutDimensions | null>(null);
  const insets = useSafeAreaInsets();

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    setLayout({ height, width, x, y });
  }, []);

  return { insets, layout, onLayout, tabBarEdges };
};
