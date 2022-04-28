import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { Tag } from '../../../../components';
import { padding, TagColor, useColors } from '../../../../features';

export const TagGroup = memo(function TagGroup() {
  const colors = useColors();
  const onPress = useCallback(() => undefined, []);
  const keys = Object.keys(colors.tag) as Array<keyof TagColor>;
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
