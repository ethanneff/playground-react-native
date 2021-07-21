import React, {memo} from 'react';
import {useColor} from '../../hooks';
import {padding, TagColor} from '../../utils';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';

type TagProps = {
  onPress?: () => void;
  title: string;
  color: keyof TagColor;
  disabled?: boolean;
};

export const Tag = memo(function Tag({
  title,
  onPress,
  color,
  disabled,
}: TagProps): JSX.Element {
  const colorScheme = useColor();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: colorScheme.tag[color],
        borderColor: colorScheme.border.primaryA,
        borderWidth: 1,
        borderRadius: padding(2),
        alignSelf: 'flex-start',
        paddingHorizontal: padding(2),
        paddingVertical: padding(1),
      }}>
      <Text color="primaryA" title={title} />
    </TouchableOpacity>
  );
});
