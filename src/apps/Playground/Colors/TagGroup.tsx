import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Tag} from '../../../components';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';

export const TagGroup = memo(function TagGroup() {
  const color = useColor();
  const onPress = useCallback(() => undefined, []);
  return (
    <>
      {Object.keys(color.tag).map((c: any) =>
        c === 'statusBar' ? null : (
          <View key={c} style={{margin: padding(1)}}>
            <Tag
              color={c}
              disabled={c === 'disabled'}
              onPress={onPress}
              title={c}
            />
          </View>
        ),
      )}
    </>
  );
});
