import React, { memo } from 'react';
import { Icon, IconName, Text, TouchableOpacity } from '../../components';
import { padding } from '../../features';
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
        padding: padding(2),
        marginBottom: padding(2),
        borderRadius: padding(10),
      }}
    >
      <Icon name={icon} />
      <Text
        style={{ paddingLeft: padding(2) }}
        title={title}
        type="button"
      />
    </TouchableOpacity>
  );
});
