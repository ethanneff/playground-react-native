import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { Slider, Text } from '../../../components';
import { useRootDispatch, useRootSelector } from '../../../redux';
import { updateCount, updateDelay } from './redux';

export const Header = memo(function Header() {
  const dispatch = useRootDispatch();
  const delay = useRootSelector(state => state.gameOfLife.delay);
  const count = useRootSelector(state => state.gameOfLife.count);
  const onCountSlide = useCallback(v => dispatch(updateCount(v)), [dispatch]);
  const onDelaySlide = useCallback(v => dispatch(updateDelay(v)), [dispatch]);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{ alignSelf: 'center' }}
          title={`count: ${count}`}
          type="h5"
        />
        <Slider
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onCountSlide}
          step={1}
          style={{ flex: 1 }}
          value={10}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{ alignSelf: 'center' }}
          title={`delay: ${Math.floor(delay)}`}
          type="h5"
        />
        <Slider
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onDelaySlide}
          step={1}
          style={{ flex: 1 }}
          value={10}
        />
      </View>
    </View>
  );
});
