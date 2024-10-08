import React, { useCallback } from 'react';
import { Button, View } from '../../../../components';
import { spacing } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { resetBoard, toggleRun } from './redux';

export const Buttons = () => {
  const dispatch = useAppDispatch();
  const run = useAppSelector((state) => state.games.life.run);
  const onRandom = useCallback(() => dispatch(resetBoard(0.5)), [dispatch]);
  const onStart = useCallback(() => dispatch(toggleRun()), [dispatch]);
  const onClear = useCallback(() => dispatch(resetBoard(0)), [dispatch]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing(4),
      }}
    >
      <Button
        emphasis="medium"
        onPress={onStart}
        title={run ? 'stop' : 'start'}
      />
      <Button
        emphasis="medium"
        onPress={onRandom}
        title="random"
      />
      <Button
        emphasis="medium"
        onPress={onClear}
        title="clear"
      />
    </View>
  );
};
