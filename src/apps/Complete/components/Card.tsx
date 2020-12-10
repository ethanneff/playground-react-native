import React, {memo, ReactElement} from 'react';
import {LayoutChangeEvent, View} from 'react-native';

type CardProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  children: ReactElement;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
};

export const Card = memo(function Card({
  children,
  backgroundColor,
  padding,
  borderRadius,
  onLayout,
}: CardProps) {
  return (
    <View
      onLayout={onLayout}
      style={{
        borderRadius,
        backgroundColor,
        padding,
        marginBottom: padding,
      }}>
      {children}
    </View>
  );
});
