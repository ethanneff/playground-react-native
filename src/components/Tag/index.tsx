import React, { memo } from 'react';
import { padding, TagColor, useColors } from '../../features';
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
  const colors = useColors();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: colors.tag[color],
        borderColor: colors.border.primaryA,
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
