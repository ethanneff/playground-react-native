import React, { memo, ReactElement } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useColor } from '../../../features';
import { completeConfig } from '../utils';

// TODO: combine card components with global card

type CardProps = {
  children: ReactElement | ReactElement[];
  flex?: boolean;
  margin?: 'bottom' | 'right' | 'none';
  onLayout?: (event: LayoutChangeEvent) => void;
  width?: number;
};

export const Card = memo(function Card({
  children,
  onLayout,
  margin = 'none',
  width,
  flex,
}: CardProps) {
  const color = useColor();
  return (
    <View
      onLayout={onLayout}
      style={{
        flex: flex ? 1 : 0,
        width,
        borderRadius: completeConfig.borderRadius,
        backgroundColor: color.background.primaryA,
        padding: completeConfig.padding / 2,
        marginRight: margin === 'right' ? completeConfig.padding : 0,
        marginBottom: margin === 'bottom' ? completeConfig.padding : 0,
      }}
    >
      {children}
    </View>
  );
});
