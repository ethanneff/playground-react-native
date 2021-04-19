import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Button} from '../../../components';
import {config, useRootDispatch, useRootSelector} from '../../../utils';
import {resetBoard, toggleRun} from './redux';

export const Buttons = memo(function Buttons() {
  const dispatch = useRootDispatch();
  const run = useRootSelector(state => state.gameOfLife.run);
  const onRandom = useCallback(() => dispatch(resetBoard(0.5)), [dispatch]);
  const onStart = useCallback(() => dispatch(toggleRun()), [dispatch]);
  const onClear = useCallback(() => dispatch(resetBoard(0)), [dispatch]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: config.padding(4),
      }}>
      <Button
        emphasis="medium"
        onPress={onStart}
        title={run ? 'stop' : 'start'}
      />
      <Button emphasis="medium" onPress={onRandom} title="random" />
      <Button emphasis="medium" onPress={onClear} title="clear" />
    </View>
  );
});
