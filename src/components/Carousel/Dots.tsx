import React, { memo } from 'react';
import { View } from 'react-native';
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
  slides,
  onDotPress,
  dotSize,
  activeIndex,
}: DotsProps) {
  const colors = useColors();
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {slides.map((slide, index) => {
        return (
          <TouchableOpacity
            key={slide.id}
            onPress={onDotPress(index)}
            style={{
              marginHorizontal: spacing(1),
              marginBottom: spacing(2),
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize,
              backgroundColor:
                activeIndex === index
                  ? colors.text.secondary
                  : colors.text.disabled,
            }}
          />
        );
      })}
    </View>
  );
});
