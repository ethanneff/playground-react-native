import React, {memo} from 'react';
import {View} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {colorWithOpacity, config} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';
import {Slide} from './types';

type DotsProps = {
  slides: Slide[];
  dotSize: number;
  activeIndex: number;
  onDotPress: (index: number) => () => void;
};

export const Dots = memo(function Dots({
  slides,
  onDotPress,
  dotSize,
  activeIndex,
}: DotsProps) {
  const color = useColor();
  const dropShadow = useDropShadow();
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
      }}>
      {slides.map((slide, index) => {
        return (
          <TouchableOpacity
            key={slide.id}
            onPress={onDotPress(index)}
            style={{
              marginHorizontal: config.padding(1),
              marginBottom: config.padding(2),
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize,
              borderColor: color.text,
              ...dropShadow(4),
              backgroundColor: colorWithOpacity(
                activeIndex === index ? color.text : color.background,
                0.6,
              ),
            }}
          />
        );
      })}
    </View>
  );
});
