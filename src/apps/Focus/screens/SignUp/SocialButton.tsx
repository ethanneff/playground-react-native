import React, { memo } from 'react';
import {
  Icon,
  type IconName,
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
  disabled,
  icon,
  onPress,
  title,
}: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        borderColor: colors.border.secondary,
        borderRadius: spacing(1),
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: spacing(1),
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
