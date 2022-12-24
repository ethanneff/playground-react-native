import React, { memo } from 'react';
import { View } from '../../components';
import { spacing, useColors } from '../../features';
import { TouchableOpacity } from '../TouchableOpacity';
import { CarouselSlide } from './types';

type DotsProps = {
  activeIndex: number;
  dotSize: number;
  onDotPress: (index: number) => () => void;
  slides: CarouselSlide[];
};

export const Dots = memo(function Dots({
  activeIndex,
  dotSize,
  onDotPress,
  slides,
}: DotsProps) {
  const colors = useColors();
  return (
    <View
      style={{
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
      }}
    >
      {slides.map((slide, index) => {
        return (
          <TouchableOpacity
            key={slide.id}
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
        );
      })}
    </View>
  );
});
