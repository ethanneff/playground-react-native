import React, { memo, useCallback } from 'react';
import { Slider, Text, View } from '../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { updateCount, updateDelay } from './redux';

export const Header = memo(function Header() {
  const dispatch = useRootDispatch();
  const delay = useRootSelector((state) => state.gameOfLife.delay);
  const count = useRootSelector((state) => state.gameOfLife.count);
  const onCountSlide = useCallback(
    (v: number) => dispatch(updateCount(v)),
    [dispatch],
  );
  const onDelaySlide = useCallback(
    (v: number) => dispatch(updateDelay(v)),
    [dispatch],
  );

  return (
    <View>
      <View flexDirection="row">
        <Text
          style={{ alignSelf: 'center' }}
          title={`count: ${count}`}
          type="h5"
        />
        <Slider
          defaultValue={10}
          flex
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onCountSlide}
          step={1}
        />
      </View>
      <View flexDirection="row">
        <Text
          style={{ alignSelf: 'center' }}
          title={`delay: ${Math.floor(delay)}`}
          type="h5"
        />
        <Slider
          defaultValue={10}
          flex
          maximumValue={100}
          minimumValue={1}
          onSlidingComplete={onDelaySlide}
          step={1}
        />
      </View>
    </View>
  );
});
