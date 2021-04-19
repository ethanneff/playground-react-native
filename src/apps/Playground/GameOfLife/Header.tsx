import React, {memo} from 'react';
import {View} from 'react-native';
import {Slider, Text} from '../../../components';

type Props = {
  count: number;
  delay: number;
  onCountSlide: (value: number) => void;
  onDelaySlide: (value: number) => void;
};

export const Header = memo(function Header({
  count,
  delay,
  onCountSlide,
  onDelaySlide,
}: Props) {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{alignSelf: 'center'}}
          title={`count: ${count}`}
          type="h5"
        />
        <Slider
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onCountSlide}
          step={1}
          style={{flex: 1}}
          value={10}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{alignSelf: 'center'}}
          title={`delay: ${Math.floor(delay)}`}
          type="h5"
        />
        <Slider
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onDelaySlide}
          step={1}
          style={{flex: 1}}
          value={10}
        />
      </View>
    </View>
  );
});
