import React, { memo } from 'react';
import { spacing, TagColor, useColors } from '../../features';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

type TagProps = {
  color: keyof TagColor;
  disabled?: boolean;
  onPress?: () => void;
  title: string;
};

export const Tag = memo(function Tag({
  color,
  disabled,
  onPress,
  title,
}: TagProps): JSX.Element {
  const colors = useColors();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignSelf: 'flex-start',
        backgroundColor: colors.tag[color],
        borderColor: colors.border.primaryA,
        borderRadius: spacing(2),
        borderWidth: 1,
        paddingHorizontal: spacing(2),
        paddingVertical: spacing(1),
      }}
    >
      <Text
        color="primaryA"
        title={title}
      />
    </TouchableOpacity>
  );
});
