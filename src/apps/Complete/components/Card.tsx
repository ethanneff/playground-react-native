import React, { memo, ReactNode } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { View } from '../../../components';
import { useColors } from '../../../features';
import { completeConfig } from '../utils';

// TODO: combine card components with global card

type CardProps = {
  children: ReactNode;
  flex?: boolean;
  margin?: 'bottom' | 'right';
  onLayout?: (event: LayoutChangeEvent) => void;
  width?: number;
};

export const Card = memo(function Card({
  children,
  flex,
  margin,
  onLayout,
  width,
}: CardProps) {
  const colors = useColors();
  return (
    <View
      onLayout={onLayout}
      style={{
        backgroundColor: colors.background.primaryA,
        borderRadius: completeConfig.borderRadius,
        flex: flex ? 1 : 0,
        marginBottom: margin === 'bottom' ? completeConfig.padding : 0,
        marginRight: margin === 'right' ? completeConfig.padding : 0,
        padding: completeConfig.padding / 2,
        width,
      }}
    >
      {children}
    </View>
  );
});
