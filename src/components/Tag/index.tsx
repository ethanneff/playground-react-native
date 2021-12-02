import React, { memo } from 'react';
import { padding, TagColor } from '../../features/Config';
import { useColor } from '../../features/Theme';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

type TagProps = {
  color: keyof TagColor;
  disabled?: boolean;
  onPress?: () => void;
  title: string;
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
      }}
    >
      <Text color="primaryA" title={title} />
    </TouchableOpacity>
  );
});
