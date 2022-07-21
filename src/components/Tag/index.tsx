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
        borderRadius: spacing(2),
        alignSelf: 'flex-start',
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
