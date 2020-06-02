import React, {memo} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {useColor} from '../../../../hooks';

interface CanvasProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Canvas: React.FC<CanvasProps> = memo(function Canvas({
  children,
  onLayout,
}) {
  const color = useColor();
  return (
    <View onLayout={onLayout} style={{flex: 1, backgroundColor: color.surface}}>
      {children}
    </View>
  );
});
