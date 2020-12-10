import React, {memo, ReactElement} from 'react';
import {View} from 'react-native';

type CardProps = {
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
}: CardProps) {
  return (
    <View
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
