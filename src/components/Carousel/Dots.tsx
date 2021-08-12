import React, {memo} from 'react';
import {View} from 'react-native';
import {padding} from '../../features/Config';
import {useColor} from '../../features/Theme';
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
              marginHorizontal: padding(1),
              marginBottom: padding(2),
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize,
              backgroundColor:
                activeIndex === index
                  ? color.text.secondary
                  : color.text.disabled,
            }}
          />
        );
      })}
    </View>
  );
});
