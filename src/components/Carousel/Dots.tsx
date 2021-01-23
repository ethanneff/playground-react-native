import React, {memo} from 'react';
import {View} from 'react-native';
import {useColor} from '../../hooks';
import {Color} from '../../models';
import {colorWithOpacity, config} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';
import {Slide} from './types';

type DotsProps = {
  slides: Slide[];
  dotSize: number;
  activeIndex: number;
  onDotPress: (index: number) => () => void;
};

const getBackgroundColor = (color: Color, active: boolean) =>
  colorWithOpacity(active ? color.primary : color.secondary, 0.6);

export const Dots = memo(function Dots({
  slides,
  onDotPress,
  dotSize,
  activeIndex,
}: DotsProps) {
  const color = useColor();
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
              backgroundColor: getBackgroundColor(color, activeIndex === index),
            }}
          />
        );
      })}
    </View>
  );
});
