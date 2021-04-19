import React, {memo} from 'react';
import {View} from 'react-native';
import {Button} from '../../../components';
import {config} from '../../../utils';

type Props = {
  run: boolean;
  onStart: () => void;
  onRandom: () => void;
  onClear: () => void;
};

export const Buttons = memo(function Buttons({
  run,
  onStart,
  onRandom,
  onClear,
}: Props) {
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
