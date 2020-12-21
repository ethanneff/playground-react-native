import React, {memo, ReactElement} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {useColor} from '../../../hooks';
import {config} from '../configs';

type CardProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  children: ReactElement | ReactElement[];
};

export const Card = memo(function Card({children, onLayout}: CardProps) {
  const color = useColor();
  return (
    <View
      onLayout={onLayout}
      style={{
        borderRadius: config.borderRadius,
        backgroundColor: color.background,
        padding: config.padding / 2,
        marginBottom: config.padding,
      }}>
      {children}
    </View>
  );
});
