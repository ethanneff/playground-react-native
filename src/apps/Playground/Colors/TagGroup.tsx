import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {MultiColored, padding} from '../../../utils';

type TagProps = {
  onPress?: () => void;
  title: string;
  color: keyof MultiColored;
};

const Tag = ({title, onPress, color}: TagProps) => {
  const colorScheme = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colorScheme.tags[color],
        borderColor: colorScheme.border[color],
        borderWidth: 1,
        borderRadius: padding(2),
        alignSelf: 'flex-start',
        paddingHorizontal: padding(2),
        paddingVertical: padding(1),
      }}>
      <Text color={color} title={title} />
    </TouchableOpacity>
  );
};

export const TagGroup = memo(function TagGroup() {
  const color = useColor();
  const onPress = useCallback(() => undefined, []);
  return (
    <>
      {Object.keys(color.tags).map((c: any) =>
        c === 'statusBar' ? null : (
          <View style={{margin: padding(1)}}>
            <Tag color={c} onPress={onPress} title={c} />
          </View>
        ),
      )}
    </>
  );
});
