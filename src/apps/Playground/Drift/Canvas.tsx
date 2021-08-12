import React, {memo, ReactNode} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {useColor} from '../../../features';

interface Props {
  onLayout: (event: LayoutChangeEvent) => void;
  children: ReactNode;
}

export const Canvas = memo(function Canvas({children, onLayout}: Props) {
  const color = useColor();
  return (
    <View
      onLayout={onLayout}
      style={{flex: 1, backgroundColor: color.background.secondary}}>
      {children}
    </View>
  );
});
