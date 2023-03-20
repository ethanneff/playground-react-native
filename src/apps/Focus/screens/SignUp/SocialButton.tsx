import React, { memo } from 'react';
import {
  Icon,
  Spacing,
  Text,
  TouchableOpacity,
  View,
  type IconName,
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
    >
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        padding={spacing(2)}
        style={{
          borderColor: colors.border.secondary,
          borderRadius: spacing(1),
          borderWidth: 1,
        }}
      >
        <Icon
          color="primaryA"
          name={icon}
          size={spacing(5)}
        />
        <Spacing padding={1} />
        <Text
          color="secondary"
          title={title}
          type="button"
        />
      </View>
    </TouchableOpacity>
  );
});
