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
  onPress,
  icon,
  title,
}: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: colors.border.primaryA,
        borderWidth: 2,
        padding: spacing(2),
        marginBottom: spacing(2),
        borderRadius: spacing(10),
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
