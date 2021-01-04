import React, {memo, ReactElement} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {useColor} from '../../../hooks';
import {config} from '../configs';

// TODO: combine card components with global card

type CardProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  children: ReactElement | ReactElement[];
  margin?: 'bottom' | 'right' | 'none';
  width?: number;
};

export const Card = memo(function Card({
  children,
  onLayout,
  margin = 'none',
  width,
}: CardProps) {
  const color = useColor();
  return (
    <View
      onLayout={onLayout}
      style={{
        width,
        borderRadius: config.borderRadius,
        backgroundColor: color.background,
        padding: config.padding / 2,
        marginRight: margin === 'right' ? config.padding : 0,
        marginBottom: margin === 'bottom' ? config.padding : 0,
      }}>
      {children}
    </View>
  );
});
