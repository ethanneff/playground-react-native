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
    const { x, y, height, width } = event.nativeEvent.layout;
    setLayout({ x, y, height, width });
  }, []);

  return { layout, onLayout, tabBarEdges, insets };
};
