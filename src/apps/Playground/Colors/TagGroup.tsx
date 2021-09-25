import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { Tag } from '../../../components';
import { padding, TagColor, useColor } from '../../../features';

export const TagGroup = memo(function TagGroup() {
  const color = useColor();
  const onPress = useCallback(() => undefined, []);
  const keys = Object.keys(color.tag) as Array<keyof TagColor>;
  return (
    <>
      {keys.map((c) => (
        <View key={v4()} style={{ margin: padding(1) }}>
          <Tag color={c} onPress={onPress} title={c} />
        </View>
      ))}
    </>
  );
});
