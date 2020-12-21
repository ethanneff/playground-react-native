import React, {memo, ReactElement} from 'react';
import {View} from 'react-native';
import {useColor} from '../../../hooks';
import {config} from '../configs';

type ListContainerProps = {
  width?: number;
  children: ReactElement | ReactElement[];
  orientation?: 'vertical' | 'horizontal';
};

export const ListContainer = memo(function ListContainer({
  width,
  children,
  orientation = 'vertical',
}: ListContainerProps) {
  const color = useColor();
  const padding = config.padding;
  const borderRadius = config.borderRadius;
  const horizontal = orientation === 'horizontal';
  return (
    <View
      style={{
        borderRadius,
        width: width,
        backgroundColor: color.background,
        padding: padding / 2,
        marginRight: horizontal ? padding : 0,
        marginBottom: horizontal ? 0 : padding,
      }}>
      {children}
    </View>
  );
});
