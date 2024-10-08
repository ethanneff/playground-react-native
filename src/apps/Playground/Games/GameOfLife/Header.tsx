import React, { useCallback } from 'react';
import { Slider, Text, View } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { updateCount, updateDelay } from './redux';

export const Header = () => {
  const dispatch = useAppDispatch();
  const delay = useAppSelector((state) => state.games.life.delay);
  const count = useAppSelector((state) => state.games.life.count);
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
};
