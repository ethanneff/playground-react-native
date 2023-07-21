import React, { useMemo } from 'react';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { Pressable } from '../Pressable';

type DotsProps = {
  readonly activeIndex: number;
  readonly dotSize: number;
  readonly length: number;
  readonly onDotPress: (index: number) => () => void;
};

export const CarouselDots = ({
  activeIndex,
  dotSize,
  length,
  onDotPress,
}: DotsProps) => {
  const dots = useMemo(() => Array.from({ length }, (_, i) => i), [length]);
  const colors = useColors();
  return (
    <View
      style={{
        bottom: spacing(2),
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
      }}
    >
      {dots.map((dot, index) => (
        <Pressable
          containerStyle={{
            backgroundColor:
              activeIndex === index
                ? colors.text.secondary
                : colors.text.disabled,
            borderRadius: dotSize / 2,
            height: dotSize,
            marginBottom: spacing(2),
            marginHorizontal: spacing(1),
            width: dotSize,
          }}
          key={`dot-${dot}`}
          onPress={onDotPress(index)}
        />
      ))}
    </View>
  );
};
