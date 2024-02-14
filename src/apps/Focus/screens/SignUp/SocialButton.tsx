import React from 'react';
import {
  Icon,
  Pressable,
  Spacing,
  Text,
  View,
  type IconName,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';

type Properties = {
  readonly disabled: boolean;
  readonly icon: IconName;
  readonly onPress: () => void;
  readonly title: string;
};

export const SocialButton = ({
  disabled,
  icon,
  onPress,
  title,
}: Properties) => {
  const colors = useColors();
  return (
    <Pressable
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
        <Spacing padding={spacing(1)} />
        <Text
          color="secondary"
          title={title}
          type="button"
        />
      </View>
    </Pressable>
  );
};
