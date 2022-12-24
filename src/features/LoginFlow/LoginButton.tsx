import React, { memo } from 'react';
import { Icon, IconName, Text, TouchableOpacity } from '../../components';
import { spacing } from '../Config';
import { useColors } from '../Theme';

type Props = {
  icon: IconName;
  onPress: () => void;
  title: string;
};

export const LoginButton = memo(function LoginButton({
  icon,
  onPress,
  title,
}: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        borderColor: colors.border.primaryA,
        borderRadius: spacing(10),
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing(2),
        padding: spacing(2),
      }}
    >
      <Icon name={icon} />
      <Text
        style={{ paddingLeft: spacing(2) }}
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});
