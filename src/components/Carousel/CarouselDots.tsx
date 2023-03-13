import React, { memo, useMemo } from 'react';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { TouchableOpacity } from '../TouchableOpacity';

type DotsProps = {
  activeIndex: number;
  dotSize: number;
  length: number;
  onDotPress: (index: number) => () => void;
};

export const CarouselDots = memo(function Dots({
  activeIndex,
  dotSize,
  length,
  onDotPress,
}: DotsProps) {
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
        <TouchableOpacity
          key={`dot-${dot}`}
          onPress={onDotPress(index)}
          style={{
            backgroundColor:
              activeIndex === index
                ? colors.text.secondary
                : colors.text.disabled,
            borderRadius: dotSize,
            height: dotSize,
            marginBottom: spacing(2),
            marginHorizontal: spacing(1),
            width: dotSize,
          }}
        />
      ))}
    </View>
  );
});
