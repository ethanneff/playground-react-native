import React, { memo } from 'react';
import { View } from 'react-native';
import { Icon, Text, TouchableOpacity } from '../../../components';
import { padding } from '../../../features';

type Props = {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  size?: number;
  title: string;
};

export const ModalHeader = memo(function ModalHeader({
  title,
  onLeftPress,
  size = padding(8),
  onRightPress,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: padding(4),
      }}
    >
      <TouchableOpacity onPress={onLeftPress}>
        <Icon invisible={!onLeftPress} name="chevron-left" size={size} />
      </TouchableOpacity>
      <Text center flex title={title} type="h4" />
      <TouchableOpacity onPress={onRightPress}>
        <Icon invisible={!onRightPress} name="close" size={size} />
      </TouchableOpacity>
    </View>
  );
});
