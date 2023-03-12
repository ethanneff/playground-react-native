import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { Tag, View } from '../../../../components';
import { spacing, type TagColor, useColors } from '../../../../features';

export const TagGroup = memo(function TagGroup() {
  const colors = useColors();
  const onPress = useCallback(() => undefined, []);
  const keys = Object.keys(colors.tag) as (keyof TagColor)[];
  return (
    <>
      {keys.map((c) => (
        <View
          key={v4()}
          style={{ margin: spacing(1) }}
        >
          <Tag
            color={c}
            onPress={onPress}
            title={c}
          />
        </View>
      ))}
    </>
  );
});
