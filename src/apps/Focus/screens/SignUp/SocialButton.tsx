import React, { memo } from 'react';
import {
  Icon,
  IconName,
  Spacing,
  Text,
  TouchableOpacity,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';

type Props = {
  disabled: boolean;
  icon: IconName;
  onPress: () => void;
  title: string;
};

export const SocialButton = memo(function LoginButton({
  onPress,
  icon,
  title,
  disabled,
}: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: colors.border.secondary,
        borderWidth: 1,
        padding: spacing(1),
        borderRadius: spacing(1),
      }}
    >
      <Icon
        color="primaryA"
        name={icon}
      />
      <Spacing padding={1} />
      <Text
        color="secondary"
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});
