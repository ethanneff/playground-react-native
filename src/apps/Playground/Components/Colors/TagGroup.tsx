import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import { Tag, View } from '../../../../components';
import { spacing, useColors, type TagColor } from '../../../../features';

export const TagGroup = () => {
  const colors = useColors();
  const onPress = useCallback(() => false, []);
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
};
