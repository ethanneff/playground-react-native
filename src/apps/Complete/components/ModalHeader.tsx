import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, Text} from '../../../components';
import {padding} from '../../../utils';

type Props = {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  size?: number;
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
      }}>
      <Icon
        invisible={!onLeftPress}
        name="chevron-left"
        onPress={onLeftPress}
        size={size}
      />
      <Text center flex title={title} type="h4" />
      <Icon
        invisible={!onRightPress}
        name="close"
        onPress={onRightPress}
        size={size}
      />
    </View>
  );
});
