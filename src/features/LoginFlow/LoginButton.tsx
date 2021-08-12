import React, {memo} from 'react';
import {Icon, Text, TouchableOpacity} from '../../components';
import {padding} from '../../features/Config';
import {useColor} from '../Theme';

type Props = {
  onPress: () => void;
  icon: string;
  title: string;
};

export const LoginButton = memo(function LoginButton({
  onPress,
  icon,
  title,
}: Props) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.border.primaryA,
        borderWidth: 2,
        padding: padding(2),
        marginBottom: padding(2),
        borderRadius: padding(10),
      }}>
      <Icon name={icon} />
      <Text style={{paddingLeft: padding(2)}} title={title} type="button" />
    </TouchableOpacity>
  );
});
