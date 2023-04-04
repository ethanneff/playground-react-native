import React, { memo } from 'react';
import { spacing, useColors, type TagColor } from '../../features';
import { Pressable } from '../Pressable';
import { Text } from '../Text';

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
}: TagProps) {
  const colors = useColors();
  return (
    <Pressable
      containerStyle={{
        alignSelf: 'flex-start',
        backgroundColor: colors.tag[color],
        borderColor: colors.border.primaryA,
        borderRadius: spacing(2),
        borderWidth: 1,
        paddingHorizontal: spacing(2),
        paddingVertical: spacing(1),
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        color="primaryA"
        title={title}
      />
    </Pressable>
  );
});
